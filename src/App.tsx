﻿import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  MessageCircle,
  Pill,
  ShieldCheck,
  Smile,
  Sparkles,
} from 'lucide-react';

import Cartinhas from './pages/Cartinhas';
import DiaDosNamorados from './pages/DiaDosNamorados';
import Reclamacoes from './pages/Reclamacoes';
import Remedio from './pages/Remedio';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.trim();

  const handleSOSClick = () => {
    const sanitizedNumber = whatsappNumber?.replace(/\D/g, '');
    const sosMessage = `⚠️ SOS ACIONADO ⚠️

O botão de emergência foi pressionado.

Motivo:

💖 Necessidade crítica de carinho. ❤️

Nível de urgência:

■■■■■■■■■■ 100%

Atenção: a usuária encontra-se temporariamente vulnerável à saudade, abraços imaginários e vontade de ficar juntinha.

Recomenda-se contato imediato com o namorado para aplicação de doses emergenciais de amor.

💌 Responda a esta mensagem para iniciar o protocolo de recuperação.`;
    const encodedMessage = encodeURIComponent(sosMessage);
    const whatsappUrl = sanitizedNumber
      ? `https://wa.me/${sanitizedNumber}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const renderContent = () => {
    if (activePage === 'home') {
      return (
        <div className="space-y-8">
<motion.button
                type="button"
                onClick={() => setActivePage('dia-dos-namorados')}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-600 via-rose-500 to-pink-500 p-12 shadow-2xl shadow-rose-500/50 text-left transition-all duration-200 hover:shadow-rose-500/80"
              >
                <div className="absolute -right-10 -top-10 text-8xl opacity-20">❤️</div>
                <div className="absolute -bottom-5 -left-5 text-7xl opacity-20">💕</div>
                <div className="absolute right-10 bottom-20 text-6xl opacity-25">💖</div>

                <div className="relative z-10">
                  <p className="text-sm uppercase tracking-[0.35em] font-bold text-white/90">Dedicado para</p>
                  <h2 className="mt-3 text-5xl font-black tracking-tight text-white drop-shadow-lg sm:text-6xl">
                    Dia dos Namorados
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-white drop-shadow">
                    Temos uma tela especial repleta de amor, surpresas e momentos inesquecíveis para nós 💕
                  </p>
                </div>
              </motion.button>

            <div className="mt-8">
              <div className="mx-auto max-w-4xl rounded-2xl bg-slate-900/70 p-8 shadow-lg border border-white/10">
                <h3 className="text-2xl font-bold text-white">O que é este site?</h3>
                <p className="mt-3 text-slate-300">Aqui é a nossa central: um lugar carinhoso onde reunimos cartas, memórias, jogos e pequenos espaços para trocar mensagens e registrar momentos. Cada opção abaixo leva a uma tela dedicada com conteúdo e interações pensadas especialmente para nós.</p>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Remédio em destaque - ocupa as 3 colunas em md+ */}
                <button
                  onClick={() => setActivePage('remedio')}
                  className="w-full flex flex-col items-start gap-3 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-indigo-500 px-6 py-10 text-left text-white shadow-2xl md:col-span-3 hover:scale-[1.02] transition-transform"
                >
                  <div className="inline-flex items-center gap-3">
                    <Pill className="h-6 w-6 text-white/90" />
                    <span className="text-2xl font-extrabold">Remédio</span>
                  </div>
                  <p className="mt-2 text-sm text-indigo-100/80">Tela dedicada com lembretes, avisos e rotina de cuidado.</p>
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <button
                  onClick={() => setActivePage('reclamacoes')}
                  className="w-full flex flex-col items-start gap-3 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-indigo-500 px-6 py-8 text-left text-white shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <div className="inline-flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-white/90" />
                    <span className="text-lg font-bold">Reclamações</span>
                  </div>
                  <p className="mt-2 text-sm text-indigo-100/80">Espaço para registrar reclamações com humor.</p>
                </button>

                <button
                  onClick={() => setActivePage('cartinhas')}
                  className="w-full flex flex-col items-start gap-3 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-indigo-500 px-6 py-8 text-left text-white shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <div className="inline-flex items-center gap-3">
                    <MessageCircle className="h-6 w-6 text-white/90" />
                    <span className="text-lg font-bold">Cartinhas</span>
                  </div>
                  <p className="mt-2 text-sm text-indigo-100/80">Cartas carinhosas feitas especialmente pra você.</p>
                </button>

                <button
                  onClick={handleSOSClick}
                  className="w-full flex flex-col items-start gap-3 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-indigo-500 px-6 py-8 text-left text-white shadow-xl hover:scale-[1.02] transition-transform"
                >
                  <div className="inline-flex items-center gap-3">
                    <Smile className="h-6 w-6 text-white/90" />
                    <span className="text-lg font-bold">SOS Namorado</span>
                  </div>
                  <p className="mt-2 text-sm text-indigo-100/80">Pedir carinho imediato e surpresas.</p>
                </button>
              </div>
            </div>
          </div>
        );
    }

    const pagesMap: Record<string, ReactNode> = {
      'dia-dos-namorados': <DiaDosNamorados onClose={() => setActivePage('home')} />,
      cartinhas: <Cartinhas />,
      reclamacoes: <Reclamacoes />,
      remedio: <Remedio />,
    };

    return pagesMap[activePage] ?? null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white selection:bg-rose-500/30">
      <div className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {activePage === 'home' && (
            <div className="mb-10 rounded-[2rem] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-black/20">
                    <Sparkles className="h-5 w-5 text-rose-300" />
                    Nova página principal: Central da Bê
                  </p>
                  <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
                    Central da <span className="text-rose-300">Bê</span>
                  </h1>
                  <div className="mt-4 max-w-3xl text-base leading-7 text-slate-300 whitespace-pre-line">
                    {`Oiii amor ❤️

Eu fiz esse site especialmente pra você.

A ideia começou pequena, mas quanto mais eu pensava em você, mais vontade eu tinha de transformar isso em algo nosso. Um cantinho onde eu pudesse guardar lembranças, criar surpresas, colocar nossas brincadeiras, nossos momentos e tudo aquilo que faz parte da nossa história.

Talvez seja só um site para quem vê de fora, mas pra mim ele significa muito mais. Cada detalhe aqui foi pensado com carinho, porque você é uma das coisas mais importantes da minha vida.

Quero que esse lugar cresça junto com a gente. Que ganhe novas páginas, novas memórias, novas conquistas e muitos momentos felizes. E mesmo quando eu não estiver por perto, quero que você possa entrar aqui e lembrar o quanto é amada.

Então seja bem-vinda à sua Central da Bê. 🩷

Feita com muito amor, algumas horas de programação e uma quantidade absurda de saudade de você.

Te amo. ✨❤️`}
                  </div>
                </div>
              </div>
              {/* Navbar removida: navegação foi transformada em painel de botões na home */}
            </div>
          )}

          {activePage !== 'home' && (
            <button
              onClick={() => setActivePage('home')}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-3 text-slate-100 shadow-lg shadow-black/20 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para a Central
            </button>
          )}

          <div className="space-y-10">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
