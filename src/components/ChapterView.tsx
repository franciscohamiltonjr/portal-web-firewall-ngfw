import React, { useState } from 'react';
import { Chapter } from '../data/bookData';
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, HelpCircle, FileDown, Printer, BookOpen } from 'lucide-react';
import { ChapterPdfModal } from './ChapterPdfModal';
import { openChapterPdfPrint } from '../utils/chapterPdfGenerator';
import { highlightTextWithGlossary } from './GlossaryHighlighter';

interface ChapterViewProps {
  chapter: Chapter;
  onPrev?: () => void;
  onNext?: () => void;
  prevTitle?: string;
  nextTitle?: string;
  isCompleted: boolean;
  onToggleComplete: () => void;
  onStartQuiz?: (chapterNum: number) => void;
  onBackToMap?: () => void;
  onOpenGlossary?: (termId?: string) => void;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  chapter,
  onPrev,
  onNext,
  prevTitle,
  nextTitle,
  isCompleted,
  onToggleComplete,
  onStartQuiz,
  onBackToMap,
  onOpenGlossary
}) => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Chapter Top Breadcrumb & Actions */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            {onBackToMap && (
              <button
                onClick={onBackToMap}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-red-500 font-mono text-[11px] transition-all cursor-pointer mr-1"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-red-500" />
                <span>Voltar ao Mapa</span>
              </button>
            )}
            <span className="text-red-500 font-bold uppercase tracking-wider font-mono">
              NGFW Técnico 2026
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{chapter.pages}</span>
            <span aria-hidden="true">·</span>
            <span>Mariana BS</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {onOpenGlossary && (
              <button
                onClick={() => onOpenGlossary()}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-red-500/60 transition-colors shadow-sm cursor-pointer"
                title="Abrir Glossário Técnico de Redes e Firewalls"
              >
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                <span>Glossário</span>
              </button>
            )}

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/70 hover:bg-red-900/80 text-red-300 border border-red-600/50 transition-colors shadow-sm cursor-pointer"
              title="Gerar Resumo em PDF com Definições e Checklists deste Capítulo"
            >
              <FileDown className="w-3.5 h-3.5 text-red-400" />
              <span>Resumo em PDF</span>
            </button>

            {onStartQuiz && typeof chapter.number === 'number' && (
              <button
                onClick={() => onStartQuiz(chapter.number as number)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 transition-colors shadow-sm cursor-pointer"
                title="Fazer Quiz de 8 questões deste capítulo"
              >
                <HelpCircle className="w-3.5 h-3.5 text-red-400" />
                <span>Quiz do Capítulo {chapter.number}</span>
              </button>
            )}

            <button
              onClick={onToggleComplete}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span>{isCompleted ? 'Capítulo Concluído' : 'Marcar como Lido'}</span>
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Capítulo {chapter.number}: {chapter.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-400 mt-2 font-normal">
            {chapter.subtitle}
          </p>
        </div>

        {/* Punchline / Impact Phrase if exists */}
        {chapter.punchline && (
          <div className="p-4 rounded-xl bg-red-950/30 border-l-4 border-red-500 text-red-200 text-sm sm:text-base font-semibold italic">
            "{chapter.punchline}"
          </div>
        )}
      </header>

      {/* Seções do Capítulo */}
      <section className="space-y-8">
        {chapter.sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-red-500 rounded-full inline-block"></span>
              {section.title}
            </h3>

            {/* Content Paragraphs */}
            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              {section.content.map((p, pIdx) => {
                // Parse markdown-like bold text safely
                const parts = p.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={pIdx}>
                    {parts.map((part, partIdx) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        const rawBold = part.slice(2, -2);
                        return (
                          <strong key={partIdx} className="text-white font-semibold">
                            {highlightTextWithGlossary(rawBold, onOpenGlossary, `b-${idx}-${pIdx}-${partIdx}`)}
                          </strong>
                        );
                      }
                      return highlightTextWithGlossary(part, onOpenGlossary, `p-${idx}-${pIdx}-${partIdx}`);
                    })}
                  </p>
                );
              })}
            </div>

            {/* Code Snippets (e.g. TCP Handshake ASCII flow) */}
            {section.codeSnippet && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto">
                <pre className="text-xs sm:text-sm font-mono text-emerald-400 leading-normal">
                  <code>{section.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Tables if present */}
            {section.table && (
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40 my-4">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-300 uppercase text-[11px] tracking-wider font-semibold">
                    <tr>
                      {section.table.headers.map((th, hIdx) => (
                        <th key={hIdx} className="px-4 py-3">
                          {th}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/30 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-2.5 ${
                              cIdx === 0
                                ? 'font-medium text-white whitespace-nowrap'
                                : 'text-slate-300'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Section Specific Callouts */}
            {section.callouts && section.callouts.map((callout, cIdx) => (
              <div
                key={cIdx}
                className={`p-4 rounded-xl border my-4 space-y-1.5 ${
                  callout.type === 'ATENCAO'
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                  {callout.type === 'ATENCAO' ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-amber-300">{callout.title}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-emerald-300">{callout.title}</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                  {callout.text}
                </p>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* ⚠️ Atenção / Boas Práticas Globais do Capítulo */}
      {chapter.generalCallouts && chapter.generalCallouts.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Atenção / Boas Práticas em Destaque
            </h2>
          </div>

          <div className="space-y-3">
            {chapter.generalCallouts.map((callout, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-xl border ${
                  callout.type === 'ATENCAO'
                    ? 'bg-amber-950/25 border-amber-500/40'
                    : 'bg-emerald-950/25 border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1">
                  {callout.type === 'ATENCAO' ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-amber-300">{callout.title}</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-emerald-300">{callout.title}</span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-200">
                  {callout.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PDF Summary & Checklist Action Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/30 via-[#0d0d14] to-slate-900 border border-red-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-600/40 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_15px_rgba(255,30,39,0.2)]">
            <FileDown className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase font-mono tracking-tight">
              Resumo Técnico & Checklist do Capítulo {chapter.number}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-relaxed">
              Exporte em PDF formatado com as definições-chave, conceitos críticos e itens de auditoria para levar para a bancada.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPdfModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase transition-all shadow-[0_0_15px_rgba(255,30,39,0.3)] flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <FileDown className="w-4 h-4" />
          <span>Gerar Resumo em PDF</span>
        </button>
      </div>

      {/* Navigation Footer */}
      <footer className="pt-8 border-t border-slate-800 space-y-4">
        {onStartQuiz && typeof chapter.number === 'number' && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/30 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Avalie seu conhecimento do Capítulo {chapter.number}</span>
                <span className="text-[11px] text-slate-400 block">8 questões de múltipla escolha com verificação instantânea e justificativas fiéis</span>
              </div>
            </div>
            <button
              onClick={() => onStartQuiz(chapter.number as number)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-md whitespace-nowrap"
            >
              Fazer Quiz do Capítulo {chapter.number}
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {onPrev ? (
            <button
              onClick={onPrev}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-400" />
              <div className="text-left">
                <span className="text-[10px] text-slate-500 block uppercase">Anterior</span>
                <span className="font-semibold text-slate-300 line-clamp-1">{prevTitle || 'Capítulo Anterior'}</span>
              </div>
            </button>
          ) : (
            <div />
          )}

          {onNext ? (
            <button
              onClick={onNext}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              <div className="text-right">
                <span className="text-[10px] text-red-200 block uppercase">Próximo</span>
                <span className="line-clamp-1">{nextTitle || 'Próximo Capítulo'}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </footer>

      {/* PDF Summary & Checklist Modal */}
      <ChapterPdfModal
        chapter={chapter}
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
      />
    </article>
  );
};
