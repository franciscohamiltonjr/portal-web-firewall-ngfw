import React, { useState } from 'react';
import { CHAPTERS, Chapter } from '../data/bookData';
import { TechTooltip } from './TechTooltip';
import { StudyTipBanner } from './StudyTipBanner';
import { PWAInstallButton } from './PWAInstallButton';
import { 
  Shield, 
  Terminal, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  FileText, 
  Lock, 
  Zap, 
  Target, 
  Flame,
  BookOpen, 
  CheckSquare, 
  Gamepad2, 
  Cpu, 
  Sliders, 
  Activity, 
  HelpCircle,
  Sparkles,
  ChevronDown,
  Info,
  HardDrive,
  Trophy
} from 'lucide-react';

interface TrackPinItem {
  id: number;
  step: string;
  title: string;
  badge: string;
  color: string;
  glowClass: string;
  borderClass: string;
  bgGradient: string;
  pinColor: string;
  ringColor: string;
  textColor: string;
  icon: React.ReactNode;
  description: React.ReactNode;
  stats: string;
  actionLabel: string;
  onClick: () => void;
}

interface UnifiedHomeMapProps {
  onSelectChapter: (chapterId: string) => void;
  onOpenQuiz: (chapterNum: number) => void;
  onOpenFinalExam: () => void;
  onOpenChallenge: () => void;
  onOpenCalculator: () => void;
  onOpenChecklists?: () => void;
  onOpenVendors?: () => void;
  onOpenGlossary?: () => void;
  completedChapters: string[];
}

