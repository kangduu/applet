# ADR-0002：仓库采用 pnpm monorepo

- **状态**：Accepted
- **日期**：2026-04-30
- **决策者**：项目发起人
- **关联 RFC**：—
- **取代 / 被取代**：—

## 背景与上下文

项目交付物包含三类工件：

1. CLI（`create-applet`、`@applet/cli`）
2. 多个模板（basic / ecommerce / content / admin）
3. 共享业务能力包（`@applet/request`、`@applet/auth`、`@applet/tracker` 等）

它们之间存在强依赖与版本协同要求。若拆为多个独立仓库，CI、版本对齐、本地联调都会变得复杂。

## 决策

**采用 monorepo + pnpm workspace** 组织全部代码：

- 顶层 `pnpm-workspace.yaml` 声明 `packages/*`、`templates/*`、`examples/*`
- 版本管理使用 **Changesets**，统一发布到 npm
- 共享配置通过 `@applet/config-*` 包内化

## 备选方案

| 方案                     | 优势                                    | 劣势                                    | 是否采用 |
| ------------------------ | --------------------------------------- | --------------------------------------- | -------- |
| pnpm monorepo + Changesets | 体积小、链接快、社区主流、生态成熟      | 一次性配置成本较高                      | ✅       |
| Yarn Workspaces + Lerna  | 历史成熟方案                            | Lerna 维护节奏放缓，pnpm 比 yarn 更快   | ❌       |
| Nx / Turborepo           | 任务编排与缓存能力强                    | 引入额外学习成本，初期收益不明显        | ❌（v1 不引入） |
| 多仓库（polyrepo）       | 各包独立                                | 联调、版本对齐成本高                    | ❌       |

## 后果

### 正面
- CLI 与模板可在本地直接联调（workspace 协议）
- 共享包升级一次发布，多模板自动同步
- Changesets 让多包版本与 CHANGELOG 自动化

### 负面 / 代价
- 顶层 CI 配置复杂度上升
- 新成员需要了解 pnpm workspace 的协议（`workspace:*`）

### 中性
- 后续可视需求引入 Turborepo 提升构建缓存能力（v2 候选）

## 影响范围

- 代码：根目录结构、`pnpm-workspace.yaml`、`tsconfig.base.json`
- 流程：CI（按变更包跑 lint / build / test）、发布（Changesets）
- 文档：README 第四章、第八章

## 关联

- 里程碑：M0（仓库初始化）
- README：第四章「整体架构」、第八章「目录结构」
