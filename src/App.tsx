import React, { useState, useEffect } from 'react';
import { CHAPTERS, APPENDICES, BOOK_METADATA } from './data/bookData';
import { Header, MainTabType } from './components/Header';
import { UnifiedHomeMap } from './components/UnifiedHomeMap';
import { FinalExamView } from './components/FinalExamView';
import { GamifiedChallengeView } from './components/GamifiedChallengeView';
import { ChapterView } from './components/ChapterView';
import { QuizView } from './components/QuizView';
import { ThroughputCalculator } from './components/ThroughputCalculator';
import { ChecklistView } from './components/ChecklistView';
import { HardeningView } from './components/HardeningView';
import { FullDocumentView } from './components/FullDocumentView';
import { VendorsView } from './components/VendorsView';
import { SearchModal } from './components/SearchModal';
import { AuthorsModal } from './components/AuthorsModal';
import { GlossaryModal } from './components/GlossaryModal';
import { Shield, Network, FileText, Trophy, ArrowLeft, Users, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTabType>('home');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('cap-1');
  const [quizChapterNumber, setQuizChapterNumber] = useState<number>(1);
  const [checklistAppendix, setChecklistAppendix] = useState<'A' | 'B'>('A');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthorsOpen, setIsAuthorsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [activeGlossaryTermId, setActiveGlossaryTermId] = useState<string | null>(null);

  const handleOpenGlossary = (termId?: string) => {
    setActiveGlossaryTermId(termId || null);
    setIsGlossaryOpen(true);
  };

  // Completed chapters stored in localStorage
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('firewall_completed_chapters');
      return saved ? JSON.parse(saved) : ['cap-1'];
    } catch {
      return ['cap-1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('firewall_completed_chapters', JSON.stringify(completedChapters));
    } catch {
      // ignore
    }
  }, [completedChapters]);

  const toggleCompleteChapter = (id: string) => {
    setCompletedChapters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSelectChapter = (id: string) => {
    if (id.startsWith('apendice-')) {
      if (id === 'apendice-c') {
        setActiveTab('hardening');
      } else {
        setChecklistAppendix(id === 'apendice-a' ? 'A' : 'B');
        setActiveTab('checklists');
      }
      setSelectedChapterId(id);
    } else {
      setSelectedChapterId(id);
      setActiveTab('chapter-view');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuiz = (chapterNum?: number) => {
    if (chapterNum) {
      setQuizChapterNumber(chapterNum);
    } else {
      const match = selectedChapterId.match(/cap-(\d+)/);
      if (match) {
        setQuizChapterNumber(parseInt(match[1], 10));
      } else {
        setQuizChapterNumber(1);
      }
    }
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find current chapter object
  const currentChapterIndex = CHAPTERS.findIndex(c => c.id === selectedChapterId);
  const currentChapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      handleSelectChapter(CHAPTERS[currentChapterIndex - 1].id);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      handleSelectChapter(CHAPTERS[currentChapterIndex + 1].id);
    } else {
      handleSelectChapter('apendice-a');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e0e0e0] flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* CYBER HEADER (Unified Navigation) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuthors={() => setIsAuthorsOpen(true)}
        onOpenGlossary={() => handleOpenGlossary()}
      />

      {/* SUB-HEADER CONTEXT BAR (when inside a chapter, quiz or utility) */}
      {(activeTab === 'chapter-view' || activeTab === 'quiz' || activeTab === 'checklists' || activeTab === 'hardening' || activeTab === 'calculator' || activeTab === 'fullDoc') && (
        <div className="border-b border-red-950/60 bg-[#0d0d11]/80 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-red-500" />
            <span>Voltar ao Início & Trilha</span>
          </button>

          <div className="flex items-center gap-3 text-slate-500">
            <span className="hidden sm:inline">Guia Técnico Oficial de NGFW</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-red-400 font-bold">
              {activeTab === 'chapter-view'
                ? `Capítulo ${currentChapter.number}`
                : activeTab === 'quiz'
                ? `Quiz Cap. ${quizChapterNumber}`
                : activeTab === 'calculator'
                ? 'Simulador 3D & Sizing'
                : 'Checklists'}
            </span>
          </div>
        </div>
      )}

      {/* DYNAMIC SCREEN VIEWS */}
      <main className="flex-1 w-full">
        {/* PÁGINA ÚNICA FUSIONADA: INÍCIO & MAPA DE APRENDIZADO */}
        {(activeTab === 'home' || activeTab === 'map') && (
          <UnifiedHomeMap
            onSelectChapter={handleSelectChapter}
            onOpenQuiz={handleOpenQuiz}
            onOpenFinalExam={() => {
              setActiveTab('final-exam');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenChallenge={() => {
              setActiveTab('challenge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCalculator={() => {
              setActiveTab('calculator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenChecklists={() => {
              setActiveTab('checklists');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenVendors={() => {
              setActiveTab('vendors');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGlossary={() => handleOpenGlossary()}
            completedChapters={completedChapters}
          />
        )}

        {/* TELA 3: PROVA FINAL COMPREENSIVA (15 QUESTÕES) */}
        {activeTab === 'final-exam' && (
          <FinalExamView />
        )}

        {/* TELA 4: JOGO GAMIFICADO - DESAFIO CYBER (4 FASES PROGRESSIVAS) */}
        {activeTab === 'challenge' && (
          <GamifiedChallengeView />
        )}

        {/* VISUALIZAÇÃO TEÓRICA DO CAPÍTULO */}
        {activeTab === 'chapter-view' && (
          <ChapterView
            chapter={currentChapter}
            onPrev={currentChapterIndex > 0 ? handlePrevChapter : undefined}
            onNext={handleNextChapter}
            prevTitle={currentChapterIndex > 0 ? CHAPTERS[currentChapterIndex - 1].title : undefined}
            nextTitle={
              currentChapterIndex < CHAPTERS.length - 1
                ? CHAPTERS[currentChapterIndex + 1].title
                : 'Apêndice A'
            }
            isCompleted={completedChapters.includes(currentChapter.id)}
            onToggleComplete={() => toggleCompleteChapter(currentChapter.id)}
            onStartQuiz={handleOpenQuiz}
            onOpenGlossary={handleOpenGlossary}
            onBackToMap={() => {
              setActiveTab('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* QUIZ INDIVIDUAL DO CAPÍTULO (8 QUESTÕES) */}
        {activeTab === 'quiz' && (
          <QuizView
            initialChapterNumber={quizChapterNumber}
            onSelectChapterStudy={handleSelectChapter}
            onBackToMap={() => {
              setActiveTab('map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* FERRAMENTA: CALCULADORA DE SIZING */}
        {activeTab === 'calculator' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <ThroughputCalculator />
          </div>
        )}

        {/* CHECKLISTS (APÊNDICES A E B) */}
        {activeTab === 'checklists' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <ChecklistView
              appendixLetter={checklistAppendix}
              onSwitchAppendix={(letter) => setChecklistAppendix(letter)}
            />
          </div>
        )}

        {/* HARDENING (APÊNDICE C) */}
        {activeTab === 'hardening' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <HardeningView />
          </div>
        )}

        {/* MODO DOCUMENTO CONTÍNUO */}
        {activeTab === 'fullDoc' && (
          <FullDocumentView />
        )}

        {/* FABRICANTES DE FIREWALL NGFW & APPLIANCES */}
        {activeTab === 'vendors' && (
          <VendorsView />
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-red-950/40 bg-[#060608] py-8 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="text-slate-300 font-bold">Firewall Sem Ilusão</span>
              <span>·</span>
              <span>Guia Técnico Completo de NGFW (2026)</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <button 
                onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Início & Trilha
              </button>
              <button 
                onClick={() => { setActiveTab('final-exam'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Prova Final
              </button>
              <button 
                onClick={() => { setActiveTab('challenge'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Desafio Cyber
              </button>
              <button 
                onClick={() => { setActiveTab('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Simulador 3D
              </button>
              <button 
                onClick={() => { setActiveTab('vendors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-red-400 transition-colors cursor-pointer text-emerald-400 font-bold"
              >
                Fabricantes NGFW
              </button>
              <button 
                onClick={() => { setActiveTab('checklists'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Checklists
              </button>
              <button 
                onClick={() => { setActiveTab('fullDoc'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="hover:text-red-400 transition-colors cursor-pointer"
              >
                Manual Completo
              </button>
              <button 
                onClick={() => handleOpenGlossary()}
                className="hover:text-red-400 transition-colors cursor-pointer text-cyan-400 font-bold flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Glossário de Termos</span>
              </button>
              <button 
                onClick={() => setIsAuthorsOpen(true)}
                className="text-red-400 hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Autores & Créditos</span>
              </button>
            </div>
          </div>

          {/* Dedicated Authors & Roles Credit Line */}
          <div className="pt-3 border-t border-slate-900/80 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500">Conteúdo Teórico:</span>
              <strong className="text-slate-200">Mariana BS</strong>
              <span className="text-slate-600">·</span>
              <span className="text-red-400">Cybersecurity Engineer (Be Safe)</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500">Criador da Plataforma:</span>
              <strong className="text-slate-200">Francisco Hamilton</strong>
              <span className="text-cyan-400 font-medium">· Analista de TI do IFSertãoPE</span>
              <button
                onClick={() => setIsAuthorsOpen(true)}
                className="ml-2 text-cyan-400 hover:text-cyan-300 underline underline-offset-2 cursor-pointer font-bold"
              >
                Ver biografia e papéis técnicos
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectChapter={handleSelectChapter}
      />

      {/* AUTHORS MODAL */}
      <AuthorsModal
        isOpen={isAuthorsOpen}
        onClose={() => setIsAuthorsOpen(false)}
      />

      {/* GLOSSARY MODAL */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => {
          setIsGlossaryOpen(false);
          setActiveGlossaryTermId(null);
        }}
        onSelectChapter={handleSelectChapter}
        initialTermId={activeGlossaryTermId}
      />
    </div>
  );
}
