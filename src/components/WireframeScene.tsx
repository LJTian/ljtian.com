import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, ShieldCheck, Code2, CheckCircle2, Globe, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';

interface FlowNode {
  id: string;
  step: string;
  title: string;
  sub: string;
  badge: string;
  icon: React.ReactNode;
}

export const WireframeScene: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 6 Authentic MakerFlow Pipeline Steps
  const flowNodes: FlowNode[] = [
    // Top Row (0, 1, 2: Left to Right)
    {
      id: 'req',
      step: '①',
      title: 'Requirement',
      sub: '一句话需求',
      badge: 'INPUT',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-500" />,
    },
    {
      id: 'pro',
      step: '②',
      title: 'Draft PRO',
      sub: 'AI 生成规格书',
      badge: 'SPEC',
      icon: <Terminal className="w-3.5 h-3.5 text-blue-600" />,
    },
    {
      id: 'gate1',
      step: '③',
      title: 'Approve PRO',
      sub: 'Gate 1 对齐审核',
      badge: 'GATE 1',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
    },
    // Bottom Row (3, 4, 5: Right to Left)
    {
      id: 'assemble',
      step: '④',
      title: 'Assemble MVP',
      sub: '匹配模板与 Skill',
      badge: 'ASSEMBLE',
      icon: <Code2 className="w-3.5 h-3.5 text-indigo-600" />,
    },
    {
      id: 'gate2',
      step: '⑤',
      title: 'Approve MVP',
      sub: 'Gate 2 本地验收',
      badge: 'GATE 2',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />,
    },
    {
      id: 'deploy',
      step: '⑥',
      title: 'Deploy Public',
      sub: '一键部署公网流量',
      badge: 'LIVE',
      icon: <Globe className="w-3.5 h-3.5 text-cyan-600" />,
    },
  ];

  // Mouse tilt tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Infinite smooth flow pulse simulation (0 -> 1 -> 2 -> 3 -> 4 -> 5)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowNodes.length);
    }, 1400);
    return () => clearInterval(timer);
  }, [flowNodes.length]);

  return (
    <div className="relative w-full flex items-center justify-center py-6 select-none">
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-cyan-500/10 blur-3xl pointer-events-none animate-pulse-subtle" />

      {/* 3D Stage Container (S-Curve 2-Row Flowchart) */}
      <div
        className="relative w-full max-w-[500px] lg:max-w-[560px] p-2 transition-transform duration-300 ease-out z-10"
        style={{
          transform: `perspective(1000px) rotateX(${10 + mousePos.y * -6}deg) rotateY(${mousePos.x * 8}deg) rotateZ(${mousePos.x * 1.2}deg)`,
        }}
      >
        <div className="relative flex flex-col gap-6 p-4 sm:p-6 bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-3xl shadow-2xl shadow-indigo-500/10">
          
          {/* Top Row: Cards ① -> ② -> ③ */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 relative items-center">
            {/* Card ① */}
            <CardNode node={flowNodes[0]} isActive={activeStep === 0} isPassed={activeStep > 0} />
            
            {/* Arrow 1 -> 2 */}
            <div className="absolute left-[31%] top-1/2 -translate-y-1/2 z-20 text-indigo-400">
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>

            {/* Card ② */}
            <CardNode node={flowNodes[1]} isActive={activeStep === 1} isPassed={activeStep > 1} />

            {/* Arrow 2 -> 3 */}
            <div className="absolute left-[64%] top-1/2 -translate-y-1/2 z-20 text-indigo-400">
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>

            {/* Card ③ */}
            <CardNode node={flowNodes[2]} isActive={activeStep === 2} isPassed={activeStep > 2} />
          </div>

          {/* Downward Connector Arrow: Card ③ -> Card ④ */}
          <div className="absolute right-[8%] top-[45%] -translate-y-1/2 z-20 text-indigo-500 flex flex-col items-center">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Bottom Row: Cards ⑥ <- ⑤ <- ④ (Reversed Flow: Right to Left) */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 relative items-center pt-2">
            {/* Card ⑥ (Final Step on the Left) */}
            <CardNode node={flowNodes[5]} isActive={activeStep === 5} isPassed={activeStep > 5} />

            {/* Arrow 5 <- 6 */}
            <div className="absolute left-[31%] top-1/2 -translate-y-1/2 z-20 text-indigo-400">
              <ArrowLeft className="w-4 h-4 animate-pulse" />
            </div>

            {/* Card ⑤ */}
            <CardNode node={flowNodes[4]} isActive={activeStep === 4} isPassed={activeStep > 4} />

            {/* Arrow 4 <- 5 */}
            <div className="absolute left-[64%] top-1/2 -translate-y-1/2 z-20 text-indigo-400">
              <ArrowLeft className="w-4 h-4 animate-pulse" />
            </div>

            {/* Card ④ (Start of Bottom Row on the Right) */}
            <CardNode node={flowNodes[3]} isActive={activeStep === 3} isPassed={activeStep > 3} />
          </div>

        </div>
      </div>
    </div>
  );
};

interface CardNodeProps {
  node: FlowNode;
  isActive: boolean;
  isPassed: boolean;
}

const CardNode: React.FC<CardNodeProps> = ({ node, isActive, isPassed }) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.05 : 1,
        y: isActive ? -3 : 0,
      }}
      transition={{ duration: 0.25 }}
      className={`relative w-full rounded-2xl p-2.5 sm:p-3 border flex flex-col justify-between min-h-[95px] sm:min-h-[105px] transition-all duration-300 ${
        isActive
          ? 'bg-white border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-500/20'
          : isPassed
          ? 'bg-white border-slate-200/90 shadow-xs'
          : 'bg-slate-50/70 border-slate-200/60 opacity-60'
      }`}
    >
      {/* Top Header: Step Badge + Icon */}
      <div className="flex items-center justify-between gap-1">
        <div className={`w-5 h-5 rounded-md font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border ${
          isActive
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-slate-100 text-slate-600 border-slate-200'
        }`}>
          {node.step}
        </div>

        <div className="p-1 rounded-md bg-slate-50 border border-slate-100">
          {node.icon}
        </div>
      </div>

      {/* Title + Sub */}
      <div className="mt-1.5 space-y-0.5">
        <div className="text-[11px] sm:text-xs font-bold text-slate-900 tracking-tight leading-tight">
          {node.title}
        </div>
        <div className="text-[9.5px] sm:text-[10px] text-slate-500 line-clamp-1">
          {node.sub}
        </div>
      </div>

      {/* Bottom Status Tag */}
      <div className="mt-1 pt-1 border-t border-slate-100/80 flex items-center justify-between text-[8px] sm:text-[9px] font-mono">
        <span className={`px-1.5 py-0.2 rounded border ${
          isActive
            ? 'bg-indigo-50 text-indigo-700 border-indigo-200 font-semibold'
            : 'bg-slate-100 text-slate-400 border-slate-200'
        }`}>
          {node.badge}
        </span>
      </div>
    </motion.div>
  );
};
