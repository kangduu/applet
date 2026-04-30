# Roadmap — 里程碑跟踪

> 来源：`README.md` 第九章「里程碑与排期」。本表为可执行的跟踪表，与 README 保持同步。
>
> 状态枚举：`Not Started` / `In Progress` / `Blocked` / `Done` / `Dropped`

## v1.0 总目标

> 交付一个可一键生成 **微信 / H5 / 支付宝 / 抖音** 四端工程的 CLI + 多业务模板，覆盖工程化基线与核心业务能力。

## 里程碑跟踪表

| ID  | 目标                                         | 预计周期 | 状态          | 负责人 | 起止时间 | 关键交付                                 | 备注                                                                                         |
| --- | -------------------------------------------- | -------- | ------------- | ------ | -------- | ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| M0  | 仓库初始化 & monorepo 骨架                   | 0.5 周   | `In Progress` | TBD    | TBD      | pnpm workspace、CI、文档站雏形           | 已完成 workspace、`@applet/config`、`@applet/types`、GitHub Actions CI；**文档站雏形未启动** |
| M1  | CLI MVP + `basic-react` 模板                 | 1.5 周   | `In Progress` | TBD    | TBD      | `npx create-applet` 可用，weapp/h5 跑通  | CLI MVP 已合入（`minimal` 模板）；**Taro `basic-react` 未完成**                              |
| M2  | 工程化基线 + 共享包（request / auth）        | 1 周     | `Not Started` | TBD    | TBD      | 封装完成，模板接入                       |                                                                                              |
| M3  | UI 组件库接入 + 多端适配验证                 | 1 周     | `Not Started` | TBD    | TBD      | NutUI/Taroify 按平台切换，样式一致性测试 |                                                                                              |
| M4  | 扩展平台：alipay + tt（v1.0 全部 P0 端到位） | 1 周     | `Not Started` | TBD    | TBD      | 四端（weapp / h5 / alipay / tt）冒烟通过 |                                                                                              |
| M5  | 业务模板：ecommerce / content / admin        | 2 周     | `Not Started` | TBD    | TBD      | 三类业务模板完成                         |                                                                                              |
| M6  | 监控 / 埋点 / 国际化等可选能力               | 1 周     | `Not Started` | TBD    | TBD      | 通过 CLI flag 一键启用                   |                                                                                              |
| M7  | 文档站 + 视频教程 + v1.0 发布                | 1 周     | `Not Started` | TBD    | TBD      | docs.applet.dev 上线，npm 正式版         |                                                                                              |

> 总计约 **9 周**。

## 跟踪规约

- 每周一对齐进度，更新 `状态` / `起止时间` / `备注` 三列。
- 状态变更需在 `备注` 中写明原因（被阻塞 → 阻塞点；延期 → 延期原因）。
- 任一里程碑 `Blocked` 超过 3 天，需要在 `risks.md` 登记。
- 完成（`Done`）的里程碑保留在表内，**不删除**，便于回顾。

## 后续路线（v1.0 之外）

| 版本 | 主题         | 大致内容            |
| ---- | ------------ | ------------------- |
| v1.1 | 扩展平台 P1  | 百度（swan）、QQ    |
| v1.2 | 扩展平台 P2  | 京东、钉钉、飞书    |
| v2.0 | 第二技术路线 | Vue3 / uni-app 模板 |
| v2.x | App 端       | RN / 鸿蒙输出       |
