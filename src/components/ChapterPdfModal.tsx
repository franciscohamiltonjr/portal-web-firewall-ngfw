import React, { useState } from 'react';
import { X, FileDown, Printer, CheckSquare, Shield, BookOpen, AlertTriangle, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';
import { Chapter } from '../data/bookData';
import { CHAPTER_SPECIFIC_CHECKLISTS } from '../data/chapterChecklistsData';
import { openChapterPdfPrint } from '../utils/chapterPdfGenerator';

interface ChapterPdfModalProps {
  chapter: Chapter;
  isOpen: boolean;
  onClose: () => void;
}

export const ChapterPdfModal: React.FC<ChapterPdfModalProps> = ({
  chapter,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const chapterData = CHAPTER_SPECIFIC_CHECKLISTS[chapter.id] || {
    chapterId: chapter.id,
    chapterNumber: chapter.number,
    title: chapter.title,
    keyDefinitions: chapter.sections.map(s => ({
      term: s.title,
      definition: s.content[0] || 'Conceito essencial do capítulo.'
    })),
    checklistItems: [
      { category: "Verificação", item: "Validar parâmetros técnicos do capítulo." }
    ]
  };

  // Checked state for interactive review
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handlePrint = () => {
    openChapterPdfPrint(chapter);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-[#090b10] border border-red-900/60 shadow-[0_0_50px_rgba(255,30,39,0.25)] flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-600/50 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(255,30,39,0.3)]">
              <FileDown className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>RESUMO EXECUTIVO & CHECKLIST EM PDF</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white font-mono tracking-tight uppercase">
                Capítulo {chapter.number}: {chapter.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs sm:text-sm font-sans">
          
          {/* Top Info Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-400">Referência no Livro:</span>{' '}
              <strong className="text-slate-200">{chapter.pages}</strong> · Edição 2026
            </div>
            <div className="text-slate-400">
              Autores: <span className="text-red-400 font-bold">Mariana BS</span> & <span className="text-cyan-400 font-bold">Francisco Hamilton</span> <span className="text-slate-500">(Analista de TI · IFSertãoPE)</span>
            </div>
          </div>

          {/* Punchline if exists */}
          {chapter.punchline && (
            <div className="p-4 rounded-xl bg-red-950/20 border-l-4 border-red-500 text-red-200 text-xs sm:text-sm font-semibold italic">
              "{chapter.punchline}"
            </div>
          )}

          {/* 1. Definições Chave */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-red-950 text-red-400 flex items-center justify-center text-[10px]">01</span>
              <span>Definições-Chave & Conceitos Críticos</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {chapterData.keyDefinitions.map((def, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1">
                  <div className="font-mono font-bold text-red-400 text-xs uppercase tracking-tight">
                    {def.term}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {def.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Checklist Técnico do Capítulo */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-red-950 text-red-400 flex items-center justify-center text-[10px]">02</span>
                <span>Checklist Técnico & Auditoria de Implementação</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                {Object.values(checkedItems).filter(Boolean).length} de {chapterData.checklistItems.length} concluídos
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden divide-y divide-slate-850">
              {chapterData.checklistItems.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className="p-3 flex items-start gap-3 hover:bg-slate-900/50 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-900 text-red-600 focus:ring-red-500/30 accent-red-600 cursor-pointer"
                    />
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${isChecked ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {item.item}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#07080c] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-mono text-slate-400">
            Pressione <strong>Gerar / Imprimir PDF</strong> para abrir a versão A4 oficial.
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs transition-colors cursor-pointer"
            >
              Fechar
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,30,39,0.35)]"
            >
              <Printer className="w-4 h-4" />
              <span>Gerar / Imprimir PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
