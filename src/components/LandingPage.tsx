import React from 'react';
import { 
  Shield, 
  Cpu, 
  Layers, 
  Lock, 
  ArrowRight, 
  Terminal, 
  CheckCircle, 
  Flame, 
  FileText, 
  Award, 
  Zap,
  Network
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookData';

interface LandingPageProps {
  onStartLearningPath: () => void;
  onOpenFinalExam: () => void;
  onOpenChallenge: () => void;
  onOpenCalculator: () => void;
  onOpenBackgroundModal?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartLearningPath,
  onOpenFinalExam,
  onOpenChallenge,
  onOpenCalculator,
  onOpenBackgroundModal
}) => {
  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-red-950/40 bg-gradient-to-b from-[#12080a] via-[#0a0a0c] to-[#0a0a0c] pt-12 pb-16 cyber-grid">
        {/* Glow ambient background effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-red-600/10 blur-[120px] pointer-events-none" />

        {/* Ambient Transparent Cyber Shield Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-2xl opacity-15 pointer-events-none mix-blend-screen select-none overflow-hidden hidden md:block">
          <img
            src="/src/assets/images/cyber_shield_transparent.png"
            alt=""
            className="w-full h-auto object-contain transform translate-x-16"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6">
              
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
              <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed">
                Do parafuso ao tráfego criptografado. Domine Next-Generation Firewalls de forma prática, direta e sem ilusão.
              </p>

              {/* Objective Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-mono font-bold text-xs text-red-400 uppercase">
                  <Terminal className="w-4 h-4 text-red-500" />
                  <span>Proposta de Aprendizado Técnico</span>
                </div>
                <p className="leading-relaxed">
                  Capacitar profissionais e estudantes a entenderem a <strong>arquitetura real de firewalls</strong>, 
                  inspeção <strong>TLS 1.3</strong>, <strong>DPI</strong>, <strong>Zero Trust</strong> e operações do 
                  mundo real com base nas melhores práticas da engenharia de redes e cibersegurança corporativa.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onStartLearningPath}
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-wider transition-all duration-200 transform hover:-translate-y-0.5 cyber-glow-red flex items-center gap-3 cursor-pointer"
                >
                  <Flame className="w-5 h-5 text-amber-300" />
                  <span>INICIAR MAPA DE APRENDIZADO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenChallenge}
                  className="px-6 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-red-600/40 hover:border-red-500 text-slate-200 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-red-400" />
                  <span>Desafio Gamificado</span>
                </button>

                <button
                  onClick={onOpenFinalExam}
                  className="px-6 py-4 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Prova Final (15Q)</span>
                </button>

                {onOpenBackgroundModal && (
                  <button
                    onClick={onOpenBackgroundModal}
                    className="px-5 py-4 rounded-lg bg-red-950/40 hover:bg-red-950/70 border border-red-800/60 hover:border-red-500 text-red-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                    title="Visualizar e baixar plano de fundo transparente"
                  >
                    <Shield className="w-4 h-4 text-red-400" />
                    <span>Fundo Transparente</span>
                  </button>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-slate-400 border-t border-slate-900">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>15 Capítulos Fidedignos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>3 Apêndices Práticos</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-500" />
                  <span>120+ Questões Exclusivas</span>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Book / Hardware Cyber Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-red-950/80 bg-slate-950 shadow-2xl p-2 group">
                <div className="relative rounded-xl overflow-hidden border border-slate-800/80">
                  <img
                    src="/src/assets/images/firewall_cover_hero_1790421344538.jpg"
                    alt="Livro Firewall Sem Ilusão - Guia Técnico"
                    className="w-full h-auto object-cover max-h-80 sm:max-h-96 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Cyber Overlay Details */}
                  <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                    ED. 2026 OFICIAL
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-lg bg-slate-950/90 backdrop-blur-md border border-red-900/40 space-y-1">
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

      {/* CARDS DE DESTAQUE VISUAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-block text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            PILIENTES TECNOLÓGICOS DO NGFW
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Pilares da Segurança Sem Ilusão
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Quatro eixos fundamentais que separam o conhecimento superficial da verdadeira engenharia de cibersegurança.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Inspeção Profunda (DPI & TLS 1.3) */}
          <div className="relative rounded-xl p-6 bg-slate-950 border border-slate-800 hover:border-red-600/70 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-lg bg-red-950/40 border border-red-600/30 flex items-center justify-center text-red-500 mb-5 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono text-red-400 uppercase tracking-wider mb-1">
              Camada 7 & Criptografia
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
              🛡️ Inspeção Profunda (DPI & TLS 1.3)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decifre o túnel HTTPS em trânsito com Forward Proxy, gerencie a CA corporativa, contorne certificate pinning e inspecione o tráfego oculto na porta 443.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Capítulos 3 e 4</span>
              <span className="text-red-500">MITM Legítimo →</span>
            </div>
          </div>

          {/* Card 2: Alta Performance & Hardware (ASIC, NPU, CPU) */}
          <div className="relative rounded-xl p-6 bg-slate-950 border border-slate-800 hover:border-red-600/70 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-lg bg-red-950/40 border border-red-600/30 flex items-center justify-center text-amber-500 mb-5 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mb-1">
              Engenharia de Silício
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              ⚡ Alta Performance & Hardware (ASIC, NPU, CPU)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Entenda como co-processadores aceleram L2/L3 no silício, por que a CPU gerencia o plano de controle e por que pacotes de 64 bytes versus 1518 bytes derrubam o marketing.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Capítulos 1 e 9</span>
              <span className="text-amber-500">Wire Speed →</span>
            </div>
          </div>

          {/* Card 3: Controle por Aplicação & Identidade (App-ID e User-ID) */}
          <div className="relative rounded-xl p-6 bg-slate-950 border border-slate-800 hover:border-red-600/70 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-lg bg-red-950/40 border border-red-600/30 flex items-center justify-center text-blue-500 mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono text-blue-400 uppercase tracking-wider mb-1">
              Contexto Humano & L7
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              🎯 Controle por Aplicação & Identidade (App-ID e User-ID)
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Superação da filtragem cega por portas TCP/UDP. Mapeie dinamicamente usuários do Active Directory, coíba o Shadow IT e aplique políticas por função corporativa.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Capítulos 5 e 6</span>
              <span className="text-blue-500">Além da Porta →</span>
            </div>
          </div>

          {/* Card 4: Zero Trust & Arquiteturas Reais */}
          <div className="relative rounded-xl p-6 bg-slate-950 border border-slate-800 hover:border-red-600/70 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 rounded-lg bg-red-950/40 border border-red-600/30 flex items-center justify-center text-emerald-500 mb-5 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Governança & Arquitetura
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              🔒 Zero Trust & Arquiteturas Reais
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              O papel exato do NGFW como PEP (Policy Enforcement Point), microssegmentação Leste-Oeste, clusters Ativo/Passivo sem roteamento assimétrico e FWaaS em nuvem.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>Capítulos 7, 8 e 13</span>
              <span className="text-emerald-500">PEP vs PDP →</span>
            </div>
          </div>

        </div>
      </section>

      {/* PRAGMATIC RULES HIGHLIGHT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-950 to-slate-900 border border-red-900/50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>A Regra do Divisor (Capítulo 9)</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Quer dimensionar sem errar? Divida o datasheet por 3 a 5.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Fabricantes anunciam taxas sob pacotes UDP de 1518 bytes em tráfego sintético. Habilitou DPI, IPS e TLS com pacotes reais? Use a nossa calculadora interativa para ver a capacidade real.
            </p>
          </div>
          <button
            onClick={onOpenCalculator}
            className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
          >
            Abrir Calculadora Realista
          </button>
        </div>
      </section>

      {/* QUICK LEARNING PATH OVERVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-950 border border-slate-800 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Network className="w-5 h-5 text-red-500" />
                <span>Trilha de Aprendizado Estruturada</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                15 capítulos técnicos organizados sequencialmente com teoria fiel e quizzes individuais.
              </p>
            </div>
            <button
              onClick={onStartLearningPath}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-red-600/40 text-red-400 hover:text-white font-mono text-xs uppercase font-bold transition-all cursor-pointer"
            >
              Ver Todos os 15 Nós →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] font-mono text-red-400 font-bold block mb-1">MÓDULO 1</span>
              <h4 className="text-sm font-bold text-white mb-1">Hardware & Fundamentos</h4>
              <p className="text-xs text-slate-400">Capítulos 1 ao 3 · CPU, ASIC, NPU, Handshake TCP e o que define um NGFW.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] font-mono text-red-400 font-bold block mb-1">MÓDULO 2</span>
              <h4 className="text-sm font-bold text-white mb-1">Inspeção & Identidade</h4>
              <p className="text-xs text-slate-400">Capítulos 4 ao 6 · Inspeção TLS, Forward Proxy, App-ID, User-ID e Shadow IT.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] font-mono text-red-400 font-bold block mb-1">MÓDULO 3</span>
              <h4 className="text-sm font-bold text-white mb-1">Arquitetura & Dimensionamento</h4>
              <p className="text-xs text-slate-400">Capítulos 7 ao 9 · DMZ, Alta Disponibilidade (HA) e Throughput real.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-[10px] font-mono text-red-400 font-bold block mb-1">MÓDULO 4</span>
              <h4 className="text-sm font-bold text-white mb-1">Operação, Nuvem & Carreira</h4>
              <p className="text-xs text-slate-400">Capítulos 10 ao 15 · Erros clássicos, SIEM, ZTA, Nuvem e carreira 2026.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
