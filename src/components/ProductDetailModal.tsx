import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/products';
import { ProductIcon } from './ProductIcon';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-portal-modal overflow-hidden z-10 my-8"
        >
          {/* Top Banner & Close Button */}
          <div className="p-6 sm:p-8 bg-slate-50/80 border-b border-slate-100 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <ProductIcon iconName={product.iconName} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60 font-semibold">
                    {product.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{product.version}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">{product.name}</h2>
                <p className="text-sm text-slate-500">{product.tagline}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Full Description */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">产品概述</h4>
              <p className="text-slate-700 text-sm leading-relaxed font-normal">
                {product.fullDescription}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-100 text-slate-600 rounded-md border border-slate-200/60"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Key Highlights */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">核心特性与优势</h4>
              <div className="grid grid-cols-1 gap-2.5">
                {product.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">工程指标 (Specifications)</h4>
              <div className="grid grid-cols-3 gap-3">
                {product.specs.map((spec, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200/70 p-3 rounded-2xl">
                    <div className="text-[11px] text-slate-400">{spec.label}</div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">
              SLA: {product.metrics}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                关闭
              </button>
              <a
                href={product.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-600/20 transition-all"
              >
                <span>进入产品控制台</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
