import React from 'react';
import { 
  Shield, 
  Home, 
  Network, 
  FileText, 
  Trophy, 
  Search, 
  Calculator, 
  CheckSquare, 
  FileCode,
  Flame,
  Users,
  HardDrive,
  BookOpen
} from 'lucide-react';

export type MainTabType = 
  | 'home' 
  | 'map' 
  | 'final-exam' 
  | 'challenge' 
  | 'vendors'
  | 'chapter-view' 
  | 'quiz' 
  | 'checklists' 
  | 'hardening' 
  | 'calculator' 
  | 'fullDoc';

interface HeaderProps {
  activeTab: MainTabType;
  setActiveTab: (tab: MainTabType) => void;
  onOpenSearch: () => void;
  onOpenAuthors?: () => void;
  onOpenGlossary?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAuthors,
  onOpenGlossary
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070709]/95 backdrop-blur-md border-b border-red-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-600/40 flex items-center justify-center text-red-500 group-hover:border-red-500 transition-all cyber-glow-red">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="text-sm sm:text-base font-black tracking-tight text-white block leading-tight font-mono uppercase">
                  FIREWALL <span className="text-red-500">SEM ILUSÃO</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:block">
                  NGFW LAB · GUIA TÉCNICO COMPLETO
                </span>
              </div>
            </button>
          </div>

          {/* Primary Cyber Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            {/* 1. Início & Trilha (Página Única) */}
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'home' || activeTab === 'map'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Início & Trilha</span>
            </button>

            {/* 2. Prova Final */}
            <button
              onClick={() => setActiveTab('final-exam')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'final-exam'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Prova Final (15Q)</span>
            </button>

            {/* 3. Desafio Gamificado */}
            <button
              onClick={() => setActiveTab('challenge')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'challenge'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Desafio Gamificado</span>
            </button>

            {/* 4. Simulador */}
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-sky-400" />
              <span>Simulador</span>
            </button>

            {/* 5. Fabricantes NGFW */}
            <button
              onClick={() => setActiveTab('vendors')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'vendors'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.35)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              <span>Fabricantes</span>
            </button>
          </nav>

          {/* Right Utilities & Actions */}
          <div className="flex items-center gap-2">
            {/* Checklists Shortcut */}

            {/* Checklists Shortcut */}
            <button
              onClick={() => setActiveTab('checklists')}
              title="Apêndices A, B & C"
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
                activeTab === 'checklists' || activeTab === 'hardening'
                  ? 'bg-red-950 border-red-500 text-red-300'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xl:inline">Checklists</span>
            </button>

            {/* Glossary Modal Button */}
            {onOpenGlossary && (
              <button
                onClick={onOpenGlossary}
                title="Glossário Técnico de Redes e Firewalls"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-900/60 bg-red-950/30 text-red-300 hover:text-white hover:border-red-500 text-xs font-mono transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline">Glossário</span>
              </button>
            )}

            {/* Authors Button */}
            {onOpenAuthors && (
              <button
                onClick={onOpenAuthors}
                title="Informações dos Autores e Desenvolvimento"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-red-900/60 bg-red-950/30 text-red-300 hover:text-white hover:border-red-500 text-xs font-mono transition-all cursor-pointer"
              >
                <Users className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden md:inline">Autores</span>
              </button>
            )}

            {/* Global Search */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-red-600/60 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">Buscar...</span>
              <kbd className="hidden md:inline px-1 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-500">
                ⌘K
              </kbd>
            </button>
          </div>

        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-900 text-xs font-mono overflow-x-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-2 py-1 rounded ${activeTab === 'home' || activeTab === 'map' ? 'text-red-400 font-bold' : 'text-slate-400'}`}
          >
            Início
          </button>
          <button
            onClick={() => setActiveTab('vendors')}
            className={`px-2 py-1 rounded ${activeTab === 'vendors' ? 'text-red-400 font-bold' : 'text-slate-400'}`}
          >
            Fabricantes
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-2 py-1 rounded ${activeTab === 'calculator' ? 'text-red-400 font-bold' : 'text-slate-400'}`}
          >
            Simulador
          </button>
          {onOpenGlossary && (
            <button
              onClick={onOpenGlossary}
              className="px-2 py-1 rounded text-red-400 font-bold flex items-center gap-1"
            >
              Glossário
            </button>
          )}
          <button
            onClick={() => setActiveTab('challenge')}
            className={`px-2 py-1 rounded ${activeTab === 'challenge' ? 'text-red-400 font-bold' : 'text-slate-400'}`}
          >
            Desafio
          </button>
          <button
            onClick={() => setActiveTab('final-exam')}
            className={`px-2 py-1 rounded ${activeTab === 'final-exam' ? 'text-red-400 font-bold' : 'text-slate-400'}`}
          >
            Prova
          </button>
        </div>
      </div>
    </header>
  );
};
