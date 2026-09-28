import React, { useState } from 'react';
import { CHAPTERS, Chapter } from '../data/bookData';
import { 
  BookOpen, 
  CheckSquare, 
  Award, 
  Gamepad2, 
  Cpu, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  HelpCircle, 
  Calculator, 
  Activity, 
  FileText, 
  Lock, 
  Grid, 
  Users, 
  GitFork, 
  RefreshCw, 
  Gauge, 
  AlertTriangle, 
  Cloud, 
  ShieldCheck, 
  Wrench, 
  Flame,
  Check,
  ChevronRight,
  Sliders,
  ExternalLink,
  MessageCircle,
  Mail,
  Globe
} from 'lucide-react';

interface LearningPathMapProps {
  onSelectChapter: (chapterId: string) => void;
  onOpenQuiz: (chapterNum: number) => void;
  onNavigateToTab?: (tab: any) => void;
  completedChapters: string[];
}

const CHAPTER_ICONS: Record<number, React.ReactNode> = {
  1: <Cpu className="w-5 h-5 text-red-500" />,
  2: <Activity className="w-5 h-5 text-amber-500" />,
  3: <Shield className="w-5 h-5 text-red-400" />,
  4: <Lock className="w-5 h-5 text-emerald-400" />,
  5: <Grid className="w-5 h-5 text-blue-400" />,
  6: <Users className="w-5 h-5 text-indigo-400" />,
  7: <GitFork className="w-5 h-5 text-purple-400" />,
  8: <RefreshCw className="w-5 h-5 text-cyan-400" />,
  9: <Gauge className="w-5 h-5 text-rose-400" />,
  10: <AlertTriangle className="w-5 h-5 text-amber-400" />,
  11: <FileText className="w-5 h-5 text-sky-400" />,
  12: <Cloud className="w-5 h-5 text-blue-400" />,
  13: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  14: <Wrench className="w-5 h-5 text-teal-400" />,
  15: <Award className="w-5 h-5 text-yellow-400" />
};

