import React, { useState } from 'react';
import { CHAPTERS, APPENDICES, BOOK_METADATA } from '../data/bookData';
import { Copy, Check, FileDown, AlertTriangle, CheckCircle } from 'lucide-react';

export const FullDocumentView: React.FC = () => {
  const [copiedAll, setCopiedAll] = useState(false);

  const generateFullMarkdown = () => {
    let md = `# ${BOOK_METADATA.title}\n`;
    md += `## ${BOOK_METADATA.subtitle}\n`;
    md += `**Autora:** ${BOOK_METADATA.author} | ${BOOK_METADATA.role} | ${BOOK_METADATA.publisher} | ${BOOK_METADATA.year}\n\n`;
    md += `---\n\n`;

    CHAPTERS.forEach(chap => {
      md += `## Capítulo ${chap.number}: ${chap.title}\n\n`;
      if (chap.punchline) {
        md += `> *"${chap.punchline}"*\n\n`;
      }
      md += `📝 **Conteúdo Fiel:**\n\n`;

      chap.sections.forEach(sec => {
        md += `### ${sec.title}\n\n`;
        sec.content.forEach(p => {
          md += `${p}\n\n`;
        });
        if (sec.codeSnippet) {
          md += `\`\`\`\n${sec.codeSnippet}\n\`\`\`\n\n`;
        }
        if (sec.table) {
          md += `| ${sec.table.headers.join(' | ')} |\n`;
          md += `| ${sec.table.headers.map(() => '---').join(' | ')} |\n`;
          sec.table.rows.forEach(r => {
            md += `| ${r.join(' | ')} |\n`;
          });
          md += `\n`;
        }
        if (sec.callouts) {
          sec.callouts.forEach(c => {
            md += `⚠️ **${c.title}:** ${c.text}\n\n`;
          });
        }
      });

      if (chap.generalCallouts && chap.generalCallouts.length > 0) {
        md += `⚠️ **Atenção / Boas Práticas:**\n\n`;
        chap.generalCallouts.forEach(c => {
          md += `• **${c.title}:** ${c.text}\n\n`;
        });
      }

      md += `---\n\n`;
    });

    // Appendices
    APPENDICES.forEach(app => {
      md += `## Apêndice ${app.letter}: ${app.title}\n\n`;

      if (app.itemsByCategory) {
        app.itemsByCategory.forEach(cat => {
          md += `### ${cat.category}\n\n`;
          cat.items.forEach(item => {
            md += `- [ ] ${item}\n`;
          });
          md += `\n`;
        });
      }

      if (app.sections) {
        app.sections.forEach(sec => {
          md += `### ${sec.title}\n\n`;
          sec.content.forEach(c => {
            md += `${c}\n\n`;
          });
        });
      }

      md += `---\n\n`;
    });

    md += `> "${BOOK_METADATA.finalQuote.quote}"  \n> — ${BOOK_METADATA.finalQuote.author} (${BOOK_METADATA.finalQuote.role})\n`;

    return md;
  };

  const handleCopyAll = () => {
    const text = generateFullMarkdown();
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Top Banner with Action */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Modo Documento Contínuo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualização completa de todos os 15 capítulos e 3 apêndices, no formato estrito solicitado.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-md transition-colors whitespace-nowrap"
        >
          {copiedAll ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Todo o Guia Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-white" />
              <span>Copiar Guia Completo (Markdown)</span>
            </>
          )}
        </button>
      </div>

      {/* Chapters Iteration */}
      <div className="space-y-16">
        {CHAPTERS.map(chap => (
          <article
            key={chap.id}
            id={chap.id}
            className="border-b border-slate-800 pb-16 space-y-8"
          >
            {/* Chapter Heading */}
            <div className="space-y-2">
              <div className="text-xs font-mono text-red-400 uppercase tracking-wider">
                {chap.pages} · Mariana BS (2026)
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Capítulo {chap.number}: {chap.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {chap.subtitle}
              </p>
              {chap.punchline && (
                <div className="p-3.5 rounded-lg bg-red-950/30 border-l-4 border-red-500 text-red-200 text-xs sm:text-sm font-semibold italic mt-2">
                  "{chap.punchline}"
                </div>
              )}
            </div>

            {/* 📝 Conteúdo Fiel */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/80 pb-2">
                <span>📝</span>
                <span>Conteúdo Fiel:</span>
              </div>

              {chap.sections.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-red-500 rounded-full inline-block"></span>
                    {sec.title}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {sec.content.map((p, pIdx) => {
                      const parts = p.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={pIdx}>
                          {parts.map((part, partIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={partIdx} className="text-white font-semibold">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return part;
                          })}
                        </p>
                      );
                    })}
                  </div>

                  {sec.codeSnippet && (
                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 overflow-x-auto my-2">
                      <pre className="text-xs font-mono text-emerald-400">
                        <code>{sec.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {sec.table && (
                    <div className="overflow-x-auto rounded-lg border border-slate-800 my-3">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900 border-b border-slate-800 text-slate-300 uppercase font-semibold">
                          <tr>
                            {sec.table.headers.map((th, hIdx) => (
                              <th key={hIdx} className="px-3 py-2">
                                {th}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-800/30">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-3 py-2 text-slate-300">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {sec.callouts && sec.callouts.map((c, cIdx) => (
                    <div
                      key={cIdx}
                      className={`p-3.5 rounded-lg border my-3 space-y-1 ${
                        c.type === 'ATENCAO'
                          ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                          : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {c.type === 'ATENCAO' ? (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        <span>{c.title}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {c.text}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* ⚠️ Atenção / Boas Práticas */}
            {chap.generalCallouts && chap.generalCallouts.length > 0 && (
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/80 pb-1.5">
                  <span>⚠️</span>
                  <span>Atenção / Boas Práticas:</span>
                </div>
                {chap.generalCallouts.map((c, cIdx) => (
                  <div
                    key={cIdx}
                    className={`p-3.5 rounded-lg border ${
                      c.type === 'ATENCAO'
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : 'bg-emerald-950/20 border-emerald-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-white mb-1">
                      {c.type === 'ATENCAO' ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      <span>{c.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}

        {/* Appendices in Full View */}
        {APPENDICES.map(app => (
          <article
            key={app.id}
            id={app.id}
            className="border-b border-slate-800 pb-16 space-y-8"
          >
            <div className="space-y-2">
              <div className="text-xs font-mono text-red-400 uppercase tracking-wider">
                {app.pages} · Mariana BS (2026)
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Apêndice {app.letter}: {app.title}
              </h2>
            </div>

            {/* 📝 Conteúdo Fiel */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/80 pb-2">
                <span>📝</span>
                <span>Conteúdo Fiel:</span>
              </div>

              {app.itemsByCategory && (
                <div className="space-y-6">
                  {app.itemsByCategory.map((cat, cIdx) => (
                    <div key={cIdx} className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-red-400">
                        {cat.category}
                      </h3>
                      <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                        {cat.items.map((item, iIdx) => (
                          <li key={iIdx} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {app.sections && (
                <div className="space-y-6">
                  {app.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <h3 className="text-sm font-bold text-white">
                        {sec.title}
                      </h3>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        {sec.content.map((c, cIdx) => (
                          <p key={cIdx} className="leading-relaxed">
                            {c}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Final Quote on Appendix C */}
            {app.letter === 'C' && (
              <div className="p-5 rounded-xl bg-red-950/30 border border-red-500/40 text-center space-y-1 mt-6">
                <p className="text-base sm:text-lg font-bold text-white italic">
                  "{BOOK_METADATA.finalQuote.quote}"
                </p>
                <p className="text-xs text-red-300">
                  {BOOK_METADATA.finalQuote.author} · {BOOK_METADATA.finalQuote.role}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
