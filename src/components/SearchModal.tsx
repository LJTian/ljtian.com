import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command, ArrowRight } from 'lucide-react';
import { Product, products } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = products.filter(
    (p) =>
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Command Palette Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-portal-modal overflow-hidden z-10"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-100">
            <Search className="w-5 h-5 text-slate-400 ml-2 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索产品、标签或技术规范..."
              className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-base focus:outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-mono text-slate-400 bg-slate-100 rounded border border-slate-200 mr-2">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-96 overflow-y-auto p-2">
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-600 text-xs font-bold font-mono">
                      {product.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{product.tagline}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-slate-400 text-sm">
                没有找到匹配 "{query}" 的产品
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>使用 快捷键选择产品</span>
            <span>共 {results.length} 个结果</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
