# PM — 项目管理空间

> 本目录是 **applet** 多端小程序模板项目的项目管理（Project Management）工件中心。
>
> 所有非代码的"决策、计划、风险、提案、复盘"统一沉淀于此，作为团队协作的单一信息源（Single Source of Truth）。

## 目录结构

| 路径           | 用途                                        |
| -------------- | ------------------------------------------- |
| `roadmap.md`   | 里程碑（M0~M7）跟踪表，含状态、负责人、备注 |
| `risks.md`     | 风险登记册（影响 / 概率 / 缓解措施 / 状态） |
| `backlog.md`   | 需求池与待办（Now / Next / Later）          |
| `changelog.md` | 项目级变更日志（与代码 CHANGELOG 区分）     |
| `decisions/`   | ADR（架构决策记录）— 一次决策一文件         |
| `rfcs/`        | RFC（变更提案）— 提案先行，落地后归档       |
| `meetings/`    | 会议纪要（可选，按 `YYYY-MM-DD-topic.md`）  |
| `templates/`   | ADR / RFC / 复盘模板                        |

## 工作流概览

```
┌─────────┐  讨论后  ┌────────┐  实施完成  ┌──────────┐
│  RFC    │ ───────►│  ADR   │ ─────────► │ roadmap  │
│ (提案)  │  评审   │ (决策) │  归档     │ (里程碑) │
└─────────┘          └────────┘            └──────────┘
                          │
                          ▼
                     ┌──────────┐
                     │  risks   │   决策伴随的风险登记
                     └──────────┘
```

1. **新提案** → 在 `rfcs/` 新建 `NNNN-title.md`（基于 `templates/rfc.md`），状态 `Draft`。
2. **评审通过** → 在 `decisions/` 新建对应 ADR（基于 `templates/adr.md`），状态 `Accepted`，并在 RFC 中链接到该 ADR，RFC 状态改为 `Accepted`。
3. **进入排期** → 更新 `roadmap.md` 的对应里程碑或新增条目。
4. **识别风险** → 同步登记到 `risks.md`，并在 ADR 中链回。
5. **落地完成** → 更新 `changelog.md`，必要时在 `meetings/` 写复盘。

## 命名约定

- ADR：`decisions/NNNN-kebab-case-title.md`，编号四位数字递增（`0001`、`0002`…）
- RFC：`rfcs/NNNN-kebab-case-title.md`，编号独立递增
- 会议：`meetings/YYYY-MM-DD-topic.md`
- 标题与正文一律使用中文；标识符（编号、文件名）使用英文 kebab-case

## 状态枚举

| 工件   | 可选状态                                                       |
| ------ | -------------------------------------------------------------- |
| RFC    | `Draft` / `In Review` / `Accepted` / `Rejected` / `Superseded` |
| ADR    | `Proposed` / `Accepted` / `Deprecated` / `Superseded`          |
| 里程碑 | `Not Started` / `In Progress` / `Blocked` / `Done` / `Dropped` |
| 风险   | `Open` / `Mitigating` / `Closed` / `Accepted`                  |

## 谁来维护

- 任何成员都可以**新建** RFC / 风险条目。
- ADR 由提案的评审通过后由提案人或 Tech Lead 写入。
- `roadmap.md` 由项目维护者每周对齐一次。
- AI Agent 在协助变更时应遵循 `.cursor/skills/pm-workflow/SKILL.md` 的指引。
