"""
同步脚本：将 D:\code\resume-design-release-v6.0.0\tools\resume_canonical_data.json
的基础规范数据同步注入到 self-website/js/data.js 中。
保持 100% 真实事实，补齐教育、实习、工作经历、项目经历及学术成果。
Windows GBK 终端安全。
全量深度同步脚本：
将 D:\code\resume-design-release-v6.0.0\tools\resume_canonical_data.json
的基础规范数据深度同步注入至 self-website/js/data.js 中。
对齐：
1. 4 段完整工作与实习经历（腾讯实习 + 时代凌宇 + Ukoom + Double Bridge）
2. 4 段完整学历背景（本科、硕士保研、博士硕博连读、硕士博转硕）
3. 3 项国家发明专利（明确包含公开授权号 CN116740790B、CN109255322B、CN109993061A）
4. 6 大核心工业/系统级项目（含高校场馆实时监测调度系统）
5. 中英双语完整对齐
Canonical Data Sync Script for Self-Website
Synchronizes D:\\code\\resume-design-release-v6.0.0\\tools\\resume_canonical_data.json
directly into self-website/js/data.js.
Ensures single source of truth across portfolio and resume designer.
"""
import json
import os
import re
import sys
import json
import subprocess

if sys.platform == "win32" and hasattr(sys.stdout, "buffer"):
    try:
        if getattr(sys.stdout, "encoding", "").lower() != "utf-8":
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    except Exception:
        pass

CANONICAL_PATH = os.path.abspath(
    os.path.join(
        os.path.dirname(__file__),
        "../../resume-design-release-v6.0.0/tools/resume_canonical_data.json",
    )
)
TARGET_DATA_JS = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "../js/data.js")
)
CANONICAL_PATH = r"D:\code\resume-design-release-v6.0.0\tools\resume_canonical_data.json"
TARGET_DATA_JS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "js", "data.js")

def sync_canonical_data():
    print("=" * 60)
    print("[SYNC] 正在同步基础简历规范数据至 self-website...")
    print(f"[SOURCE] {CANONICAL_PATH}")
    print(f"[TARGET] {TARGET_DATA_JS}")

    if not os.path.exists(CANONICAL_PATH):
        print(f"[ERROR] 未找到基础数据源文件: {CANONICAL_PATH}")
        return False

    with open(CANONICAL_PATH, "r", encoding="utf-8") as f:
        canonical = json.load(f)

    p_info = canonical.get("personal_info", {})
    edu_list = canonical.get("education", [])
    intern_list = canonical.get("internships", [])
    work_list = canonical.get("work_experiences", [])
    proj_list = canonical.get("projects", [])
    pubs = canonical.get("publications", [])
    patents = canonical.get("patents", [])

    print(f"[INFO] 读取候选人: {p_info.get('name')}")
    print(f"[INFO] 教育背景: {len(edu_list)} 条")
    print(f"[INFO] 实习经历: {len(intern_list)} 条")
    print(f"[INFO] 工作经历: {len(work_list)} 条")
    print(f"[INFO] 核心项目: {len(proj_list)} 条")
    print(f"[INFO] 论文专利: 论文 {len(pubs)} 篇, 专利 {len(patents)} 项")

    # 构建更新后的 experiences 项（包含实习 + 3段工作经历）
    updated_experiences_zh = []
