import React, { useState, useEffect } from 'react';
import { GAMIFIED_PHASES, ChallengePhase, ChallengeQuestion } from '../data/gamifiedChallengeData';
import { 
  Lock, 
  Unlock, 
  Shield, 
  ShieldCheck, 
  CheckCircle, 
  XCircle, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  Flame, 
  Cpu, 
  Zap, 
  Terminal,
  Trophy
} from 'lucide-react';

export const GamifiedChallengeView: React.FC = () => {
  // Store unlocked phases in localStorage: default is phase 1 unlocked [1]
  const [unlockedPhases, setUnlockedPhases] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('firewall_unlocked_phases');
      return saved ? JSON.parse(saved) : [1];
    } catch {
      return [1];
    }
  });

  // Active playing phase (1, 2, 3, or 4)
  const [activePhaseId, setActivePhaseId] = useState<number>(1);

  // Answers for the active phase: { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [phaseAnswers, setPhaseAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  
  // Phase result modal state
  const [phaseResult, setPhaseResult] = useState<{
    phaseId: number;
    scorePercent: number;
    correctCount: number;
    total: number;
    passed: boolean;
  } | null>(null);

  // Sync unlocked phases to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('firewall_unlocked_phases', JSON.stringify(unlockedPhases));
    } catch {
      // ignore
    }
  }, [unlockedPhases]);

  const activePhase = GAMIFIED_PHASES.find(p => p.id === activePhaseId) || GAMIFIED_PHASES[0];

  const handleSelectOption = (questionId: number, letter: 'A' | 'B' | 'C' | 'D') => {
    setPhaseAnswers(prev => ({ ...prev, [questionId]: letter }));
  };

  const answeredInPhase = Object.keys(phaseAnswers).length;
  const totalInPhase = activePhase.questions.length;
  const isPhaseReady = answeredInPhase === totalInPhase;

  const handleSubmitPhase = () => {
    let correct = 0;
    activePhase.questions.forEach(q => {
      if (phaseAnswers[q.id] === q.correctOption) {
        correct++;
      }
    });

    const percent = Math.round((correct / totalInPhase) * 100);
    const passed = percent >= activePhase.minScoreToUnlockNext;

    if (passed && activePhaseId < 4) {
      const nextPhaseId = activePhaseId + 1;
      if (!unlockedPhases.includes(nextPhaseId)) {
        setUnlockedPhases(prev => [...prev, nextPhaseId]);
      }
    }

    setPhaseResult({
      phaseId: activePhaseId,
      scorePercent: percent,
      correctCount: correct,
      total: totalInPhase,
      passed
    });
  };

  const handleRetryPhase = () => {
    setPhaseAnswers({});
    setPhaseResult(null);
  };

  const handleNextPhase = () => {
    if (activePhaseId < 4 && unlockedPhases.includes(activePhaseId + 1)) {
      setActivePhaseId(activePhaseId + 1);
      setPhaseAnswers({});
      setPhaseResult(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPhaseTab = (phaseId: number) => {
    if (unlockedPhases.includes(phaseId)) {
      setActivePhaseId(phaseId);
      setPhaseAnswers({});
      setPhaseResult(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER BANNER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-red-950 cyber-grid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-48 bg-red-600/10 blur-[90px] pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-800/50 text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Desafio Gamificado Cyber Defender 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Jogo de Progressão em 4 Fases
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            Avance pelos 4 níveis de maturidade em cibersegurança. Para desbloquear a fase seguinte, você <strong>DEVE atingir no mínimo 80% de precisão (4 de 5 questões)</strong>. Conteúdo extraído estritamente do PDF da Engª Mariana BS.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <span className="text-slate-400">Progresso do Desafio:</span>
            <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-bold">
              {unlockedPhases.length} de 4 Fases Desbloqueadas
            </span>
            {unlockedPhases.length === 4 && (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Award className="w-4 h-4" /> Todas as Fases Abertas!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* PHASE SELECTOR CARDS (4 FASES COM STATUS DE BLOQUEIO) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GAMIFIED_PHASES.map((phase: ChallengePhase) => {
          const isUnlocked = unlockedPhases.includes(phase.id);
          const isActive = activePhaseId === phase.id;

          return (
            <button
              key={phase.id}
              onClick={() => handleSelectPhaseTab(phase.id)}
              disabled={!isUnlocked}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-slate-900 border-red-500 cyber-glow-red'
                  : isUnlocked
                  ? 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Top status & lock icon */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-red-400 uppercase">
                  FASE {phase.id}
                </span>

                {isUnlocked ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-600" />
                )}
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-white mb-1 line-clamp-1">
                {phase.title.replace(`Fase ${phase.id}: `, '')}
              </h4>

              <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                {phase.theme}
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-500">{phase.chaptersRange}</span>
                <span className={isUnlocked ? 'text-emerald-400 font-bold' : 'text-slate-600'}>
                  {isUnlocked ? 'DESBLOQUEADA' : 'BLOQUEADA (80%)'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ACTIVE PHASE GAMEPLAY BOARD */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 sm:p-8 space-y-8">
        
        {/* Phase Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-bold">
                JOGANDO FASE {activePhase.id} DE 4
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 font-bold">{activePhase.chaptersRange}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {activePhase.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              {activePhase.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Requisito para Avançar</span>
            <span className="text-lg font-black font-mono text-amber-400">
              ≥ 80% (4 de 5)
            </span>
          </div>
        </div>

        {/* Phase Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Perguntas Respondidas nesta Fase:</span>
            <span className="text-white font-bold">{answeredInPhase} de {totalInPhase}</span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300"
              style={{ width: `${(answeredInPhase / totalInPhase) * 100}%` }}
            />
          </div>
        </div>

        {/* Phase Questions */}
        <div className="space-y-8">
          {activePhase.questions.map((question: ChallengeQuestion, index: number) => {
            const selectedLetter = phaseAnswers[question.id];

            return (
              <div 
                key={question.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-4"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-red-400 font-bold">
                    Desafio {index + 1} de {totalInPhase}
                  </span>
                  {selectedLetter && (
                    <span className="text-slate-400">Marcada: Opção {selectedLetter}</span>
                  )}
                </div>

                <p className="text-sm font-bold text-white leading-relaxed">
                  {question.question}
                </p>

                <div className="space-y-2">
                  {question.options.map(option => {
                    const isSelected = selectedLetter === option.letter;

                    return (
                      <button
                        key={option.letter}
                        onClick={() => handleSelectOption(question.id, option.letter)}
                        className={`w-full text-left p-3 rounded-lg border transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-red-500 bg-red-950/40 text-white font-medium cyber-glow-red'
                            : 'border-slate-800 bg-slate-950/50 hover:bg-slate-900 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center shrink-0 font-mono text-[11px] font-bold ${
                          isSelected ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {option.letter}
                        </span>
                        <span className="text-xs leading-relaxed">
                          {option.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase Submission Button */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleSubmitPhase}
            disabled={!isPhaseReady}
            className={`px-8 py-3.5 rounded-xl font-mono text-xs uppercase font-black tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              isPhaseReady
                ? 'bg-red-600 hover:bg-red-500 text-white cyber-glow-red hover:-translate-y-0.5'
                : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Verificar Desempenho da Fase {activePhase.id}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* PHASE COMPLETION MODAL */}
      {phaseResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-slate-950 border border-red-900/80 p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <div className="text-center space-y-3">
              <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center border ${
                phaseResult.passed
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                  : 'bg-red-950/60 border-red-500 text-red-400 shadow-[0_0_25px_rgba(255,30,39,0.3)]'
              }`}>
                {phaseResult.passed ? (
                  <ShieldCheck className="w-8 h-8" />
                ) : (
                  <XCircle className="w-8 h-8" />
                )}
              </div>

              <div className="space-y-1">
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                  phaseResult.passed ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {phaseResult.passed ? 'FASE CONCLUÍDA COM SUCESSO!' : 'PRECISÃO INSUFICIENTE'}
                </span>

                <h3 className="text-2xl font-black text-white">
                  {phaseResult.scorePercent}% de Precisão
                </h3>

                <p className="text-xs text-slate-300">
                  Você acertou <strong>{phaseResult.correctCount}</strong> de <strong>{phaseResult.total}</strong> questões.
                </p>
              </div>
            </div>

            {/* Explanation card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
              <div className="font-mono font-bold text-red-400 uppercase text-[10px]">
                Diagnóstico de Segurança:
              </div>
              <p className="leading-relaxed">
                {phaseResult.passed
                  ? activePhase.id < 4
                    ? `Excelente domínio técnico! Você superou a nota de corte de 80% e a Fase ${activePhase.id + 1} está oficialmente desbloqueada.`
                    : `Parabéns supremo! Você zerou todas as 4 fases do Desafio Gamificado e atingiu o nível máximo de Cyber Defender 2026!`
                  : `Para liberar o próximo nível de segurança, é obrigatório atingir ao menos 80% (4 acertos). Revise os conceitos do PDF e tente novamente.`}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              {phaseResult.passed && activePhase.id < 4 ? (
                <button
                  onClick={handleNextPhase}
                  className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase font-black tracking-wider transition-all cyber-glow-red flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Avançar para Fase {activePhase.id + 1}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : null}

              <button
                onClick={handleRetryPhase}
                className="w-full py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-300 hover:text-white font-mono text-xs uppercase font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-red-400" />
                <span>{phaseResult.passed ? 'Refazer esta Fase' : 'Tentar Novamente'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
