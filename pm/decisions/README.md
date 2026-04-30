# ADR 索引（Architecture Decision Records）

> ADR 用于记录**已经做出的、对架构有显著影响**的决策。一个 ADR 一个文件，编号递增不复用。

## 索引

| 编号    | 标题                                  | 状态       | 日期       |
| ------- | ------------------------------------- | ---------- | ---------- |
| 0001    | [技术栈：Taro + React + TypeScript](./0001-tech-stack-taro-react.md) | Accepted   | 2026-04-30 |
| 0002    | [仓库组织：pnpm monorepo](./0002-monorepo-pnpm-workspace.md)         | Accepted   | 2026-04-30 |
| 0003    | [v1.0 平台范围：weapp / h5 / alipay / tt](./0003-v1-platforms-scope.md) | Accepted | 2026-04-30 |

## 新增 ADR 流程

1. 复制 `pm/templates/adr.md` 到 `pm/decisions/NNNN-kebab-case-title.md`，`NNNN` 取索引中最大编号 +1。
2. 填写内容，初始状态 `Proposed`。
3. 评审通过后改为 `Accepted`，并把条目追加到上方索引表。
4. 若被新决策取代，旧 ADR 状态改为 `Superseded` 并在文件顶部链接到新 ADR；不要删除旧文件。

## 状态语义

- **Proposed**：已起草，等待评审
- **Accepted**：已通过，正在执行或已落地
- **Deprecated**：不再推荐，但未被新方案取代
- **Superseded**：已被新 ADR 取代，需在文件中链接到新 ADR
