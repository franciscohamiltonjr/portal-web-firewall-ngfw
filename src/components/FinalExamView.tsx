import React, { useState } from 'react';
import { FINAL_EXAM_QUESTIONS, ExamQuestion } from '../data/finalExamData';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  Award, 
  ChevronRight, 
  Check, 
  Flame, 
  Info,
  ShieldCheck
} from 'lucide-react';

export const FinalExamView: React.FC = () => {
  // Store selected answers: { questionId: 'A' | 'B' | 'C' | 'D' }
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, letter: 'A' | 'B' | 'C' | 'D') => {
    if (submitted) return; // Locked once submitted
    setAnswers(prev => ({ ...prev, [questionId]: letter }));
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = FINAL_EXAM_QUESTIONS.length; // 15
  const isAllAnswered = answeredCount === totalQuestions;

  // Calculate score
  const correctCount = FINAL_EXAM_QUESTIONS.filter(
    q => answers[q.id] === q.correctOption
  ).length;
  const incorrectCount = totalQuestions - correctCount;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isApproved = scorePercent >= 70; // 11 of 15 is 73%

  const handleSubmit = () => {
    setSubmitted(true);
    setShowReview(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowReview(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const wrongQuestions = FINAL_EXAM_QUESTIONS.filter(
    q => answers[q.id] !== q.correctOption
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER BANNER */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-red-950 cyber-grid relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-48 bg-red-600/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/40 border border-red-800/50 text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-red-500" />
            <span>Avaliação Global de Certificação · Versão 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Prova Final Compreensiva (15 Questões)
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Uma questão representativa de cada um dos 15 capítulos do e-book <em>"Firewall Sem Ilusão"</em> (Mariana BS). 
            Responda todas as 15 perguntas para obter o diagnóstico completo da sua maturidade técnica.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-400">
            <span>Total: 15 Questões</span>
            <span>·</span>
            <span>Nota de Corte: 70% (11 acertos)</span>
            <span>·</span>
            <span>Respondidas: {answeredCount}/15</span>
          </div>
        </div>
      </div>

      {/* SUBMITTED RESULTS SUMMARY */}
      {submitted && (
        <div className={`p-6 sm:p-8 rounded-2xl border ${
          isApproved 
            ? 'bg-slate-950 border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.15)]' 
            : 'bg-slate-950 border-red-500/60 shadow-[0_0_30px_rgba(255,30,39,0.15)]'
        } space-y-6 animate-in fade-in duration-300`}>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                isApproved ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {isApproved ? 'RESULTADO: APROVADO COM LOUVOR' : 'RESULTADO: NÃO ATINGIU A NOTA DE CORTE'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {correctCount} de 15 Acertos ({scorePercent}%)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {isApproved 
                  ? 'Parabéns! Você demonstrou domínio sólido dos fundamentos técnicos, arquitetura e operação de NGFW sem cair nas armadilhas de marketing.'
                  : 'Revise o relatório de erros abaixo com as explicações fidedignas extraídas do PDF e refaça a prova para consolidar o conhecimento.'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900 border border-slate-800 min-w-[140px] shrink-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Precisão</span>
              <span className={`text-3xl font-black font-mono ${
                isApproved ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {scorePercent}%
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {correctCount} corretas · {incorrectCount} erradas
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="text-xs font-mono text-slate-400">
              {incorrectCount > 0 ? (
                <span className="text-red-400 font-bold">
                  {incorrectCount} questão(ões) necessitam de atenção técnica.
                </span>
              ) : (
                <span className="text-emerald-400 font-bold">
                  Gabarito perfeito! 100% de aproveitamento.
                </span>
              )}
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-red-400" />
              <span>Refazer Prova Final</span>
            </button>
          </div>

          {/* RELATÓRIO DAS QUESTÕES ONDE ERROU */}
          {wrongQuestions.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4">
              <h4 className="text-sm font-mono font-bold text-red-400 uppercase flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>Relatório das Questões Incorretas ({wrongQuestions.length}):</span>
              </h4>

              <div className="space-y-4">
                {wrongQuestions.map((q: ExamQuestion) => {
                  const userAnswer = answers[q.id];
                  return (
                    <div 
                      key={q.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-red-950 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-red-400 font-bold">
                          Capítulo {q.chapterNumber}: {q.chapterTitle}
                        </span>
                        <span className="text-slate-500">Questão #{q.id}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-white font-medium">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 rounded bg-red-950/40 border border-red-800/50 text-red-200">
                          <span className="font-bold block text-[10px] text-red-400 uppercase">Sua resposta:</span>
                          Opção {userAnswer || 'Não respondida'}: {q.options.find(o => o.letter === userAnswer)?.text || '-'}
                        </div>
                        <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/50 text-emerald-200">
                          <span className="font-bold block text-[10px] text-emerald-400 uppercase">Resposta correta:</span>
                          Opção {q.correctOption}: {q.options.find(o => o.letter === q.correctOption)?.text}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                        <span className="font-mono font-bold text-red-400 block text-[10px] uppercase mb-1">
                          Justificativa Fiel (PDF Mariana BS):
                        </span>
                        {q.justification}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* QUESTIONS LIST */}
      <div className="space-y-8">
        {FINAL_EXAM_QUESTIONS.map((question: ExamQuestion, index: number) => {
          const selectedLetter = answers[question.id];
          const isAnswered = Boolean(selectedLetter);

          return (
            <div 
              key={question.id}
              className={`p-6 rounded-2xl bg-slate-950 border transition-all ${
                submitted 
                  ? selectedLetter === question.correctOption
                    ? 'border-emerald-500/50'
                    : 'border-red-500/50'
                  : isAnswered
                  ? 'border-slate-700'
                  : 'border-slate-800/80'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-bold">
                    Questão {index + 1} de 15
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">
                    Cap. {question.chapterNumber}: {question.chapterTitle}
                  </span>
                </div>

                {submitted && (
                  <div>
                    {selectedLetter === question.correctOption ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Correta (+1)
                      </span>
                    ) : (
                      <span className="text-red-400 font-bold flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorreta (0)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Question Text */}
              <h3 className="text-sm sm:text-base font-bold text-white mb-5 leading-relaxed">
                {question.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {question.options.map(option => {
                  const isSelected = selectedLetter === option.letter;
                  const isCorrect = option.letter === question.correctOption;

                  let optionStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 text-slate-300';
                  
                  if (submitted) {
                    if (isCorrect) {
                      optionStyle = 'border-emerald-500/80 bg-emerald-950/30 text-white font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'border-red-500/80 bg-red-950/30 text-red-200';
                    } else {
                      optionStyle = 'border-slate-900 bg-slate-950/50 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'border-red-600 bg-red-950/30 text-white font-medium cyber-glow-red';
                  }

                  return (
                    <button
                      key={option.letter}
                      onClick={() => handleSelectOption(question.id, option.letter)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                        isSelected 
                          ? 'bg-red-600 text-white' 
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {option.letter}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {option.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Inline justification after submission */}
              {submitted && (
                <div className="mt-4 p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-mono text-red-400 font-bold uppercase block">
                    Fundamentação Técnica (PDF Mariana BS):
                  </span>
                  <p className="leading-relaxed">
                    {question.justification}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SUBMISSION BAR */}
      {!submitted && (
        <div className="sticky bottom-6 z-20 p-4 sm:p-5 rounded-2xl bg-slate-950/95 backdrop-blur-md border border-red-900/60 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-300">
              Progresso da Prova: <strong className="text-white">{answeredCount}</strong> de <strong>{totalQuestions}</strong> questões respondidas
            </div>
            <div className="w-48 sm:w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className={`px-8 py-3.5 rounded-xl font-mono text-xs uppercase font-black tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isAllAnswered
                ? 'bg-red-600 hover:bg-red-500 text-white cyber-glow-red hover:-translate-y-0.5'
                : 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <span>Submeter Prova Final</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
