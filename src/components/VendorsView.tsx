import React, { useState } from 'react';
import { NGFW_VENDORS, NgfwVendor } from '../data/vendorsData';
import { 
  Shield, 
  Cpu, 
  Activity, 
  CheckCircle, 
  HardDrive, 
  Server, 
  Layers, 
  Lock, 
  Globe, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Info,
  Terminal,
  Award,
  Zap
} from 'lucide-react';

export const VendorsView: React.FC = () => {
  const [selectedVendorId, setSelectedVendorId] = useState<string>('all');
  const [expandedVendorId, setExpandedVendorId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedVendorId(prev => (prev === id ? null : id));
  };

  const filteredVendors = selectedVendorId === 'all' 
    ? NGFW_VENDORS 
    : NGFW_VENDORS.filter(v => v.id === selectedVendorId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. HERO BANNER INSPIRADO NA IMAGEM DE CIBERSEGURANÇA */}
      <section className="relative rounded-2xl overflow-hidden border border-red-950/80 bg-gradient-to-b from-[#14080b] via-[#090b10] to-[#07080e] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 space-y-6">
          
          {/* Top Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-red-600/40 bg-red-950/40 text-red-400 text-xs font-mono font-bold tracking-wider uppercase">
            <Shield className="w-3.5 h-3.5" />
            <span>PANORAMA DO MERCADO CORPORATIVO DE SEGURANÇA DE REDES</span>
          </div>

          {/* Main Title Banner */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-none font-mono">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-amber-500">
                CIBERSEGURANÇA!
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-200 font-sans max-w-3xl leading-relaxed">
              Conheça os principais fabricantes de <strong>UTM e Firewalls de Próxima Geração (NGFW)</strong> que protegem empresas contra ataques cibernéticos, invasões de rede, ransomware e vazamento de dados confidenciais.
            </p>
          </div>

          {/* 4 Key Pillar Badges (Conforme o Banner da Imagem) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase font-mono">Monitoram Tráfego</span>
                <span className="text-[10px] text-slate-400">Inspeção DPI em tempo real</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase font-mono">Criam VPN Segura</span>
                <span className="text-[10px] text-slate-400">IPsec, SSL & TINA/AnyConnect</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase font-mono">Relatórios Avançados</span>
                <span className="text-[10px] text-slate-400">Auditoria & conformidade</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase font-mono">Alta Performance</span>
                <span className="text-[10px] text-slate-400">ASICs, NPUs & SP3</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FILTRO RÁPIDO POR FABRICANTE */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-red-500" />
          <h2 className="text-lg font-black text-white font-mono uppercase tracking-tight">
            Fabricantes Líderes de Mercado
          </h2>
          <span className="text-xs font-mono text-slate-400">
            ({NGFW_VENDORS.length} Soluções em Destaque)
          </span>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setSelectedVendorId('all')}
            className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
              selectedVendorId === 'all'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos ({NGFW_VENDORS.length})
          </button>
          {NGFW_VENDORS.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVendorId(v.id)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                selectedVendorId === v.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3. GRID DE APPLIANCES E FABRICANTES (ESTILO DO DIAGRAMA DA IMAGEM) */}
      <div className="space-y-6">
        {filteredVendors.map((vendor) => {
          const isExpanded = expandedVendorId === vendor.id;

          return (
            <div
              key={vendor.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-gradient-to-r ${vendor.bgGradient} ${
                isExpanded 
                  ? 'border-red-500 shadow-[0_0_25px_rgba(239,68,68,0.25)]' 
                  : 'border-slate-800/80 hover:border-slate-700 shadow-xl'
              }`}
            >
              {/* Main Card View: 2 Columns (Info & Appliance Photo) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 items-center">
                
                {/* Left Side: Brand Logo, Highlights & Summary (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* Header Row: Badge + Model */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono font-bold" style={{ color: vendor.brandColor }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: vendor.brandColor }} />
                      <span>{vendor.badge}</span>
                    </div>

                    <span className="text-xs font-mono text-slate-400 bg-slate-950/60 px-2.5 py-0.5 rounded border border-slate-800/60">
                      Modelo: <strong className="text-slate-200">{vendor.applianceModel}</strong>
                    </span>
                  </div>

                  {/* Vendor Title */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase tracking-tight">
                      {vendor.name}
                    </h3>
                    <p className="text-sm font-mono text-slate-400 mt-0.5">
                      {vendor.subtitle}
                    </p>
                  </div>

                  {/* Highlights with checkmarks (Directly from diagram) */}
                  <div className="space-y-2 pt-1">
                    {vendor.keyHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    {vendor.summary}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => toggleExpand(vendor.id)}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Recolher Detalhes Técnicos' : 'Ver Análise Completa de Hardware & Arquitetura'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-red-400" /> : <ChevronDown className="w-4 h-4 text-red-400" />}
                    </button>
                  </div>

                </div>

                {/* Right Side: High-Resolution Hardware Appliance Image (5 cols) */}
                <div className="lg:col-span-5">
                  <div className="relative rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950/90 shadow-2xl group">
                    <img
                      src={vendor.imageSrc}
                      alt={vendor.applianceModel}
                      className="w-full h-auto object-cover max-h-64 sm:max-h-72 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Bottom Appliance Name Tag */}
                    <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-800 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white font-bold">{vendor.applianceModel}</span>
                      <span className="text-red-400 uppercase text-[10px]">Appliance NGFW</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Expandable Technical Deep Dive */}
              {isExpanded && (
                <div className="border-t border-slate-800 bg-[#060810]/95 p-6 space-y-6 animate-in fade-in duration-200">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Column 1: História & Arquitetura de Hardware */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                          <HistoryIcon className="w-4 h-4 text-amber-400" />
                          <span>Origem & Trajetória Tecnológica</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {vendor.historyAndArchitecture.origin}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                          <Cpu className="w-4 h-4 text-cyan-400" />
                          <span>Arquitetura de Hardware & Silício</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {vendor.historyAndArchitecture.hardwareArchitecture}
                        </p>
                      </div>
                    </div>

                    {/* Column 2: Sistema Operacional & Recursos Chave */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span>Sistema Operacional & Kernel</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {vendor.historyAndArchitecture.operatingSystem}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-white uppercase">
                          <Award className="w-4 h-4 text-purple-400" />
                          <span>Recursos & Diferenciais Exclusivos</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {vendor.historyAndArchitecture.keyFeatures.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2">
                              <span className="text-red-400 font-mono">▸</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>

                  {/* Sizing & Recommendation Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs text-cyan-200">
                      <strong className="block text-cyan-400 font-mono font-bold uppercase mb-1">
                        🎯 Recomendado Para:
                      </strong>
                      <span>{vendor.historyAndArchitecture.bestFor}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-amber-200">
                      <strong className="block text-amber-400 font-mono font-bold uppercase mb-1">
                        ⚠️ Dica de Dimensionamento (Firewall Sem Ilusão):
                      </strong>
                      <span>{vendor.historyAndArchitecture.sizingTip}</span>
                    </div>
                  </div>

                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* 4. QUADRO COMPARATIVO ESTRATÉGICO DOS 6 FABRICANTES */}
      <section className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5" />
            <span>MATRIZ COMPARATIVA DE ENGENHARIA</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white font-mono uppercase tracking-tight">
            Comparativo Rápido de Arquitetura de NGFW
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Resumo dos diferenciais de processamento, sistema operacional e nicho predominante de mercado.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase">
                <th className="py-3 px-4 font-bold">Fabricante</th>
                <th className="py-3 px-4 font-bold">Linha / Appliance</th>
                <th className="py-3 px-4 font-bold">Sistema Operacional</th>
                <th className="py-3 px-4 font-bold">Arquitetura de Silício</th>
                <th className="py-3 px-4 font-bold">Diferencial Mais Notável</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-sky-400">CISCO</td>
                <td className="py-3 px-4 text-white">ASA 55XX / Secure Firewall</td>
                <td className="py-3 px-4">ASA Software / FTD (Snort 3)</td>
                <td className="py-3 px-4">CPUs Multi-core + Crypto Offload</td>
                <td className="py-3 px-4">Talos Intelligence & VPN AnyConnect</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-red-400">FORTINET</td>
                <td className="py-3 px-4 text-white">FortiGate (Desktop/Chassis)</td>
                <td className="py-3 px-4">FortiOS (Unificado)</td>
                <td className="py-3 px-4">ASICs Proprietários (NP & CP SPU)</td>
                <td className="py-3 px-4">Melhor Gbps/Preço & SD-WAN Nativa</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-orange-400">PALO ALTO</td>
                <td className="py-3 px-4 text-white">PA-Series (PA-400 / PA-3400)</td>
                <td className="py-3 px-4">PAN-OS</td>
                <td className="py-3 px-4">Single-Pass Parallel (SP3)</td>
                <td className="py-3 px-4">Padrão Ouro L7 App-ID & WildFire</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-cyan-400">BARRACUDA</td>
                <td className="py-3 px-4 text-white">CloudGen Firewall (F-Series)</td>
                <td className="py-3 px-4">Barracuda OS</td>
                <td className="py-3 px-4">x86 + Cripto Hardware + LCD</td>
                <td className="py-3 px-4">TINA VPN & Integração Azure/AWS</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-blue-400">SOPHOS</td>
                <td className="py-3 px-4 text-white">XGS Series Dual-Engine</td>
                <td className="py-3 px-4">SFOS (Sophos Firewall OS)</td>
                <td className="py-3 px-4">Dual-Engine (CPU + Xstream NPU)</td>
                <td className="py-3 px-4">Security Heartbeat (Isolamento Auto)</td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-3 px-4 font-bold text-pink-400">CHECK POINT</td>
                <td className="py-3 px-4 text-white">Quantum Series / Maestro</td>
                <td className="py-3 px-4">GAiA OS 64-bit</td>
                <td className="py-3 px-4">Multi-Core + Maestro Hyperscale</td>
                <td className="py-3 px-4">Inventora Stateful & SandBlast AI</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
};

// Helper icon
const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
