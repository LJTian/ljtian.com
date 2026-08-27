import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { Product } from './data/products';
import { Sparkles, Terminal, FileText, Cpu, CheckCircle } from 'lucide-react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState('products');

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExploreClick = () => {
    handleNavigate('products');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-600">
      {/* Fixed Sticky Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* 2. Product Grid Section */}
        <ProductGrid
          onSelectProduct={(product) => setSelectedProduct(product)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* 3. Solutions Section: Authentic Technical Pillars */}
        <section id="solutions" className="py-20 bg-white border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 font-semibold uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
                <Sparkles className="w-3.5 h-3.5" />
                TECHNICAL SOLUTIONS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                全栈技术与解决方案范式
              </h2>
              <p className="text-slate-600 text-base">
                围绕 CI/CD 流水线、Kubernetes Operator 与自动化资讯聚合的工程实践。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a 
                href="https://maker-flow.ljtian.com/"
                target="_blank"
                rel="noreferrer"
                className="group bg-slate-50/70 border border-slate-200/80 rounded-3xl p-8 hover:border-indigo-300/90 transition-all shadow-sm hover:shadow-portal-hover block"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Terminal className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  MakerFlow 自动化流水线
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  个人轻量级 CI/CD 引擎，支持基于容器隔离的任务节点编排、日志实时推流与多端发布。
                </p>
                <div className="text-xs font-mono text-indigo-600 font-medium">访问 MakerFlow 平台 →</div>
              </a>

              <a 
                href="https://kubebuilder.cn/"
                target="_blank"
                rel="noreferrer"
                className="group bg-slate-50/70 border border-slate-200/80 rounded-3xl p-8 hover:border-indigo-300/90 transition-all shadow-sm hover:shadow-portal-hover block"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Cpu className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  Kubebuilder 中文生态
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Kubernetes CRD 与 Controller 设计最佳实践，帮助开发者轻松落地云原生 Operator 架构。
                </p>
                <div className="text-xs font-mono text-indigo-600 font-medium">进入 Kubebuilder.cn →</div>
              </a>

              <a 
                href="https://thub.iot-home.cn/"
                target="_blank"
                rel="noreferrer"
                className="group bg-slate-50/70 border border-slate-200/80 rounded-3xl p-8 hover:border-indigo-300/90 transition-all shadow-sm hover:shadow-portal-hover block"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <CheckCircle className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  THub 资讯数据聚合
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  自动化抓取与清洗前沿 AI、云原生与开源动态，打造无噪高效的资讯浏览体验。
                </p>
                <div className="text-xs font-mono text-indigo-600 font-medium">查看 THub 资讯快讯 →</div>
              </a>
            </div>
          </div>
        </section>

        {/* 4. Documentation Section */}
        <section id="docs" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint-grid opacity-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono">
                <FileText className="w-3.5 h-3.5" />
                <span>PORTFOLIO DESIGN SPECIFICATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                极简、通透与纯粹的前端工程呈现
              </h2>
              <p className="text-slate-400 text-base leading-relaxed">
                本门户网站严格遵循 <code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded font-mono">DESIGN_SPEC.md</code> 规格指南，
                融合极简留白艺术与精密科技图形，无多余示例数据，专注呈现您真正的产品成果。
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border border-slate-800 p-4 rounded-2xl bg-slate-800/40">
                  <div className="text-2xl font-bold text-white font-mono">6 个</div>
                  <div className="text-xs text-slate-400 mt-1">上线核心产品/站点</div>
                </div>
                <div className="border border-slate-800 p-4 rounded-2xl bg-slate-800/40">
                  <div className="text-2xl font-bold text-white font-mono">100%</div>
                  <div className="text-xs text-slate-400 mt-1">真实数据与外链支持</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 font-mono text-xs text-slate-300 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3 text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </span>
                <span>AUTHENTIC_PRODUCTS.json</span>
              </div>
              <pre className="text-indigo-300 overflow-x-auto text-[11px] leading-relaxed">
{`[
  { "name": "MakerFlow Pipeline", "url": "https://maker-flow.ljtian.com/" },
  { "name": "LJTian's Blog", "url": "https://blog.ljtian.com/" },
  { "name": "Kubebuilder 中文", "url": "https://kubebuilder.cn/" },
  { "name": "THub 资讯集合", "url": "https://thub.iot-home.cn/" },
  { "name": "今天吃什么", "url": "https://eat.ljtian.com/" },
  { "name": "English Core 3000", "url": "https://english.ljtian.com/" }
]`}
              </pre>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}

export default App;
