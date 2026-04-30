# Backlog — 需求池 / 待办

> 采用 **Now / Next / Later** 三段式管理。复杂条目应升级为 RFC 后再排期。
>
> 字段说明：`P0~P3` 为优先级；`Sx` 为预估工作量（S1=1d, S2=2~3d, S3=1w, S4=>1w）。

## Now（本周聚焦）

> `create-applet` CLI MVP 已完成；建议将 **Next** 首条 `basic-react` 模板提升为本周期焦点。

## Next（下一阶段）

| 优先级 | 描述                                | 估时 | 关联 | 状态      |
| ------ | ----------------------------------- | ---- | ---- | --------- |
| P0     | `basic-react` 模板：weapp / h5 跑通 | S3   | M1   | `Pending` |
| P0     | `@applet/request` 包                | S2   | M2   | `Pending` |
| P0     | `@applet/auth` 包                   | S2   | M2   | `Pending` |

## Later（远期）

| 优先级 | 描述                  | 估时 | 关联 | 状态      |
| ------ | --------------------- | ---- | ---- | --------- |
| P1     | UI 组件库选型与封装层 | S3   | M3   | `Pending` |
| P1     | 支付宝 / 抖音端冒烟   | S3   | M4   | `Pending` |
| P1     | 业务模板：ecommerce   | S4   | M5   | `Pending` |
| P1     | 业务模板：content     | S3   | M5   | `Pending` |
| P1     | 业务模板：admin       | S3   | M5   | `Pending` |
| P2     | 国际化 / 主题切换     | S2   | M6   | `Pending` |
| P2     | 埋点 / 监控接入       | S3   | M6   | `Pending` |
| P2     | 文档站（VitePress）   | S3   | M7   | `Pending` |

## 流转约定

- 完成的条目从表中移除，归档到 `changelog.md`。
- `Blocked` 条目须在备注列写明阻塞点，超过 3 天升级为 `risks.md` 登记。
- 估时为 S4 的条目应先开 RFC 拆分，避免大块未结构化工作。
