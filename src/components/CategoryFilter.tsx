import React from 'react';
import { categories } from '../data/products';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  productCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  productCount,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Count Indicator */}
      <div className="text-xs font-mono text-slate-400">
        共显示 <span className="text-slate-900 font-semibold">{productCount}</span> 项核心产品
      </div>
    </div>
  );
};
