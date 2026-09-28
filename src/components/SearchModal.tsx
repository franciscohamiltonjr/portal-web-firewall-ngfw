import React, { useState, useMemo, useEffect, useRef } from 'react';
import { CHAPTERS, APPENDICES } from '../data/bookData';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (id: string) => void;
}

interface SearchResult {
  chapterId: string;
  chapterNumber: number | string;
  chapterTitle: string;
  matchType: 'Título' | 'Conteúdo' | 'Atenção';
  snippet: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        // Trigger search open
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const q = query.toLowerCase();
    const hits: SearchResult[] = [];

    // Search chapters
    CHAPTERS.forEach(chap => {
      if (chap.title.toLowerCase().includes(q) || chap.subtitle.toLowerCase().includes(q)) {
        hits.push({
          chapterId: chap.id,
          chapterNumber: chap.number,
          chapterTitle: chap.title,
          matchType: 'Título',
          snippet: `${chap.title} — ${chap.subtitle}`
        });
      }

      chap.sections.forEach(sec => {
        sec.content.forEach(p => {
          if (p.toLowerCase().includes(q)) {
            hits.push({
              chapterId: chap.id,
              chapterNumber: chap.number,
              chapterTitle: chap.title,
              matchType: 'Conteúdo',
              snippet: p.length > 120 ? p.substring(0, 120) + '...' : p
            });
          }
        });

        sec.callouts?.forEach(c => {
          if (c.title.toLowerCase().includes(q) || c.text.toLowerCase().includes(q)) {
            hits.push({
              chapterId: chap.id,
              chapterNumber: chap.number,
              chapterTitle: chap.title,
              matchType: 'Atenção',
              snippet: `${c.title}: ${c.text}`
            });
          }
        });
      });
    });

    // Search appendices
    APPENDICES.forEach(app => {
      if (app.title.toLowerCase().includes(q)) {
        hits.push({
          chapterId: app.id,
          chapterNumber: app.letter,
          chapterTitle: app.title,
          matchType: 'Título',
          snippet: `Apêndice ${app.letter}: ${app.title}`
        });
      }

      app.itemsByCategory?.forEach(cat => {
        cat.items.forEach(item => {
          if (item.toLowerCase().includes(q)) {
            hits.push({
              chapterId: app.id,
              chapterNumber: app.letter,
              chapterTitle: app.title,
              matchType: 'Conteúdo',
              snippet: `[${cat.category}] ${item}`
            });
          }
        });
      });

      app.sections?.forEach(sec => {
        sec.content.forEach(c => {
          if (c.toLowerCase().includes(q)) {
            hits.push({
              chapterId: app.id,
              chapterNumber: app.letter,
              chapterTitle: app.title,
              matchType: 'Conteúdo',
              snippet: `${sec.title}: ${c}`
            });
          }
        });
      });
    });

    return hits.slice(0, 20); // Cap at 20 results
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por termos (ex: ANY ANY ANY, TLS, ASIC, SYN Flood, NPU, SIEM)..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-800/60">
          {query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-sm">
              Nenhum resultado encontrado para "{query}".
            </div>
          )}

          {query.trim().length < 2 && (
            <div className="py-10 text-center text-slate-500 text-xs sm:text-sm space-y-2">
              <p>Digite pelo menos 2 caracteres para pesquisar em todo o guia técnico.</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['TLS Inspection', 'ANY ANY ANY', 'ASIC vs NPU', 'SYN Cookies', 'Split-brain', 'ZTNA', 'Salários 2026'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 text-xs bg-slate-800/70 hover:bg-slate-800 text-slate-300 rounded-md border border-slate-700/60 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((res, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectChapter(res.chapterId);
                onClose();
              }}
              className="w-full text-left p-3 rounded-xl hover:bg-slate-800/50 transition-colors flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-red-400 font-bold">
                    {typeof res.chapterNumber === 'number' ? `Cap. ${res.chapterNumber}` : `Apêndice ${res.chapterNumber}`}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-300 font-medium group-hover:text-white">
                    {res.chapterTitle}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 ml-auto">
                    {res.matchType}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {res.snippet}
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-red-400 shrink-0 mt-1 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
