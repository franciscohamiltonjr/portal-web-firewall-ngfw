import React, { useState, useMemo, useEffect } from 'react';
import { 
  GLOSSARY_TERMS, 
  GLOSSARY_CATEGORIES, 
  GlossaryTerm, 
  GlossaryCategory 
} from '../data/glossaryData';
import { 
  Search, 
  X, 
  BookOpen, 
  Shield, 
  Cpu, 
  Lock, 
  Terminal, 
  Activity, 
  Layers, 
  Network,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Info
} from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter?: (chapterId: string) => void;
  initialTermId?: string | null;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  initialTermId
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'ALL'>('ALL');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);

  // If initialTermId is provided when opened, select it automatically
  useEffect(() => {
    if (initialTermId) {
      const found = GLOSSARY_TERMS.find(
        t => t.id === initialTermId || t.shortCode.toLowerCase() === initialTermId.toLowerCase()
      );
      if (found) {
        setSelectedTerm(found);
        setSelectedCategory('ALL');
        setSearchQuery('');
      }
    } else if (GLOSSARY_TERMS.length > 0 && !selectedTerm) {
      setSelectedTerm(GLOSSARY_TERMS[0]);
    }
  }, [initialTermId, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered terms
  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return GLOSSARY_TERMS.filter(item => {
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!q) return true;

      const inTerm = item.term.toLowerCase().includes(q);
      const inShortCode = item.shortCode.toLowerCase().includes(q);
      const inDefinition = item.definition.toLowerCase().includes(q);
      const inTip = item.practicalTip.toLowerCase().includes(q);
      const inAliases = item.aliases.some(a => a.toLowerCase().includes(q));

      return inTerm || inShortCode || inDefinition || inTip || inAliases;
    });
  }, [searchQuery, selectedCategory]);

  // When filtered results change, ensure selectedTerm remains valid or falls back to first
  useEffect(() => {
    if (filteredTerms.length > 0) {
      if (!selectedTerm || !filteredTerms.some(t => t.id === selectedTerm.id)) {
        setSelectedTerm(filteredTerms[0]);
      }
    }
  }, [filteredTerms, selectedTerm]);

  if (!isOpen) return null;

  const handleCopyDefinition = (term: GlossaryTerm) => {
    const text = `${term.term}\n\nDefinição: ${term.definition}\n\nDica Prática: ${term.practicalTip}`;
    navigator.clipboard.writeText(text);
    setCopiedTermId(term.id);
    setTimeout(() => setCopiedTermId(null), 2000);
  };

  const handleChapterClick = (chapterId: string) => {
    onClose();
    if (onSelectChapter) {
      onSelectChapter(chapterId);
    }
  };

  const renderIcon = (icon?: string) => {
    switch (icon) {
      case 'cpu': return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'lock': return <Lock className="w-4 h-4 text-emerald-400" />;
      case 'activity': return <Activity className="w-4 h-4 text-red-400" />;
      case 'layers': return <Layers className="w-4 h-4 text-purple-400" />;
      case 'network': return <Network className="w-4 h-4 text-cyan-400" />;
      case 'terminal': return <Terminal className="w-4 h-4 text-sky-400" />;
      default: return <Shield className="w-4 h-4 text-red-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[90vh] max-h-[820px] rounded-2xl bg-[#080a10] border border-red-900/60 shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-slate-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* MODAL HEADER */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#06080e] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)] shrink-0">
              <BookOpen className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>REFERÊNCIA TÉCNICA OFICIAL</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white font-mono tracking-tight uppercase">
                Glossário de Termos · Redes & Firewalls NGFW
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400">
              {GLOSSARY_TERMS.length} Conceitos Mapeados
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Fechar (ESC)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SEARCH & CATEGORY BAR */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/90 space-y-3 shrink-0">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar termo, sigla ou conceito (ex: NAT, DPI, LACP, HA, ASIC, TLS)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-red-500 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono transition-all"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono scrollbar-thin">
            {GLOSSARY_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all cursor-pointer font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 border-red-500 text-white shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* MODAL MAIN CONTENT: 2 COLUMNS (LIST + DETAILS) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 min-h-0 overflow-hidden">
          
          {/* LEFT COLUMN: LIST OF TERMS (5 cols) */}
          <div className="md:col-span-5 border-r border-slate-800/80 overflow-y-auto divide-y divide-slate-800/60 bg-[#06080e]/60">
            {filteredTerms.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <Info className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-sm text-slate-400 font-mono">
                  Nenhum termo encontrado para <strong className="text-white">"{searchQuery}"</strong>.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-red-400 hover:text-white"
                >
                  Limpar Filtros
                </button>
              </div>
            ) : (
              filteredTerms.map(term => {
                const isSelected = selectedTerm?.id === term.id;
                return (
                  <button
                    key={term.id}
                    onClick={() => setSelectedTerm(term)}
                    className={`w-full text-left p-3.5 transition-all flex items-start gap-3 cursor-pointer ${
                      isSelected 
                        ? 'bg-red-950/40 border-l-4 border-red-500 text-white' 
                        : 'hover:bg-slate-900/50 text-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {renderIcon(term.icon)}
                    </div>
                    
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm font-mono truncate text-white">
                          {term.shortCode}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 shrink-0">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 font-mono">
                        {term.term}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* RIGHT COLUMN: SELECTED TERM DETAILS (7 cols) */}
          <div className="md:col-span-7 overflow-y-auto p-5 sm:p-7 bg-[#080b12] space-y-6">
            {selectedTerm ? (
              <div className="space-y-6 animate-in fade-in duration-150">
                
                {/* Header of Term */}
                <div className="space-y-3 pb-5 border-b border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono font-bold text-red-400">
                      {renderIcon(selectedTerm.icon)}
                      <span>{selectedTerm.category}</span>
                    </div>

                    <button
                      onClick={() => handleCopyDefinition(selectedTerm)}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Copiar definição completa"
                    >
                      {copiedTermId === selectedTerm.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    {selectedTerm.term}
                  </h3>

                  {/* Aliases Tags */}
                  {selectedTerm.aliases && selectedTerm.aliases.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <span className="text-slate-500">Sinônimos & Siglas:</span>
                      {selectedTerm.aliases.map((alias, aIdx) => (
                        <span key={aIdx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {alias}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Definition Box */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Conceito & Definição Técnica</span>
                  </h4>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-sm text-slate-200 leading-relaxed font-sans">
                    {selectedTerm.definition}
                  </div>
                </div>

                {/* Practical Tip Callout (Firewall Sem Ilusão) */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/50 space-y-1.5 text-amber-200">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dica Prática de Engenharia (Firewall Sem Ilusão)</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-amber-200/90 font-sans">
                    {selectedTerm.practicalTip}
                  </p>
                </div>

                {/* Integration with Book Chapters */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-red-400" />
                    <span>Onde este conceito é aprofundado no livro:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedTerm.chapters.map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => handleChapterClick(ch.id)}
                        className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-red-500/80 text-left transition-all group cursor-pointer flex items-center justify-between"
                      >
                        <div>
                          <div className="text-[11px] font-mono font-bold text-red-400 uppercase">
                            Capítulo {ch.number}
                          </div>
                          <div className="text-xs font-bold text-white group-hover:text-red-300 transition-colors line-clamp-1">
                            {ch.title}
                          </div>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center text-slate-500 font-mono text-sm">
                Selecione um termo na lista ao lado para ver sua definição detalhada.
              </div>
            )}
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-[#06080e] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-red-500">●</span>
            <span>Termos destacados com sublinhado nos capítulos abrem este glossário automaticamente.</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer font-bold"
          >
            Fechar Glossário
          </button>
        </div>

      </div>
    </div>
  );
};
