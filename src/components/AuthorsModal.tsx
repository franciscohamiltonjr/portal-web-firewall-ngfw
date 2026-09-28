import React, { useState } from 'react';
import { 
  X, 
  Shield, 
  UserCheck, 
  Code2, 
  BookOpen, 
  Award, 
  Sparkles, 
  Terminal, 
  CheckCircle, 
  Mail, 
  Copy, 
  Check, 
  Building2, 
  Cpu, 
  Layers, 
  ExternalLink,
  Briefcase
} from 'lucide-react';
import { BOOK_METADATA } from '../data/bookData';

interface AuthorsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthorsModal: React.FC<AuthorsModalProps> = ({ isOpen, onClose }) => {
  const [activeTabCreator, setActiveTabCreator] = useState<'bio' | 'roles'>('bio');
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const creatorEmail = 'francisco.hamilton@ifsertao-pe.edu.br';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(creatorEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] rounded-2xl bg-[#090b10] border border-red-900/60 shadow-[0_0_60px_rgba(255,30,39,0.3)] flex flex-col overflow-hidden text-slate-200 font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Cyber Accent */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-gradient-to-r from-red-950/50 via-slate-950 to-slate-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-600/50 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(255,30,39,0.35)] shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>CRÉDITOS, AUTORIA & ENGENHARIA</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white font-mono tracking-tight uppercase">
                Corpo Técnico & Desenvolvimento
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-red-500/60 transition-colors cursor-pointer"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* 1. SEÇÃO DESTAQUE: CRIADOR DA PLATAFORMA - FRANCISCO HAMILTON */}
          <div className="rounded-2xl border border-cyan-500/50 bg-gradient-to-br from-cyan-950/30 via-slate-950 to-slate-900 p-5 sm:p-6 space-y-5 relative overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.15)]">
            <div className="absolute top-0 right-0 px-3.5 py-1 bg-cyan-950/90 border-b border-l border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 uppercase rounded-bl-xl flex items-center gap-1.5 shadow-sm">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>ARQUITETURA & DESENVOLVIMENTO WEB</span>
            </div>

            {/* Profile Header Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 sm:pt-0">
              {/* Executive Monogram Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 p-[2px] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                  <div className="w-full h-full rounded-[14px] bg-[#070b14] flex flex-col items-center justify-center font-mono font-black text-cyan-400 text-xl tracking-tighter">
                    FH
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-cyan-950 border border-cyan-400 text-cyan-300 shadow">
                  <Terminal className="w-3 h-3" />
                </div>
              </div>

              {/* Title & Institutional Role */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                    Francisco Hamilton
                  </h4>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-500/60 text-cyan-300 shadow-sm">
                    Criador da Plataforma
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Analista de TI · IFSertãoPE</span>
                  </div>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="text-slate-300">
                    Instituto Federal do Sertão Pernambucano
                  </span>
                </div>
              </div>
            </div>

            {/* Official Institutional Contact Card */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                    E-mail Institucional Oficial
                  </span>
                  <span className="text-slate-200 font-bold truncate block">
                    {creatorEmail}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-[11px] font-bold"
                  title="Copiar endereço de e-mail"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copiar E-mail</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${creatorEmail}`}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-700/80 text-cyan-300 hover:text-white transition-all flex items-center gap-1.5 text-[11px] font-bold shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Enviar E-mail</span>
                </a>
              </div>
            </div>

            {/* Interactive View Tabs: Biografia vs Papéis Técnicos */}
            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <button
                  onClick={() => setActiveTabCreator('bio')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeTabCreator === 'bio'
                      ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Biografia & Atuação Profissional</span>
                </button>

                <button
                  onClick={() => setActiveTabCreator('roles')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeTabCreator === 'roles'
                      ? 'bg-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Papéis Técnicos na Plataforma</span>
                </button>
              </div>

              {/* Tab 1: Biografia Profissional */}
              {activeTabCreator === 'bio' && (
                <div className="space-y-3.5 text-xs text-slate-300 leading-relaxed font-sans animate-in fade-in duration-150">
                  <p>
                    <strong>Francisco Hamilton</strong> é <strong>Analista de Tecnologia da Informação do Instituto Federal do Sertão Pernambucano (IFSertãoPE)</strong>, atuando ativamente na infraestrutura de redes, conectividade de dados, segurança de sistemas computacionais e governança de tecnologia pública.
                  </p>
                  <p>
                    Como idealizador e arquiteto de software desta plataforma, concebeu o ecossistema <strong>"Firewall Sem Ilusão"</strong> com o propósito de transformar o conhecimento técnico rigoroso de segurança de redes em uma experiência web altamente imersiva, didática e de padrão industrial para capacitar profissionais, administradores de redes e estudantes em todo o país.
                  </p>
                  <p>
                    Sua atuação combina visão sistêmica em <strong>governança pública de TI</strong> com forte experiência em desenvolvimento de software moderno, gráficos computacionais 3D e design instrucional centrado no aprendizado ativo.
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                      <span className="block text-[10px] font-mono text-cyan-400 font-bold uppercase mb-0.5">Instituição</span>
                      <span className="text-white font-semibold">IFSertãoPE</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                      <span className="block text-[10px] font-mono text-cyan-400 font-bold uppercase mb-0.5">Cargo Efetivo</span>
                      <span className="text-white font-semibold">Analista de TI</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80">
                      <span className="block text-[10px] font-mono text-cyan-400 font-bold uppercase mb-0.5">Área de Atuação</span>
                      <span className="text-white font-semibold">Redes & Sistemas</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Papéis Técnicos na Plataforma */}
              {activeTabCreator === 'roles' && (
                <div className="space-y-3 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span>Arquitetura Frontend & Full-Stack</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Construção de toda a SPA modular em React 19, TypeScript e Tailwind CSS, garantindo navegação de alta velocidade, responsividade e layout com padrão cibernético escuro.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        <span>Simulador 3D Isométrico (Three.js)</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Modelagem tridimensional completa do núcleo NGFW em WebGL: racks com LEDs dinâmicos, zonas de usuários com avatares 3D, trilhas de PCB e 4 autopistas WAN com globos holográficos.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>Design Instrucional & Gamificação</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Concepção da esteira gamificada de 4 fases sequenciais com trava meritocrática de 80%, simulador com a Regra do Divisor e orquestração do banco avaliativo de 120 questões.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                        <Shield className="w-4 h-4 text-purple-400" />
                        <span>Módulos de Engenharia & Fabricantes</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Implementação do catálogo visual com os 6 maiores fabricantes de NGFW (Cisco, Fortinet, Palo Alto, Barracuda, Sophos, Check Point) e do Glossário de Termos Técnicos.
                      </p>
                    </div>

                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 text-[10px] font-mono text-slate-400">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                      ✓ React & TypeScript
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
                      ✓ Three.js / WebGL 3D
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-300">
                      ✓ Arquitetura de Redes & Firewalls
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                      ✓ Design Instrucional
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300">
                      ✓ Servidor Público Federal (IFSertãoPE)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. RESPONSÁVEL PELO CONTEÚDO TEÓRICO: MARIANA BS */}
          <div className="rounded-xl border border-red-900/40 bg-gradient-to-br from-red-950/20 via-slate-950 to-slate-900 p-5 space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-red-950/80 border-b border-l border-red-900/40 text-[10px] font-mono font-bold text-red-400 uppercase rounded-bl-lg">
              CONTEÚDO TEÓRICO DO LIVRO
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-600/40 flex items-center justify-center text-red-400 shrink-0 shadow-lg">
                <BookOpen className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-black text-white font-mono flex items-center gap-2">
                  <span>{BOOK_METADATA.author}</span>
                  <span className="text-[11px] font-normal px-2 py-0.5 rounded bg-red-950/80 border border-red-800/60 text-red-300">
                    Autora
                  </span>
                </h4>
                <p className="text-xs font-mono text-red-400 font-bold">
                  {BOOK_METADATA.role} · {BOOK_METADATA.publisher} ({BOOK_METADATA.year})
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  Especialista responsável pela engenharia de conteúdo, matriz conceitual e redação técnica do e-book <strong>"Firewall Sem Ilusão"</strong>. Desenvolveu a metodologia dos 15 capítulos, a Regra do Divisor para dimensionamento realista, os protocolos de inspeção profunda (DPI, TLS 1.3, App-ID, Zero Trust PEP/PDP) e os checklists práticos de auditoria.
                </p>
              </div>
            </div>

            {/* Author's punchline quote */}
            <div className="mt-2 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 italic flex items-center gap-2">
              <span className="text-red-500 font-bold text-base">“</span>
              <span>Firewall não falha sozinho. Sempre tem um humano ajudando.</span>
              <span className="text-slate-500 not-italic ml-auto text-[10px]">— Mariana BS</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#07080c] flex items-center justify-between text-xs font-mono text-slate-400 shrink-0">
          <span>Firewall Sem Ilusão · Plataforma Oficial</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase transition-all cursor-pointer shadow-sm"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
