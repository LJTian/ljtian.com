import React from 'react';
import { MessageSquare, BarChart3, Code2, Cpu, Shield, Layers, GitFork, Zap, LucideIcon } from 'lucide-react';
import { Product } from '../data/products';

interface ProductIconProps {
  iconName: Product['iconName'] | 'chart';
}

export const ProductIcon: React.FC<ProductIconProps> = ({ iconName }) => {
  const getIcon = (): LucideIcon => {
    switch (iconName) {
      case 'chat': return MessageSquare;
      case 'chart': return BarChart3;
      case 'code': return Code2;
      case 'cpu': return Cpu;
      case 'shield': return Shield;
      case 'layers': return Layers;
      case 'workflow': return GitFork;
      case 'zap': return Zap;
      default: return Code2;
    }
  };

  const IconComponent = getIcon();

  return (
    <div className="relative w-12 h-12 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Hexagonal Wireframe SVG */}
      <svg className="absolute inset-0 w-full h-full text-indigo-500/30 group-hover:text-indigo-600 transition-colors" viewBox="0 0 48 48" fill="none">
        <polygon 
          points="24,2 44,13 44,35 24,46 4,35 4,13" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeDasharray="4 2"
          fill="rgba(79, 70, 229, 0.03)" 
        />
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      </svg>

      {/* Center Lucide Icon */}
      <IconComponent className="w-5 h-5 text-indigo-600 z-10 stroke-[1.75]" />
    </div>
  );
};
