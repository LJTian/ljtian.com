import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, products } from '../data/products';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { Search, Sparkles, Filter } from 'lucide-react';

interface ProductGridProps {
  onSelectProduct: (product: Product) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  onSelectProduct,
  searchQuery,
  setSearchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory = selectedCategory === '全部' || p.category === selectedCategory;
      const matchQuery =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="products" className="py-20 bg-slate-50/60 border-t border-slate-200/60 relative">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-blueprint-grid opacity-35 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-600 font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              PRODUCT MATRIX
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              我的产品
            </h2>
            <p className="mt-2 text-slate-600 text-base max-w-lg">
              探索经过高标准工程设计的工具矩阵，涵盖 AI 智能体、实时数据流与基础设施。
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="按名称或标签搜索..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                清除
              </button>
            )}
          </div>
        </div>

        {/* Category Tab Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          productCount={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">未找到匹配的产品</h3>
            <p className="text-sm text-slate-500 mt-1">
              请尝试调整搜索关键字或切换上方产品分类。
            </p>
            <button
              onClick={() => {
                setSelectedCategory('全部');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-slate-900 text-white rounded-full hover:bg-indigo-600 transition-colors"
            >
              重置筛选条件
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
