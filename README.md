# Applet — 多端小程序开发模板（Multi-Platform MiniProgram Starter）

> 一个可一键生成「微信 / 支付宝 / 抖音 / 百度 / QQ / 京东 / 钉钉 / 飞书 / 快手 / H5 / App」等多端小程序工程的开发模板与脚手架（CLI）。
>
> 目标：**一次开发，多端运行；一套规范，开箱即用。**

---

## 目录

- [一、项目目标](#一项目目标)
- [二、覆盖平台](#二覆盖平台)
- [三、技术选型](#三技术选型)
- [四、整体架构](#四整体架构)
- [五、CLI 设计](#五cli-设计)
- [六、模板能力清单](#六模板能力清单)
- [七、工程化与规范](#七工程化与规范)
- [八、目录结构（规划）](#八目录结构规划)
- [九、里程碑与排期](#九里程碑与排期)
- [十、风险与待决策点](#十风险与待决策点)
- [十一、参考资料](#十一参考资料)

---

## 一、项目目标

打造一个**生产可用**的多端小程序「模板 + 脚手架」一体化解决方案，解决以下痛点：

1. **多端碎片化**：各平台语法、API、构建方式不一致，重复劳动严重。
2. **冷启动慢**：每个新项目都要重新配置 TypeScript / Lint / 请求层 / 登录 / 路由 / 状态管理。
3. **规范缺失**：团队协作中代码风格、提交规范、CI/CD 难以统一。
4. **能力沉淀难**：通用业务能力（埋点、监控、鉴权、主题、国际化）没有可复用载体。

最终交付物：

- ✅ 一个 CLI 工具：`npx create-applet@latest my-app`
- ✅ 多套官方模板（按业务场景：基础版 / 电商版 / 内容版 / 后台版）
- ✅ 一份完善的开发文档与最佳实践指南

---

## 二、覆盖平台


| 平台       | 标识               | 优先级    | 备注                |
| -------- | ---------------- | ------ | ----------------- |
| 微信小程序    | `weapp`          | **P0** | 主战场，必须支持          |
| H5       | `h5`             | **P0** | 用于浏览器分享与调试        |
| 支付宝小程序   | `alipay`         | **P0** | 金融/政务场景           |
| 抖音小程序    | `tt`             | **P0** | 字节系（含今日头条/西瓜）     |
| 百度智能小程序  | `swan`           | P1     |                   |
| QQ 小程序   | `qq`             | P1     |                   |
| 京东小程序    | `jd`             | P2     |                   |
| 钉钉小程序    | `dd`             | P2     | 企业 OA 场景          |
| 飞书小程序    | `lark`           | P2     | 企业 OA 场景          |
| 快手小程序    | `ks`             | P3     |                   |
| App (RN) | `rn` / `harmony` | P3     | 通过 Taro RN 端或鸿蒙输出 |


> ✅ **v1.0 范围已确认**：覆盖 P0 共 4 端（微信 / H5 / 支付宝 / 抖音）。
> P1/P2/P3 视需求逐步补齐。

---

## 三、技术选型

### 3.1 跨端框架对比


| 维度         | **Taro 4.x**            | **uni-app x**   | **Mpx**   |
| ---------- | ----------------------- | --------------- | --------- |
| 主语法        | React / Vue3 / 原生 React | Vue3 / Vue2     | 增强版小程序原生  |
| 平台覆盖       | 全平台 + RN + 鸿蒙           | 全平台 + App (uts) | 全平台       |
| 生态         | 京东 + 社区，活跃              | DCloud 商业化，活跃   | 滴滴主导，稳健   |
| 性能         | 编译时 + 运行时混合             | 自研运行时，性能优       | 接近原生，性能最优 |
| 学习曲线       | 低（React 开发者）            | 低（Vue 开发者）      | 中         |
| TypeScript | 一流支持                    | 良好              | 良好        |


✅ **已确认方案：v1.0 锁定 Taro 4.x + React 18 + TypeScript 5**。

> Vue3 / uni-app 路线作为 v2.x 扩展项，CLI 预留 `--framework` 选项但暂不实现。

### 3.2 核心技术栈（默认）

- **框架**：Taro 4.x + React 18 + TypeScript 5
- **状态管理**：Zustand（轻量）/ Redux Toolkit（复杂场景可选）
- **请求层**：自研 `request` 封装（基于 `Taro.request`）+ 拦截器 + 重试 + 取消
- **UI 组件库**：NutUI-React-Taro / Taroify（按平台特性自动切换）
- **样式方案**：Sass + CSS Modules + 设计 Token；H5 端 `pxtransform` 自适配
- **路由**：Taro 内置路由 + 类型安全的 `navigateTo` 二次封装
- **国际化**：i18next + 按平台分包加载
- **构建**：Vite（H5）+ Webpack5（小程序，Taro 默认）
- **包管理**：pnpm + workspace（多模板 monorepo）

---

## 四、整体架构

```
┌──────────────────────────────────────────────────────────────┐
│                        CLI（create-applet）                    │
│   交互式选择：平台 / 框架 / 模板类型 / UI 库 / 状态管理 / 等等  │
└──────────────────────────────┬───────────────────────────────┘
                               │ 拉取/复制
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                       Templates（模板仓库）                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ basic    │  │ ecommerce│  │ content  │  │ admin    │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
└──────────────────────────────┬───────────────────────────────┘
                               │ 共享依赖
                               ▼
┌──────────────────────────────────────────────────────────────┐
│                    Shared Packages（@applet/*）                │
│  request │ auth │ tracker │ ui-kit │ utils │ hooks │ config    │
└──────────────────────────────────────────────────────────────┘
```

✅ **已确认**：仓库采用 **monorepo（pnpm workspace）** 组织：

- `packages/cli`：脚手架核心
- `packages/create-applet`：`npm init` 入口
- `templates/`*：各类模板
- `packages/*`：可复用业务能力包

---

## 五、CLI 设计

### 5.1 使用方式

```bash
# 交互式
npx create-applet@latest my-app

# 直接指定参数
npx create-applet@latest my-app \
  --template ecommerce \
  --framework react \
  --platforms weapp,h5,alipay \
  --ui nutui \
  --pm pnpm
```

### 5.2 交互流程（伪代码）

```ts
const answers = await prompt([
  { name: 'name',       type: 'input',    message: '项目名称？' },
  { name: 'template',   type: 'list',     choices: ['basic', 'ecommerce', 'content', 'admin'] },
  { name: 'framework',  type: 'list',     choices: ['react', 'vue3'] },
  { name: 'platforms',  type: 'checkbox', choices: PLATFORMS, default: ['weapp', 'h5'] },
  { name: 'ui',         type: 'list',     choices: ['nutui', 'taroify', 'none'] },
  { name: 'features',   type: 'checkbox', choices: ['i18n', 'tracker', 'sentry', 'mock', 'pwa'] },
  { name: 'pm',         type: 'list',     choices: ['pnpm', 'yarn', 'npm'] },
  { name: 'git',        type: 'confirm',  message: '初始化 git？' },
]);
```

### 5.3 模板渲染

- 使用 **EJS** 渲染条件块（`<% if (features.includes('i18n')) { %>...<% } %>`）。
- 使用 **plop** 风格的 generator 体系，便于二次扩展（如 `applet g page Home`）。
- `package.json`、`project.config.json`、`tsconfig.json` 按选项动态生成。

---

## 六、模板能力清单

每个模板默认内置以下能力（可按需裁剪）：

### 6.1 基础能力

- 多端构建脚本（`pnpm dev:weapp`、`pnpm build:h5` …）
- 环境变量管理（`.env.development` / `.env.production`，按平台合并）
- 类型安全的路由跳转
- 全局错误边界 + 统一异常上报
- 网络请求封装（拦截器、重试、取消、loading 联动）
- 登录态管理（token 自动续签、401 重登）
- 分包预下载策略
- 骨架屏 / 占位组件

### 6.2 业务能力（可选）

- 国际化（中/英/繁）
- 主题切换（明暗模式 + 多品牌色）
- 埋点 SDK（统一上报，PV/UV/自定义事件）
- 性能监控（首屏、白屏、长任务）
- 异常监控（Sentry / 自建）
- Mock 服务（本地 + 远程 yapi/apifox）
- 微前端 / 子应用（H5 端）
- PWA / 离线缓存（H5 端）

### 6.3 开箱即用页面

- 登录 / 授权
- 个人中心
- 列表 / 详情 / 表单
- 支付（统一封装微信/支付宝支付）
- WebView 容器
- 错误页 / 网络异常页

---

## 七、工程化与规范


| 类别        | 工具                                           |
| --------- | -------------------------------------------- |
| 类型检查      | TypeScript 5 + `tsc --noEmit` pre-push       |
| 代码风格      | ESLint（@typescript-eslint + react/vue 插件）    |
| 格式化       | Prettier + EditorConfig                      |
| Git Hooks | Husky + lint-staged                          |
| 提交规范      | Commitlint（Conventional Commits）+ commitizen |
| 版本管理      | Changesets（monorepo 友好）                      |
| 单元测试      | Vitest + @testing-library                    |
| E2E       | Playwright（H5）+ 平台官方 IDE 自动化（小程序）            |
| CI/CD     | GitHub Actions：lint → test → build → 多端预览码   |
| 发布        | 微信 miniprogram-ci / 支付宝 minidev / 自动上传       |


---

## 八、目录结构（规划）

```
applet/
├── packages/
│   ├── cli/                       # 脚手架核心实现
│   ├── create-applet/             # npm init 入口
│   ├── request/                   # 网络请求封装
│   ├── auth/                      # 登录/鉴权
│   ├── tracker/                   # 埋点
│   ├── ui-kit/                    # 自定义组件库
│   ├── utils/                     # 通用工具
│   └── config/                    # 共享 eslint/ts/prettier 配置
├── templates/
│   ├── basic-react/               # React 基础模板
│   ├── basic-vue/                 # Vue 基础模板
│   ├── ecommerce/                 # 电商模板
│   ├── content/                   # 内容/资讯模板
│   └── admin/                     # 后台/工具型模板
├── docs/                          # 文档站（VitePress）
├── examples/                      # 示例工程
├── .github/workflows/             # CI 配置
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

单个模板内部结构（以 `basic-react` 为例）：

```
basic-react/
├── src/
│   ├── app.config.ts              # Taro 全局配置（多端入口）
│   ├── app.tsx                    # 应用根
│   ├── pages/                     # 页面
│   ├── subpackages/               # 分包
│   ├── components/                # 业务组件
│   ├── services/                  # API 定义（按模块）
│   ├── stores/                    # Zustand stores
│   ├── hooks/
│   ├── utils/
│   ├── styles/                    # 全局样式 + 设计 Token
│   ├── locales/                   # i18n 文案
│   └── types/                     # 全局类型
├── config/                        # Taro 构建配置（按平台）
├── mock/
├── .env.development
├── .env.production
├── project.config.json            # 微信
├── project.alipay.json            # 支付宝
├── project.tt.json                # 抖音
└── package.json
```

---

## 九、里程碑与排期


| 阶段  | 目标                               | 预计周期  | 关键交付                               |
| --- | -------------------------------- | ----- | ---------------------------------- |
| M0  | 仓库初始化 & monorepo 骨架              | 0.5 周 | pnpm workspace、CI、文档站雏形            |
| M1  | CLI MVP + `basic-react` 模板       | 1.5 周 | `npx create-applet` 可用，支持 weapp/h5 |
| M2  | 工程化基线 + 共享包（request/auth）        | 1 周   | 封装完成，模板接入                          |
| M3  | UI 组件库接入 + 多端适配验证                | 1 周   | NutUI/Taroify 按平台切换，样式一致性测试        |
| M4  | 扩展平台：alipay + tt（v1.0 全部 P0 端到位） | 1 周   | 四端（weapp/h5/alipay/tt）冒烟通过         |
| M5  | 业务模板：ecommerce / content / admin | 2 周   | 三类业务模板完成                           |
| M6  | 监控/埋点/国际化等可选能力                   | 1 周   | 通过 CLI flag 一键启用                   |
| M7  | 文档站 + 视频教程 + v1.0 发布             | 1 周   | docs.applet.dev 上线，npm 正式版         |


> 总计约 **9 周** 可达成 v1.0（覆盖 weapp/h5/alipay/tt 四端）。

---

## 十、风险与待决策点

1. **跨端 API 差异**：部分原生 API（如 Bluetooth、NFC、文件系统）各端实现差异大，需要明确**有损兼容**还是**报错抛出**策略。
2. **包体积限制**：微信主包 2MB 限制严格，需要默认开启 Tree-shaking + 按需引入 + 分包策略。
3. **运行时 vs 编译时**：Taro 4 已转向 Vite，但部分平台插件仍依赖 Webpack，需要双轨期内做好兼容。
4. **UI 库一致性**：NutUI 在抖音/支付宝端可能有渲染差异，需评估是否需要二次封装"平台无关组件层"。
5. **是否支持 Vue3 + uni-app**：增加维护成本，建议 v1.x 先聚焦 React 路线，v2.0 再扩展。
6. **CLI 模板分发**：是 monorepo 内置（体积大）还是远程 degit 拉取（依赖网络）？倾向**远程拉取 + 本地缓存**。
7. **License 与商用**：MIT，但模板内引用的第三方（如 NutUI）需在文档中明确声明。

---

## 十一、参考资料

- [Taro 官方文档](https://taro-docs.jd.com/)
- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Mpx 官方文档](https://mpxjs.cn/)
- [微信小程序开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) — CLI 设计参考
- [create-t3-app](https://create.t3.gg/) — 交互式脚手架体验参考

---

## 协作

- 提案变更请提交 RFC PR 到 `docs/rfcs/`。
- 任何实现以本 README 的方案为准；调整需同步更新本文件。

> 当前状态：**📝 方案规划阶段（v0.2 草案，关键决策已锁定）**，欢迎讨论与补充。
>
> **已锁定决策**：
>
> 1. 主框架：Taro + React + TypeScript
> 2. v1.0 平台范围：微信 / H5 / 支付宝 / 抖音
> 3. 仓库组织：pnpm monorepo

