import React, { useState, useEffect } from 'react';
import { APPENDICES } from '../data/bookData';
import { CheckSquare, Copy, Check, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ChecklistViewProps {
  appendixLetter: 'A' | 'B';
  onSwitchAppendix?: (letter: 'A' | 'B') => void;
}

export const ChecklistView: React.FC<ChecklistViewProps> = ({ 
  appendixLetter,
  onSwitchAppendix
}) => {
  const appendix = APPENDICES.find(a => a.letter === appendixLetter) || APPENDICES[0];
  const storageKey = `firewall_checklist_${appendixLetter}`;

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [copiedChecklist, setCopiedChecklist] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    } catch {
      // ignore
    }
  }, [checkedItems, storageKey]);

  const toggleItem = (itemKey: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

  const handleReset = () => {
    if (window.confirm(`Deseja desmarcar todos os itens do Apêndice ${appendixLetter}?`)) {
      setCheckedItems({});
    }
  };

  const totalItems = appendix.itemsByCategory?.reduce((acc, cat) => acc + cat.items.length, 0) || 0;
  const completedCount = appendix.itemsByCategory?.reduce((acc, cat) => {
    return acc + cat.items.filter(item => checkedItems[`${cat.category}_${item}`]).length;
  }, 0) || 0;
  const percent = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const handleCopyMarkdown = () => {
    let md = `## Apêndice ${appendix.letter}: ${appendix.title}\n\n`;
    appendix.itemsByCategory?.forEach(cat => {
      md += `### ${cat.category}\n`;
      cat.items.forEach(item => {
        const isChecked = checkedItems[`${cat.category}_${item}`];
        md += `[${isChecked ? 'x' : ' '}] ${item}\n`;
      });
      md += `\n`;
    });
    navigator.clipboard.writeText(md);
    setCopiedChecklist(true);
    setTimeout(() => setCopiedChecklist(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Appendix Header */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold uppercase tracking-wider">
              Apêndice {appendix.letter}
            </span>
            <span aria-hidden="true">·</span>
            <span>{appendix.pages}</span>
            <span aria-hidden="true">·</span>
            <span>Firewall Sem Ilusão (2026)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors"
              title="Copiar lista com marcações atuais em formato Markdown"
            >
              {copiedChecklist ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copiar Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-800 text-xs transition-colors"
              title="Limpar todas as marcações"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        {onSwitchAppendix && (
          <div className="flex items-center gap-2 pt-1 pb-2">
            <button
              onClick={() => onSwitchAppendix('A')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                appendixLetter === 'A'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Apêndice A: Implementação
            </button>
            <button
              onClick={() => onSwitchAppendix('B')}
              className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                appendixLetter === 'B'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Apêndice B: Auditoria
            </button>
          </div>
        )}

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Apêndice {appendix.letter}: {appendix.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-400 mt-1">
            {appendixLetter === 'A'
              ? 'Roteiro de execução técnica estruturado em três fases: Pré-implementação, Implementação e Pós-implementação.'
              : 'Verificação minuciosa de políticas, regras, inspeção TLS, registros SIEM e hardening administrativo.'}
          </p>
        </div>

        {/* Progress Card */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <ShieldCheck className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Status da Verificação</div>
              <div className="text-xs text-slate-400">
                {completedCount} de {totalItems} itens auditados ({percent}%)
              </div>
            </div>
          </div>

          <div className="w-full sm:w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                percent === 100 ? 'bg-emerald-500' : 'bg-red-500'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </header>

      {/* 📝 Conteúdo Fiel: Checklist Interativa */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <span className="text-lg">📝</span>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Conteúdo Fiel — Itens de Verificação
          </h2>
        </div>

        <div className="space-y-8">
          {appendix.itemsByCategory?.map((cat, catIdx) => {
            const catCompleted = cat.items.filter(i => checkedItems[`${cat.category}_${i}`]).length;
            const catTotal = cat.items.length;

            return (
              <div
                key={catIdx}
                className="bg-slate-900/50 border border-slate-800/90 rounded-xl overflow-hidden shadow-sm"
              >
                <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    {cat.category}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {catCompleted}/{catTotal}
                  </span>
                </div>

                <div className="divide-y divide-slate-800/60 p-2 sm:p-3">
                  {cat.items.map((item, itemIdx) => {
                    const key = `${cat.category}_${item}`;
                    const isChecked = !!checkedItems[key];

                    return (
                      <label
                        key={itemIdx}
                        className={`flex items-start gap-3.5 p-3 rounded-lg cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-slate-950/40 text-slate-400'
                            : 'hover:bg-slate-800/40 text-slate-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(key)}
                          className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-red-600 focus:ring-red-500/30 accent-red-600 cursor-pointer"
                        />
                        <span
                          className={`text-xs sm:text-sm leading-relaxed ${
                            isChecked ? 'line-through text-slate-500' : 'text-slate-200'
                          }`}
                        >
                          {item}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ⚠️ Atenção / Boas Práticas do Apêndice */}
      <section className="p-4 sm:p-5 rounded-xl border bg-amber-950/20 border-amber-500/40 space-y-2">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Atenção Operacional da Autora</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {appendixLetter === 'A'
            ? 'Regras de implementação: Teste sempre failover de HA com tráfego de produção antes do encerramento da janela. Não presuma que a sincronização passiva funcionará sem validação prática.'
            : 'Regras de auditoria: Qualquer regra ANY ANY ANY ou ausência de inspeção TLS em saída deve ser tratada como vulnerabilidade de severidade crítica. "Se você não loga, você não sabe. E se você não sabe, já perdeu."'}
        </p>
      </section>
    </div>
  );
};
