import React, { useState } from 'react';
import { Calculator, AlertTriangle, Layers, Cpu, ShieldAlert, ArrowRight, Shield, Play, ExternalLink, Activity, Sliders } from 'lucide-react';
import { Firewall3DSimulator } from './Firewall3DSimulator';

export const ThroughputCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'3d' | 'calculator'>('3d');
  
  // Math calculator state
  const [datasheetGbps, setDatasheetGbps] = useState<number>(10);
  const [growthPercent, setGrowthPercent] = useState<number>(40);
  const [hasTlsHighVolume, setHasTlsHighVolume] = useState<boolean>(true);

  // Calculations based strictly on Cap 1.2, 1.3 and 9.1
  const standardMin = datasheetGbps / 5;
  const standardMax = datasheetGbps / 3;

  const tlsMin = datasheetGbps / 10;
  const tlsMax = datasheetGbps / 5;

  const realisticMin = hasTlsHighVolume ? tlsMin : standardMin;
  const realisticMax = hasTlsHighVolume ? tlsMax : standardMax;

  // PPS calculations for 64B vs 1500B at the given Gbps
  const pps64B = (datasheetGbps * 1.488).toFixed(2);
  const pps1500B = (datasheetGbps * 0.0833).toFixed(2);

  // Projected 3-year capacity needed
  const projectedNeedMin = (realisticMin * (1 + growthPercent / 100)).toFixed(2);
  const projectedNeedMax = (realisticMax * (1 + growthPercent / 100)).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* HEADER WITH MODE SWITCHER */}
      <header className="space-y-4 border-b border-slate-800 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-red-400 font-bold uppercase tracking-wider font-mono">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>LABORATÓRIO PRÁTICO INTERATIVO</span>
              <span className="text-slate-600">·</span>
              <span>CAPÍTULOS 1, 4 & 9</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Shield className="w-7 h-7 text-red-500" />
              <span>Simulador de Firewall: 3D Core & Sizing Real</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Experimente a filtragem dinâmica em 3D WebGL (L4 vs. L7 DPI e Menor Privilégio) ou calcule o dimensionamento real de hardware com a Regra do Divisor.
            </p>
          </div>

          {/* Standalone HTML link */}
          <a
            href="/simulador-3d.html"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 text-xs font-mono font-bold transition-all flex items-center gap-2 shadow-sm shrink-0"
            title="Abrir simulador standalone em tela cheia numa nova aba"
          >
            <span>Versão Standalone (HTML)</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-400" />
          </a>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === '3d'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>1. Simulador 3D WebGL (Three.js)</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>2. Calculadora de Sizing & Throughput</span>
          </button>
        </div>
      </header>

      {/* VIEW 1: 3D WEBGL SIMULATOR */}
      {activeTab === '3d' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <Firewall3DSimulator />

          {/* Theoretical Context Box below 3D */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
            <div className="flex items-center gap-2 text-red-400 font-bold uppercase">
              <ShieldAlert className="w-4 h-4 text-red-500" />
              <span>Conceitos Chave Demonstrados no Cenário 3D:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 leading-relaxed">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                <span className="text-white font-bold block mb-1">Módulo 1: "ANY ANY ANY" vs. Menor Privilégio</span>
                Configurar regras permissivas sem restrição de portas ou origem desativa na prática a proteção do firewall. O princípio do menor privilégio garante que apenas fluxos explicitamente catalogados e necessários cruzem o escudo.
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-850">
                <span className="text-white font-bold block mb-1">Módulo 2: Filtragem L4 vs. Inspeção L7 (App-ID)</span>
                No mundo moderno, ameaças e aplicativos não autorizados (ex.: Torrent, túneis VPN e malwares) mascaram seu tráfego na porta 443 (HTTPS). Apenas a inspeção profunda (DPI/App-ID) é capaz de identificar a aplicação real e bloquear a ameaça disfarçada.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SIZING & THROUGHPUT CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
          
          {/* Presets */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase">Presets de Appliances NGFW:</span>
              <span className="text-red-400">Clique para carregar dados do datasheet</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setDatasheetGbps(5)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                  datasheetGbps === 5 
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(255,30,39,0.3)]' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                Appliance 30G (5 Gbps)
              </button>
              <button
                onClick={() => setDatasheetGbps(10)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                  datasheetGbps === 10 
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(255,30,39,0.3)]' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                Appliance 50G (10 Gbps)
              </button>
              <button
                onClick={() => setDatasheetGbps(18)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                  datasheetGbps === 18 
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(255,30,39,0.3)]' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                Appliance 70G (18 Gbps)
              </button>
              <button
                onClick={() => setDatasheetGbps(20)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                  datasheetGbps === 20 
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(255,30,39,0.3)]' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                Appliance 100 (20 Gbps)
              </button>
              <button
                onClick={() => setDatasheetGbps(40)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                  datasheetGbps === 40 
                    ? 'bg-red-600 border-red-500 text-white shadow-[0_0_10px_rgba(255,30,39,0.3)]' 
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                Appliance 200 (40 Gbps)
              </button>
            </div>
          </div>

          {/* Quote Banner */}
          <div className="p-4 rounded-xl bg-red-950/20 border-l-4 border-red-500 text-red-200 text-sm font-semibold italic">
            "Se você confia no datasheet, o problema não é o firewall."
          </div>

          {/* Interactive Controls & Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input Parameters */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-red-400" />
                <span>Parâmetros do Datasheet</span>
              </h2>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                    <span>Throughput Nominal da Caixa (Datasheet)</span>
                    <span className="font-mono text-red-400 font-bold">{datasheetGbps} Gbps</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={datasheetGbps}
                    onChange={(e) => setDatasheetGbps(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                    <span>1 Gbps</span>
                    <span>50 Gbps</span>
                    <span>100 Gbps</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                    <span>Margem de Crescimento Projetada (3 anos)</span>
                    <span className="font-mono text-slate-200 font-bold">{growthPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    step="5"
                    value={growthPercent}
                    onChange={(e) => setGrowthPercent(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                    <span>+20%</span>
                    <span>+30% a 50% (Recomendado)</span>
                    <span>+80%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasTlsHighVolume}
                      onChange={(e) => setHasTlsHighVolume(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-red-600 focus:ring-red-500/30 accent-red-600 cursor-pointer"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-white block">
                        Inspeção de TLS/HTTPS em Alto Volume (DPI Ativado)
                      </span>
                      <span className="text-[11px] text-slate-400 block leading-relaxed">
                        Aplica a redução severa da Regra do Divisor (dividir por 5 a 10) devido ao custo criptográfico de quebra e remontagem de pacotes.
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Realistic Output */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>Capacidade Real Estimada</span>
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-mono">Throughput Efetivo em Produção</div>
                    <div className="text-3xl font-extrabold text-white mt-1 font-mono">
                      {realisticMin.toFixed(1)} a {realisticMax.toFixed(1)} <span className="text-base text-red-500">Gbps</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 font-mono">
                      Regra do divisor aplicada: ÷ {hasTlsHighVolume ? '5 a 10 (TLS Intenso)' : '3 a 5 (Padrão)'}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400 font-mono">Capacidade Mínima Necessária em 3 Anos</div>
                    <div className="text-2xl font-extrabold text-amber-400 mt-1 font-mono">
                      {projectedNeedMin} a {projectedNeedMax} <span className="text-sm text-slate-400">Gbps</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 font-mono">
                      Com folga de crescimento de +{growthPercent}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning note */}
              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/50 text-[11px] text-amber-300/90 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Se a sua demanda atual de tráfego inspecionado exceder <strong>{realisticMin.toFixed(1)} Gbps</strong>, este appliance entrará em colapso de CPU no primeiro pico de tráfego corporativo.
                </span>
              </div>
            </div>

          </div>

          {/* Packet Size Reality Comparison (64B vs 1500B) */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>A Ilusão do Tamanho do Pacote: 64 Bytes vs. 1500 Bytes</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              O fabricante testa a caixa com pacotes gigantes (1500 bytes ou jumbo frames) para inflar o throughput em Gbps. Porém, tráfego real com DNS, SYN de TCP, ACK e VoIP é repleto de pacotes pequenos (64 bytes), multiplicando a carga de processamento por pacote em mais de 18 vezes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono">
                <div className="text-xs text-slate-400">Pacotes de 1500 Bytes (Marketing)</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{pps1500B} Mpps</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Milhões de pacotes por segundo</div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-red-950 font-mono">
                <div className="text-xs text-slate-400">Pacotes de 64 Bytes (Tráfego Real)</div>
                <div className="text-xl font-bold text-red-500 mt-1">{pps64B} Mpps</div>
                <div className="text-[11px] text-red-400/80 mt-0.5">Sobrecarga de interrupções por segundo na CPU</div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
