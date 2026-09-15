/**
 * Central Data Source for Self-Website (Resume & Portfolio)
 * Fully localized for both Chinese ('zh') and English ('en').
 * Features detailed architecture dataflows, component breakdowns, and production screenshots.
 */

window.RESUME_DATA = {
  zh: {
    nav: {
      about: "关于我",
      experience: "工作与教育",
      skills: "专业技能",
      projects: "核心项目",
      research: "科研成果",
      resume: "完整简历",
      contact: "联系方式"
    },
    hero: {
      badge: "寻求 2025/2026 全职工作机会",
      title: "李凯 (Kai Li)",
      subtitle: "大模型基础设施 / LLM Agent 架构 / 后端全栈 / 量化金融工程",
      description: "北京科技大学硕博连读背景，前腾讯多模态大模型组实习生。专注于高可用大模型 API 网关治理、AI 智能体架构、复杂事件知识图谱重构及多资产量化投资策略系统研发。具备扎实的高性能服务端设计、学术科研与工业级全栈落地能力。",
      location: "北京市海淀区 / 北京科技大学",
      email: "m13121032012@163.com",
      phone: "+86 13121032013",
      github: "https://github.com",
      downloadPdf: "打印 / 导出 PDF 简历",
      viewProjects: "浏览深度项目"
    },
    stats: [
      { number: "5+", label: "工业/系统级全栈项目" },
      { number: "2篇", label: "顶会顶刊学术论文 (ACM MM / PRL)" },
      { number: "3项", label: "国家发明专利授权/申请" },
      { number: "94%+", label: "大模型网关多平台兼容率" },
      { number: "84%", label: "知识图谱超级簇规模瘦身" }
    ],
    about: {
      title: "关于我",
      subtitle: "背景简介与职业追求",
      p1: "你好，我是李凯。我毕业于北京科技大学，经历了扎实的硕博学术训练（保研后攻读博士，期间博转硕以更好投身工业研发）。在校期间在计算机视觉与多模态表征学习领域发表了 ACM MM 2022、Pattern Recognition Letters 2023 等高水平论文，并持有 3 项国家发明专利。",
      p2: "在腾讯多模态团队实习期间，我主导了复杂指令（Complex Instruction）数据流水线建设与数据策略优化，通过 LLM-as-a-Judge 与聚类分析显著提升了大模型数据收益与 Recall 指标约 50%。",
      p3: "在工程系统领域，我深度自研了 5 个高技术密度的全栈项目，涵盖 LLM API 协议逆向网关（AllProxy）、高可用服务治理自愈平台（Provider Manager）、大规模地缘时空知识图谱（Event Timeline Engine）、多资产量化投资决策系统（FVTracker）与金融数据中台（fund_info_fetch）。我热衷于在复杂业务边界中探寻最优雅、鲁棒、可扩展的架构解答。"
    },
    skills: {
      title: "专业技能矩阵",
      subtitle: "从底层算法、分布式网络到全栈产品工程的综合技能储备",
      categories: [
        {
          name: "核心编程语言",
          skills: [
            { name: "Python", level: "精通 (NumPy, Pandas, SciPy, Flask, PyInstaller)" },
            { name: "TypeScript / JavaScript", level: "精通 (Node.js 20+, Express, ES6 Modules)" },
            { name: "SQL", level: "精通 (PostgreSQL, SQLite WAL, 窗口函数, 复杂查询优化)" },
            { name: "C / C++", level: "熟练 (数据结构与算法底层、跨平台扩展)" }
          ]
        },
        {
          name: "大模型工程与智能体 (LLM & Agent)",
          skills: [
            { name: "LLM 协议网关与逆向", level: "WASM 解密、Connect RPC 解码、SSE True Streaming、Tool Calling 流式拦截" },
            { name: "Prompt & 数据工程", level: "Prompt Engineering、LLM-as-a-Judge 评估闭环、HDBSCAN 分布挖掘" },
            { name: "大模型服务治理", level: "200 OK 伪健康语义拦截、自适应双向核心路由、Abort 级联取消" },
            { name: "思维链与 Agent 交互", level: "Reasoning Content 解耦、OpenClaw/Cline/Cursor 协议无缝中继" }
          ]
        },
        {
          name: "后端架构与分布式数据",
          skills: [
            { name: "知识图谱与图计算", level: "Summary-First 拓扑微社区、多对多桥接、时序边动态推导、CAMEO 动作规范" },
            { name: "数据库架构与优化", level: "SQLite WAL 模式高并发锁治理、双表事件驱动存储、多级 Lazy 缓存" },
            { name: "异步任务与微服务", level: "生产者-消费者双队列、断点恢复流水线、自动化守护进程" },
            { name: "容灾与网络鲁棒性", level: "Double-Track HA Fallback 双轨回退、多源优先竞争、故障转移" }
          ]
        },
        {
          name: "量化投研与前端工程",
          skills: [
            { name: "量化投资组合理论", level: "HRP (分层风险平价)、MVO (Ledoit-Wolf 收缩)、ERC (等权风险贡献)" },
            { name: "回测与风控引擎", level: "防前瞻偏差 (T+1 生效)、1% 调仓死区、14 技术因子买卖冲突状态机" },
            { name: "金融特征量化分析", level: "HHI 赫芬达尔集中度、Shannon Entropy 信息熵、持仓重叠度比对" },
            { name: "现代前端与可视化", level: "Next.js 16 (App Router), React 19, Tailwind CSS, ECharts 5, Glassmorphism" }
          ]
        }
      ]
    },
    experience: {
      title: "工作与实习经历",
      subtitle: "一线大厂核心业务线技术沉淀",
      items: [
        {
          company: "腾讯 (Tencent)",
          department: "多模态一组",
          role: "大模型数据与算法研发实习生",
          period: "2024.09 — 2025.02",
          location: "中国 · 北京",
          achievements: [
            "参与复杂指令 (Complex Instruction) 数据生产流水线建设，基于 GPT 类模型与 Prompt 模板系统设计图生文场景下的数据生成方案，累计产出数十万级高纯度训练样本；",
            "设计并实现 Question / Answer 解耦式生成流程，构建 Answer 自动校验与 Question 质量评估机制，结合人工抽检与 LLM-as-a-Judge 形成完整数据清洗与评价闭环；",
            "负责复杂指令数据分析与聚类研究，采用 HDBSCAN 对大规模样本进行分布挖掘与类别归因分析，高效辅助发现数据覆盖盲区与长尾分布问题；",
            "支持低俗图片大模型业务的数据策略优化，通过高潜样本筛选、数据重组与效果分层评估，使核心业务模型的 Recall 指标显著提升约 50%；",
            "深入推进 Prompt Engineering 优化实践，针对逻辑推理、复杂语义理解等场景持续迭代生成范式，提升模型训练综合收益。"
          ]
        }
      ]
    },
    education: {
      title: "教育背景",
      subtitle: "名校硕博连读科研与工程学术沉淀",
      items: [
        {
          school: "北京科技大学 (USTB)",
          degree: "硕士研究生 (硕博连读转硕)",
          major: "计算机科学与技术 / 人工智能",
          period: "2020.09 — 2026.06 (硕博连读) | 2026.09 — 至今 (博转硕)",
          description: "师从知名学者，主攻计算机视觉、特征解耦与多模态大模型方向。在校期间发表顶刊顶会论文两篇，申请/授权 3 项国家发明专利，毕业论文题目为《基于特征解耦与引导重构的遮挡人脸识别方法研究》。"
        },
        {
          school: "北京科技大学 (USTB)",
          degree: "工学硕士 (保研阶段)",
          major: "计算机科学与技术",
          period: "2019.09 — 2020.06",
          description: "以优异成绩获得直升保研资格，开启深度学习与人脸识别表征学习课题攻关。"
        },
        {
          school: "北京科技大学 (USTB)",
          degree: "工学学士",
          major: "计算机科学与技术",
          period: "2015.09 — 2019.06",
          description: "系统修读计算机体系结构、操作系统、数据结构与算法、编译原理等核心课程，奠定扎实工程底座。"
        }
      ]
    },
    research: {
      title: "科研成果与发明专利",
      subtitle: "顶会顶刊学术代表作与核心知识产权",
      papersTitle: "学术论文 (Publications)",
      papers: [
        {
          title: "Hypersphere guided embedding for masked face recognition",
          authors: "Kai Li (李凯), et al.",
          venue: "Pattern Recognition Letters (PRL), Vol. 174, pp. 46-51, 2023",
          type: "SCI 检索期刊",
          highlights: "针对遮挡人脸特征退化痛点，提出超球面流形引导嵌入机制，显著提升大角度遮挡下的特征区分度与鲁棒性。"
        },
        {
          title: "SD-GAN: semantic decomposition for face image synthesis with discrete attribute",
          authors: "Kangneng Zhou, Xiaobin Zhu, Daiheng Gao, Kai Lee (李凯), Xinjie Li, Xu-Cheng Yin",
          venue: "Proceedings of the 30th ACM International Conference on Multimedia (ACM MM), 2022",
          type: "CCF-A 类顶级国际会议",
          highlights: "提出基于语义解耦的离散属性人脸图像生成框架，解决多属性耦合生成时的身份特征漂移缺陷。"
        },
        {
          title: "基于特征解耦与引导重构的遮挡人脸识别方法研究",
          authors: "李凯",
          venue: "北京科技大学研究生学位论文",
          type: "学位论文",
          highlights: "系统总结了复杂空间流形约束、多尺度自适应注意力与特征解耦在视觉生物特征识别中的理论体系。"
        }
      ],
      patentsTitle: "国家发明专利 (Patents)",
      patents: [
        {
          name: "《一种基于Transformer的人脸检测方法及装置》",
          owner: "李凯 等",
          desc: "基于自注意力全局建模与多尺度特征金字塔交互的高精度人脸定位发明专利。"
        },
        {
          name: "《一种基于局部注意力机制的人脸活体检测方法及装置》",
          owner: "李凯 等",
          desc: "针对高精翻拍与硅胶面具攻击，利用局部细粒度纹理感知与活体鉴伪的核心防伪算法专利。"
        },
        {
          name: "《一种人脸检测与识别方法、系统以及终端设备》",
          owner: "李凯 等",
          desc: "涵盖低延迟边缘端推断、多源流式视频帧去冗余与端到端特征匹配的完整系统级专利。"
        }
      ]
    },
    projects: {
      title: "核心工业与系统级项目",
      subtitle: "深度主导的 5 大系统架构实践（点击卡片查阅详细架构与工程攻坚）",
      filterAll: "全部项目",
      filterLlm: "大模型与网关",
      filterKg: "知识图谱",
      filterQuant: "量化金融与数据",
      viewDetailBtn: "查看深度技术复盘",
      archOverviewBtn: "系统架构图解",
      list: [
        {
          id: "eventTimeLine",
          category: "kg",
          title: "全球地缘事件时空知识图谱系统",
          tagline: "Summary-First 拓扑微社区双层图与三阶段大模型抽取引擎",
          badge: "架构重大重构",
          techs: ["Node.js 22", "PostgreSQL 16", "Express 5", "CAMEO 体系", "LLM API", "异步任务队列"],
          metrics: [
            { value: "84%", label: "超级节点规模缩减" },
            { value: "3~4个", label: "平均微社区事件数" },
            { value: "75%+", label: "图谱物理连边精简" },
            { value: "0.81", label: "关系平均置信度 (原0.68)" }
          ],
          summary: "面向海量多源公开情报（OSINT）与实时新闻流的近实时事件抽取、实体标准化归一与时空图谱分析平台。主导系统从早期失控的 6 层模型向 Summary-First 双层原子图谱的重大架构重构，彻底消除 1.4 万节点超级垃圾桶与 O(N²) 两两配对计算爆炸问题。",
          architecture: {
            summary: "从旧版【强行物理合并引发滚雪球】彻底重构为【微观事实保真 + 宏观摘要建群】的双层架构。微观层严格保持原子事实独立，宏观层按自然周分桶与多对多桥接，彻底解开全库两两平方级计算死结。",
            flowSteps: [
              { stage: "Step 1: 多源情报接入", detail: "多源海量新闻流实时并发抓取 (Jin10, GDELT, RSS)，轻量入队异步解耦" },
              { stage: "Step 2: 三阶段 LLM NER", detail: "Stage 1 事实解耦 -> Stage 2a 实体对齐 & 2b CAMEO 动作标准化 -> Stage 3 权威库覆盖" },
              { stage: "Step 3: 微观事实层", detail: "proto_events 原子落库，保持客观事实 100% 高保真，永远不被粗暴合并" },
              { stage: "Step 4: 拓扑微社区分流", detail: "ISO-Week 自然周强制封箱 + 0.7 实体重叠硬门槛分流入 relationship_summaries" },
              { stage: "Step 5: 多对多桥接机制", detail: "跨界事件挂载为 Bridge Event，摘要微社区规模收敛至 3~4 个事件" },
              { stage: "Step 6: 纯净因果构边", detail: "仅在微社区内部闭环计算因果；时序边物理免存，查询层根据时间戳动态推导" }
            ],
            highlights: [
              "算力物理隔离舱：将 20,000 个全库事件分流入微社区，亿次配对计算直接降维为微秒级局部构边",
              "中英双轨自适应分词：最长短语贪婪匹配攻克中文无词界分词痛点，实体抽取完整率 90%+",
              "父子层级树维护：微观保留具体执行部门，宏观大图向上递归聚合至国家与经济体博弈"
            ]
          },
          deepDive: {
            problem: "旧版 6 层架构试图将同类新闻物理强行合并 (Merge)。在国际语境下高频实体集中（如美、中、声明），通过'六度分隔'链式反应滚雪球滚出包含 14,577 个成员、20 万条边的巨型超级节点，导致两两配对比对高达 1.06 亿次复杂计算，CPU 100% 满载锁死；且占库 76% 的全为低质时序边。",
            solution: "推翻物理合并，提出【Summary-First 双层原子图架构】：① 微观事实层保持原子独立（proto_events），细节 100% 真实可溯源；② 宏观微社区层（relationship_summaries）引入周度时间分桶 (ISO-Week) 与 0.7 实体重叠硬门槛；③ 采用多对多桥接模式连接跨界事件；④ 时序边物理免存，查询层基于时间戳动态推导；⑤ 构边仅在各自微社区内闭环。",
            pipeline: "设计中英文双轨自适应 NER（最长短语贪婪匹配攻克中文无词界难题）与三阶段大模型流水线：Stage 1 原子事实深度拆解 -> Stage 2 并发实体与 CAMEO 动作归一化 -> Stage 3 数据库权威优先覆盖与内存缓存，削减 90%+ 冗余 API 开销。",
            future: "在稳固双层图基础上规划大模型驱动的叙事层（Stories）长周期母题穿针引线，以及结合地缘规则库的推演层（Hypotheses）前瞻假设自动验证闭环。"
          }
        },
        {
          id: "allproxy",
          category: "llm",
          title: "AllProxy: 多平台 AI Web 认证转标准 API 代理网关",
          tagline: "9+ 平台免 Token 协议逆向、WASM PoW 算力解算与会话链中继网关",
          badge: "协议逆向与网关",
          techs: ["Node.js 20+", "TypeScript 5.9", "Express", "Playwright (CDP)", "better-sqlite3", "WASM", "Web Streams"],
          metrics: [
            { value: "94%", label: "全平台回归通过率 (31/33)" },
            { value: "<500ms", label: "首包延迟 (原15~30s)" },
            { value: "70%+", label: "多轮上行 Context 削减" },
            { value: "100%", label: "工具调用与思维链分离" }
          ],
          summary: "面向 OpenClaw、Cline、Cursor 等智能体客户端的统一模型接入网关。将 DeepSeek、Kimi、通义千问、豆包、Grok、GLM、Claude、ChatGPT 等 9+ 平台的网页端凭据与私有协议无缝逆向并转换为行业标准 OpenAI (/v1/chat/completions) 与 Anthropic (/v1/messages) 协议，实现免高昂 Token 成本的高并发调用。",
          architecture: {
            summary: "双轨通信网关架构：对逆向防护严格的平台采用原生 Node.js 内嵌 WASM 极速求解 PoW 挑战；对强反爬平台采用 Playwright 自动化容器监听 CDP 端口；构建统一流式状态机 (Tag Buffer)，实现 Tool Calling 与 Thinking 思维链颗粒归仓。",
            flowSteps: [
              { stage: "Step 1: 客户端请求接收", detail: "接收 Agent 客户端发起的标准 OpenAI (/v1/chat/completions) 或 Anthropic (/v1/messages) 请求" },
              { stage: "Step 2: 会话语义指纹计算", detail: "解析核心文本生成 SHA-256 Content Hash，匹配 SQLite 复合主键表 (context_hash, provider_id)" },
              { stage: "Step 3: 有状态增量裁剪", detail: "命中已有会话时自动将请求裁剪为仅包含最后一条消息并注入 parent_id，削减 70%+ 上行传输" },
              { stage: "Step 4: 异构协议逆向调度", detail: "DeepSeek 本地 WASM 动态解密 PoW；Kimi 二进制 Buffer Reader 解码 Connect RPC；CDP 自动化兜底" },
              { stage: "Step 5: 统一 Tag Buffer 状态机", detail: "实时流式拦截 XML 标签与 Special Token，无损封装为 OpenAI 标准 tool_calls 与 reasoning_content" },
              { stage: "Step 6: True Streaming 响应", detail: "0ms 下发 : proxy-connected 保活心跳帧，管道化增量泵送底层 ReadableStream" }
            ],
            highlights: [
              "WASM 本地极速求解：逆向 DeepSeekHashV1 工作量证明算法，毫秒级解算挑战参数，绕过 403 阻断",
              "二进制 RPC 解码器：自主实现轻量级二进制 Buffer Reader，精准捕获 Kimi 官方 chat_id 与 parent_id 两级指针",
              "首包保活防超时：彻底拔除等待完整回答的伪流，首包延迟从 15~30s 骤降至 500ms 以内"
            ]
          },
          deepDive: {
            problem: "主流 AI 平台 Web 端防御严密：DeepSeek 强制校验 DeepSeekHashV1 PoW (工作量证明) 算力载荷，否则 403 阻断；Kimi 全面改用基于二进制帧封包的 Connect RPC 协议；网页端模型无原生 Tool Calling API；且无状态 API 客户端每次发送全量历史导致网页端会话拼接严重冲突。",
            solution: "① 本地内嵌 WASM 模块极速求解 DeepSeek PoW 算力挑战，原生打通 Node 直连 HTTP 流；② 自主实现轻量级二进制 Buffer Reader，按帧解构 Kimi 流式字节流并提取两级指针 (chat_id 与 parent_id)；③ 基于请求文本纯语义生成 SHA-256 Content Hash 并持久化至 SQLite 复合主键表，实现【有状态增量发送】，多轮对话仅发送末条消息；④ 拔除伪流等待，全链路打通 True Streaming 增量泵送，预发 : proxy-connected 心跳帧。",
            toolCalling: "构建 Tag Buffer 流式状态机，支持 XML 标签、Token 边界符与 Markdown 语法拓扑动态维护，实时拦截模型输出并包装为标准 tool_calls；并将 <think> 推理内容精准剥离至 reasoning_content 独立通道下发。"
          }
        },
        {
          id: "provider_manager",
          category: "llm",
          title: "Provider Manager: 高可用 LLM API 智能路由网关与自愈系统",
          tagline: "企业级多服务商治理、200 OK 伪成功漏洞审计与同模型自愈 Fallback",
          badge: "高可用服务治理",
          techs: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "better-sqlite3 (WAL)", "Web Streams", "AbortController"],
          metrics: [
            { value: "99.9%", label: "业务自愈成功率" },
            { value: "100%", label: "同模型 Fallback 命中率" },
            { value: "0%", label: "高并发写锁冲突率 (原15%)" },
            { value: "0ms", label: "客户端 Abort 释放延迟" }
          ],
          summary: "面向企业与专业开发者的多渠道大模型 API 智能分发与健康自愈中枢。彻底攻坚第三方中转商'欠费受限仍返回 HTTP 200 假死'、模型版本后缀分裂导致跨模型误降级、以及长文本超时卡死等核心痛点，构建具备三阶视觉健康看板的高可用网关。",
          architecture: {
            summary: "全闭环智能路由自愈网关：自适应双向核心模型包含匹配，统一 Validator 多协议语义审计引擎，流式首包保护与客户端 Abort 级联切断，开机全量并发测活 Hook。",
            flowSteps: [
              { stage: "Step 1: 请求路由分发", detail: "客户端请求进入 /api/llm/chat，router.ts 提取核心模型名 (dmCore 与 rmCore)" },
              { stage: "Step 2: 同模型最高优先级分发", detail: "双向包含匹配 (dmCore.includes(rmCore))，同模型备选池绝对优先，动态重写目标模型名" },
              { stage: "Step 3: 请求伪装与分发", detail: "注入 Claude Code CLI / Codex CLI 特征 Headers，模拟官方终端发起下游调用" },
              { stage: "Step 4: 统一 Validator 审计", detail: "递归提取响应正文，扫描多语言欠费/额度耗尽/CLI限制黑名单，200 OK 假死瞬间抛出业务异常" },
              { stage: "Step 5: 自动熔断与 Fallback", detail: "触发 reportTest(success: false) 写入 WAL 数据库，自动透明重试候选队列下一健康节点" },
              { stage: "Step 6: 流式首包保护与 Abort 传播", detail: "30s 超时仅保护首个 Chunk，首包到达立即解绑；客户端停止生成时底层连接秒级切断" }
            ],
            highlights: [
              "统一 Validator 审计引擎：将健康探测与业务网关校验逻辑完全归一，彻底消除中转站 200 OK 伪健康漏洞",
              "自适应双向包含匹配：消除版本日期后缀（如 claude-3-5-sonnet 与 -20241022）分裂，同模型命中率 100%",
              "开机全量并发测活：基于 Next.js Instrumentation register() Hook，服务冷启动瞬间并发探测全渠道可用性"
            ]
          },
          deepDive: {
            problem: "第三方 API 中转站在欠费、额度超限或受限时依然返回 HTTP 200，但正文包含错误提示，导致传统网关健康检测与重试失效；模型字面量带斜杠或日期后缀（如 claude-3-5-sonnet 与 -20241022）导致同模型备选池分裂；固定超时会截断万字代码生成，而不设超时会导致坏节点阻塞连接池。",
            solution: "① 统一 Validator 审计引擎：递归提取正文生成文本，执行中英文敏感词全词典黑名单扫描，命中伪成功瞬间抛出业务异常触发熔断并重试下一节点；② 自适应双向核心包含匹配算法 (dmCore === rmCore || dmCore.includes(rmCore))，同模型 Fallback 优先级绝对最高，并动态重写目标模型名；③ 流式智能超时：30秒超时仅保护首个 SSE Chunk，首包到达后立即解绑超时器，保障长文本完整生成；④ 绑定 req.signal 与底层 AbortController，用户前端点击停止时下游秒级断连，消灭无效 Token 消耗；⑤ SQLite 启用 WAL 模式配合 10s 锁等待，写冲突归零；基于 Next.js Instrumentation 实现开机全量并发测活。"
          }
        },
        {
          id: "fvtracker",
          category: "quant",
          title: "FVTracker: 基金估值追踪与多资产量化投资决策平台",
          tagline: "HRP/MVO/ERC 三大组合优化、防前瞻偏差回测与 OCR 智能录入系统",
          badge: "量化金融全栈",
          techs: ["Python 3.10+", "Pandas", "NumPy", "SciPy", "SQLite 3", "PaddleOCR", "jieba", "Jinja2", "WebSocket", "GitHub Pages"],
          metrics: [
            { value: "25%~35%", label: "HRP 组合最大回撤降低" },
            { value: "0.4+", label: "夏普比率提升幅度" },
            { value: "60%+", label: "1% 调仓死区交易磨损降低" },
            { value: "10秒内", label: "截图 OCR 识盘导入 (原15分)" }
          ],
          summary: "面向公募基金全生命周期的桌面级实时行情监控与量化投资系统。集成日内秒级估值监控、多策略资产配置组合优化、14 个技术因子多空买卖决策、手机截图 OCR 批量识盘以及双通道机器人自动化研报推送。",
          gallery: [
            {
              src: "assets/images/fvtracker_dashboard.png",
              title: "实时估值监控与持仓分时图看板",
              desc: "基于日内秒级明细表与收盘权威主表时段叠加读取架构，支持大盘指数与多只自选基金分时走势动态刷新。"
            },
            {
              src: "assets/images/fvtracker_quant_backtest.png",
              title: "多资产量化组合回测模型表现对比",
              desc: "全持仓 1 年期回测对比：MPT (马科维茨)、Black-Litterman、Kelly 准则及网格状态机与基准 (Buy & Hold) 累计净值走势。"
            }
          ],
          architecture: {
            summary: "公募基金全生命周期量化闭环：多源竞争优先级故障转移数据层 -> 双表事件驱动持久化 -> 现代投资组合理论优化引擎 (HRP/MVO/ERC) -> 防前瞻偏差回测与买卖冲突解耦状态机 -> 多平台双 Bot 自动部署推送流水线。",
            flowSteps: [
              { stage: "Step 1: 多源竞争行情接入", detail: "FundDataFetcher 抽象基类多源优先级容灾 (东财App -> 东财Web -> 合成源 -> Sina 兜底)" },
              { stage: "Step 2: 双表事件驱动数据库", detail: "交易时段叠加读取：日内读取 details 秒级分时明细，盘后锁定 main 权威收盘，指数快照自愈" },
              { stage: "Step 3: 现代投资组合优化", detail: "求解 HRP (分层二叉树反方差)、Ledoit-Wolf 收缩 MVO 与 ERC 等权风险贡献三大配置权重" },
              { stage: "Step 4: 防前瞻偏差回测引擎", detail: "250 日滚动回看历史，权重计算设为挂起态 (pending_w) 在 T+1 日生效，1% 调仓死区削减手续费" },
              { stage: "Step 5: 14 技术因子买卖状态机", detail: "离场严格绑定持仓消除假卖出；到期遇突破转续期，止损区低位企稳提示博反弹解套" },
              { stage: "Step 6: 双通道自动发布流水线", detail: "Jinja2 秒级渲染 HTML 研报，Git 自动推送至 GitHub Pages，QQ Bot / Telegram 回传访问链接" }
            ],
            highlights: [
              "HRP 克服马科维茨诅咒：采用层次聚类二叉树自顶向下递归分配反方差权重，彻底免除协方差矩阵奇异求逆",
              "PaddleOCR 智能截图识盘：多策略自适应二值化预处理 + jieba 中文金融分词三级降级匹配，录入缩短至 10 秒",
              "决策列表分层视觉呈现：止损强警示置顶、到期平仓居中、买入加仓按金额降序排列，辅助建立纪律化投资"
            ]
          },
          deepDive: {
            problem: "传统均值-方差优化 (MVO) 对协方差矩阵求逆不稳定（马科维茨诅咒）；量化回测中容易因使用未来信息产生前瞻偏差 (Look-Ahead Bias)；微小调仓引发高昂申赎手续费磨损；未持仓基金遍历监控误报'假卖出 0.00元'；支付宝持仓截图手动录入繁琐错漏率高。",
            solution: "① 资产组合优化：实现 HRP (分层风险平价，层次二叉树聚类自顶向下反方差分配，彻底免去协方差求逆)、Ledoit-Wolf 收缩协方差 MVO 与 ERC (等权风险贡献)；② 防前瞻偏差回测：严格 250 日滚动切片历史数据、调仓日计算权重置为挂起态在 T+1 交易日正式生效；引入 1% 调仓死区控制阈值，低于 1% 冻结调仓，磨损降低 60%+；③ 买卖冲突解耦状态机：离场强制校验 is_hold 消除假卖出；设计到期自动续期、止损区低位企稳解套补仓与强硬风控止损三态分流；④ 智能截图识盘：PaddleOCR + OpenCV 图像自适应二值化 + jieba 中文金融分词三级降级匹配器，份额类型 (A/C/E) 定向优先匹配，准确率超 95%；⑤ 自动化研报流水线：Jinja2 渲染，通过 Git 自动推送部署至 GitHub Pages 并由 QQ Bot / Telegram 回传链接。"
          }
        },
        {
          id: "fund_info_fetch",
          category: "quant",
          title: "fund_info_fetch: 基金数据中台与星河拓扑可视化系统",
          tagline: "43 主题 BK 码 100ms 极速拼配、Double-Track HA 双轨容灾与风格特征工程",
          badge: "金融大数据中台",
          techs: ["Python 3.10+", "Flask", "SQLite 3", "ECharts 5", "Requests", "多线程并发", "Glassmorphism"],
          metrics: [
            { value: "100ms", label: "板块大盘拼配 (原30秒)" },
            { value: "300倍", label: "大盘检索吞吐提升" },
            { value: "100%", label: "双轨容灾历史还原率" },
            { value: "< 1.5s", label: "全市场 5000+ 股票情绪汇总" }
          ],
          summary: "面向全市场公募基金与 A 股大盘的实时行情抓取、量化风格特征工程、持仓冗余检验与力导向拓扑态势感知系统。解决公募基金分析领域'全量遍历 2 万只基金耗时严重'、'高并发触发 WAF 封禁'与'组合持仓雷同集中暴雷'等核心痛点。",
          architecture: {
            summary: "双向极速拼配与量化风格分析中台：单请求大盘广播抓取 -> 43 核心主题 BK 码内存拼配 -> Double-Track HA Fallback 双轨高可用历史差分还原 -> 基金经理视角风格特征工程 -> 暗黑毛玻璃 ECharts 力导向星河拓扑呈现。",
            flowSteps: [
              { stage: "Step 1: 100ms 单请求大盘抓取", detail: "发 1 次 100ms HTTP 请求获取全市场 200+ 板块涨跌幅，内存拼配 43 个主题 BK 编码" },
              { stage: "Step 2: 行业基金定向穿透", detail: "直接调用天天基金底层带 TOPICAL=BK 参数的 FundMNRank 接口，毫秒级获取成分基金排行" },
              { stage: "Step 3: 7 天 SQLite 懒加载缓存", detail: "静态持仓行业、重仓股与同类表现持久化至本地，实现 0ms 离线秒开，削减 95% 请求" },
              { stage: "Step 4: Double-Track HA 双轨容灾", detail: "第一轨官方日 K 遇阻时，自动切换至天天基金直连网关，同类均值前向差分 (RT - RT-1) 还原历史" },
              { stage: "Step 5: 基金风格与重叠度量化", detail: "计算 HHI 行业集中度、Shannon Entropy 信息熵、风格漂移预警与共有重仓股极小值累加相似度" },
              { stage: "Step 6: 暗黑毛玻璃拓扑呈现", detail: "ECharts 力导向星河拓扑图谱，偏置上移解除历史走势折线遮挡冲突，双实例联动 resize" }
            ],
            highlights: [
              "大盘拼配提速 300 倍：推翻遍历 215 只基金倒推板块的笨拙方式，单请求广播抓取削减 99.5% 冗余请求，彻底杜绝 WAF 封禁",
              "前向差分历史还原：首创同类均值大曲线相邻交易日前向差分还原算法，在 TUN 代理阻断下还原 118 天权威历史",
              "共有重仓股极小值累加：采用 min(wa, wb) 累加计算持仓相似度，精准量化投资组合在不同基金间的雷同暴露风险"
            ]
          },
          deepDive: {
            problem: "早期版本遍历 215 只成分基金倒推板块大盘涨幅，瞬间产生数百个并发 HTTP 请求频繁遭遇东方财富 WAF 防火墙封禁 (ECONNRESET)，耗时 15~30 秒；本地开启全局代理网关时东财 K 线接口被 TCP RST 阻断导致走势空白；盘中临时数据污染历史库。",
            solution: "① 单请求大盘广播拼配：仅发 1 次 100ms HTTP 请求获取全市场 200+ 板块最新行情，内存中智能匹配天天基金 43 个核心主题 BK 编码，直接调用定向 FundMNRank 接口，大盘计算由 30 秒降至 100ms，削减 99.5% 冗余请求；② Double-Track HA Fallback 双轨高可用：第一轨官方日 K 遇阻时，0ms 自动切换至天天基金直连白名单同类均值网关，通过相邻交易日前向差分 (RT - RT-1) 100% 真实还原 118 天历史收盘涨幅；③ 基金经理视角风格量化：实现 HHI 行业集中度指数、Shannon Entropy 多样性信息熵、风格漂移预警，以及共有重仓股极小值累加相似度算法 (min(wa, wb))，量化持仓雷同风险；④ 盘中跳过防污染，15:15 收盘守护线程自动物理覆盖校准 (INSERT OR REPLACE)；⑤ 暗黑毛玻璃 ECharts 力导向星河拓扑与板块历史折线双图联动。"
          }
        }
      ]
    },
    footer: {
      copyright: "© 2026 李凯 (Kai Li). 版权所有.",
      quote: "以严谨的工程思维驾驭前沿 AI，以扎实的数据底座构建可靠系统。",
      backToTop: "返回顶部"
    },
    modal: {
      close: "关闭",
      problemTitle: "面临痛点与架构瓶颈",
      solutionTitle: "核心技术方案与攻坚",
      pipelineTitle: "流水线与关键机制",
      futureTitle: "演进规划与业务成效",
      techTitle: "关键技术栈",
      archTitle: "系统核心架构与数据流拓扑",
      galleryTitle: "实盘系统界面与量化看板",
      viewFullImage: "点击查看高清大图"
    }
  },

  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      research: "Research",
      resume: "Resume",
      contact: "Contact"
    },
    hero: {
      badge: "Seeking 2025/2026 Full-Time Opportunities",
      title: "Kai Li",
      subtitle: "LLM Infrastructure / AI Agent Architecture / Full-Stack / Quantitative Engineering",
      description: "Ph.D. track background from University of Science and Technology Beijing (USTB), ex-Tencent Multimodal Team intern. Dedicated to high-availability LLM API gateway governance, autonomous AI agent architectures, spatio-temporal knowledge graph re-architecture, and multi-asset quantitative investment systems. Strong balance between academic rigor and industrial full-stack implementation.",
      location: "Haidian District, Beijing / USTB",
      email: "m13121032012@163.com",
      phone: "+86 13121032013",
      github: "https://github.com",
      downloadPdf: "Print / Export PDF Resume",
      viewProjects: "Explore Featured Projects"
    },
    stats: [
      { number: "5+", label: "Industrial Full-Stack Systems" },
      { number: "2", label: "Top Publications (ACM MM / PRL)" },
      { number: "3", label: "Authorized/Pending Patents" },
      { number: "94%+", label: "LLM Gateway Compatibility Rate" },
      { number: "84%", label: "Graph Super-Cluster Reduction" }
    ],
    about: {
      title: "About Me",
      subtitle: "Professional Background & Core Mission",
      p1: "Hello, I'm Kai Li. I graduated from the University of Science and Technology Beijing (USTB) with comprehensive Ph.D. academic training (recommended for admission without examination, subsequently transitioning to Master's track to focus on cutting-edge engineering). During my academic research in computer vision and multimodal representation learning, I published first-tier papers at ACM MM 2022 and Pattern Recognition Letters 2023, along with 3 national invention patents.",
      p2: "During my internship at Tencent's Multimodal Team, I led the complex instruction data synthesis pipeline and data strategy optimization. Leveraging LLM-as-a-Judge and HDBSCAN clustering, I significantly enhanced data yield and boosted core model Recall by approximately 50%.",
      p3: "On the engineering frontier, I independently developed 5 technically intensive systems, spanning LLM API reverse-engineering gateways (AllProxy), high-availability governance and self-healing systems (Provider Manager), spatio-temporal knowledge graphs (Event Timeline Engine), multi-asset quantitative investment engines (FVTracker), and financial data middlewares (fund_info_fetch). I thrive on crafting robust, elegant architectures at complex operational boundaries."
    },
    skills: {
      title: "Technical Expertise Matrix",
      subtitle: "Full-spectrum capability spanning low-level algorithms, distributed backends, and full-stack engineering",
      categories: [
        {
          name: "Core Programming Languages",
          skills: [
            { name: "Python", level: "Expert (NumPy, Pandas, SciPy, Flask, PyInstaller)" },
            { name: "TypeScript / JavaScript", level: "Expert (Node.js 20+, Express, ES6 Modules)" },
            { name: "SQL", level: "Expert (PostgreSQL, SQLite WAL, Window Functions, Query Tuning)" },
            { name: "C / C++", level: "Proficient (Data structures, low-level algorithms, cross-platform bindings)" }
          ]
        },
        {
          name: "LLM Engineering & AI Agents",
          skills: [
            { name: "LLM Gateway & Protocol Reverse", level: "WASM PoW solver, Connect RPC binary parser, SSE True Streaming, Tag Buffer" },
            { name: "Prompt & Data Engineering", level: "Prompt Engineering, LLM-as-a-Judge evaluation loops, HDBSCAN distribution mining" },
            { name: "Model Service Governance", level: "200 OK pseudo-health semantic auditing, bidirectional core routing, Abort cascade" },
            { name: "Reasoning & Agent Integration", level: "Reasoning content separation, seamless proxying for OpenClaw/Cline/Cursor" }
          ]
        },
        {
          name: "Backend Architecture & Distributed Data",
          skills: [
            { name: "Knowledge Graphs & Graph Computing", level: "Summary-First topology micro-communities, M:N bridging, dynamic temporal deduction, CAMEO" },
            { name: "Database Engineering & Tuning", level: "SQLite WAL concurrency locks, event-driven dual tables, multi-tier lazy caching" },
            { name: "Async Pipelines & Microservices", level: "Dual producer-consumer queues, checkpoint resumption, background daemons" },
            { name: "Resilience & High Availability", level: "Double-Track HA Fallback, priority racing fetchers, automated failover" }
          ]
        },
        {
          name: "Quantitative Finance & Frontend Engineering",
          skills: [
            { name: "Portfolio Optimization Theory", level: "HRP (Hierarchical Risk Parity), MVO (Ledoit-Wolf Shrinkage), ERC (Equal Risk Contribution)" },
            { name: "Backtesting & Risk Management", level: "Look-ahead bias prevention (T+1 pending), 1% dead zone, 14 technical factors state machine" },
            { name: "Financial Feature Analytics", level: "HHI concentration index, Shannon Entropy diversity, overlap similarity analytics" },
            { name: "Modern Frontend & Visualization", level: "Next.js 16 (App Router), React 19, Tailwind CSS, ECharts 5, Glassmorphism" }
          ]
        }
      ]
    },
    experience: {
      title: "Work & Internship Experience",
      subtitle: "Frontline technical contributions in tier-1 tech enterprises",
      items: [
        {
          company: "Tencent",
          department: "Multimodal Team 1",
          role: "LLM Data & Algorithm Engineering Intern",
          period: "2024.09 — 2025.02",
          location: "Beijing, China",
          achievements: [
            "Contributed to the construction of the complex instruction data synthesis pipeline; engineered prompt template systems for text-from-image scenarios using GPT-class models, generating hundreds of thousands of high-fidelity training samples;",
            "Architected decoupled Question / Answer generation workflows; implemented automated answer validation and question quality evaluation loops, integrating human audits with LLM-as-a-Judge for a robust closed-loop pipeline;",
            "Spearheaded complex instruction data analysis and clustering using HDBSCAN, mining distribution clusters and performing attribution analysis to identify coverage blind spots and long-tail anomalies;",
            "Optimized data strategies for multimodal sensitivity detection models; through selective sampling, rebalancing, and stratified evaluation, elevated core model Recall by ~50%;",
            "Advanced prompt engineering practices, iteratively refining generation paradigms for logical reasoning and contextual comprehension to maximize downstream model training yield."
          ]
        }
      ]
    },
    education: {
      title: "Education",
      subtitle: "Academic excellence & rigorous graduate scientific training",
      items: [
        {
          school: "University of Science and Technology Beijing (USTB)",
          degree: "Master's Degree (Direct Ph.D. Track -> Master)",
          major: "Computer Science and Technology / Artificial Intelligence",
          period: "2020.09 — 2026.06 (Ph.D. Track) | 2026.09 — Present (Master Track)",
          description: "Supervised by renowned professors, focusing on computer vision, feature decoupling, and multimodal representation learning. Published 2 first-tier international papers, filed/authorized 3 national invention patents. Master's Thesis: 'Research on Masked Face Recognition via Feature Decoupling and Guided Reconstruction'."
        },
        {
          school: "University of Science and Technology Beijing (USTB)",
          degree: "Master's Study (Recommended Without Exam)",
          major: "Computer Science and Technology",
          period: "2019.09 — 2020.06",
          description: "Admitted via elite academic recommendation waiver; commenced deep learning research on biometric representation learning."
        },
        {
          school: "University of Science and Technology Beijing (USTB)",
          degree: "Bachelor of Engineering",
          major: "Computer Science and Technology",
          period: "2015.09 — 2019.06",
          description: "Core coursework: Computer Architecture, Operating Systems, Data Structures & Algorithms, Compiler Principles, Software Engineering."
        }
      ]
    },
    research: {
      title: "Publications & Patents",
      subtitle: "Peer-reviewed scientific publications and core intellectual property",
      papersTitle: "Academic Publications",
      papers: [
        {
          title: "Hypersphere guided embedding for masked face recognition",
          authors: "Kai Li, et al.",
          venue: "Pattern Recognition Letters (PRL), Vol. 174, pp. 46-51, 2023",
          type: "SCI-Indexed Journal",
          highlights: "Proposed a hypersphere manifold-guided embedding mechanism to solve severe biometric feature degradation under massive facial occlusions."
        },
        {
          title: "SD-GAN: semantic decomposition for face image synthesis with discrete attribute",
          authors: "Kangneng Zhou, Xiaobin Zhu, Daiheng Gao, Kai Lee (Kai Li), Xinjie Li, Xu-Cheng Yin",
          venue: "Proceedings of the 30th ACM International Conference on Multimedia (ACM MM), 2022",
          type: "CCF-A International Top Conference",
          highlights: "Introduced a semantic decomposition framework for discrete attribute synthesis, preserving identity invariance across complex generative conditions."
        },
        {
          title: "Research on Masked Face Recognition via Feature Decoupling and Guided Reconstruction",
          authors: "Kai Li",
          venue: "USTB Graduate Degree Thesis",
          type: "Master's Thesis",
          highlights: "Established comprehensive theoretical and empirical frameworks combining hyperspherical manifold constraints and self-adaptive attention."
        }
      ],
      patentsTitle: "National Invention Patents",
      patents: [
        {
          name: "A Face Detection Method and Apparatus Based on Transformer Architecture",
          owner: "Kai Li, et al.",
          desc: "Invention patent on multi-scale feature pyramid cross-attention for high-precision spatial landmark detection."
        },
        {
          name: "A Face Liveness Detection Method and Apparatus Based on Local Attention Mechanisms",
          owner: "Kai Li, et al.",
          desc: "Core biometric spoofing countermeasure targeting high-resolution replaying and silicone mask attacks via granular texture sensing."
        },
        {
          name: "A Face Detection and Recognition Method, System, and Terminal Equipment",
          owner: "Kai Li, et al.",
          desc: "End-to-end industrial patent covering low-latency edge inference, temporal video deduplication, and embedded feature matching."
        }
      ]
    },
    projects: {
      title: "Featured Industrial & Systems Projects",
      subtitle: "5 core systems with production-grade architectures (click cards for architectural deep dives)",
      filterAll: "All Projects",
      filterLlm: "LLM & Gateways",
      filterKg: "Knowledge Graphs",
      filterQuant: "Quant & FinTech",
      viewDetailBtn: "Inspect Architecture Deep Dive",
      archOverviewBtn: "Architecture Diagram",
      list: [
        {
          id: "eventTimeLine",
          category: "kg",
          title: "Global Geopolitical Spatio-Temporal Knowledge Graph",
          tagline: "Summary-First topology micro-communities and 3-stage LLM extraction pipeline",
          badge: "Major Architectural Refactor",
          techs: ["Node.js 22", "PostgreSQL 16", "Express 5", "CAMEO Framework", "LLM APIs", "Async Worker Queues"],
          metrics: [
            { value: "84%", label: "Super-Node Size Shrinkage" },
            { value: "3~4", label: "Avg Events per Micro-Community" },
            { value: "75%+", label: "Physical Edge Redundancy Cut" },
            { value: "0.81", label: "Avg Edge Confidence (vs 0.68)" }
          ],
          summary: "Near-real-time OSINT extraction, entity normalization, and spatio-temporal situation assessment platform. Led the overhaul from an unstable 6-tier model to a Summary-First dual-tier atomic graph, eliminating the 14,577-node 'super-garbage-bin' cluster and quadratic O(N²) pairing explosion.",
          architecture: {
            summary: "Radical re-architecture from legacy 'physical merging snowballing' to a 'Summary-First Dual-Tier Atomic Graph'. Microscopic facts remain immutable, while macroscopic ISO-Week micro-communities enforce computational isolation.",
            flowSteps: [
              { stage: "Step 1: Multi-Source OSINT Stream", detail: "Near-real-time ingestion from Jin10, GDELT, and RSS news feeds, decoupled via async queues" },
              { stage: "Step 2: 3-Stage LLM Extraction", detail: "Stage 1 Fact Decoupling -> Stage 2a Parallel Entity & 2b CAMEO Action Normalization -> Stage 3 DB Precedence" },
              { stage: "Step 3: Microscopic Fact Layer", detail: "proto_events stored as immutable atomic units, ensuring 100% auditable provenance" },
              { stage: "Step 4: Topology Micro-Community", detail: "ISO-Week temporal isolation with strict 0.7 entity overlap constraint in relationship_summaries" },
              { stage: "Step 5: Multi-to-Multi Bridging", detail: "Intersecting events bridge across communities, keeping individual cluster size to 3~4 items" },
              { stage: "Step 6: Pure Causal Edge Graph", detail: "Edges bounded within micro-communities; temporal edges computed dynamically on-query" }
            ],
            highlights: [
              "Computational Firewall: isolates 20,000 global events into compact boxes, transforming 100M+ pairings into microsecond local lookups",
              "Dual-Track Adaptive NER: greedy longest matching overcomes Chinese word boundary ambiguity, elevating extraction accuracy to 90%+",
              "Parent-Child Entity Tree: retains operational granularity while dynamically rolling up to nation-state geopolitical contests"
            ]
          },
          deepDive: {
            problem: "The legacy architecture attempted physical merging of related news. In international contexts with high-frequency entities (e.g., US, China, 'Statement'), the 'Six Degrees of Separation' chain reaction snowballed into a monstrous super-node containing 14,577 members and ~200,000 edges. Evaluating pairwise links required 1.06 x 10^8 calculations, locking CPU at 100% and choking worker queues with 76% meaningless temporal edges.",
            solution: "Discarded physical merging and designed the [Summary-First Dual-Tier Atomic Graph]: 1. Microscopic atomic facts (proto_events) remain immutable and fully auditable; 2. Macroscopic relationship summaries (relationship_summaries) enforce ISO-Week temporal slicing and a 0.7 entity overlap threshold; 3. Multi-to-multi bridge events link intersecting domains without cluster fusion; 4. Temporal edges are derived dynamically in-memory on query; 5. Graph construction is strictly bounded within micro-communities.",
            pipeline: "Implemented adaptive dual-track NER (longest phrase greedy matching overcoming Chinese word boundary ambiguity) and a 3-stage LLM pipeline: Stage 1 Fact Extraction -> Stage 2 Parallel Entity & CAMEO Action Normalization -> Stage 3 Database Canonical Precedence with in-memory caching, slashing redundant API calls by 90%+.",
            future: "Architected long-cycle narrative layers (Stories) via LLM theme weaving, combined with geopolitical expert system rules in the hypothesis layer (Hypotheses) for automated proactive verification loops."
          }
        },
        {
          id: "allproxy",
          category: "llm",
          title: "AllProxy: Multi-Platform AI Web Auth to Standard API Gateway",
          tagline: "9+ platform token-free reverse engineering, WASM PoW computation & session chain relay",
          badge: "Protocol Reverse & Gateway",
          techs: ["Node.js 20+", "TypeScript 5.9", "Express", "Playwright (CDP)", "better-sqlite3", "WASM", "Web Streams"],
          metrics: [
            { value: "94%", label: "Multi-Platform Pass Rate (31/33)" },
            { value: "<500ms", label: "TTFT (from 15~30s fake stream)" },
            { value: "70%+", label: "Uplink Context Redundancy Cut" },
            { value: "100%", label: "Tool Call & CoT Separation" }
          ],
          summary: "Universal model access gateway designed for autonomous agent frameworks (OpenClaw, Cline, Cursor). Seamlessly translates web session credentials and proprietary protocols from 9+ platforms (DeepSeek, Kimi, Qwen, Doubao, Grok, GLM, Claude, ChatGPT) into industry-standard OpenAI (/v1/chat/completions) and Anthropic (/v1/messages) APIs with zero token billing.",
          architecture: {
            summary: "Dual-track gateway architecture: embedded native WASM module for sub-millisecond PoW challenge solving alongside CDP automation for anti-bot defense; unified Tag Buffer streaming state machine for tool calling and reasoning separation.",
            flowSteps: [
              { stage: "Step 1: Inbound Client Call", detail: "Standard OpenAI (/v1/chat/completions) or Anthropic (/v1/messages) requests dispatched by Agent clients" },
              { stage: "Step 2: Semantic Hash Indexing", detail: "Computes SHA-256 Content Hash from core message text, indexing into (context_hash, provider_id) in SQLite" },
              { stage: "Step 3: Stateful Pruning", detail: "If existing session is matched, strips redundant context and sends only the trailing message with parent_id" },
              { stage: "Step 4: Heterogeneous Ingestion", detail: "DeepSeek WASM PoW challenge resolution; Kimi custom binary Connect RPC parsing; CDP automation fallback" },
              { stage: "Step 5: Tag Buffer State Machine", detail: "Non-blocking XML and Special Token streaming interceptor, packaging payloads into standard tool_calls" },
              { stage: "Step 6: True Streaming Egress", detail: "Dispatches instant ': proxy-connected' keep-alive frame, followed by zero-latency ReadableStream piping" }
            ],
            highlights: [
              "WASM PoW Sub-Millisecond Solver: reverse-engineered DeepSeekHashV1 algorithm, resolving anti-bot challenge on Node.js natively",
              "Binary Frame Protocol Decoder: built lightweight Buffer Reader extracting Kimi's chat_id and parent_id pointers",
              "Zero-Latency True Streaming: dismantled legacy buffering templates, crushing TTFT from 30s to sub-500ms"
            ]
          },
          deepDive: {
            problem: "Web endpoints enforce heavy anti-bot security: DeepSeek demands real-time SHA-256 DeepSeekHashV1 PoW challenge calculation; Kimi replaced text SSE with binary-framed Connect RPC; Web models lack native tool calling APIs; and stateless agent clients re-sending entire message histories triggered cascading web session collisions.",
            solution: "1. Embedded native WebAssembly (WASM) module in Node.js for sub-millisecond dynamic PoW challenge resolution, unlocking direct HTTP streaming; 2. Authored custom binary buffer reader to unpack Kimi's RPC frames and extract chat_id/parent_id pointers; 3. Computed normalized semantic SHA-256 content hashes mapped to SQLite composite keys, implementing [Stateful Incremental Dispatch] that strips redundant past context; 4. Demolished fake streaming by piping true incremental ReadableStreams with instant ': proxy-connected' keep-alive frames.",
            toolCalling: "Constructed a streaming Tag Buffer state machine supporting XML, custom tokens, and markdown syntax topology, intercepting model tool outputs in real-time and formatting them into standard OpenAI tool_calls, while funneling <think> tokens cleanly into reasoning_content."
          }
        },
        {
          id: "provider_manager",
          category: "llm",
          title: "Provider Manager: High-Availability LLM API Smart Gateway",
          tagline: "Enterprise provider governance, 200 OK pseudo-health auditing & same-model self-healing fallback",
          badge: "High-Availability Governance",
          techs: ["Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "better-sqlite3 (WAL)", "Web Streams", "AbortController"],
          metrics: [
            { value: "99.9%", label: "Business Self-Healing Success" },
            { value: "100%", label: "Same-Model Fallback Hit Rate" },
            { value: "0%", label: "High-Concurrency Lock Errors" },
            { value: "0ms", label: "Client Abort Tear-Down Latency" }
          ],
          summary: "Enterprise-grade LLM API distribution and self-healing gateway. Solves pervasive upstream relay vulnerabilities including 'HTTP 200 return on quota exhaustion', model suffix divergence causing accidental model downgrades, and socket starvation from orphaned long streams.",
          architecture: {
            summary: "Closed-loop resilient routing architecture: adaptive bidirectional core substring matching, unified Validator response semantic auditing engine, first-chunk timeout unbinding with client Abort propagation, and boot-time concurrency probing.",
            flowSteps: [
              { stage: "Step 1: Gateway Request Ingress", detail: "Receives requests at /api/llm/chat, router.ts extracts model cores (dmCore vs rmCore)" },
              { stage: "Step 2: Same-Model First Dispatch", detail: "Bidirectional substring matching ensures same-model backup nodes take absolute precedence, rewriting model aliases" },
              { stage: "Step 3: CLI Characteristic Mimicry", detail: "Injects Claude Code CLI / Codex CLI signature headers to bypass third-party relay vendor restrictions" },
              { stage: "Step 4: Unified Validator Auditing", detail: "Scans response body against multilingual negative keywords (balance, quota, CLI limits), trapping pseudo-200 OK" },
              { stage: "Step 5: Automated Failover & Circuit Breaking", detail: "Executes reportTest(false) to WAL database and automatically fails over to the next healthy candidate node" },
              { stage: "Step 6: First-Chunk Timeout & Abort Cascade", detail: "30s timeout guards initial handshake and unbinds upon first chunk; client disconnects tear down upstream fetch" }
            ],
            highlights: [
              "Unified Validator Auditing Engine: harmonizes health probes and live proxy responses, eliminating HTTP 200 pseudo-health leaks",
              "Bidirectional Substring Model Router: resolves version suffix divergence (e.g. claude-3-5-sonnet vs -20241022), hitting 100% same-model fallback",
              "Boot-Time Concurrent Health Probing: registers Next.js Server Instrumentation Hook, validating all channels upon cold start"
            ]
          },
          deepDive: {
            problem: "Third-party relay services frequently return HTTP 200 despite account bankruptcy or upstream rate-limiting, rendering conventional status-code checks useless; inconsistent model naming (e.g. claude-3-5-sonnet vs -20241022) splits model candidate pools; static timeouts sever 10,000-word generation while zero-timeout freezes thread pools.",
            solution: "1. Unified Validator Auditing Engine: parses multi-protocol payloads and scans bilingual negative keyword dictionaries ('insufficient balance', 'quota exceeded', 'use Claude Code CLI'), instantly throwing business exceptions to trigger circuit breakers and automatic fallback; 2. Adaptive Bidirectional Core Routing (dmCore === rmCore || dmCore.includes(rmCore)), ensuring same-model redundancy takes highest priority while rewriting payload model aliases; 3. First-Chunk Timeout Protection: 30s timeout guards only the initial handshake and immediately unbinds upon receiving the first SSE chunk; 4. Bidirectional AbortSignal cascade instantly propagates client disconnection to upstream fetch, cutting wasted token expenditure to zero; 5. SQLite WAL journal mode with 10s busy timeouts eliminates concurrency lockups, paired with Next.js Server Instrumentation hooks for instantaneous boot-time health checks."
          }
        },
        {
          id: "fvtracker",
          category: "quant",
          title: "FVTracker: Fund Valuation Tracking & Quantitative Portfolio Engine",
          tagline: "HRP/MVO/ERC portfolio optimization, look-ahead bias prevention & OCR screenshot ingestion",
          badge: "Full-Stack Quantitative",
          techs: ["Python 3.10+", "Pandas", "NumPy", "SciPy", "SQLite 3", "PaddleOCR", "jieba", "Jinja2", "WebSocket", "GitHub Pages"],
          metrics: [
            { value: "25%~35%", label: "HRP Max Drawdown Reduction" },
            { value: "0.4+", label: "Sharpe Ratio Improvement" },
            { value: "60%+", label: "Turnover Drag Reduction (1% Deadzone)" },
            { value: "< 10s", label: "Screenshot Batch OCR (vs 15m)" }
          ],
          summary: "Desktop quantitative investment and real-time fund monitoring platform. Integrates intraday second-level tracking, multi-asset portfolio optimization (HRP/MVO/ERC), 14 technical indicator factor models, mobile screenshot OCR ingestion, and automated dual-bot report dispatch.",
          gallery: [
            {
              src: "assets/images/fvtracker_dashboard.png",
              title: "Real-Time Fund Valuation & Holding Monitor Dashboard",
              desc: "Dual-table time-slice superposition architecture: renders intraday second-level updates while locking authoritative closing data post-market."
            },
            {
              src: "assets/images/fvtracker_quant_backtest.png",
              title: "Multi-Asset Quantitative Portfolio Backtest Performance Comparison",
              desc: "1-year backtest performance: MPT (Markowitz), Black-Litterman, Kelly Criterion, and State Machine Grid against benchmark (Buy & Hold)."
            }
          ],
          architecture: {
            summary: "Full-lifecycle quantitative investment closed loop: multi-source competitive fetcher failover -> event-driven dual SQLite tables -> modern portfolio theory optimizer (HRP/MVO/ERC) -> look-ahead bias prevention backtester -> automated dual-bot GitHub Pages pipeline.",
            flowSteps: [
              { stage: "Step 1: Multi-Source Priority Fetcher", detail: "Priority failover across EastMoney App, EastMoney Web, Computed Synthesizer, and Sina Fallback" },
              { stage: "Step 2: Dual-Table Event Database", detail: "Intraday queries read from details table, post-market locks main table, index snapshot auto-heals" },
              { stage: "Step 3: Modern Portfolio Optimizer", detail: "Solves HRP (inverse-variance tree clustering), Ledoit-Wolf MVO, and Equal Risk Contribution (ERC)" },
              { stage: "Step 4: Anti-Look-Ahead Bias Backtester", detail: "Rolling 250-day windows, T+1 pending weight activation, and 1% dead zone reallocation" },
              { stage: "Step 5: 14-Factor Buy/Sell State Machine", detail: "Strict holding verification eliminates ghost sells; converts expiring holds into momentum extensions" },
              { stage: "Step 6: Dual-Bot Automated Delivery", detail: "Jinja2 generates HTML, Git commits to GitHub Pages, and QQ Bot / Telegram return live links" }
            ],
            highlights: [
              "HRP Bypasses Markowitz Curse: hierarchical tree clustering recursively allocates inverse-variance weights, eliminating singular matrix inversion",
              "PaddleOCR Portfolio Ingestion: adaptive binarization with jieba financial NLP tokenization cuts manual entry time to 10 seconds",
              "Layered Visual Priority: highlights emergency stop-loss alerts, displays expiry holds in center, and orders buy signals by capital allocation"
            ]
          },
          deepDive: {
            problem: "Standard Markowitz Mean-Variance Optimization (MVO) suffers from covariance matrix inversion instability; backtests frequently encounter look-ahead bias; micro-rebalancing induces heavy redemption fee drag; unheld watchlist assets trigger false 'Sell $0.00' errors; and manual mobile portfolio entry is error-prone.",
            solution: "1. Portfolio Optimization: implemented Hierarchical Risk Parity (HRP) via hierarchical tree clustering and inverse-variance recursion (completely bypassing matrix inversion), alongside Ledoit-Wolf shrinkage MVO and Equal Risk Contribution (ERC); 2. Look-Ahead Bias Prevention: strictly rolling 250-day window slices, T+1 pending weight activation, and 1% dead zone reallocation threshold (slashing turnover fee drag by 60%+); 3. Buy/Sell Conflict State Machine: strictly binds exit signals to real holdings, converting expiring holds into extensions when encountering breakout momentum, and managing risk stop-loss states; 4. Screenshot OCR Pipeline: PaddleOCR + OpenCV adaptive binarization with jieba finance tokenization and share class (A/C/E) prioritization, delivering 95%+ accuracy; 5. Automated CI/CD Report Dispatch: Jinja2 renders interactive reports, committed via Git API to GitHub Pages with instant HTTPS links broadcasted via QQ and Telegram bots."
          }
        },
        {
          id: "fund_info_fetch",
          category: "quant",
          title: "fund_info_fetch: Fund Data Platform & Galaxy Topology Visualization",
          tagline: "43-theme BK code 100ms rapid matching, Double-Track HA Fallback & style feature engineering",
          badge: "Financial Big Data",
          techs: ["Python 3.10+", "Flask", "SQLite 3", "ECharts 5", "Requests", "Multi-Threading", "Glassmorphism"],
          metrics: [
            { value: "100ms", label: "Sector Matching (vs 30s)" },
            { value: "300x", label: "Sector Query Throughput Boost" },
            { value: "100%", label: "HA History Recovery Rate" },
            { value: "< 1.5s", label: "5,000+ Stock Sentiment Scan" }
          ],
          summary: "Real-time market ingestion, quantitative style feature engineering, portfolio overlap redundancy auditing, and force-directed topology system. Overcomes traditional bottlenecks of querying 20,000+ funds, WAF IP blacklisting, and concentration risk from overlapping asset exposures.",
          architecture: {
            summary: "Rapid bidirectional mapping and quantitative style analytics engine: single-request market broadcast -> in-memory 43-theme BK matching -> Double-Track HA Fallback historical reconstruction -> managerial style analytics -> Dark Glassmorphism ECharts topology.",
            flowSteps: [
              { stage: "Step 1: 100ms Broadcast Market Query", detail: "Single 100ms HTTP call fetches 200+ sector movements, mapping in-memory to 43 EastMoney BK codes" },
              { stage: "Step 2: Targeted Thematic Penetration", detail: "Directly queries EastMoney's FundMNRank with TOPICAL=BK parameters, returning constituents in milliseconds" },
              { stage: "Step 3: 7-Day SQLite Lazy Caching", detail: "Static industry holdings, top stocks, and performance cached locally, achieving 0ms cold starts and 95% fewer requests" },
              { stage: "Step 4: Double-Track HA Fallback", detail: "Switches to direct whitelist gateway upon TCP reset, reconstructing history via forward differencing (RT - RT-1)" },
              { stage: "Step 5: Style & Overlap Analytics", detail: "Computes HHI concentration, Shannon Entropy diversity, style drift alarms, and intersection minimum weights min(wa, wb)" },
              { stage: "Step 6: Dark Glassmorphism Topology", detail: "ECharts force-directed galaxy topology with viewport offsets eliminating chart occlusion, synchronized via resize hooks" }
            ],
            highlights: [
              "300x Faster Sector Matching: bypassed 215-fund brute-force scans; single broadcast request cut redundant traffic by 99.5%, preventing WAF IP bans",
              "Forward Differencing Reconstruction: innovated peer-average differencing to reconstruct 118 days of authoritative history under TUN proxy blocks",
              "Minimum Weight Overlap (min(wa, wb)): accurately quantifies disguised duplication across different funds to eliminate systemic portfolio concentration"
            ]
          },
          deepDive: {
            problem: "Iterating through 215 constituent funds to infer sector movement created hundreds of concurrent HTTP requests, triggering EastMoney's WAF (ECONNRESET) and stalling responses for 15~30s; system-level TUN proxies dropped TCP connections to daily K-line endpoints; and intraday temporary estimates polluted historical tables.",
            solution: "1. Single-Request Broadcast Matching: pulls 200+ sector indices in a single 100ms HTTP call and maps them in-memory to EastMoney 43 core thematic BK codes, reducing network requests by 99.5%; 2. Double-Track HA Fallback: when primary K-line endpoints drop connections, the engine instantly switches to EastMoney's direct whitelist gateway and reconstructs 118 days of authoritative daily changes via forward differencing (RT - RT-1) of peer averages; 3. Managerial Style Analytics: computes Herfindahl-Hirschman Index (HHI) concentration, Shannon Entropy diversity, style drift alarms, and intersection minimum-weight overlap (min(wa, wb)) to uncover hidden common holdings; 4. Anti-Pollution Storage: skips temporary intraday writes and executes 15:15 closing overwrites (INSERT OR REPLACE); 5. Dark Glassmorphism ECharts topology with dual-chart synchrony."
          }
        }
      ]
    },
    footer: {
      copyright: "© 2026 Kai Li. All rights reserved.",
      quote: "Harnessing cutting-edge AI with rigorous engineering; building resilient systems on solid data foundations.",
      backToTop: "Back to Top"
    },
    modal: {
      close: "Close",
      problemTitle: "Pervasive Bottlenecks & Failure Modes",
      solutionTitle: "Core Architectural Solutions",
      pipelineTitle: "Pipelines & Mechanisms",
      futureTitle: "Roadmap & Quantifiable Impact",
      techTitle: "Core Tech Stack",
      archTitle: "System Architecture & Dataflow Topology",
      galleryTitle: "Production Screenshots & Dashboard Gallery",
      viewFullImage: "Click to View Full Resolution"
    }
  }
};