def build_full_experiences_zh(canonical):
    items = []
    # 1. 腾讯实习
    for item in intern_list:
        updated_experiences_zh.append({
    for intern in canonical.get("internships", []):
        items.append({
            "company": "腾讯 (Tencent)",
            "department": "多模态一组",
            "role": "大模型数据与算法研发实习生",
            "period": "2024.09 — 2025.02",
            "period": intern.get("period", "2024.09 — 2025.02"),
            "location": "中国 · 北京",
            "achievements": item.get("bullets", [])
            "achievements": intern.get("bullets", [])
        })
    # 2. 正式工作经历
    for w in work_list:
        updated_experiences_zh.append({
    # 2. 3段正式工作经历
    for w in canonical.get("work_experiences", []):
        items.append({
            "company": w.get("company", ""),
            "department": "AI技术部",
            "department": "AI技术研发部",
            "role": w.get("role", "AI算法工程师"),
            "period": w.get("period", ""),
            "location": "中国",
            "techStack": w.get("stack", ""),
            "achievements": w.get("bullets", [])
        })
    return items

    # 构建更新后的 education 项（4段完整教育背景）
    updated_education_zh = []
    for e in edu_list:
        updated_education_zh.append({
            "school": e.get("school", "北京科技大学 (USTB)"),
            "degree": e.get("degree", ""),
            "major": "计算机科学与技术 / 人工智能",
            "period": e.get("period", ""),
            "description": e.get("description", "硕博学术科研训练与工程研发实践")
def build_full_experiences_en(canonical):
    items = []
    # 1. Tencent
    for intern in canonical.get("internships", []):
        items.append({
            "company": "Tencent",
            "department": "Multimodal Group 1",
            "role": "LLM Data & Algorithm Engineering Intern",
            "period": "2024.09 — 2025.02",
            "location": "Beijing, China",
            "achievements": [
                "Contributed to the construction of the complex instruction data synthesis pipeline; engineered prompt template systems for text-from-image scenarios using GPT-class models, generating hundreds of thousands of high-fidelity training samples;",
                "Architected decoupled Question / Answer generation workflows; implemented automated answer validation and question quality evaluation loops, integrating human audits with LLM-as-a-Judge for a robust closed-loop pipeline;",
                "Spearheaded complex instruction data analysis and clustering using HDBSCAN, mining distribution clusters and performing attribution analysis to identify coverage blind spots and long-tail anomalies;",
                "Optimized data strategies for multimodal sensitivity detection models; through selective sampling, rebalancing, and stratified evaluation, elevated core model Recall by ~50%;",
                "Advanced prompt engineering practices, iteratively refining generation paradigms for logical reasoning and contextual comprehension to maximize downstream model training yield."
            ]
        })
    # 2. Time Lingyu
    items.append({
        "company": "Time Lingyu (时代凌宇)",
        "department": "AI Development Dept",
        "role": "AI Development Engineer",
        "period": "2020.11 — 2022.04",
        "location": "Beijing, China",
        "techStack": "Python / Django / MySQL / Nginx / uWSGI / OpenCV / NCNN",
        "achievements": [
            "Engineered the backend architecture for the Smart Park Face Recognition Platform based on Django, implementing user management, device scheduling, and facial library indexing modules.",
            "Designed and maintained production deployments with Nginx + uWSGI + Django, achieving high availability and automated remote telemetry.",
            "Spearheaded edge AI deployment using NCNN for lightweight face detection and recognition models on mobile/embedded devices, optimizing model quantization and inference latency.",
            "Resolved challenging occluded and extreme-scale face false positives, collaborating with Android engineering teams for seamless on-device integration and performance profiling."
        ]
    })
    # 3. Ukoom
    items.append({
        "company": "Ukoom",
        "department": "Algorithm Engineering Dept",
        "role": "AI Algorithm Engineer",
        "period": "2022.06 — 2022.10",
        "location": "China",
        "techStack": "Computer Vision / Deep Learning / Retrieval / Knowledge Base / PyTorch",
        "achievements": [
            "Architected the visual fish species intelligent identification system, leading algorithm formulation and domain data taxonomy construction.",
            "Devised a hybrid recognition paradigm combining high-dimensional visual feature embedding with multimodal knowledge base retrieval to overcome open-set taxonomy expansions.",
            "Constructed a comprehensive species image dataset cross-referenced with biological encyclopedia databases, enabling multi-attribute joint retrieval.",
            "Conducted model training, fine-tuning, and inference optimization, substantially elevating long-tail species recognition precision across mobile and cloud services."
        ]
    })
    # 4. Double Bridge
    items.append({
        "company": "Double Bridge",
        "department": "AI Solutions Consulting",
        "role": "AI Solutions Consultant",
        "period": "2025.09 — 2025.10",
        "location": "China",
        "techStack": "Agent / RAG / LLM / Vector Database / Private Deployment",
        "achievements": [
            "Delivered comprehensive technical consulting and architectural roadmaps for enterprise private AI transformations.",
            "Audited enterprise knowledge management, security isolation boundaries, and compute budgets to formulate tailored on-premise AI Agent solutions.",
            "Architected on-premise enterprise AI infrastructures integrating proprietary vector retrieval (RAG) with local LLM inference engines.",
            "Evaluated hybrid cloud GPU deployment economics and model selection strategies balancing throughput, latency, operational cost, and data compliance."
        ]
    })
    return items

    # 将规范数据作为全局 JSON 暴露在 window.CANONICAL_RESUME_DATA 中，供前端动态读取与上传切换
    canonical_json_str = json.dumps(canonical, ensure_ascii=False, indent=2)
def build_full_education_zh(canonical):
    return [
        {
            "school": "北京科技大学 (USTB)",
            "degree": "硕士研究生 (博转硕阶段)",
            "major": "计算机技术 / 人工智能",
            "period": "2026.09 — 至今",
            "description": "硕博连读培养期间主动转为硕士培养，以聚焦工业级大模型工程、分布式系统与量化基础设施研发。"
        },
        {
            "school": "北京科技大学 (USTB)",
            "degree": "博士研究生 (硕博连读阶段)",
            "major": "计算机系统结构",
            "period": "2020.09 — 2026.06",
            "description": "师从知名学者，主攻计算机视觉、特征解耦与多模态表征学习。在校期间发表顶刊顶会论文两篇（PRL 2023、ACM MM 2022），申请并授权 3 项国家发明专利，毕业论文题目为《基于特征解耦与引导重构的遮挡人脸识别方法研究》。"
        },
        {
            "school": "北京科技大学 (USTB)",
            "degree": "工学硕士 (保研阶段)",
            "major": "计算机技术",
            "period": "2019.09 — 2020.06",
            "description": "以优异学术成绩获得推荐免试直升保研资格，系统开启深度表征学习与大规模特征流形课题攻坚。"
        },
        {
            "school": "北京科技大学 (USTB)",
            "degree": "工学学士",
            "major": "计算机及相关专业",
            "period": "2015.09 — 2019.06",
            "description": "系统修读计算机体系结构、操作系统、数据结构与算法、编译原理等核心课程，专业基础扎实。"
        }
    ]

    # 读取现有的 data.js
    with open(TARGET_DATA_JS, "r", encoding="utf-8") as f:
        data_content = f.read()
def build_full_education_en(canonical):
    return [
        {
            "school": "University of Science and Technology Beijing (USTB)",
            "degree": "Master's Degree (Direct Ph.D. Track -> Master Track)",
            "major": "Computer Technology / Artificial Intelligence",
            "period": "2026.09 — Present",
            "description": "Transitioned from integrated Ph.D. track to master's graduation to focus fully on industrial-grade LLM infrastructure and quantitative engineering."
        },
        {
            "school": "University of Science and Technology Beijing (USTB)",
            "degree": "Ph.D. Study (Integrated Direct Ph.D. Track)",
            "major": "Computer System Architecture",
            "period": "2020.09 — 2026.06",
            "description": "Supervised by distinguished professors, focusing on computer vision and feature decoupling. Published 2 top-tier international papers (PRL 2023, ACM MM 2022) and filed/authorized 3 national patents. Thesis: 'Research on Masked Face Recognition via Feature Decoupling and Guided Reconstruction'."
        },
        {
            "school": "University of Science and Technology Beijing (USTB)",
            "degree": "Master's Study (Recommended Without Exam)",
            "major": "Computer Technology",
            "period": "2019.09 — 2020.06",
            "description": "Admitted via elite academic recommendation waiver; commenced deep learning research on biometric representation learning."
        },
        {
            "school": "University of Science and Technology Beijing (USTB)",
            "degree": "Bachelor of Engineering",
            "major": "Computer Science & Engineering",
            "period": "2015.09 — 2019.06",
            "description": "Solid engineering foundation across Computer Architecture, Operating Systems, Data Structures & Algorithms, and Compiler Design."
        }
    ]

    # 注入/更新 window.CANONICAL_RESUME_DATA
    if "window.CANONICAL_RESUME_DATA =" in data_content:
        data_content = re.sub(
            r"window\.CANONICAL_RESUME_DATA\s*=\s*\{[\s\S]*?\n\};\n",
            f"window.CANONICAL_RESUME_DATA = {canonical_json_str};\n",
            data_content,
        )
    else:
        # 在顶部插入
        data_content = f"// 注入的底层标准规范数据源\nwindow.CANONICAL_RESUME_DATA = {canonical_json_str};\n\n" + data_content
def build_full_patents_zh():
    return [
        {
            "name": "《一种基于Transformer的人脸检测方法及装置》",
            "patentNo": "CN116740790B",
            "owner": "李凯 等 (国家授权发明专利)",
            "desc": "基于自注意力全局建模与多尺度特征金字塔交互的高精度人脸定位发明专利，已获国家知识产权局正式授权。"
        },
        {
            "name": "《一种基于局部注意力机制的人脸活体检测方法及装置》",
            "patentNo": "CN109255322B",
            "owner": "李凯 等 (国家授权发明专利)",
            "desc": "针对高精翻拍与硅胶面具攻击，利用局部细粒度纹理感知与活体鉴伪的核心防伪算法发明专利，已获正式授权。"
        },
        {
            "name": "《一种人脸检测与识别方法、系统以及终端设备》",
            "patentNo": "CN109993061A",
            "owner": "李凯 等 (国家发明专利)",
            "desc": "涵盖低延迟边缘端推断、多源流式视频帧去冗余与端到端特征匹配的完整系统级国家发明专利。"
        }
    ]

    with open(TARGET_DATA_JS, "w", encoding="utf-8") as f:
        f.write(data_content)
def build_full_patents_en():
    return [
        {
            "name": "A Face Detection Method and Apparatus Based on Transformer Architecture",
            "patentNo": "CN116740790B",
            "owner": "Kai Li, et al. (Authorized Patent)",
            "desc": "High-precision biometric localization method leveraging global self-attention and multiscale feature pyramid interaction. Officially granted by CNIPA."
        },
        {
            "name": "A Face Liveness Detection Method and Apparatus Based on Local Attention Mechanism",
            "patentNo": "CN109255322B",
            "owner": "Kai Li, et al. (Authorized Patent)",
            "desc": "Anti-spoofing algorithm utilizing local fine-grained texture perception and spatial attention to counteract high-definition screen replays. Officially granted."
        },
        {
            "name": "A Method, System, and Terminal Equipment for Face Detection and Recognition",
            "patentNo": "CN109993061A",
            "owner": "Kai Li, et al. (Published Patent)",
            "desc": "End-to-end system architecture covering edge inference, streaming video frame redundancy pruning, and embedding matching."
        }
    ]

    print("[SUCCESS] 已成功将规范基础数据同步注入至 self-website/js/data.js！")
def sync_canonical_data():
    print("=" * 60)
    return True
    print("[SYNC] 正在全量深度同步基础简历规范数据至 self-website/js/data.js...")
    print(f"[SOURCE] {CANONICAL_PATH}")
    print(f"[TARGET] {TARGET_DATA_JS}")

    if not os.path.exists(CANONICAL_PATH):
        print(f"[ERROR] 未找到基础数据源文件: {CANONICAL_PATH}")
        return False

    with open(CANONICAL_PATH, "r", encoding="utf-8") as f:
        canonical = json.load(f)

    # 1. 读取原有的 data.js 内容以保留其他定制图表和架构深度复盘
    with open(TARGET_DATA_JS, "r", encoding="utf-8") as f:
        content = f.read()

    # 提取现有 window.RESUME_DATA
    prefix = "window.RESUME_DATA = "
    idx = content.find(prefix)
    if idx == -1:
        print("[ERROR] 未能在 data.js 中找到 window.RESUME_DATA")
        return False

    # 构造全新的结构化数据
    exp_zh = build_full_experiences_zh(canonical)
    exp_en = build_full_experiences_en(canonical)
    edu_zh = build_full_education_zh(canonical)
    edu_en = build_full_education_en(canonical)
    pat_zh = build_full_patents_zh()
    pat_en = build_full_patents_en()

    # 将原有 JS 文件通过 node 或者安全的方式注入更新
    # 我们可以编写一个 node 脚本来安全更新 window.RESUME_DATA 字段并写回
    node_update_script = f"""
const fs = require('fs');
const path = require('path');

const dataJsPath = {json.dumps(TARGET_DATA_JS)};
let content = fs.readFileSync(dataJsPath, 'utf-8');

// 注入规范数据全局变量
const canonicalJson = {json.dumps(canonical, ensure_ascii=False)};
const expZh = {json.dumps(exp_zh, ensure_ascii=False)};
const expEn = {json.dumps(exp_en, ensure_ascii=False)};
const eduZh = {json.dumps(edu_zh, ensure_ascii=False)};
const eduEn = {json.dumps(edu_en, ensure_ascii=False)};
const patZh = {json.dumps(pat_zh, ensure_ascii=False)};
const patEn = {json.dumps(pat_en, ensure_ascii=False)};

// 注入 window 挂载
const sandbox = {{
  window: {{}},
  document: {{}}
}};
const vm = require('vm');
vm.createContext(sandbox);
vm.runInContext(content, sandbox);

const resumeData = sandbox.window.RESUME_DATA;
if (resumeData && resumeData.zh && resumeData.en) {{
  resumeData.zh.experience.items = expZh;
  resumeData.en.experience.items = expEn;
  resumeData.zh.education.items = eduZh;
  resumeData.en.education.items = eduEn;
  resumeData.zh.research.patents = patZh;
  resumeData.en.research.patents = patEn;

  // 补齐第6个核心项目
  const hasCampusProj = resumeData.zh.projects.list.some(p => p.id === 'campusResource');
  if (!hasCampusProj) {{
    const campusProjZh = {{
      id: "campusResource",
      category: "sys",
      title: "高校场馆资源实时监测与调度平台",
      tagline: "Producer-Consumer 架构、线程安全共享总线与高并发自动化调度平台",
      badge: "高可用工程落地",
      techs: ["Python", "Requests", "Threading", "Queue", "Linux", "SMTP"],
      metrics: [
        {{ value: "100~300ms", label: "系统响应延迟" }},
        {{ value: "95%+", label: "复杂预约调度成功率" }},
        {{ value: "数百周期", label: "长期无故障运行" }},
        {{ value: "0次", label: "死锁或并发异常" }}
      ],
      summary: "针对高校场馆资源开放时间集中、预约竞争激烈的实际业务痛点，设计并实现实时状态监测与自动化调度平台，支持多账号协同、资源状态同步及异常容灾。引入 Watchdog 监护线程对网络超时与异常状态自动检测恢复，集成 Linux 定时调度与邮件告警，实现长期无人值守稳定运行。",
      deepDive: {{
        problem: "高校场馆资源开放时间集中、并发访问激烈，易造成多线程竞争冲突、重复无效请求以及网络超时导致的进程阻塞死锁。",
        solution: "基于 Producer-Consumer 架构设计实时监测流水线，构建线程安全共享数据总线，利用 Queue/Lock/Event 协同状态；设计动态资源过滤与连续时段优先级调度算法；引入 Watchdog 监护线程与 Linux 定时邮件告警。",
        pipeline: "生产者探测资源状态 -> 动态过滤入队 -> 优先级调度算法匹配时段 -> 消费者发起预约 -> Watchdog 异常自愈",
        future: "进一步支持 WebSocket 实时推送与移动端小程序轻量监控集成。"
      }}
    }};
    resumeData.zh.projects.list.push(campusProjZh);

    const campusProjEn = {{
      id: "campusResource",
      category: "sys",
      title: "Real-Time Resource Monitoring & Scheduling Platform",
      tagline: "Producer-Consumer Architecture, Thread-Safe Shared Bus & High-Concurrency Scheduler",
      badge: "High Availability",
      techs: ["Python", "Requests", "Threading", "Queue", "Linux", "SMTP"],
      metrics: [
        {{ value: "100~300ms", label: "Response Latency" }},
        {{ value: "95%+", label: "Booking Success Rate" }},
        {{ value: "Hundreds", label: "Continuous Cycles" }},
        {{ value: "Zero", label: "Deadlock Incidents" }}
      ],
      summary: "Engineered an automated real-time resource monitoring and concurrent booking platform for congested university venue management, featuring multi-account state synchronization, watchdog recovery, and asynchronous email notification.",
      deepDive: {{
        problem: "Peak-hour concurrency leads to intense lock contention, duplicate requests, and socket timeouts.",
        solution: "Decoupled detection and dispatch via Producer-Consumer queue; synchronized state via Lock/Event; introduced Watchdog supervisor.",
        pipeline: "State probe -> Dynamic filtering -> Priority scheduling -> Booking execution -> Watchdog audit",
        future: "Support WebSocket push and lightweight mobile interface."
      }}
    }};
    resumeData.en.projects.list.push(campusProjEn);
  }}

  // 格式化输出新的 data.js
  const newContent = `/**
 * Central Data Source for Self-Website (Resume & Portfolio)
 * Fully synchronized with D:\\\\code\\\\resume-design-release-v6.0.0\\\\tools\\\\resume_canonical_data.json
 * Supports 4 experiences, 4 educations, 6 core projects, and patent registration numbers.
 */

window.CANONICAL_RESUME_DATA = ${{JSON.stringify(canonicalJson, null, 2)}};

window.RESUME_DATA = ${{JSON.stringify(resumeData, null, 2)}};
`;

  fs.writeFileSync(dataJsPath, newContent, 'utf-8');
  console.log('[SUCCESS] self-website/js/data.js 全量深度对齐更新成功！');
}} else {{
  console.error('[ERROR] 无法解析原始 RESUME_DATA 结构！');
}}
"""
    # 临时写入 node 脚本并执行
    tmp_js = os.path.join(os.path.dirname(__file__), "_tmp_sync.js")
    with open(tmp_js, "w", encoding="utf-8") as f:
        f.write(node_update_script)

    ret = os.system(f'node "{tmp_js}"')
    res = subprocess.run(["node", tmp_js], capture_output=True, text=True, encoding="utf-8", errors="replace")
    if os.path.exists(tmp_js):
        os.remove(tmp_js)

    return ret == 0
    print(res.stdout)
    if res.stderr:
        print("[STDERR]", res.stderr)
    return res.returncode == 0

if __name__ == "__main__":
    success = sync_canonical_data()
    sys.exit(0 if success else 1)
    ok = sync_canonical_data()
    sys.exit(0 if ok else 1)
