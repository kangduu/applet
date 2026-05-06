---
name: pm-workflow
description: >-
  Maintain the applet project's PM workspace (pm/) — roadmap, risks, backlog, ADRs, RFCs, changelog, and business capability modules (`pm/modules.md`). Use when the user asks to add or update a milestone, risk, backlog item, decision (ADR), proposal (RFC), retrospective, modular capability plan, or anything under pm/, or when you finish significant work that needs to be reflected in pm/ artifacts.
---

# PM Workflow — applet 项目管理工件维护

本 skill 指导 agent 在 `pm/` 目录下正确创建与维护项目管理工件，确保**单一信息源**与协作约定不被破坏。

## 目录速查

| 路径              | 用途                      |
| ----------------- | ------------------------- |
| `pm/README.md`    | PM 空间总览与流程         |
| `pm/modules.md`   | 业务能力模块化运行清单    |
| `pm/roadmap.md`   | 里程碑 M0~M7 跟踪         |
| `pm/risks.md`     | 风险登记册 + 待决策点     |
| `pm/backlog.md`   | Now / Next / Later 需求池 |
| `pm/changelog.md` | 项目级变更日志            |
| `pm/decisions/`   | ADR（架构决策记录）       |
| `pm/rfcs/`        | RFC（变更提案）           |
| `pm/templates/`   | ADR / RFC / 复盘模板      |

> 只有当用户明确要求新增 `meetings/` 时才创建会议纪要目录。

## 核心规则

1. **不要新建模板外格式**。所有 ADR / RFC / 复盘必须基于 `pm/templates/` 中对应模板复制后填写。
2. **编号严格递增、不复用**。新增 ADR 或 RFC 前先读取对应索引（`decisions/README.md` / `rfcs/README.md`），取最大编号 +1。
3. **状态值必须使用枚举**：
   - RFC：`Draft` / `In Review` / `Accepted` / `Rejected` / `Superseded`
   - ADR：`Proposed` / `Accepted` / `Deprecated` / `Superseded`
   - 里程碑：`Not Started` / `In Progress` / `Blocked` / `Done` / `Dropped`
   - 风险：`Open` / `Mitigating` / `Closed` / `Accepted`
4. **不要删除已 `Accepted` / `Done` / `Closed` 的条目**。状态变更需保留历史，必要时改状态而非删行。
5. **跨工件联动必须同步更新**。例如 ADR 通过后，必须同时更新 `decisions/README.md` 索引、相关 `risks.md` 条目、`changelog.md`，必要时调整 `roadmap.md`。
6. **文件名使用英文 kebab-case，正文使用中文**。

## 工作流

### A. 新增 RFC

1. 读取 `pm/rfcs/README.md` 索引，确定新编号 `NNNN`。
2. 复制 `pm/templates/rfc.md` 到 `pm/rfcs/NNNN-kebab-case-title.md`。
3. 填写所有非空字段，初始状态设为 `Draft`。
4. 在 `pm/rfcs/README.md` 索引表追加一行。
5. 提示用户：评审通过后需要走「RFC → ADR」流程。

### B. RFC 评审通过 → 落地为 ADR

1. 把对应 RFC 的状态从 `In Review` 改为 `Accepted`。
2. 读取 `pm/decisions/README.md` 索引，确定新 ADR 编号 `MMMM`。
3. 复制 `pm/templates/adr.md` 到 `pm/decisions/MMMM-kebab-case-title.md`，初始状态 `Accepted`。
4. 在 ADR 顶部「关联 RFC」字段填入 RFC 链接；同时在 RFC 顶部回填 ADR 链接。
5. 在 `decisions/README.md` 索引追加新 ADR。
6. 在 `pm/changelog.md` 的 `[Unreleased]` → `Added` 段追加一条记录。
7. 若决策影响范围/进度，更新 `pm/roadmap.md`。
8. 若决策伴随新风险，登记到 `pm/risks.md`。

### C. 新增风险

1. 读取 `pm/risks.md` 现有 `R-xxx` 编号，新编号取最大值 +1。
2. 在「风险一览」表中追加一行；按需评估 Impact / Likelihood。
3. 初始状态 `Open`；若已识别责任人则改为 `Mitigating`。
4. 高影响（Impact = High）风险须在相关 ADR / 里程碑中链回。

### D. 更新里程碑状态

1. 编辑 `pm/roadmap.md` 中对应行的 `状态`、`起止时间`、`备注` 三列。
2. 状态变更必须在 `备注` 中写明原因。
3. `Blocked` 超过 3 天的，登记一条新风险。
4. 完成（`Done`）的里程碑保留在表内，**不删除**。

### E. 新增 backlog 条目

1. 判断时段：`Now` / `Next` / `Later`。
2. 估时使用 `S1` / `S2` / `S3` / `S4` 档位。
3. `S4` 条目应先建议用户开 RFC 拆分。

### F. 复盘记录

1. 复制 `pm/templates/retrospective.md` 到 `pm/meetings/YYYY-MM-DD-topic.md`（如目录不存在则创建）。
2. 「行动项」表中每条都需要负责人与截止日期。
3. 复盘产生的新决策仍走 ADR 流程。

## 编辑 README 的边界

- `pm/` 工件**不要**直接修改根 `README.md`，除非用户明确要求。
- 若决策涉及 README 章节（如平台范围、技术栈），在 ADR 的「影响范围」中列出待同步章节，并提示用户。

## 不要做

- ❌ 不要绕过模板自创 markdown 结构。
- ❌ 不要重新编号已有 ADR / RFC。
- ❌ 不要删除"被取代"的 ADR / RFC，应改状态为 `Superseded` 并双向链接。
- ❌ 不要把 PM 工件放到 `pm/` 之外的地方（旧 README 中提到的 `docs/rfcs/` 已废弃，统一为 `pm/rfcs/`）。
- ❌ 不要在没有读取索引文件的情况下臆造编号。

## 完成后的自检

每次维护操作收尾前，按下面 checklist 确认：

- [ ] 编号取自最新索引，未与现有冲突
- [ ] 状态值在枚举范围内
- [ ] 索引文件已同步追加
- [ ] 跨工件联动已完成（ADR ↔ RFC ↔ risks ↔ roadmap ↔ changelog）
- [ ] `changelog.md` 的 `[Unreleased]` 段已记录
- [ ] 文件名 kebab-case，正文中文
