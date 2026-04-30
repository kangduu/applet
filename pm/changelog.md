# Changelog — 项目级变更日志

> 这里记录的是**项目管理层面**的重大事件（决策、范围调整、里程碑达成、风险关闭等），与代码层面的 `CHANGELOG.md` 区分。
>
> 格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)，时间倒序。

## [Unreleased]

### Added

- pnpm workspace monorepo 骨架（`pnpm-workspace.yaml`、`packages/*`、`templates/*`）。
- `@applet/config`：共享 ESLint（flat）/ Prettier / Commitlint 配置。
- `@applet/types`：占位 TypeScript 包，用于接通 `typecheck` / `build`。
- GitHub Actions CI：并行执行 `lint`、`format:check`、`typecheck`、`build`。
- Husky + `lint-staged`：`pre-commit` / `commit-msg`（commitlint）钩子。
- 初始化 `pm/` 项目管理空间（README、roadmap、risks、backlog、ADR/RFC 模板）。
- 写入项目级 skill `.cursor/skills/pm-workflow/`，规范 PM 工件维护流程。
- ADR-0001：技术栈锁定 Taro + React + TypeScript。
- ADR-0002：仓库采用 pnpm monorepo 组织。
- ADR-0003：v1.0 平台范围确定为 weapp / h5 / alipay / tt。
- `create-applet` CLI MVP：交互式 prompts（@inquirer/prompts）、EJS 渲染、`minimal` 模板落盘；支持 `-y` / `--platforms` / `--pm` / `--no-git`。

### Changed

- `pm/backlog.md`：`create-applet` CLI MVP 自 **Next** 移除；**Now** 指引切至 `basic-react` 模板。
- `pm/backlog.md`：M0 周期三项 P0 自 **Now** 移除并已记入此处。

## [2026-04-30] v0.2 草案

### Changed

- README 中将 v1.0 P0 平台从 2 端扩为 4 端（新增 alipay、tt）。
- 锁定主框架为 Taro + React + TypeScript（Vue / uni-app 推迟到 v2.x）。

### Added

- README 初稿（v0.1 → v0.2），覆盖目标、平台、选型、CLI、模板能力、工程化、目录结构、里程碑、风险等十一章。