export const UnifiedHomeMap: React.FC<UnifiedHomeMapProps> = ({
  onSelectChapter,
  onOpenQuiz,
  onOpenFinalExam,
  onOpenChallenge,
  onOpenCalculator,
  onOpenChecklists,
  onOpenVendors,
  onOpenGlossary,
  completedChapters
}) => {
  const [activeTabMode, setActiveTabMode] = useState<'steps' | 'chapters'>('steps');
  const [selectedPin, setSelectedPin] = useState<number>(1);

  // Exatamente os 15 capítulos do livro principal (filtrando eventuais apêndices)
  const mainChapters = CHAPTERS.filter(c => typeof c.number === 'number' && Number(c.number) >= 1 && Number(c.number) <= 15);
  const totalChaptersCount = 15;
  const completedCount = mainChapters.filter(c => completedChapters.includes(c.id)).length;
  const progressPercent = Math.round((completedCount / totalChaptersCount) * 100);
  const nextUncompletedChapter = mainChapters.find(c => !completedChapters.includes(c.id)) || mainChapters[0];

  let levelLabel = "Iniciante na Trilha";
  let levelBadgeColor = "text-slate-400 border-slate-800 bg-slate-900";
  if (progressPercent === 100) {
    levelLabel = "Especialista NGFW (100% Concluído)";
    levelBadgeColor = "text-emerald-400 border-emerald-700 bg-emerald-950/60";
  } else if (progressPercent >= 75) {
    levelLabel = "Nível Avançado";
    levelBadgeColor = "text-purple-400 border-purple-700 bg-purple-950/60";
  } else if (progressPercent >= 50) {
    levelLabel = "Nível Intermediário";
    levelBadgeColor = "text-amber-400 border-amber-700 bg-amber-950/60";
  } else if (progressPercent >= 25) {
    levelLabel = "Fundamentos Ativos";
    levelBadgeColor = "text-cyan-400 border-cyan-700 bg-cyan-950/60";
  }

  const scrollToRoadmap = () => {
    const el = document.getElementById('trilha-aprendizado');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 5 Strategic Pillars / Pins from the official learning track
  const TRACK_PINS: TrackPinItem[] = [
    {
      id: 1,
      step: '1',
      title: 'APRENDIZADO TEÓRICO',
      badge: '15 Capítulos Fidedignos',
      color: 'cyan',
      glowClass: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]',
      borderClass: 'border-cyan-500/80',
      bgGradient: 'from-cyan-950/40 via-slate-950 to-slate-900',
      pinColor: 'bg-cyan-500 text-slate-950',
      ringColor: 'border-cyan-400',
      textColor: 'text-cyan-400',
      icon: <BookOpen className="w-6 h-6 text-cyan-300" />,
      description: (
        <span>
          Fundamentos sólidos de engenharia: arquitetura de hardware (<TechTooltip termKey="cpu">CPU</TechTooltip>, <TechTooltip termKey="asic">ASIC</TechTooltip>, <TechTooltip termKey="npu">NPU</TechTooltip>), tabela de estados TCP (<TechTooltip termKey="stateful">Stateful</TechTooltip>), inspeção profunda (<TechTooltip termKey="dpi">DPI</TechTooltip>), <TechTooltip termKey="tls 1.3">TLS 1.3</TechTooltip> e modelo Zero Trust (<TechTooltip termKey="pep">PEP</TechTooltip> / <TechTooltip termKey="pdp">PDP</TechTooltip>).
        </span>
      ),
      stats: '15 Capítulos · Teoria Sem Ilusão',
      actionLabel: 'Ver os 15 Capítulos Abaixo',
      onClick: () => {
        setActiveTabMode('chapters');
        setTimeout(() => {
          const el = document.getElementById('lista-capitulos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    },
    {
      id: 2,
      step: '2',
      title: 'TESTES POR CAPÍTULOS',
      badge: '15 Quizzes · 120 Questões',
      color: 'red',
      glowClass: 'shadow-[0_0_20px_rgba(239,68,68,0.4)]',
      borderClass: 'border-red-500/80',
      bgGradient: 'from-red-950/40 via-slate-950 to-slate-900',
      pinColor: 'bg-red-600 text-white',
      ringColor: 'border-red-500',
      textColor: 'text-red-400',
      icon: <CheckSquare className="w-6 h-6 text-red-300" />,
      description: (
        <span>
          Fixação técnica imediata: 8 perguntas exclusivas de múltipla escolha para cada capítulo com verificação individual por botão e justificativas textuais completas com citação de normas.
        </span>
      ),
      stats: '8 Questões por Capítulo · Verificação com Citação',
      actionLabel: 'Iniciar Quiz do Capítulo 1',
      onClick: () => onOpenQuiz(1)
    },
    {
      id: 3,
      step: '3',
      title: 'PROVA FINAL',
      badge: '15 Questões Globais',
      color: 'purple',
      glowClass: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
      borderClass: 'border-purple-500/80',
      bgGradient: 'from-purple-950/40 via-slate-950 to-slate-900',
      pinColor: 'bg-purple-600 text-white',
      ringColor: 'border-purple-400',
      textColor: 'text-purple-400',
      icon: <Award className="w-6 h-6 text-purple-300" />,
      description: (
        <span>
          Avaliação compreensiva de nível de certificação: 1 questão representativa de cada um dos 15 capítulos, pontuação automática e diagnóstico completo de erros para aprovação.
        </span>
      ),
      stats: '1 Questão por Capítulo · Nota de Corte 70%',
      actionLabel: 'Fazer Prova Final de Certificação',
      onClick: onOpenFinalExam
    },
    {
      id: 4,
      step: '4',
      title: 'JOGO DO APRENDIZADO',
      badge: 'Desafio Gamificado em 4 Fases',
      color: 'amber',
      glowClass: 'shadow-[0_0_20px_rgba(245,158,11,0.4)]',
      borderClass: 'border-amber-500/80',
      bgGradient: 'from-amber-950/40 via-slate-950 to-slate-900',
      pinColor: 'bg-amber-500 text-slate-950',
      ringColor: 'border-amber-400',
      textColor: 'text-amber-400',
      icon: <Gamepad2 className="w-6 h-6 text-amber-300" />,
      description: (
        <span>
          Progressão por níveis de maturidade em 4 fases com trava estrita de 80%: Hardware & Core, Inspeção & <TechTooltip termKey="user-id">User-ID</TechTooltip>, Arquitetura & <TechTooltip termKey="ha">HA</TechTooltip> e <TechTooltip termKey="zero trust">Zero Trust</TechTooltip>.
        </span>
      ),
      stats: '4 Fases Progressivas · Trava de 80%',
      actionLabel: 'Entrar no Desafio Gamificado',
      onClick: onOpenChallenge
    },
    {
      id: 5,
      step: '5',
      title: 'SIMULADOR',
      badge: 'Appliances NGFW (30G/50G/70G)',
      color: 'blue',
      glowClass: 'shadow-[0_0_20px_rgba(56,189,248,0.4)]',
      borderClass: 'border-sky-500/80',
      bgGradient: 'from-sky-950/40 via-slate-950 to-slate-900',
      pinColor: 'bg-sky-500 text-slate-950',
      ringColor: 'border-sky-400',
      textColor: 'text-sky-400',
      icon: <Sliders className="w-6 h-6 text-sky-300" />,
      description: (
        <span>
          Simulador de dimensionamento de hardware: aplique a <TechTooltip termKey="regra do divisor">Regra do Divisor</TechTooltip> (dividir por 3 a 5), compare o impacto de <TechTooltip termKey="pacotes 64b">pacotes de 64B vs 1518B</TechTooltip>, calcule o <TechTooltip termKey="throughput">Throughput Real</TechTooltip> e projete o <TechTooltip termKey="headroom">Headroom</TechTooltip> de 3 anos.
        </span>
      ),
      stats: 'Presets de Hardware · Throughput Realista',
      actionLabel: 'Abrir Simulador de Throughput',
      onClick: onOpenCalculator
    }
  ];

  const currentSelectedTrack = TRACK_PINS.find(p => p.id === selectedPin) || TRACK_PINS[0];

  return (
    <div className="space-y-12 pb-16">
      
      {/* 🚀 1. HERO SECTION (Limpa, Impactante e sem excessos) */}
      <section className="relative overflow-hidden border-b border-red-950/40 bg-gradient-to-b from-[#12080a] via-[#0a0a0c] to-[#0a0a0c] pt-10 pb-14 cyber-grid">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-56 bg-red-600/10 blur-[100px] pointer-events-none" />

        {/* Ambient Transparent Cyber Shield Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-xl opacity-10 pointer-events-none mix-blend-screen select-none overflow-hidden hidden md:block">
          <img
            src="/src/assets/images/cyber_shield_transparent.png"
            alt=""
            className="w-full h-auto object-contain transform translate-x-12"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines & Primaries CTAs */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Top Security Kicker Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-600/40 bg-red-950/30 text-red-400 text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>LABORATÓRIO DE CIBERSEGURANÇA & NGFW · 2026</span>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] uppercase">
                APRENDENDO SOBRE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">FIREWALL</span>
                <span className="block text-xl sm:text-2xl lg:text-3xl font-bold text-slate-300 mt-2 font-mono">
                  GUIA TÉCNICO COMPLETO DE NGFW
                </span>
              </h1>

              {/* Subtitle */}
              <div className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Do silício ao tráfego criptografado. Domine Next-Generation Firewalls com foco prático, arquitetura de hardware, decifração <TechTooltip termKey="tls 1.3">TLS 1.3</TechTooltip> e <TechTooltip termKey="zero trust">Zero Trust</TechTooltip> sem ilusão.
              </div>

              {/* Focused CTA Buttons (Hierarquia Objetiva: 1 Primário de Entrada + Acessos Diretos) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={scrollToRoadmap}
                  className="px-6 py-3.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 cyber-glow-red flex items-center gap-2.5 cursor-pointer shadow-lg"
                >
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>INICIAR JORNADA (5 PASSOS)</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectChapter('cap-1')}
                  className="px-5 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-red-400" />
                  <span>Ler Capítulo 1</span>
                </button>

                <button
                  onClick={onOpenChallenge}
                  className="px-4 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Desafio Cyber</span>
                </button>

                {onOpenVendors && (
                  <button
                    onClick={onOpenVendors}
                    className="px-4 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <HardDrive className="w-4 h-4 text-emerald-400" />
                    <span>Fabricantes NGFW</span>
                  </button>
                )}

                {onOpenGlossary && (
                  <button
                    onClick={onOpenGlossary}
                    className="px-4 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-500/80 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-red-400" />
                    <span>Glossário</span>
                  </button>
                )}

                <PWAInstallButton variant="header" className="px-4 py-3 rounded-lg text-xs" />
              </div>

              {/* Metadados Rápidos em Linha Única */}
              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs font-mono text-slate-400 border-t border-slate-900">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                  15 Capítulos Técnicos
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                  120 Questões em Quizzes
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                  Simulador de Throughput
                </span>
              </div>

            </div>

            {/* Right Column: Visual Book Cover Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-red-950/80 bg-slate-950 shadow-2xl p-2 group">
                <div className="relative rounded-xl overflow-hidden border border-slate-800/80">
                  <img
                    src="/src/assets/images/firewall_cover_hero_1790421344538.jpg"
                    alt="Livro Firewall Sem Ilusão - Guia Técnico"
                    className="w-full h-auto object-cover max-h-72 sm:max-h-80 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                    ED. 2026 OFICIAL
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-slate-950/90 backdrop-blur-md border border-red-900/40 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white font-mono uppercase">GUIA PRÁTICO</span>
                      <span className="text-red-400 font-mono text-[11px] uppercase">CYBERSECURITY LAB</span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-1 italic">
                      "Se você confia no datasheet, o problema não é o firewall."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 📊 BARRA DE PROGRESSO VISUAL DOS 15 CAPÍTULOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="rounded-2xl border border-red-900/60 bg-gradient-to-r from-[#14080b] via-[#090b10] to-[#0a0d14] p-4 sm:p-6 shadow-[0_4px_30px_rgba(255,30,39,0.22)] group">
          
          {/* Top Info Bar: Status, Nível & Percentual */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-950 via-slate-900 to-red-900/50 border border-red-500/60 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.35)] shrink-0">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  <span>PROGRESSO DA JORNADA · 15 CAPÍTULOS TÉCNICOS</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white font-mono tracking-tight uppercase flex flex-wrap items-center gap-2 mt-0.5">
                  <span>{completedCount} de {totalChaptersCount} Capítulos Concluídos</span>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase font-bold ${levelBadgeColor}`}>
                    {levelLabel}
                  </span>
                </h3>
              </div>
            </div>

            {/* Percentage & Quick Action Button */}
            <div className="flex items-center gap-4 self-start sm:self-center">
              <div className="text-right">
                <div className="flex items-baseline justify-end gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono leading-none tracking-tight">
                    {progressPercent}%
                  </span>
                </div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                  da Trilha Completa
                </span>
              </div>

              {progressPercent < 100 ? (
                <button
                  onClick={() => onSelectChapter(nextUncompletedChapter.id)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 shrink-0"
                  title={`Continuar leitura a partir do Capítulo ${nextUncompletedChapter.number}`}
                >
                  <span>Continuar Cap. {nextUncompletedChapter.number}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={onOpenFinalExam}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95 shrink-0"
                  title="Realizar Prova Final Oficial"
                >
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>Prova Final Liberada</span>
                </button>
              )}
            </div>
          </div>

          {/* Master Visual Progress Bar Track with Glow and Milestones */}
          <div className="space-y-2 mb-4">
            <div className="w-full bg-slate-950 rounded-full h-4 sm:h-5 p-0.5 border border-slate-800 overflow-hidden relative shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out relative ${
                  progressPercent === 100
                    ? 'bg-gradient-to-r from-cyan-400 via-emerald-400 to-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.7)]'
                    : progressPercent >= 75
                    ? 'bg-gradient-to-r from-red-600 via-amber-500 via-cyan-400 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : progressPercent >= 50
                    ? 'bg-gradient-to-r from-red-600 via-amber-500 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : progressPercent >= 25
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                }`}
                style={{ width: `${Math.max(progressPercent, progressPercent > 0 ? 5 : 0)}%` }}
              >
                {/* Glossy top reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                {progressPercent > 0 && progressPercent < 100 && (
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff] animate-ping" />
                )}
              </div>
            </div>

            {/* Milestone Indicators (0%, 25%, 50%, 75%, 100%) */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
              <span className={progressPercent >= 0 ? "text-slate-400 font-bold" : ""}>0% Início</span>
              <span className={progressPercent >= 25 ? "text-amber-400 font-bold" : ""}>25% Hardware</span>
              <span className={progressPercent >= 50 ? "text-cyan-400 font-bold" : ""}>50% Redes & HA</span>
              <span className={progressPercent >= 75 ? "text-purple-400 font-bold" : ""}>75% Zero Trust</span>
              <span className={progressPercent === 100 ? "text-emerald-400 font-bold" : ""}>100% Especialista</span>
            </div>
          </div>

          {/* 15 Chapter Discrete Pills / Interactive Steps */}
          <div className="pt-2 border-t border-slate-900/90">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span className="font-bold uppercase tracking-wider text-slate-300">Grade dos 15 Capítulos:</span>
              <span className="text-[10px] text-slate-500">Clique em qualquer capítulo para abrir</span>
            </div>

            <div 
              className="grid gap-1.5"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(64px, 1fr))'
              }}
            >
              {mainChapters.map((ch) => {
                const isDone = completedChapters.includes(ch.id);
                const isCurrentNext = !isDone && ch.id === nextUncompletedChapter.id;
                const chapterNum = Number(ch.number);

                return (
                  <button
                    key={ch.id}
                    onClick={() => onSelectChapter(ch.id)}
                    title={`Capítulo ${chapterNum}: ${ch.title} ${isDone ? '· Concluído ✓' : isCurrentNext ? '· Próximo para Leitura' : '· Pendente'}`}
                    className={`py-2 px-1.5 rounded-xl border text-center font-mono text-[10px] font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 group/btn relative overflow-hidden ${
                      isDone
                        ? 'bg-emerald-950/60 border-emerald-500/70 text-emerald-300 hover:bg-emerald-900/60 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                        : isCurrentNext
                        ? 'bg-red-950/70 border-red-500 text-red-300 hover:bg-red-900/60 shadow-[0_0_12px_rgba(239,68,68,0.35)] ring-1 ring-red-500/50'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full px-0.5">
                      <span className="text-[8px] text-slate-500">CAP</span>
                      <span className="text-xs font-black">{chapterNum < 10 ? `0${chapterNum}` : chapterNum}</span>
                    </div>

                    <div className="w-full flex items-center justify-center pt-0.5">
                      {isDone ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isCurrentNext ? (
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-3 border-t border-slate-900 text-xs font-mono text-slate-400">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>{completedCount} de 15 Concluídos</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span>{totalChaptersCount - completedCount} Pendentes</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>15 Quizzes (120 Questões)</span>
              </span>
            </div>

            <div className="text-[11px] text-slate-500">
              Meta: 100% dos 15 capítulos para gabaritar a certificação
            </div>
          </div>

        </div>
      </section>

      {/* 🗺️ 2. A TRILHA DE APRENDIZADO NGFW: OS 5 PASSOS DO ESPECIALISTA (Foco Central da Página) */}
      <section id="trilha-aprendizado" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-6">
        
        {/* Cabeçalho da Trilha com Seletor de Visualização */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>ROTEIRO ESTRUTURADO DE FORMAÇÃO</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Trilha de Aprendizado NGFW
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Siga os 5 passos essenciais para dominar a segurança em firewalls corporativos.
            </p>
          </div>

          {/* Actions: Helper Glossary Note + Mode Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <Info className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>Glossário Ativo: Passe o mouse nos termos com <span className="border-b border-dashed border-red-400 text-slate-200 font-semibold">grifo</span> para ver a definição</span>
            </div>

            {/* Toggle entre visualização dos 5 Passos e Lista de Capítulos */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTabMode('steps')}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTabMode === 'steps'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Os 5 Passos (Estrada)
              </button>
              <button
                onClick={() => setActiveTabMode('chapters')}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeTabMode === 'chapters'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. 15 Capítulos & Quizzes
              </button>
            </div>
          </div>
        </div>

        {/* MODO 1: ESTRADA VISUAL DOS 5 PASSOS */}
        {activeTabMode === 'steps' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Visual Highway Container */}
            <div className="rounded-2xl bg-[#090a0f] border border-slate-800 p-6 sm:p-7 relative overflow-hidden space-y-6">
              
              {/* Highway with 5 Interactive Checkpoint Pins */}
              <div className="relative pt-2 pb-6">
                {/* Background glowing road line (Desktop & Tablet) */}
                <div className="hidden lg:block absolute left-8 right-8 top-14 h-3 bg-gradient-to-r from-cyan-950 via-red-950 via-purple-950 via-amber-950 to-sky-950 rounded-full border border-slate-800/80 overflow-hidden">
                  <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.15)_20px,rgba(255,255,255,0.15)_40px)]" />
                </div>

                {/* 5 Pins Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
                  {TRACK_PINS.map((pin) => {
                    const isSelected = selectedPin === pin.id;

                    return (
                      <div 
                        key={pin.id} 
                        onClick={() => setSelectedPin(pin.id)}
                        className="flex flex-col items-center text-center group cursor-pointer"
                      >
                        {/* Interactive Pin Marker */}
                        <div className="relative mb-2.5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border-2 ${pin.ringColor} ${
                            isSelected 
                              ? `${pin.glowClass} scale-110 ring-4 ring-white/20 bg-slate-900` 
                              : 'bg-slate-950 hover:scale-105'
                          }`}>
                            {pin.icon}
                          </div>

                          <div className={`w-2.5 h-2.5 rotate-45 mx-auto -mt-1 border-r-2 border-b-2 ${pin.ringColor} ${
                            isSelected ? 'bg-slate-900' : 'bg-slate-950'
                          }`} />

                          <span className={`absolute -top-2 -right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-black font-mono shadow ${pin.pinColor}`}>
                            #{pin.step}
                          </span>
                        </div>

                        <h4 className={`text-xs font-black uppercase font-mono tracking-wider transition-colors ${
                          isSelected ? pin.textColor : 'text-slate-300 group-hover:text-white'
                        }`}>
                          {pin.title}
                        </h4>

                        <span className="text-[10px] text-slate-400 mt-0.5 font-mono line-clamp-1">
                          {pin.badge}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            pin.onClick();
                          }}
                          className={`mt-2 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${
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

              {/* Active Step Feature Box */}
              <div className={`p-5 sm:p-6 rounded-xl border bg-gradient-to-r ${currentSelectedTrack.bgGradient} ${currentSelectedTrack.borderClass} transition-all duration-300`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${currentSelectedTrack.pinColor}`}>
                        PASSO {currentSelectedTrack.step} DE 5
                      </span>
                      <span className="text-slate-500 font-mono text-xs">·</span>
                      <span className={`font-mono text-xs font-bold ${currentSelectedTrack.textColor}`}>
                        {currentSelectedTrack.stats}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {currentSelectedTrack.title}
                    </h3>

                    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentSelectedTrack.description}
                    </div>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={currentSelectedTrack.onClick}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase font-black tracking-wider transition-all cyber-glow-red flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>{currentSelectedTrack.actionLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODO 2: DETALHAMENTO DOS 15 CAPÍTULOS & QUIZZES */}
        {activeTabMode === 'chapters' && (
          <div id="lista-capitulos" className="space-y-4 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-bold uppercase">
                15 Capítulos Técnicos & Quizzes de Fixação
              </span>
              <span className="text-red-400">
                Progresso: {completedCount} de 15 concluídos ({progressPercent}%)
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {mainChapters.map((chapter: Chapter, index: number) => {
                const chapterNum = Number(chapter.number);
                const isCompleted = completedChapters.includes(chapter.id);
                const isNext = !isCompleted && (index === 0 || completedChapters.includes(mainChapters[index - 1].id));

                return (
                  <div 
                    key={chapter.id}
                    className={`rounded-xl p-4 transition-all duration-200 border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                      isCompleted
                        ? 'bg-slate-950 border-red-950/60'
                        : isNext
                        ? 'bg-slate-950 border-red-600/60 shadow-[0_0_15px_rgba(255,30,39,0.1)]'
                        : 'bg-slate-950 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border font-mono text-xs font-bold ${
                        isCompleted
                          ? 'bg-red-950/80 border-red-500 text-white'
                          : isNext
                          ? 'bg-slate-900 border-red-500 text-red-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}>
                        #{chapterNum}
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 text-[11px] font-mono">
                          <span className="text-red-400 font-bold">CAP. {chapterNum}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-slate-400">{chapter.pages}</span>
                          {isCompleted && (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Lido
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm font-bold text-white tracking-tight truncate">
                          {chapter.title}
                        </h4>

                        <p className="text-xs text-slate-400 line-clamp-1">
                          {chapter.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onSelectChapter(chapter.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Ler</span>
                      </button>

                      <button
                        onClick={() => onOpenQuiz(chapterNum)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-red-400" />
                        <span>Quiz (8Q)</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </section>

      {/* 🛡️ 3. PILARES TECNOLÓGICOS DO NGFW (Mais Compacto e Objetivo) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-1 mb-6">
          <div className="inline-block text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            PILARES TECNOLÓGICOS DO NGFW
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Segurança em Profundidade Sem Ilusão
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto font-mono">
            Conceitos mandatórios aplicados em auditorias e topologias corporativas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-600/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-tight flex items-center gap-1.5 flex-wrap">
              <span>Inspeção</span>
              <TechTooltip termKey="tls 1.3">TLS 1.3</TechTooltip>
              <span>&</span>
              <TechTooltip termKey="dpi">DPI</TechTooltip>
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              <TechTooltip termKey="forward proxy">Forward proxy</TechTooltip> com CA corporativa nos endpoints, quebra seletiva de tráfego HTTPS e conformidade de privacidade/LGPD.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-600/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-tight flex items-center gap-1.5 flex-wrap">
              <TechTooltip termKey="asic">ASIC</TechTooltip>,
              <TechTooltip termKey="npu">NPU</TechTooltip>
              <span>&</span>
              <TechTooltip termKey="cpu">CPU</TechTooltip>
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Separação de planos: aceleração por silício para pacotes rotulados versus gargalo de CPU para heurística e descompressão.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-600/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <Target className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-tight flex items-center gap-1.5 flex-wrap">
              <TechTooltip termKey="app-id">App-ID</TechTooltip>
              <span>&</span>
              <TechTooltip termKey="user-id">User-ID</TechTooltip>
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Superação da inspeção cega de portas TCP/443. Identificação de subfunções de aplicativos e vínculos com o Active Directory.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-red-600/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-red-950/50 border border-red-600/30 flex items-center justify-center text-red-500 mb-3">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-tight flex items-center gap-1.5 flex-wrap">
              <TechTooltip termKey="zero trust">Zero Trust</TechTooltip>
              <span>&</span>
              <TechTooltip termKey="pep">PEP</TechTooltip>
            </h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              O firewall como <TechTooltip termKey="pep">Policy Enforcement Point (PEP)</TechTooltip>, isolamento rígido de zonas <TechTooltip termKey="dmz">DMZ</TechTooltip> e controle de roteamento assimétrico em <TechTooltip termKey="ha">HA</TechTooltip>.
            </p>
          </div>
        </div>
      </section>

      {/* 🔴 4. BARRA DE APOIO E AUDITORIA (Discreta e sem repetição) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white font-mono uppercase">
              Recursos Complementares de Engenharia
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Listas de verificação para implantação (Apêndice A), auditoria de regras (Apêndice B) e hardening (Apêndice C).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenChecklists}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ver Checklists</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Sliders className="w-3.5 h-3.5 text-white" />
              <span>Simulador</span>
            </button>
          </div>
        </div>
      </section>

      {/* 💡 5. DICA DE ESTUDO ALEATÓRIA (FIREWALL SEM ILUSÃO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudyTipBanner />
      </section>

    </div>
  );
};
