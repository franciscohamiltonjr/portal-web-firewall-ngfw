import React from 'react';
import { APPENDICES, BOOK_METADATA } from '../data/bookData';
import { ShieldAlert, Lock } from 'lucide-react';

export const HardeningView: React.FC = () => {
  const appendix = APPENDICES.find(a => a.letter === 'C') || APPENDICES[2];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Appendix Header */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="text-red-500 font-bold uppercase tracking-wider">
            Apêndice C
          </span>
          <span aria-hidden="true">·</span>
          <span>{appendix.pages}</span>
          <span aria-hidden="true">·</span>
          <span>Segurança em Produção</span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Apêndice C: {appendix.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            Recomendações definitivas de endurecimento do sistema para conter ataques antes que eles alcancem a camada de processamento.
          </p>
        </div>
      </header>

      {/* 📝 Conteúdo Fiel */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <span className="text-lg">📝</span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Conteúdo Fiel — Diretrizes de Hardening
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {appendix.sections?.map((sec, idx) => (
            <div
              key={idx}
              className="bg-slate-900/50 border border-slate-800/90 rounded-xl p-5 space-y-3 hover:border-slate-700 transition-colors"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 text-red-400">
                <Lock className="w-4 h-4 text-red-500 shrink-0" />
                <span>{sec.title}</span>
              </h3>

              <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                {sec.content.map((c, cIdx) => (
                  <p key={cIdx} className="leading-relaxed">
                    {c}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⚠️ Atenção / Boas Práticas: Citação de Encerramento Fiel */}
      <section className="p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-red-900/20 to-slate-900 border border-red-500/40 text-center space-y-3">
        <div className="inline-flex p-2 rounded-full bg-red-600/20 text-red-400 mb-1">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <blockquote className="text-xl sm:text-2xl font-bold text-white tracking-tight italic">
          "{BOOK_METADATA.finalQuote.quote}"
        </blockquote>
        <p className="text-xs sm:text-sm text-red-300 font-medium">
          {BOOK_METADATA.finalQuote.author} · {BOOK_METADATA.finalQuote.role}
        </p>
      </section>
    </div>
  );
};
