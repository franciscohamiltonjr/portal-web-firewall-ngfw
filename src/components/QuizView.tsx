import React, { useState } from 'react';
import { CHAPTER_QUIZZES, QuizQuestion } from '../data/quizData';
import { CheckCircle2, XCircle, Award, RotateCcw, HelpCircle, Shield, ChevronRight, BookOpen, AlertCircle } from 'lucide-react';

interface QuizViewProps {
  initialChapterNumber?: number;
  onSelectChapterStudy?: (chapterId: string) => void;
  onBackToMap?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  initialChapterNumber = 1,
  onSelectChapterStudy,
  onBackToMap
}) => {
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(initialChapterNumber);
  
  // State for user answers: { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  
  // State for questions checked: { [questionId]: boolean }
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  
  // State for quiz finished
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQuiz = CHAPTER_QUIZZES[selectedChapterNum] || CHAPTER_QUIZZES[1];

  const handleSelectOption = (questionId: number, optionLetter: 'A' | 'B' | 'C' | 'D') => {
    if (checkedQuestions[questionId] || isFinished) return; // Locked once verified
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionLetter
    }));
  };

  const handleVerifyQuestion = (questionId: number) => {
    if (!selectedAnswers[questionId]) return;
    setCheckedQuestions(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleFinishQuiz = () => {
    // Automatically verify any question that has an answer selected
    const allChecked: Record<number, boolean> = { ...checkedQuestions };
    currentQuiz.questions.forEach(q => {
      if (selectedAnswers[q.id]) {
        allChecked[q.id] = true;
      }
    });
    setCheckedQuestions(allChecked);
    setIsFinished(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCheckedQuestions({});
    setIsFinished(false);
  };

  const handleChapterChange = (num: number) => {
    setSelectedChapterNum(num);
    setSelectedAnswers({});
    setCheckedQuestions({});
    setIsFinished(false);
  };

  // Score calculations
  const correctCount = currentQuiz.questions.filter(q => selectedAnswers[q.id] === q.correctOption).length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const wrongCount = answeredCount - correctCount;
  const scorePercent = Math.round((correctCount / currentQuiz.questions.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 animate-fade-in">
      {/* Quiz Top Header */}
      <header className="space-y-4 border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold uppercase tracking-wider">
              Avaliação de Domínio
            </span>
            <span aria-hidden="true">·</span>
            <span>8 Questões Exclusivas</span>
            <span aria-hidden="true">·</span>
            <span>Fidelidade Técnica Absoluta</span>
          </div>

          <div className="flex items-center gap-2">
            {onBackToMap && (
              <button
                onClick={onBackToMap}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-red-500 font-mono text-xs transition-all cursor-pointer"
              >
                <span>← Voltar ao Mapa</span>
              </button>
            )}

            {onSelectChapterStudy && (
              <button
                onClick={() => onSelectChapterStudy(`cap-${selectedChapterNum}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                <span>Estudar Capítulo {selectedChapterNum}</span>
              </button>
            )}
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500 shrink-0" />
            <span>Quiz & Avaliação: Capítulo {selectedChapterNum}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-2 font-medium">
            {currentQuiz.chapterTitle}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Teste seu domínio técnico prático. Todas as 8 questões são baseadas estrita e exclusivamente no texto deste capítulo do guia Firewall Sem Ilusão (2026).
          </p>
        </div>

        {/* Chapter Selector Dropdown / Pills */}
        <div className="pt-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Selecionar Capítulo para Avaliação:
          </label>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => handleChapterChange(num)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  selectedChapterNum === num
                    ? 'bg-red-600 text-white shadow-md shadow-red-950/40 ring-2 ring-red-500/50'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                Cap. {num}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Finished Summary Banner (Shown when finished) */}
      {isFinished && (
        <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-red-950/30 border border-red-500/40 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                correctCount >= 6 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <Award className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Resultado da Avaliação — Capítulo {selectedChapterNum}
                </h2>
                <p className="text-sm text-slate-300">
                  {correctCount === 8
                    ? 'Desempenho Impecável! Você domina com rigor todos os conceitos técnicos deste capítulo.'
                    : correctCount >= 6
                    ? 'Excelente aproveitamento! Seu domínio prático sobre este capítulo está consistente.'
                    : 'Recomendamos uma revisão dos pontos de atenção e métricas deste capítulo no guia.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleResetQuiz}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Refazer Teste</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Acertos</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{correctCount} de 8</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Erros</span>
              <span className="text-2xl font-black text-red-400 font-mono">{8 - correctCount}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 block">Aproveitamento</span>
              <span className={`text-2xl font-black font-mono ${scorePercent >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {scorePercent}%
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Questions List (Exactly 8 questions) */}
      <div className="space-y-8">
        {currentQuiz.questions.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isVerified = checkedQuestions[q.id] || isFinished;
          const isCorrect = userChoice === q.correctOption;

          return (
            <div
              key={q.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                isVerified
                  ? isCorrect
                    ? 'bg-slate-900/40 border-emerald-500/40'
                    : 'bg-slate-900/40 border-red-500/40'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {q.question}
                  </h3>
                </div>

                {isVerified && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Correta
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-950/40 px-2.5 py-1 rounded-full border border-red-500/30">
                        <XCircle className="w-4 h-4 text-red-400" />
                        Incorreta
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options A, B, C, D */}
              <div className="space-y-2.5">
                {q.options.map(opt => {
                  const isSelected = userChoice === opt.letter;
                  const isRightOption = opt.letter === q.correctOption;

                  let optionStyle = "border-slate-800/80 bg-slate-950/40 text-slate-300 hover:bg-slate-900 hover:border-slate-700";

                  if (isVerified) {
                    if (isRightOption) {
                      optionStyle = "border-emerald-500/80 bg-emerald-950/30 text-white font-medium";
                    } else if (isSelected && !isRightOption) {
                      optionStyle = "border-red-500/80 bg-red-950/30 text-white line-through opacity-80";
                    } else {
                      optionStyle = "border-slate-800/40 bg-slate-950/20 text-slate-500 opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle = "border-red-500/80 bg-red-950/20 text-white font-medium ring-1 ring-red-500/40";
                  }

                  return (
                    <button
                      key={opt.letter}
                      type="button"
                      disabled={isVerified}
                      onClick={() => handleSelectOption(q.id, opt.letter)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${optionStyle}`}
                    >
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                        isSelected && !isVerified
                          ? 'bg-red-600 text-white'
                          : isVerified && isRightOption
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : isVerified && isSelected && !isRightOption
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {opt.letter}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed flex-1">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Action: Dedicated 'Verificar Resposta' Button */}
              {!isVerified && (
                <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {userChoice ? `Opção ${userChoice} selecionada` : 'Selecione uma alternativa'}
                  </span>

                  <button
                    type="button"
                    disabled={!userChoice}
                    onClick={() => handleVerifyQuestion(q.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      userChoice
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-md'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Verificar Resposta
                  </button>
                </div>
              )}

              {/* Justification Box (Shown after verified) */}
              {isVerified && (
                <div className={`mt-4 p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                  isCorrect
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-red-950/20 border-red-500/30 text-red-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>
                      {isCorrect
                        ? 'Resposta Correta — Justificativa Fiel:'
                        : `Resposta Incorreta (Gabarito: ${q.correctOption}) — Justificativa Fiel:`}
                    </span>
                  </div>
                  <p className="text-slate-200">{q.justification}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quiz Bottom Bar: Finalizar Teste */}
      <footer className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-400">
          Respondidas: <strong className="text-white font-mono">{answeredCount}</strong> de 8 questões
        </div>

        {!isFinished ? (
          <button
            onClick={handleFinishQuiz}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-950/50 transition-all flex items-center justify-center gap-2"
          >
            <span>Finalizar Teste do Capítulo {selectedChapterNum}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Teste</span>
            </button>

            {selectedChapterNum < 15 && (
              <button
                onClick={() => handleChapterChange(selectedChapterNum + 1)}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>Ir para Quiz Cap. {selectedChapterNum + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </footer>
    </div>
  );
};
