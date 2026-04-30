# Risks — 风险登记册

> 来源：`README.md` 第十章「风险与待决策点」。本登记册用于跟踪每一项风险的处置过程。
>
> - **影响（Impact）**：High / Medium / Low
> - **概率（Likelihood）**：High / Medium / Low
> - **状态**：`Open` / `Mitigating` / `Closed` / `Accepted`

## 风险一览

| ID    | 风险描述                                                 | 影响   | 概率   | 状态        | 责任人 | 缓解措施                                                  | 关联 |
| ----- | -------------------------------------------------------- | ------ | ------ | ----------- | ------ | --------------------------------------------------------- | ---- |
| R-001 | 跨端原生 API 差异（Bluetooth / NFC / 文件系统等）          | High   | High   | `Open`     | TBD    | 制定「有损兼容」白名单 + 不支持时显式抛错；写入 ADR     |      |
| R-002 | 微信主包 2MB 限制                                        | High   | Medium | `Open`     | TBD    | 默认 Tree-shaking + 按需引入 + 分包；CI 阶段卡包体积阈值 |      |
| R-003 | Vite / Webpack 双轨期插件兼容                            | Medium | Medium | `Open`     | TBD    | 锁定 Taro 4.x 最小可用版本；为不兼容平台保留 webpack 配置 |      |
| R-004 | UI 组件库（NutUI / Taroify）跨端渲染差异                | Medium | High   | `Open`     | TBD    | 评估「平台无关组件层」必要性；建立视觉回归基线           |      |
| R-005 | Vue3 / uni-app 路线维护成本                              | Medium | Low    | `Accepted` | —      | v1.x 仅做 Taro+React，v2.0 再开第二轨                    | ADR-0001 |
| R-006 | CLI 模板分发：内置（体积大）vs 远程拉取（依赖网络）      | Low    | Medium | `Open`     | TBD    | 倾向远程 degit + 本地缓存；M1 决策                       |      |
| R-007 | 第三方依赖授权与商用                                     | Low    | Low    | `Open`     | TBD    | MIT 主协议 + 文档明确声明上游协议                         |      |

## 处置流程

1. **新风险**：任何成员发现后追加一行，初始状态 `Open`。
2. **认领**：明确责任人，状态进入 `Mitigating`，缓解措施落地为具体任务（关联到 `roadmap.md` 或 RFC）。
3. **关闭**：缓解到位后改为 `Closed`，在备注中记录关闭依据；若决定接受不再处置则改为 `Accepted`。
4. **联动**：高影响风险（Impact = High）应同步在相应 ADR / RFC 中链回。

## 待决策点（Decision Backlog）

> 这些事项尚未形成 ADR，需要在对应里程碑前给出结论。

- [ ] **D-001**：CLI 模板分发方式（内置 vs 远程 degit）— 截止 M1
- [ ] **D-002**：是否引入「平台无关组件层」封装 UI 库差异 — 截止 M3
- [ ] **D-003**：API 类型生成方案（OpenAPI → TS 的工具链）— 截止 M2
- [ ] **D-004**：监控/埋点 SDK 选型（Sentry / 自建 / 混合）— 截止 M6