export const LearningPathMap: React.FC<LearningPathMapProps> = ({
  onSelectChapter,
  onOpenQuiz,
  onNavigateToTab,
  completedChapters
}) => {
  const [activeView, setActiveView] = useState<'roadmap' | 'chapters'>('roadmap');
  const [selectedPin, setSelectedPin] = useState<number>(1);

  const completedCount = CHAPTERS.filter(c => completedChapters.includes(c.id)).length;
  const progressPercent = Math.round((completedCount / CHAPTERS.length) * 100);

  // 5 Strategic Pillars / Pins from the uploaded image
  const TRACK_PINS = [
    {
      id: 1,
      step: '1',
      title: 'APRENDIZADO TEÓRICO',
      badge: '15 Capítulos Fidedignos',
      color: 'cyan',
      glowClass: 'shadow-[0_0_25px_rgba(6,182,212,0.45)]',
      borderClass: 'border-cyan-500',
      bgGradient: 'from-cyan-950/60 via-slate-950 to-slate-900',
      pinColor: 'bg-cyan-500 text-slate-950',
      ringColor: 'border-cyan-400',
      textColor: 'text-cyan-400',
      icon: <BookOpen className="w-7 h-7 text-cyan-300" />,
      description: 'Fundamentos sólidos de engenharia de rede: arquitetura de hardware (CPU, ASIC, NPU), tabela de estados TCP, inspeção profunda (DPI), TLS 1.3 e Zero Trust PEP/PDP.',
      stats: '15 Capítulos · Teoria Sem Ilusão',
      actionLabel: 'Acessar Teoria dos 15 Capítulos',
      onClick: () => {
        setActiveView('chapters');
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    },
    {
      id: 2,
      step: '2',
      title: 'TESTES POR CAPÍTULOS',
      badge: '15 Quizzes · 120 Questões',
      color: 'red',
      glowClass: 'shadow-[0_0_25px_rgba(239,68,68,0.45)]',
      borderClass: 'border-red-500',
      bgGradient: 'from-red-950/60 via-slate-950 to-slate-900',
      pinColor: 'bg-red-600 text-white',
      ringColor: 'border-red-500',
      textColor: 'text-red-400',
      icon: <CheckSquare className="w-7 h-7 text-red-300" />,
      description: 'Fixação técnica imediata: 8 perguntas exclusivas de múltipla escolha para cada um dos 15 capítulos, com verificação individual por botão e justificativas textuais.',
      stats: '8 Questões por Capítulo · Verificação com Citação',
      actionLabel: 'Iniciar Quizzes de Capítulos',
      onClick: () => onOpenQuiz(1)
    },
    {
      id: 3,
      step: '3',
      title: 'PROVA FINAL',
      badge: '15 Questões Globais',
      color: 'purple',
      glowClass: 'shadow-[0_0_25px_rgba(168,85,247,0.45)]',
      borderClass: 'border-purple-500',
      bgGradient: 'from-purple-950/60 via-slate-950 to-slate-900',
      pinColor: 'bg-purple-600 text-white',
      ringColor: 'border-purple-400',
      textColor: 'text-purple-400',
      icon: <Award className="w-7 h-7 text-purple-300" />,
      description: 'Avaliação compreensiva de nível de certificação: 1 questão representativa de cada um dos 15 capítulos, cálculo automático de score e relatório detalhado de erros.',
      stats: '1 Questão por Capítulo · Nota de Corte 70%',
      actionLabel: 'Fazer Prova Final de Certificação',
      onClick: () => onNavigateToTab ? onNavigateToTab('final-exam') : null
    },
    {
      id: 4,
      step: '4',
      title: 'JOGO DO APRENDIZADO',
      badge: 'Desafio Gamificado em 4 Fases',
      color: 'amber',
      glowClass: 'shadow-[0_0_25px_rgba(245,158,11,0.45)]',
      borderClass: 'border-amber-500',
      bgGradient: 'from-amber-950/60 via-slate-950 to-slate-900',
      pinColor: 'bg-amber-500 text-slate-950',
      ringColor: 'border-amber-400',
      textColor: 'text-amber-400',
      icon: <Gamepad2 className="w-7 h-7 text-amber-300" />,
      description: 'Progressão por níveis de maturidade cibernética com trava estrita de 80% para desbloqueio: Hardware & Core, Inspeção & Identidade, Arquitetura & HA e Zero Trust.',
      stats: '4 Fases Progressivas · Trava de 80%',
      actionLabel: 'Entrar no Desafio Gamificado',
      onClick: () => onNavigateToTab ? onNavigateToTab('challenge') : null
    },
    {
      id: 5,
      step: '5',
      title: 'SIMULADOR',
      badge: 'Appliances NGFW (30G/50G/70G)',
      color: 'blue',
      glowClass: 'shadow-[0_0_25px_rgba(56,189,248,0.45)]',
      borderClass: 'border-sky-500',
      bgGradient: 'from-sky-950/60 via-slate-950 to-slate-900',
      pinColor: 'bg-sky-500 text-slate-950',
      ringColor: 'border-sky-400',
      textColor: 'text-sky-400',
      icon: <Sliders className="w-7 h-7 text-sky-300" />,
      description: 'Simulador e dimensionamento realista de hardware: aplique a Regra do Divisor (dividir por 3 a 5), calcule pacotes pequenos (64B vs 1518B) e projete headroom real.',
      stats: 'Presets de Hardware · Throughput Realista',
      actionLabel: 'Abrir Simulador de Throughput',
      onClick: () => onNavigateToTab ? onNavigateToTab('calculator') : null
    }
  ];

  const currentSelectedTrack = TRACK_PINS.find(p => p.id === selectedPin) || TRACK_PINS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 🛡️ HERO BANNER ADAPTADO DA IMAGEM OFICIAL */}
      <section className="relative rounded-2xl overflow-hidden border border-red-950/90 bg-gradient-to-r from-[#120709] via-[#090a0f] to-[#070b14] p-6 sm:p-10 shadow-2xl cyber-grid">
        {/* Glow & Cyber Shield Ambient Watermark */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-red-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-48 h-48 opacity-10 pointer-events-none hidden lg:block">
          <Shield className="w-full h-full text-red-500" />
        </div>

        <div className="relative z-10 space-y-4">
          {/* Top Brand Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/50 border border-red-700/60 text-[11px] font-mono font-bold text-red-400 tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>ROTEIRO OFICIAL DE CAPACITAÇÃO EM NGFW</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/70 px-3 py-1 rounded-lg border border-slate-800">
              <Shield className="w-3.5 h-3.5 text-red-500" />
              <span className="font-bold text-white tracking-wider">NGFW LAB</span>
              <span className="text-slate-600">·</span>
              <span>CYBER ARCHITECTURE</span>
            </div>
          </div>

          {/* Main Title & Subtitle from banner */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-[1.15]">
              TRILHA DE APRENDIZADO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">NGFW</span>:
              <span className="block text-xl sm:text-3xl text-slate-100 font-extrabold mt-1">
                DOMINE A CIBERSEGURANÇA
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-medium tracking-wide uppercase font-mono">
              PASSOS ESSENCIAIS PARA SE TORNAR UM ESPECIALISTA EM FIREWALLS
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setActiveView('roadmap')}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeView === 'roadmap'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4 text-white" />
              <span>1. Estrada dos 5 Passos (Visão do Banner)</span>
            </button>

            <button
              onClick={() => setActiveView('chapters')}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeView === 'chapters'
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-300" />
              <span>2. Detalhamento dos 15 Capítulos & Quizzes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 🛣️ SEÇÃO 1: A ESTRADA DOS 5 PASSOS (MAPA ADAPTADO DA IMAGEM) */}
      {activeView === 'roadmap' && (
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Cyber Highway Roadmap Container */}
          <div className="rounded-2xl bg-[#090a0f] border border-slate-800 p-6 sm:p-8 relative overflow-hidden space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-500" />
                  <span>A Jornada em 5 Etapas Consecutivas</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Clique nos pinos de localização da estrada para visualizar e iniciar cada etapa da sua formação.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <span>Capítulos Concluídos:</span>
                <span className="font-bold text-red-400">{completedCount} de 15</span>
              </div>
            </div>

            {/* Sinuous Road / Visual Highway with 5 Interactive Checkpoint Pins */}
            <div className="relative pt-4 pb-12">
              
              {/* Background glowing road line (Desktop & Tablet) */}
              <div className="hidden lg:block absolute left-8 right-8 top-16 h-4 bg-gradient-to-r from-cyan-950 via-red-950 via-purple-950 via-amber-950 to-sky-950 rounded-full border border-slate-800 overflow-hidden">
                <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.15)_20px,rgba(255,255,255,0.15)_40px)]" />
              </div>

              {/* 5 Pins Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
                {TRACK_PINS.map((pin) => {
                  const isSelected = selectedPin === pin.id;

                  return (
                    <div 
                      key={pin.id} 
                      onClick={() => setSelectedPin(pin.id)}
                      className="flex flex-col items-center text-center group cursor-pointer"
                    >
                      {/* Interactive Pin Marker */}
                      <div className="relative mb-3">
                        {/* Pin Header Capsule with Shadow */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${pin.ringColor} ${
                          isSelected 
                            ? `${pin.glowClass} scale-110 ring-4 ring-white/20 bg-slate-900` 
                            : 'bg-slate-950 hover:scale-105'
                        }`}>
                          {pin.icon}
                        </div>

                        {/* Pin Point Pointer */}
                        <div className={`w-3 h-3 rotate-45 mx-auto -mt-1.5 border-r-2 border-b-2 ${pin.ringColor} ${
                          isSelected ? 'bg-slate-900' : 'bg-slate-950'
                        }`} />

                        {/* Step Number Tag */}
                        <span className={`absolute -top-2.5 -right-2 px-1.5 py-0.5 rounded-full text-[10px] font-black font-mono shadow ${pin.pinColor}`}>
                          #{pin.step}
                        </span>
                      </div>

                      {/* Pin Title */}
                      <h4 className={`text-xs font-black uppercase font-mono tracking-wider transition-colors ${
                        isSelected ? pin.textColor : 'text-slate-300 group-hover:text-white'
                      }`}>
                        {pin.title}
                      </h4>

                      {/* Badge / Subtext */}
                      <span className="text-[10px] text-slate-400 mt-1 font-mono">
                        {pin.badge}
                      </span>

                      {/* Small Quick Action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          pin.onClick();
                        }}
                        className={`mt-2.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                          isSelected
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        Acessar →
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Selected Track Detailed Feature Card */}
            <div className={`p-6 sm:p-8 rounded-xl border bg-gradient-to-r ${currentSelectedTrack.bgGradient} ${currentSelectedTrack.borderClass} transition-all duration-300`}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${currentSelectedTrack.pinColor}`}>
                      PASSO {currentSelectedTrack.step} DE 5
                    </span>
                    <span className="text-slate-400 font-mono text-xs">·</span>
                    <span className={`font-mono text-xs font-bold ${currentSelectedTrack.textColor}`}>
                      {currentSelectedTrack.stats}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {currentSelectedTrack.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentSelectedTrack.description}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={currentSelectedTrack.onClick}
                    className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase font-black tracking-wider transition-all cyber-glow-red flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 shadow-lg"
                  >
                    <span>{currentSelectedTrack.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* 5 Deep-Dive Feature Cards in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Card 1 & 2 Combined Info */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Teoria & 2. Testes</span>
                <BookOpen className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-sm font-bold text-white">15 Capítulos + 120 Questões</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Estude cada tópico da arquitetura de firewall sem ilusão e teste seu conhecimento imediatamente no quiz de 8 perguntas com explicações completas.
              </p>
              <button
                onClick={() => { setActiveView('chapters'); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Ver lista completa dos 15 nós</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3 & 4 Info */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-purple-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase">3. Prova & 4. Desafio</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Avaliação Global & Gamificação</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supere a Prova Final de 15 questões e encare o Desafio Cyber em 4 fases consecutivas com a trava obrigatória de 80% de precisão para desbloqueio.
              </p>
              <button
                onClick={() => onNavigateToTab ? onNavigateToTab('challenge') : null}
                className="text-xs font-mono font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Ir para o Desafio Gamificado</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 5 Info */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-sky-500/50 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase">5. Simulador de Hardware</span>
                <Sliders className="w-4 h-4 text-sky-400" />
              </div>
              <h4 className="text-sm font-bold text-white">Dimensionamento Realista</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Presets prontos para Appliances NGFW 30G, 50G, 70G, 100 e 200. Calcule throughput real considerando pacotes médios e sobrecarga de inspeção TLS 1.3.
              </p>
              <button
                onClick={() => onNavigateToTab ? onNavigateToTab('calculator') : null}
                className="text-xs font-mono font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Calcular sizing do Firewall</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 📚 SEÇÃO 2: DETALHAMENTO DOS 15 CAPÍTULOS & QUIZZES */}
      {activeView === 'chapters' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold uppercase">
              Lista Detalhada dos 15 Capítulos Técnicos
            </span>
            <span className="text-red-400">
              {completedCount} de 15 concluídos ({progressPercent}%)
            </span>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="hidden md:block absolute left-8 top-10 bottom-10 w-0.5 bg-gradient-to-b from-red-600 via-red-900/60 to-red-600/20" />

            <div className="space-y-5">
              {CHAPTERS.map((chapter: Chapter, index: number) => {
                const chapterNum = Number(chapter.number);
                const isCompleted = completedChapters.includes(chapter.id);
                const isNext = !isCompleted && (index === 0 || completedChapters.includes(CHAPTERS[index - 1].id));

                return (
                  <div 
                    key={chapter.id}
                    className="relative flex flex-col md:flex-row items-start md:items-center gap-5 group"
                  >
                    {/* Node Connector Circle */}
                    <div className={`relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-red-950/80 border-red-500 text-white shadow-[0_0_15px_rgba(255,30,39,0.3)]' 
                        : isNext
                        ? 'bg-slate-900 border-red-500 text-red-400 cyber-glow-red animate-pulse'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}>
                      {CHAPTER_ICONS[chapterNum] || <Shield className="w-5 h-5 text-red-500" />}
                      <span className="absolute -bottom-2 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        #{chapterNum}
                      </span>
                    </div>

                    {/* Chapter Card */}
                    <div className={`flex-1 w-full rounded-2xl p-5 transition-all duration-300 border ${
                      isCompleted
                        ? 'bg-slate-950 border-red-950/60 hover:border-red-600/50'
                        : isNext
                        ? 'bg-slate-950 border-red-600/60 shadow-[0_0_20px_rgba(255,30,39,0.15)]'
                        : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                    }`}>
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                            <span className="text-red-500 font-bold uppercase tracking-wider">
                              NÓ {chapterNum} DE 15
                            </span>
                            <span className="text-slate-600">·</span>
                            <span className="text-slate-400">{chapter.pages}</span>
                            {isCompleted && (
                              <>
                                <span className="text-slate-600">·</span>
                                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                  <CheckCircle className="w-3.5 h-3.5" /> Concluído
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                            Capítulo {chapterNum}: {chapter.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-400 line-clamp-1 leading-relaxed">
                            {chapter.subtitle}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                          <button
                            onClick={() => onSelectChapter(chapter.id)}
                            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Ler Teoria</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onOpenQuiz(chapterNum)}
                            className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <HelpCircle className="w-3.5 h-3.5 text-red-400" />
                            <span>Quiz (8Q)</span>
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 🔴 BARRA INFERIOR DE RECURSOS E CONTATO (INSPIRADA NO RODAPÉ DO BANNER) */}
      <section className="rounded-2xl bg-gradient-to-r from-red-950/50 via-slate-950 to-slate-900 border border-red-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block">
              CANAL DE APOIO & FERRAMENTAS PRÁTICAS
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Recursos de Engenharia e Comunidade
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Consulte os apêndices de auditoria e listas de verificação para aplicar diretamente em implantações de firewalls corporativos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateToTab ? onNavigateToTab('checklists') : null}
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>Checklists (Apêndices A, B & C)</span>
            </button>

            <button
              onClick={() => onNavigateToTab ? onNavigateToTab('calculator') : null}
              className="px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase transition-all cyber-glow-red flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-white" />
              <span>Simulador de Hardware</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
