import React, { useState } from 'react';
import { X, Download, Eye, Sparkles, Shield, Layers, Image as ImageIcon } from 'lucide-react';

interface CyberBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CyberBackgroundModal: React.FC<CyberBackgroundModalProps> = ({
  isOpen,
  onClose
}) => {
  const [backdropMode, setBackdropMode] = useState<'transparent' | 'dark' | 'gradient'>('transparent');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl rounded-2xl bg-[#0a0a0c] border border-red-900/60 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-48 bg-red-600/10 blur-[80px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-600/40 flex items-center justify-center text-red-500 cyber-glow-red">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase font-mono tracking-tight flex items-center gap-2">
                <span>Plano de Fundo Cyber Transparente</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-400">PNG Alpha</span>
              </h3>
              <p className="text-xs text-slate-400">
                Baseado na imagem do escudo de cibersegurança com circuitos e servidores.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 px-2">Visualização:</span>
            <button
              onClick={() => setBackdropMode('transparent')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                backdropMode === 'transparent'
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Grade Transparente (Quadriculado)
            </button>
            <button
              onClick={() => setBackdropMode('dark')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                backdropMode === 'dark'
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Fundo Dark Cyber (#0A0A0C)
            </button>
            <button
              onClick={() => setBackdropMode('gradient')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                backdropMode === 'gradient'
                  ? 'bg-red-600 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Gradiente Vermelho
            </button>
          </div>

          <div className="text-slate-400 text-xs">
            Formato: <strong>PNG 24-bit com canal Alpha</strong>
          </div>
        </div>

        {/* Image Preview Canvas */}
        <div 
          className={`relative rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center min-h-[320px] max-h-[460px] p-6 transition-all ${
            backdropMode === 'transparent'
              ? 'bg-[linear-gradient(45deg,#18181c_25%,transparent_25%),linear-gradient(-45deg,#18181c_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#18181c_75%),linear-gradient(-45deg,transparent_75%,#18181c_75%)] bg-[size:20px_20px] bg-[#0f0f13]'
              : backdropMode === 'dark'
              ? 'bg-[#0a0a0c]'
              : 'bg-gradient-to-br from-red-950/60 via-[#0a0a0c] to-black'
          }`}
        >
          <img
            src="/src/assets/images/cyber_shield_transparent.png"
            alt="Plano de Fundo Cyber Transparente - Escudo e Circuitos"
            className="max-h-[380px] w-auto object-contain drop-shadow-[0_0_35px_rgba(255,30,39,0.35)]"
            referrerPolicy="no-referrer"
          />

          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300">
            Fundo Transparente Ativo
          </div>
        </div>

        {/* Download Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          <div className="text-xs text-slate-400 font-mono">
            Pronto para uso como marca d'água, overlay em slides ou plano de fundo web.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/src/assets/images/cyber_shield_transparent.png"
              download="cyber_shield_transparente.png"
              className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-black uppercase tracking-wider transition-all cyber-glow-red flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Baixar PNG Transparente</span>
            </a>

            <a
              href="/src/assets/images/cyber_shield_bg_1790444615443.jpg"
              download="cyber_shield_completo.jpg"
              className="px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Baixar JPG Alta Resolução</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
