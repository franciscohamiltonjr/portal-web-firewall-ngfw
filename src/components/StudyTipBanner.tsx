import React, { useState, useEffect } from 'react';
import { Lightbulb, RotateCcw, BookOpen, Quote, Sparkles, Shield, ArrowRight, Bookmark } from 'lucide-react';

export interface StudyTip {
  id: number;
  quote: string;
  concept: string;
  source: string;
  category: 'DIMENSIONAMENTO' | 'INSPEÇÃO' | 'ARQUITETURA' | 'ZERO TRUST' | 'HARDENING' | 'ALTA DISPONIBILIDADE' | 'IDENTIDADE';
  tag: string;
}

export const BOOK_STUDY_TIPS: StudyTip[] = [
  {
    id: 1,
    quote: "Se você confia no datasheet, o problema não é o firewall.",
    concept: "A Regra do Divisor exige dividir a vazão nominal de marketing por 3 a 5 para tráfego com DPI/IPS e por 5 a 10 se houver inspeção massiva de TLS 1.3.",
    source: "Capítulo 1 & 9 — Arquitetura de Hardware e Dimensionamento",
    category: "DIMENSIONAMENTO",
    tag: "Regra de Ouro"
  },
  {
    id: 2,
    quote: "Porta 443 aberta não é segurança: sem inspeção SSL/TLS (DPI), seu firewall é apenas um roteador caro.",
    concept: "Mais de 90% das ameaças modernas e canais de comando e controle (C2) trafegam criptografados por túneis HTTPS padrão.",
    source: "Capítulo 4 & 6 — Decifração SSL/TLS e Inspeção Profunda",
    category: "INSPEÇÃO",
    tag: "Mito Derrubado"
  },
  {
    id: 3,
    quote: "No modelo Zero Trust, o firewall não é o cérebro (PDP), mas sim o braço executor de políticas (PEP).",
    concept: "O firewall (PEP) fiscaliza os pacotes em linha, mas deve consultar o cérebro de identidade (PDP / Active Directory) antes de permitir a passagem.",
    source: "Capítulo 7 & 12 — Arquitetura Zero Trust e Microsserviços",
    category: "ZERO TRUST",
    tag: "Conceito Fundamental"
  },
  {
    id: 4,
    quote: "Sem acelerador de silício (ASIC/NPU), a CPU entra em colapso com a avalanche de pacotes de 64 bytes.",
    concept: "Pacotes pequenos multiplicam as interrupções por segundo na CPU em mais de 18 vezes comparados a testes sintéticos de 1518 bytes.",
    source: "Capítulo 1 & 3 — Aceleração por Hardware vs. Plano de Controle",
    category: "DIMENSIONAMENTO",
    tag: "Gargalo Crítico"
  },
  {
    id: 5,
    quote: "O princípio do menor privilégio começa pela eliminação inegociável da regra ANY ANY ANY.",
    concept: "Regras genéricas sem restrição de aplicação, usuário ou portas transformam uma arquitetura NGFW em uma rede de borda cega e vulnerável.",
    source: "Capítulo 5 & Apêndice B — Matriz de Regras e Auditoria",
    category: "ARQUITETURA",
    tag: "Segurança Básica"
  },
  {
    id: 6,
    quote: "Cluster de HA sem link dedicado de sincronização (Heartbeat) gera tempestade de reconexão TCP no failover.",
    concept: "A sincronização contínua da tabela de estados de sessão entre o firewall ativo e o passivo deve trafegar por interfaces dedicadas e isoladas.",
    source: "Capítulo 11 — Alta Disponibilidade e Resiliência de Clusters",
    category: "ALTA DISPONIBILIDADE",
    tag: "Boas Práticas"
  },
  {
    id: 7,
    quote: "App-ID sem decifração TLS 1.3 é miopia cibernética: o firewall só enxerga o certificado e o SNI, não o payload real.",
    concept: "Para identificar se um tráfego na porta 443 é de fato Teams, BitTorrent ou exfiltração de dados, a decifração via Forward Proxy corporativo é mandatória.",
    source: "Capítulo 4 & 6 — Inspeção de Camada 7 e App-ID",
    category: "INSPEÇÃO",
    tag: "Análise Técnica"
  },
  {
    id: 8,
    quote: "Headroom de 30% a 50% não é desperdício de orçamento: é a única garantia de que seu NGFW sobreviverá a 3 anos de crescimento.",
    concept: "Um appliance dimensionado para operar com 85% de uso no primeiro dia de implantação sofrerá saturação e perda de sessões antes de completar um ano.",
    source: "Capítulo 9 — Métricas de Throughput e Sizing Corporativo",
    category: "DIMENSIONAMENTO",
    tag: "Planejamento Estratégico"
  },
  {
    id: 9,
    quote: "A zona DMZ nunca deve ter permissão de iniciar conexões espontâneas em direção à rede interna (LAN).",
    concept: "O fluxo seguro e auditável é sempre da LAN para a DMZ. Se um servidor público da DMZ for comprometido, ele não conseguirá pivetear para a rede interna.",
    source: "Capítulo 8 — Zoneamento, DMZ e Segmentação de Tráfego",
    category: "ARQUITETURA",
    tag: "Regra Arquitetural"
  },
  {
    id: 10,
    quote: "O roteamento assimétrico em redes corporativas quebra a inspeção stateful porque o pacote de retorno não encontra a sessão criada.",
    concept: "Se o pacote de ida passa pelo Firewall A e o pacote de retorno volta pelo Firewall B sem sincronização mútua, a conexão é descartada com flag TCP RST.",
    source: "Capítulo 10 — Roteamento Avançado e Armadilhas de Rede",
    category: "ARQUITETURA",
    tag: "Resolução de Falhas"
  },
  {
    id: 11,
    quote: "User-ID não substitui autenticação forte: ele apenas vincula a identidade ao fluxo IP em tempo real para auditoria precisa.",
    concept: "Integrar o firewall com Active Directory ou SAML/OIDC elimina políticas estáticas baseadas em IPs temporários distribuídos via DHCP.",
    source: "Capítulo 6 — Controle Baseado em Identidade e Diretório",
    category: "IDENTIDADE",
    tag: "Identidade & Acesso"
  },
  {
    id: 12,
    quote: "Logs sem sincronização NTP confiável invalidam qualquer esforço de resposta a incidentes e análise forense pericial.",
    concept: "Uma discrepância de poucos segundos nos timestamps entre o firewall, switches e servidores impede correlacionar evidências em ataques complexos.",
    source: "Capítulo 13 & Apêndice C — Hardening e Governança Operacional",
    category: "HARDENING",
    tag: "Conformidade Legal"
  },
  {
    id: 13,
    quote: "Backups periódicos de configuração sem teste regular de restauração em laboratório são apenas ilusão de segurança.",
    concept: "Em um desastre, configurações desatualizadas ou chaves criptográficas não arquivadas impedem o restabelecimento do parque de segurança.",
    source: "Capítulo 14 — Recuperação de Desastres e Gestão de Ciclo de Vida",
    category: "HARDENING",
    tag: "Operação Real"
  },
  {
    id: 14,
    quote: "Firewall não falha sozinho. Sempre tem um humano ajudando.",
    concept: "Mais de 95% das falhas de segurança em firewalls decorrem de regras mal configuradas, exceções esquecidas ou senhas padrão, e não de falha no hardware.",
    source: "Epílogo — Princípios de Segurança sem Ilusão (Mariana BS)",
    category: "HARDENING",
    tag: "Axioma Central"
  }
];

