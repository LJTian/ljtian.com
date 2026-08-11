import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, Command } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'products', label: '产品矩阵' },
    { id: 'solutions', label: '解决方案' },
    { id: 'docs', label: '架构文档' },
    { id: 'about', label: '关于' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 h-[72px] z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-header border-b border-slate-200/90 shadow-sm'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Left: Logo + Brand Name */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-800 shadow-md group-hover:border-indigo-500/80 transition-colors">
            {/* SVG Wireframe Logo Element */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 stroke-current fill-none stroke-[1.75] transition-colors" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <div className="absolute inset-0 bg-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 text-lg tracking-tight group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
              Aura <span className="font-light text-slate-400">Portal</span>
              <span className="text-[10px] font-mono uppercase bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200/60 tracking-wider font-semibold">PRO</span>
            </span>
          </div>
        </div>

        {/* Middle: Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/70">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + User Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-1.5 text-sm text-slate-500 hover:text-slate-800 bg-slate-100/80 hover:bg-slate-100 border border-slate-200/80 rounded-full transition-all duration-200 group"
            title="搜索产品 (Cmd+K)"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
            <span className="hidden sm:inline text-xs font-medium">搜索产品与文档...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          <button 
            onClick={() => alert("用户中心: 您已连接微服务门户")}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full border border-transparent hover:border-slate-200 transition-all"
            title="个人账号"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-base font-medium text-slate-700 hover:text-indigo-600 border-b border-slate-100 last:border-0"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-base font-medium text-indigo-600"
          >
            <Search className="w-4 h-4" /> 检索产品与文档...
          </button>
        </div>
      )}
    </header>
  );
};
