import React from 'react';
import { motion } from 'framer-motion';
import { WireframeScene } from './WireframeScene';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 min-h-[70vh] flex items-center overflow-hidden bg-white">
      {/* Background Radial Ambient Glow */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-radial-ambient pointer-events-none opacity-80" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start space-y-8 z-10"
        >
          {/* Badge indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/60 text-indigo-950 text-xs font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>4 个数字产品已上线稳定运行</span>
            <span className="text-indigo-200">|</span>
            <span className="text-indigo-600 font-semibold flex items-center gap-1">
              Minimal Tech Aesthetic <Sparkles className="w-3 h-3 text-indigo-500" />
            </span>
          </div>

          {/* Title with Gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            我的产品门户
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 font-extrabold">
              数字产品矩阵
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
            探索我打造的数字产品与解决方案，
            让技术驱动创新，让价值触手可及。
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-slate-900 text-white font-medium text-base shadow-lg shadow-slate-900/10 hover:bg-indigo-600 hover:shadow-indigo-600/25 transition-all duration-300 group"
            >
              <span>探索全部产品</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#docs"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-slate-100 hover:bg-slate-200/70 text-slate-800 font-medium text-base transition-colors border border-slate-200/80"
            >
              <span>查看架构文档</span>
            </a>
          </div>

          {/* Metrics */}
          <div className="pt-6 border-t border-slate-100 w-full grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">4 个</div>
              <div className="text-xs text-slate-500 mt-0.5">上线核心站点</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">全天候高可用</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900">自主研发</div>
              <div className="text-xs text-slate-500 mt-0.5">云原生与自动化</div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Wireframe Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 w-full"
        >
          <WireframeScene />
        </motion.div>
      </div>
    </section>
  );
};
