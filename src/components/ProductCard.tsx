import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../data/products';
import { ProductIcon } from './ProductIcon';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={() => onSelectProduct(product)}
      className="group relative bg-white border border-slate-200/90 hover:border-indigo-300/90 rounded-3xl p-6 min-h-[220px] flex flex-col justify-between shadow-sm hover:shadow-portal-hover transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Background Ambient Radial Micro Glow */}
      <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      {/* Top Header: Icon + Category Badge */}
      <div className="flex items-start justify-between gap-4">
        <ProductIcon iconName={product.iconName} />

        <div className="flex items-center gap-2">
          {product.featured && (
            <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/70 font-mono">
              Featured
            </span>
          )}
          <span className="text-xs font-mono text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-full border border-slate-200/80">
            {product.category}
          </span>
        </div>
      </div>

      {/* Center Body */}
      <div className="my-4 space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
            {product.name}
          </h3>
          <span className="text-xs font-mono text-slate-400">{product.version}</span>
        </div>
        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {product.description}
        </p>
      </div>

      {/* Bottom Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono text-slate-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
          {product.metrics}
        </span>

        <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center border border-slate-200/80 group-hover:border-indigo-600 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
        </div>
      </div>
    </motion.div>
  );
};
