export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: '开发者服务' | '内容与社区';
  tagline: string;
  description: string;
  fullDescription: string;
  url: string;
  iconName: 'workflow' | 'chat' | 'shield' | 'zap' | 'code' | 'cpu' | 'layers' | 'utensils' | 'book' | 'bot';
  metrics: string;
  tags: string[];
  version: string;
  status: 'online' | 'active' | 'beta';
  featured?: boolean;
  highlights: string[];
  specs: ProductSpec[];
}

export const categories = ['全部', '开发者服务', '内容与社区'] as const;

export const products: Product[] = [
  {
    id: 'maker-flow',
    name: 'MakerFlow Pipeline',
    category: '开发者服务',
    tagline: 'Personal MVP builder\'s pipeline. Infrastructure first. Business logic second.',
    description: '重基础设施，轻业务逻辑。为开发者打造的个人 MVP 孵化流水线，消除重复搭建，支持 6-Step 自动化编排与秒级上线。',
    fullDescription: 'MakerFlow 是专为独立开发者与极客打造的 MVP 孵化中台（Heavy Infrastructure, Light Logic）。它通过标准化的 6 步流水线（Requirement ➔ AI Draft PRO ➔ Gate 1 ➔ Assemble MVP ➔ Gate 2 ➔ Deploy），结合模板库（templates/）与 Agent SOP（skills/），消除所有重复环境配置，让每个产品想法在数分钟内转化为生产级上线 MVP。',
    url: 'https://maker-flow.ljtian.com/',
    iconName: 'workflow',
    metrics: '~10 分钟 MVP 孵化',
    tags: ['CI/CD Pipeline', 'MVP 孵化', 'Go & Vite', 'Docker & Nginx'],
    version: 'v1.6.0',
    status: 'online',
    featured: true,
    highlights: [
      '两重关卡对齐：Gate 1 对齐 PRO 规格书，Gate 2 本地验收，避免偏离方向',
      '模板库与 Agent SOP 双驱动：提供 Go Gin API、Vite React、Docker 生产部署模板',
      '秒级公网发布：内置 Cloudflare DNS 与 Nginx 自动 SSL 脚本',
    ],
    specs: [
      { label: '交付周期', value: '~10 Mins' },
      { label: '架构范式', value: 'Two-Gate SOP' },
      { label: '基础设施', value: 'Docker & Nginx' },
    ],
  },
  {
    id: 'grokbot-cn',
    name: 'Grok Bot 实战指南',
    category: '开发者服务',
    tagline: 'SpaceX 工程师撰写 · 72 小时直播构建 · 24 页全景复盘',
    description: 'SpaceX 工程师团队撰写的 Grok Bot 深度实战指南中文版。涵盖多 Agent 编排、全自动 PR 流水线与实战 Prompt 库。',
    fullDescription: 'SpaceX / xAI 工程师团队撰写的 Grok Bot 深度实战指南中文版。提炼自 72 小时无剪辑实战直播（从零构建游戏工作室 Thursday Arena，累计自动化合并 433 个 PR），全景覆盖多 Agent 协作、专属计算机虚拟机底座、确定性验证、高阶 Prompt 肌肉记忆与一线落地清单。支持在线交互阅读、高清 PDF 下载及打印。',
    url: 'https://grokbot-cn.ljtian.com/',
    iconName: 'bot',
    metrics: '24 页高浓度复盘',
    tags: ['AI Agent', 'Grok Bot', '多 Agent 编排', '实战复盘'],
    version: 'v1.0.0',
    status: 'online',
    featured: true,
    highlights: [
      '72 小时极限实操沉淀：真实见证 433 个 PR 自动化合并与首日 2,000+ 真实玩家落地',
      '三大核心基石假设：队友范式而非任务范式、专属计算机虚拟机与全天候云端运行',
      '全功能交互体验：支持章节秒级跳转、Prompt 一键复制、中文高清 PDF 下载与打印',
    ],
    specs: [
      { label: '内容体量', value: '24 页深度专著' },
      { label: '核心主题', value: '多 Agent 协同体系' },
      { label: '入口', value: 'grokbot-cn.ljtian.com' },
    ],
  },
  {
    id: 'blog',
    name: "LJTian's Blog",
    category: '内容与社区',
    tagline: '期待自己成为一个很酷的人，可以拥有一个精彩的人生',
    description: '基于 Next.js + Notion 搭建的技术专栏。记录云原生架构、AI 智能体、Go/Linux 深度实践与系统演进。',
    fullDescription: 'LJTian 的个人技术博客与架构思考沉淀平台。采用 Next.js 前端配合 Notion 无头 CMS 动态驱动，深度涵盖云原生 Kubernetes、AI 智能体开发、Golang 编程语言、Linux 内核探究及工程化实践，践行“期待自己成为一个很酷的人，可以拥有一个精彩的人生”。',
    url: 'https://blog.ljtian.com/',
    iconName: 'chat',
    metrics: 'Notion 动态驱动',
    tags: ['云原生', 'AI 智能体', 'Golang', '架构思考'],
    version: 'v2.5.0',
    status: 'online',
    featured: true,
    highlights: [
      'Notion 无头 CMS 驱动：实时同步写作内容与知识库',
      '全栈深度演进：覆盖 Kubernetes、Golang、Linux 与 AI 智能体',
      'Next.js 极速渲染：支持 SSG 增量渲染与离线缓存',
    ],
    specs: [
      { label: '核心技术', value: 'Next.js + Notion' },
      { label: '内容分类', value: '云原生 / AI / Go' },
      { label: '更新频率', value: '持续演进' },
    ],
  },
  {
    id: 'kubebuilder-cn',
    name: 'Kubebuilder 中文文档',
    category: '开发者服务',
    tagline: 'Kubernetes Operator 与 CRD 扩展开发权威指南',
    description: 'Kubernetes Operator 与 CRD 扩展开发权威中文指南。深入讲解 Controller 对账机制、Admission Webhook 与声明式 API 实战。',
    fullDescription: 'Kubebuilder 官方文档的高质量中文翻译与云原生开发者社区沉淀。详细拆解 Kubernetes Custom Resource Definition (CRD) 设计规范、Controller-runtime 对账循环实现、Validating/Mutating Webhook 部署以及多版本 API 迁移指南，是云原生 Operator 扩展开发的必备权威手册。',
    url: 'https://kubebuilder.cn/',
    iconName: 'shield',
    metrics: 'Kubernetes sigs 社区权威',
    tags: ['Kubernetes', 'CRD 扩展', 'K8s Operator', 'Go Controller'],
    version: 'v3.1.0',
    status: 'online',
    featured: true,
    highlights: [
      '官方标准对齐：与 Kubernetes sigs/kubebuilder 保持同步更新',
      '全套 CronJob 教程：从零手把手实现自定义控制器与 Webhook',
      '多版本 API 迁移：覆盖 go/v3 到 go/v4 插件系统演变指南',
    ],
    specs: [
      { label: '适用对象', value: 'K8s 扩展开发者' },
      { label: '核心机制', value: 'CRD & Controller' },
      { label: '社区热度', value: '热门中文文档' },
    ],
  },
  {
    id: 'thub',
    name: 'THub 资讯集合',
    category: '内容与社区',
    tagline: '全球前沿科技新闻与开源动态实时聚合平台',
    description: '前沿科技、开源动态与硬核技术资讯实时聚合平台。多源头数据自动抓取与快讯清洗，提供一站式技术热点精选。',
    fullDescription: 'THub (Technology Hub) 专为技术人打造的全球科技资讯与开源动态实时聚合中台。通过后台自动化爬虫与多源 RSS 数据流整合，秒级同步全球 AI 最新进展、开源项目动向与云计算前沿快讯，助您快速掌握技术风向标。',
    url: 'https://thub.iot-home.cn/',
    iconName: 'zap',
    metrics: '多源 RSS 实时同步',
    tags: ['开源动态', '科技快讯', '实时抓取', '资讯雷达'],
    version: 'v2.1.0',
    status: 'online',
    featured: true,
    highlights: [
      '多源头流式抓取：自动清洗全球 HackerNews、GitHub Trending、AI 社区快讯',
      '秒级实时同步：智能去重与热度排序',
      '极简阅读界面：响应式设计与夜间模式适配',
    ],
    specs: [
      { label: '抓取源', value: '多源头 RSS / API' },
      { label: '同步时延', value: '秒级实时' },
      { label: '领域覆盖', value: 'AI / 开源 / 云计算' },
    ],
  },
  {
    id: 'eat',
    name: '今天吃什么',
    category: '内容与社区',
    tagline: '纠结症终结者 · 一键决定下一餐',
    description: '帮你从犹豫中解脱的轻量决策工具。随机推荐与偏好筛选，快速敲定「今天吃什么」。',
    fullDescription: '「今天吃什么」是面向日常纠结的轻量决策小站。通过偏好标签、随机抽取与一键重选，把「中午吃啥」从反复纠结变成几秒内的确定答案，适合个人与小团队日常使用。',
    url: 'https://eat.ljtian.com/',
    iconName: 'utensils',
    metrics: '一键终结纠结',
    tags: ['生活工具', '随机决策', '轻量 Web'],
    version: 'v1.0.0',
    status: 'online',
    featured: true,
    highlights: [
      '纠结症友好：快速给出可执行的餐饮选择',
      '轻量即开即用：无需注册，打开即决',
      '适合日常场景：个人、家庭与小团队都能用',
    ],
    specs: [
      { label: '定位', value: '生活决策工具' },
      { label: '入口', value: 'eat.ljtian.com' },
      { label: '形态', value: '轻量 Web App' },
    ],
  },
  {
    id: 'english-core',
    name: 'English Core 3000',
    category: '内容与社区',
    tagline: '极速点读与词频通关面板',
    description: '围绕核心 3000 词的极速点读学习台。支持词表筛选与精读卡片，帮助高效过词与巩固记忆。',
    fullDescription: 'English Core 3000 是面向核心词汇学习的点读与词频通关面板。提供极速筛选（如 50 词快刷）与精读卡片两种模式，把高频核心词的过词、复习与点读集中在一个清晰面板里，适合碎片化英语词汇训练。',
    url: 'https://english.ljtian.com/',
    iconName: 'book',
    metrics: 'Core 3000 词频通关',
    tags: ['英语学习', '核心词汇', '点读', '词频'],
    version: 'v1.0.0',
    status: 'online',
    featured: true,
    highlights: [
      'Core 3000 词频覆盖：聚焦最高价值核心词',
      '双模式学习：极速筛选与精读卡片切换',
      '点读式复习：适合碎片时间高频过词',
    ],
    specs: [
      { label: '词库规模', value: 'Core 3000' },
      { label: '学习模式', value: '筛选 / 卡片' },
      { label: '入口', value: 'english.ljtian.com' },
    ],
  },
];
