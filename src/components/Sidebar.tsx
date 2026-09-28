import React from 'react';
import { CHAPTERS, APPENDICES } from '../data/bookData';
import { BookOpen, CheckCircle2, Circle, CheckSquare, Wrench, HelpCircle } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface SidebarProps {
  currentChapterId: string;
  onSelectChapter: (id: string) => void;
  completedChapters: string[];
  onToggleComplete: (id: string) => void;
  onOpenQuiz?: (chapterNum?: number) => void;
  isQuizActive?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentChapterId,
  onSelectChapter,
  completedChapters,
  onToggleComplete,
  onOpenQuiz,
  isQuizActive
}) => {
  return (
    <aside className="w-full lg:w-80 shrink-0 lg:border-r lg:border-slate-800 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 lg:overflow-y-auto p-4 space-y-6 bg-slate-950/60">
      {/* Book Quick Info & Quiz Shortcut */}
      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">
            <span>Manual de Campo</span>
            <span className="text-slate-600">·</span>
            <span>Versão 2026</span>
          </div>
          <div className="text-sm font-bold text-white leading-snug">
            Firewall Sem Ilusão
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Mariana BS · Cybersecurity Engineer (Be Safe)
          </div>
        </div>

        {onOpenQuiz && (
          <button
            onClick={() => onOpenQuiz(1)}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-semibold border transition-all ${
              isQuizActive
                ? 'bg-red-600 text-white border-red-500 shadow-sm'
                : 'bg-red-950/20 text-red-300 hover:bg-red-900/30 border-red-500/30'
            }`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-red-400" />
              <span>Avaliação por Capítulo</span>
            </div>
            <span className="font-mono text-[10px] bg-red-950/60 px-1.5 py-0.5 rounded text-red-200">
              8 Questões
            </span>
          </button>
        )}
      </div>

      {/* Chapters List */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">
          <span>Capítulos (1 a 15)</span>
          <span className="text-slate-500 font-mono">
            {completedChapters.filter(id => id.startsWith('cap-')).length} / {CHAPTERS.length}
          </span>
        </div>

        <div className="space-y-1">
          {CHAPTERS.map(chap => {
            const isSelected = currentChapterId === chap.id;
            const isCompleted = completedChapters.includes(chap.id);

            return (
              <div
                key={chap.id}
                className={`group flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-all ${
                  isSelected
                    ? 'bg-red-500/15 text-white font-medium border border-red-500/30'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                <button
                  onClick={() => onSelectChapter(chap.id)}
                  className="flex-1 text-left flex items-start gap-2.5 mr-2"
                >
                  <span
                    className={`font-mono shrink-0 w-5 text-right pt-0.5 ${
                      isSelected ? 'text-red-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {String(chap.number).padStart(2, '0')}.
                  </span>
                  <div className="flex-1">
                    <span className="line-clamp-1">{chap.title}</span>
                    <span className="block text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {chap.subtitle}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(chap.id);
                  }}
                  title={isCompleted ? 'Marcar como não lido' : 'Marcar como concluído'}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 opacity-40 group-hover:opacity-80" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Appendices */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 mb-2">
          Apêndices & Checklists
        </div>
        <div className="space-y-1">
          {APPENDICES.map(app => {
            const isSelected = currentChapterId === app.id;
            const isCompleted = completedChapters.includes(app.id);

            return (
              <div
                key={app.id}
                className={`group flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-all ${
                  isSelected
                    ? 'bg-red-500/15 text-white font-medium border border-red-500/30'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                <button
                  onClick={() => onSelectChapter(app.id)}
                  className="flex-1 text-left flex items-start gap-2.5 mr-2"
                >
                  <span
                    className={`font-mono shrink-0 w-5 text-right pt-0.5 ${
                      isSelected ? 'text-red-400 font-bold' : 'text-slate-500'
                    }`}
                  >
                    {app.letter}.
                  </span>
                  <div className="flex-1">
                    <span className="line-clamp-1">{app.title}</span>
                    <span className="block text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {app.pages}
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(app.id);
                  }}
                  title={isCompleted ? 'Marcar como concluído' : 'Marcar como pendente'}
                  className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 opacity-40 group-hover:opacity-80" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* PWA Install Button in Sidebar */}
      <div className="pt-3 border-t border-slate-800/80">
        <PWAInstallButton variant="sidebar" />
      </div>
    </aside>
  );
};
