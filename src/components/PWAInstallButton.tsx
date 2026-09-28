import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, Share2, X, Check, PlusSquare } from 'lucide-react';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'header' | 'hero' | 'sidebar';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'header'
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already installed as a standalone PWA, suppress the button
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }

    if (isInstallable) {
      setIsInstalling(true);
      await install();
      setIsInstalling(false);
    } else {
      // Fallback instruction for browsers without beforeinstallprompt (e.g. Firefox or desktop Safari)
      setShowIOSGuide(true);
    }
  };

  return (
    <>
      {variant === 'header' && (
        <button
          onClick={handleInstallClick}
          title="Instalar Guia NGFW no Celular / Computador"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold uppercase transition-all border border-emerald-600/50 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 hover:text-white hover:border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)] cursor-pointer active:scale-95 ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden sm:inline">Instalar App</span>
          <Download className="w-3 h-3 text-emerald-400 shrink-0" />
        </button>
      )}

      {variant === 'sidebar' && (
        <button
          onClick={handleInstallClick}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border border-emerald-600/40 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/50 hover:text-white cursor-pointer shadow-sm ${className}`}
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Instalar no Celular</span>
          </div>
          <Download className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      )}

      {variant === 'hero' && (
        <button
          onClick={handleInstallClick}
          className={`px-4 py-3 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/60 hover:border-emerald-400 text-emerald-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.25)] active:scale-95 ${className}`}
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Instalar Aplicativo (PWA)</span>
        </button>
      )}

      {/* iOS / Safari / Fallback Installation Modal Guide */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-slate-950 border border-red-900/60 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-600/60 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white font-mono uppercase">
                    Instalar Guia NGFW no Celular
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Progressive Web App (PWA) Oficial
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <p className="text-slate-200 leading-relaxed">
                Você pode instalar este portal diretamente na tela de início do seu smartphone ou tablet para abrir como um app nativo, sem barra de navegação e com acesso rápido aos 15 capítulos.
              </p>

              {isIOS ? (
                <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase text-[11px]">
                    <Share2 className="w-3.5 h-3.5" /> No iPhone / iPad (Safari):
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1 text-[11px]">
                    <li>
                      Toque no botão <strong className="text-white">Compartilhar</strong> (ícone com quadrado e seta para cima no Safari).
                    </li>
                    <li>
                      Role para baixo e selecione <strong className="text-emerald-400">"Adicionar à Tela de Início"</strong>.
                    </li>
                    <li>
                      Toque em <strong className="text-white">"Adicionar"</strong> no canto superior direito.
                    </li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-2.5 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="font-bold text-cyan-400 flex items-center gap-1.5 uppercase text-[11px]">
                    <Download className="w-3.5 h-3.5" /> No Android (Chrome / Edge / Firefox):
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1 text-[11px]">
                    <li>
                      Toque no menu de <strong className="text-white">três pontos (⋮)</strong> no canto superior do navegador.
                    </li>
                    <li>
                      Selecione <strong className="text-cyan-400">"Instalar aplicativo"</strong> ou <strong className="text-cyan-400">"Adicionar à tela inicial"</strong>.
                    </li>
                    <li>
                      Confirme em <strong className="text-white">"Instalar"</strong>.
                    </li>
                  </ol>
                </div>
              )}

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-700/50 text-[11px] text-emerald-300">
                <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>O ícone oficial do Guia NGFW será adicionado à sua tela principal!</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-mono text-xs font-bold uppercase transition-all cursor-pointer"
              >
                Entendido, Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
