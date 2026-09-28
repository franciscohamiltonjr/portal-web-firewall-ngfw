import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info, Shield, Cpu, Lock, Terminal, Activity, Layers, Network, BookOpen } from 'lucide-react';
import { GLOSSARY_MAP, GLOSSARY_TERMS, GlossaryCategory } from '../data/glossaryData';

export interface TechTermDefinition {
  title: string;
  category: 'HARDWARE' | 'INSPEÇÃO' | 'CRIPTOGRAFIA' | 'ARQUITETURA' | 'DIMENSIONAMENTO' | 'IDENTIDADE' | 'REDES & PROTOCOLOS';
  definition: string;
  practicalTip?: string;
  icon?: 'cpu' | 'shield' | 'lock' | 'terminal' | 'activity' | 'layers' | 'network';
}

const CATEGORY_STYLES: Record<string, string> = {
  HARDWARE: 'bg-amber-950/80 text-amber-400 border-amber-800/80',
  INSPEÇÃO: 'bg-red-950/80 text-red-400 border-red-800/80',
  CRIPTOGRAFIA: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80',
  ARQUITETURA: 'bg-purple-950/80 text-purple-400 border-purple-800/80',
  'ARQUITETURA & HA': 'bg-purple-950/80 text-purple-400 border-purple-800/80',
  DIMENSIONAMENTO: 'bg-sky-950/80 text-sky-400 border-sky-800/80',
  IDENTIDADE: 'bg-indigo-950/80 text-indigo-400 border-indigo-800/80',
  'REDES & PROTOCOLOS': 'bg-cyan-950/80 text-cyan-400 border-cyan-800/80'
};

interface TechTooltipProps {
  /** Term key to lookup in glossary, e.g. "nat", "dpi", "lacp", "ha", "asic" */
  termKey?: string;
  /** Custom title if not using termKey */
  title?: string;
  /** Custom definition text */
  definition?: string;
  /** Custom category */
  category?: 'HARDWARE' | 'INSPEÇÃO' | 'CRIPTOGRAFIA' | 'ARQUITETURA' | 'DIMENSIONAMENTO' | 'IDENTIDADE' | 'REDES & PROTOCOLOS' | 'ARQUITETURA & HA';
  /** Practical tip */
  practicalTip?: string;
  /** Position of the tooltip */
  position?: 'top' | 'bottom';
  /** Children elements that trigger the tooltip on hover/click */
  children?: React.ReactNode;
  /** Optional extra css class for the inline trigger wrapper */
  className?: string;
  /** Callback to open the full glossary modal */
  onOpenGlossary?: (termId: string) => void;
}

export const TechTooltip: React.FC<TechTooltipProps> = ({
  termKey,
  title: customTitle,
  definition: customDefinition,
  category: customCategory,
  practicalTip: customTip,
  position = 'top',
  children,
  className = '',
  onOpenGlossary
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Lookup in glossaryData first, then fallback
  const key = (termKey || '').toLowerCase().trim();
  const matchedGlossary = GLOSSARY_MAP[key];

  const termId = matchedGlossary?.id || key;
  const title = customTitle || matchedGlossary?.term || termKey || 'Conceito Técnico';
  const definition = customDefinition || matchedGlossary?.definition || 'Definição técnica de firewall e cibersegurança.';
  const category = customCategory || matchedGlossary?.category || 'ARQUITETURA';
  const practicalTip = customTip || matchedGlossary?.practicalTip;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(true), 120);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  const renderIcon = () => {
    switch (matchedGlossary?.icon) {
      case 'cpu': return <Cpu className="w-3.5 h-3.5 text-amber-400" />;
      case 'lock': return <Lock className="w-3.5 h-3.5 text-emerald-400" />;
      case 'activity': return <Activity className="w-3.5 h-3.5 text-red-400" />;
      case 'layers': return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
      case 'network': return <Network className="w-3.5 h-3.5 text-cyan-400" />;
      case 'terminal': return <Terminal className="w-3.5 h-3.5 text-sky-400" />;
      default: return <Shield className="w-3.5 h-3.5 text-red-400" />;
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleToggleClick}
      className={`relative inline-flex items-center gap-0.5 cursor-help group focus:outline-none ${className}`}
      tabIndex={0}
      role="button"
      aria-label={`Ver definição de ${title}`}
    >
      {/* Trigger Text / Content */}
      <span className="border-b border-dashed border-red-400/80 group-hover:border-red-400 text-white font-medium transition-colors">
        {children || termKey}
      </span>

      {/* Small informative indicator pill */}
      <span className="inline-block text-[9px] font-mono text-red-400 ml-0.5 opacity-70 group-hover:opacity-100 group-hover:text-red-300">
        ⓘ
      </span>

      {/* The Tooltip Card Popup */}
      {isOpen && (
        <span
          role="tooltip"
          className={`block absolute z-50 left-1/2 -translate-x-1/2 w-72 sm:w-84 p-3.5 rounded-xl bg-[#090b10]/95 backdrop-blur-md border border-red-900/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)] text-left font-sans text-xs animate-in fade-in zoom-in-95 duration-150 pointer-events-auto select-text ${
            position === 'top'
              ? 'bottom-full mb-2.5'
              : 'top-full mt-2.5'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header: Category Badge + Icon */}
          <span className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-800">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border ${CATEGORY_STYLES[category] || 'bg-slate-900 text-slate-300 border-slate-800'}`}>
              {renderIcon()}
              <span>{category}</span>
            </span>

            <span className="text-[10px] text-slate-500 font-mono">
              Glossário Técnico
            </span>
          </span>

          {/* Title */}
          <strong className="block font-bold text-white text-xs sm:text-sm tracking-tight mb-1.5 flex items-center gap-1.5 font-mono">
            {title}
          </strong>

          {/* Definition */}
          <span className="block text-slate-300 text-[11px] sm:text-xs leading-relaxed">
            {definition}
          </span>

          {/* Practical Tip */}
          {practicalTip && (
            <span className="block mt-2.5 pt-2 border-t border-slate-800/80 flex items-start gap-1.5 text-[10px] text-amber-300/90 leading-normal bg-amber-950/20 p-1.5 rounded-lg border border-amber-900/30">
              <span className="font-bold text-amber-400 font-mono shrink-0 uppercase">Dica:</span>
              <span>{practicalTip}</span>
            </span>
          )}

          {/* Link to Full Glossary Modal */}
          {onOpenGlossary && (
            <span className="block mt-2.5 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  onOpenGlossary(termId);
                }}
                className="w-full py-1 text-center rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-red-400 hover:text-red-300 font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-800 hover:border-red-500/50"
              >
                <BookOpen className="w-3 h-3 text-red-400" />
                <span>Ver no Glossário Completo →</span>
              </button>
            </span>
          )}

          {/* Pointing Arrow */}
          <span
            className={`block absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-[#090b10] border-r border-b border-red-900/60 rotate-45 ${
              position === 'top'
                ? '-bottom-1.5'
                : '-top-1.5 rotate-[225deg]'
            }`}
          />
        </span>
      )}
    </span>
  );
};
