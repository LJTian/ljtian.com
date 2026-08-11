import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-indigo-400 font-bold font-mono text-xs">
                AP
              </div>
              <span className="font-semibold text-slate-900 text-lg">
                Aura <span className="font-light text-slate-400">Portal</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              基于极简主义与科技感工程设计的个人产品门户，汇聚自动化构建流水线、云原生技术文档、个人博客与资讯平台。
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 项核心服务全部正常运行中</span>
            </div>
          </div>

          {/* Links Column 1: Products */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">上线产品与服务</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="https://maker-flow.ljtian.com/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  MakerFlow 个人构建流水线 ↗
                </a>
              </li>
              <li>
                <a href="https://blog.ljtian.com/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  LJTian's 技术博客 ↗
                </a>
              </li>
              <li>
                <a href="https://kubebuilder.cn/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  Kubebuilder 中文文档 ↗
                </a>
              </li>
              <li>
                <a href="https://thub.iot-home.cn/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
                  THub 科技资讯集合 ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">技术架构与规范</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#docs" className="hover:text-indigo-600 transition-colors">DESIGN_SPEC.md 规格说明书</a></li>
              <li><a href="#solutions" className="hover:text-indigo-600 transition-colors">云原生与 CI/CD 解决方案</a></li>
              <li><a href="#hero" className="hover:text-indigo-600 transition-colors">Realtime 3D Spatial Canvas Engine</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div>
            © {new Date().getFullYear()} LJTian Product Portal. Minimalist Tech Design.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-colors"
          >
            <span>返回顶部</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
