# Product Portal Frontend Design Specification

## 项目定位

这是一个个人/团队产品门户网站。

目标：
- 展示已经上线的多个数字产品
- 快速进入不同产品
- 体现高级、极简、科技感品牌形象

设计关键词：
- Apple 官网风格
- Minimal Design
- White Space
- Light 3D
- Wireframe Geometry
- Product Gallery

---

# Overall Visual Style

## Theme

白色极简科技风。

不要：
- 黑色赛博朋克
- 大量粒子
- 复杂 3D 模型
- 密集网络节点

需要：
- 大量留白
- 浅灰线条
- 微弱蓝色点缀
- 轻空间感

## Color System

Background:
#FFFFFF

Secondary Background:
#F8FAFC

Border:
#E5E7EB

Text Primary:
#111827

Text Secondary:
#64748B

Accent:
#2563EB

---

# Page Structure

页面结构：

```
/
|
├── Header
|
├── Hero Section
|
├── Product Grid
|
├── Footer
```

---

# Header

高度：
72px

布局：
左：Logo + Brand Name
中：Navigation (产品, 解决方案, 文档, 关于)
右：Search Icon, User Icon

样式：
- 白色背景
- 底部极细 border
- 固定顶部

---

# Hero Section

高度：
70vh

左右布局：
Left: Title, Description, Button
Right: 3D Wireframe / Spatial UI Visual

## Left Content

Title:
我的产品门户

Subtitle:
探索我打造的数字产品与解决方案，
让技术驱动创新，让价值触手可及。

Button:
探索全部产品 →

字体：
Title: 48px - 64px, Weight: 700

---

# Hero Visual

不要真实 3D 模型。

使用：
SVG + CSS 3D Transform / Spatial Canvas Line-art

视觉元素：
- 透明线框 cube
- 透视网格
- 几何线
- 浅蓝光点

效果：
类似 Blueprint / Spatial UI

示意：
```
    ┌───────┐
   /       /|
  /_______/ |
  |       | |
  |   ◇   | /
  |_______|/
```

动画：
- 缓慢漂浮
- 微弱旋转
- opacity 呼吸效果

不要：
- 快速动画
- 粒子爆炸

---

# Product Section

标题：
我的产品

布局：
Grid

Desktop: 2 columns
Mobile: 1 column

结构：
```
+----------------+
| Icon           |
|                |
| Product Name   |
|                |
| Description    |
|                |
|              → |
+----------------+
```

---

# Product Card

尺寸：
height: 220px (min-h-52 / min-h-[220px])

Style: 白色背景
border: 1px solid #E5E7EB
radius: 24px (rounded-3xl)
shadow: 非常轻 (shadow-sm)

hover:
向上移动：translateY(-6px)
shadow 增强 (shadow-xl / shadow-blue-500/5)

---

# Product Icon

不要图片。
使用：SVG Icon / Lucide Icon

外层：
六边形 / 圆形线框

颜色：
浅蓝线条。

---

# Background Decoration

页面背景加入：SVG Decoration

元素：
1. 大型淡网格
2. 透视辅助线
3. 几何线框

透明度：0.05 - 0.15
位置：Hero区域右侧 & 页面背景

---

# Animation

使用：Framer Motion

动画：
## Hero
initial: opacity 0, y 20
animate: opacity 1, y 0
duration: 0.8s

## Product Card
hover: scale 1.02, translateY(-6px)

---

# Responsive

Desktop: >=1024
Tablet: 768-1024
Mobile: <768

Mobile:
Hero: 上下布局
Product: 单列
隐藏复杂背景线条。

---

# Recommended Tech Stack

Framework: React + Vite (or Next.js 15)
Language: TypeScript
Styling: Tailwind CSS
Animation: Framer Motion
Icons: Lucide React
SVG: Custom SVG

---

# Component Structure

```
src
components
├── Header.tsx
├── Hero.tsx
├── WireframeScene.tsx
├── ProductGrid.tsx
├── ProductCard.tsx
├── CategoryFilter.tsx
├── SearchModal.tsx
├── ProductDetailModal.tsx
└── Footer.tsx
data
└── products.ts
```

---

# Product Data Example

```ts
export const products = [
  {
    id: "ai-assistant",
    name: "AI Assistant",
    tagline: "智能对话与内容生成平台",
    description: "专为团队设计的多模态 AI 智能体平台，支持知识库检索与自动化流程。",
    category: "AI 工具",
    tags: ["LLM", "RAG", "Automation"],
    url: "#",
    icon: "Bot",
    metrics: "10k+ Active Users",
    featured: true
  },
  {
    id: "data-dashboard",
    name: "Data Dashboard",
    tagline: "数据可视化分析工具",
    description: "实时数据流与多维度分析仪表盘，秒级图表生成与数据决策支持。",
    category: "数据分析",
    tags: ["Analytics", "Real-time", "Charts"],
    url: "#",
    icon: "BarChart3",
    metrics: "99.9% Uptime",
    featured: true
  }
]
```

---

# Final Experience Goal

用户进入网站：
第一感觉：“这是一个高级产品实验室”
第二感觉：“这里有多个产品，可以快速进入”
整体：Apple 极简 + Linear 科技感 + 轻量 3D 空间感