const CATEGORY_BADGES: Record<string, string> = {
  DIMENSIONAMENTO: 'bg-amber-950/70 text-amber-400 border-amber-800/80',
  INSPEÇÃO: 'bg-red-950/70 text-red-400 border-red-800/80',
  ARQUITETURA: 'bg-purple-950/70 text-purple-400 border-purple-800/80',
  'ZERO TRUST': 'bg-cyan-950/70 text-cyan-400 border-cyan-800/80',
  HARDENING: 'bg-emerald-950/70 text-emerald-400 border-emerald-800/80',
  'ALTA DISPONIBILIDADE': 'bg-sky-950/70 text-sky-400 border-sky-800/80',
  IDENTIDADE: 'bg-indigo-950/70 text-indigo-400 border-indigo-800/80'
};

export const StudyTipBanner: React.FC = () => {
  const [currentTip, setCurrentTip] = useState<StudyTip>(BOOK_STUDY_TIPS[0]);
  const [isRotating, setIsRotating] = useState<boolean>(false);

  // useEffect: Escolhe e alterna a cada nova sessão ou recarregamento da home
  useEffect(() => {
    try {
      const sessionKey = 'last_study_tip_id';
      const lastIdStr = sessionStorage.getItem(sessionKey);
      const lastId = lastIdStr ? parseInt(lastIdStr, 10) : -1;

      // Filter out the last shown tip to guarantee alternation
      const availableTips = BOOK_STUDY_TIPS.filter(t => t.id !== lastId);
      const chosenPool = availableTips.length > 0 ? availableTips : BOOK_STUDY_TIPS;
      const selected = chosenPool[Math.floor(Math.random() * chosenPool.length)];

      setCurrentTip(selected);
      sessionStorage.setItem(sessionKey, selected.id.toString());
    } catch {
      // Fallback random
      const randomIdx = Math.floor(Math.random() * BOOK_STUDY_TIPS.length);
      setCurrentTip(BOOK_STUDY_TIPS[randomIdx]);
    }
  }, []);

  const handleNextTip = () => {
    setIsRotating(true);
    setTimeout(() => {
      let nextIndex = Math.floor(Math.random() * BOOK_STUDY_TIPS.length);
      if (BOOK_STUDY_TIPS.length > 1 && BOOK_STUDY_TIPS[nextIndex].id === currentTip.id) {
        nextIndex = (nextIndex + 1) % BOOK_STUDY_TIPS.length;
      }
      const nextTip = BOOK_STUDY_TIPS[nextIndex];
      setCurrentTip(nextTip);
      try {
        sessionStorage.setItem('last_study_tip_id', nextTip.id.toString());
      } catch {
        // ignore storage error
      }
      setIsRotating(false);
    }, 180);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-red-900/60 bg-gradient-to-r from-[#14080b] via-[#090b10] to-[#0d0d14] p-5 sm:p-7 shadow-[0_4px_25px_rgba(255,30,39,0.15)] group transition-all duration-300">
      
      {/* Background ambient red glow */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-red-600/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        
        {/* Left Side: Quote Icon + Tip Content */}
        <div className="flex items-start gap-4 flex-1">
          
          {/* Glowing Lamp / Quote Badge */}
          <div className="w-11 h-11 rounded-xl bg-red-950/70 border border-red-600/50 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_15px_rgba(255,30,39,0.3)] mt-0.5">
            <Lightbulb className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>

          <div className="space-y-2 flex-1">
            
            {/* Top Meta: Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-red-400 uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-red-500" />
                <span>DICA DE ESTUDO · FIREWALL SEM ILUSÃO</span>
              </span>

              <span className="text-slate-600 font-mono text-xs">·</span>

              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${CATEGORY_BADGES[currentTip.category] || 'bg-slate-900 text-slate-300'}`}>
                {currentTip.category}
              </span>

              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-slate-900/80 border border-slate-800 text-slate-300">
                {currentTip.tag}
              </span>
            </div>

            {/* Impactful Quote */}
            <blockquote className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
              "{currentTip.quote}"
            </blockquote>

            {/* Practical Concept */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {currentTip.concept}
            </p>

            {/* Chapter Reference */}
            <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-red-500" />
              <span>Fonte Oficial: <strong>{currentTip.source}</strong></span>
            </div>

          </div>
        </div>

        {/* Right Side: Refresh / Next Tip Button */}
        <div className="shrink-0 flex items-center gap-2 self-start md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-slate-800/80">
          <button
            onClick={handleNextTip}
            className="px-3.5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
            title="Sortear outra dica de estudo do livro"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-red-400 transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`} />
            <span>Nova Dica</span>
          </button>
        </div>

      </div>

    </div>
  );
};
