import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import YouTubeBubble from '../components/YouTubeBubble';
import PorQueEuTeAmo from './PorQueEuTeAmo';
import UniversoBe from './UniversoBe';

type ValentinesView = 'valentines_home' | 'por-que-eu-te-amo' | 'universo-be';

export default function DiaDosNamorados({ onClose }: { onClose?: () => void }) {
  const [activeView, setActiveView] = useState<ValentinesView>('valentines_home');

  const renderContent = () => {
    if (activeView === 'por-que-eu-te-amo') {
      return <PorQueEuTeAmo onBack={() => setActiveView('valentines_home')} />;
    }

    if (activeView === 'universo-be') {
      return <UniversoBe onBack={() => setActiveView('valentines_home')} />;
    }

    // valentines_home
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg text-white shadow-md">
            💘
          </span>
          <h2 className="text-3xl font-semibold text-white">Dia dos Namorados</h2>
        </div>

        <div className="rounded-[1.5rem] bg-gradient-to-br from-red-600/70 via-rose-500/60 to-pink-500/60 p-8 shadow-2xl shadow-rose-500/50 border border-white/10 backdrop-blur-sm">
          <div className="space-y-6">
            <p className="text-lg font-semibold sm:text-xl">
              Aqui você encontra um cantinho dedicado para nós com as coisas mais especiais possiveis que consigo
              imaginar para fazer. EU TE AM0 MEU AMOOOORRR
            </p>
            <p className="max-w-3xl text-sm leading-7 text-rose-100/90 sm:text-base">
              (era pra ta pronto no dia dos namorados mas nn deu tempo 🥹🥹🥹) Sempre q possivel vou adicionar coisas
              novas aqui!
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <button
            type="button"
            onClick={() => setActiveView('por-que-eu-te-amo')}
            className="relative w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-rose-500/80 to-pink-500/70 px-8 py-10 text-left text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-rose-400/50"
          >
            <div className="relative z-10">
              <h3 className="text-4xl font-black tracking-tight text-white drop-shadow-lg">Por que eu te amo</h3>
            </div>
            {/* Decoração de corações */}
            <div className="absolute -right-2 -top-2 text-7xl opacity-20 rotate-12">💖</div>
            <div className="absolute right-16 -bottom-4 text-6xl opacity-10 -rotate-6">❤️</div>
            <div className="absolute right-8 top-16 text-4xl opacity-15 rotate-12">💕</div>
            <div className="absolute right-2 bottom-8 text-2xl opacity-20 rotate-45">💖</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveView('universo-be')}
            className="relative w-full overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-indigo-900 to-purple-950 px-8 py-10 text-left text-white shadow-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-400/50 border border-blue-400/30"
          >
            <div className="relative z-10">
              <h3 className="text-4xl font-black tracking-tight text-white drop-shadow-lg">Universo Bê</h3>
            </div>
            {/* Decoração de universo */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-10 left-1/2 h-1 w-1 rounded-full bg-white/50" />
              <div className="absolute top-1/4 right-1/4 h-0.5 w-0.5 rounded-full bg-white/30" />
              <div className="absolute bottom-8 right-10 h-1.5 w-1.5 rounded-full bg-purple-300/40" />
              <div className="absolute bottom-1/3 left-1/4 h-1 w-1 rounded-full bg-indigo-300/20" />
              <div className="absolute top-16 right-12 h-0.5 w-0.5 rounded-full bg-white/60" />
              <div className="absolute bottom-4 left-10 h-0.5 w-0.5 rounded-full bg-white/20" />
              <Sparkles className="absolute right-20 top-8 h-8 w-8 text-purple-300/20" />
              <Sparkles className="absolute left-16 bottom-8 h-6 w-6 text-indigo-300/30" />
            </div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gradient-to-br from-red-600 via-rose-500 to-pink-500 text-white">
      <YouTubeBubble videoId="FYOCipfAGk8" />
      <div className="relative px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {activeView === 'valentines_home' && (
            <button
              onClick={() => onClose?.()}
              aria-label="Voltar"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-sm backdrop-blur-sm hover:bg-black/30"
            >
              ← Voltar para a Central
            </button>
          )}

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
