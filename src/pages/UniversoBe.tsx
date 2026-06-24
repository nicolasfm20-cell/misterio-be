import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTitle from '../components/PageTitle';

type UniversoBeProps = {
  onBack: () => void;
};

type Memory = {
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
  title: string;
  description: string;
  date?: string;
  images?: string[];
  videos?: string[];
  song?: string;
  isImportant?: boolean;
};

// Mapeia todos os arquivos da pasta assets para suas URLs
const imageModules = import.meta.glob('../assets/*', { eager: true, as: 'url' });
const videoModules = import.meta.glob('../assets/**/*.{mp4,webm,mov}', { eager: true, as: 'url' });

const images = Object.fromEntries(
  Object.entries(imageModules).map(([path, url]) => {
    const filename = path.split('/').pop() ?? '';
    return [filename, url];
  }),
);
const videos = Object.fromEntries(
  Object.entries(videoModules).map(([path, url]) => {
    const filename = path.split('/').pop() ?? '';
    return [filename, url];
  }),
);

const memories: Memory[] = [
  {
    x: 15,
    y: 20,
    size: 'lg',
    title: 'Primeira Conversa',
    description: 'Foi aqui que tudo começou ❤️ (da melhor forma inclusive kkkkk)',
    images: ['primeiramsg.jpg'],
    date: '30/10/2024',
    isImportant: true
  },
  {
    x: 70,
    y: 30,
    size: 'md',
    title: 'Primeiro Encontro',
    description: 'Eu estava mais nervoso do que admiti.',
    images: ['Primeiroencontro.jpg'],
    song: 'https://open.spotify.com/intl-pt/track/0DZy6nJdqvHSeobBaOBJI6?si=a61dc066f53544dd',
    isImportant: true
  },
  {
    x: 40,
    y: 70,
    size: 'md',
    title: 'Primeiro "feliz ano novo"',
    description: 'Não é tanta coisa mas foi o primeiro',
    images: ['primeirofelizanonovo.jpg'],
  },
  {
    x: 85,
    y: 50,
    size: 'lg',
    title: 'Copa',
    description: 'Nossa primeira copa juntos!',
    // Exemplo com múltiplas imagens. Adicione os arquivos copa1.jpg e copa2.jpg em /assets
    images: ['primeiracopa1.jpeg', 'primeiracopa2.jpeg'],
    song: 'https://open.spotify.com/intl-pt/track/4M7qPlHxp3v0EaBRUcHXOJ?si=381edfe191ce433f'
  },
  // Novas memórias adicionadas
  { x: 25, y: 85, size: 'lg', title: 'Primeira Páscoa', description: 'Nossa primeira páscoa juntos!', images: ['presentepascoa.jpg']},
  { x: 55, y: 25, size: 'sm', title: 'Nossos momentos', description: 'Alguns de nossos Momentos..', images: ['amo.jpg']},
  { x: 80, y: 80, size: 'sm', title: 'Nossos momentos', description: 'Alguns de nossos Momentos..', images: ['amo2.jpg']},
  { x: 10, y: 50, size: 'md', title: 'Nossos momentos', description: 'Alguns de nossos Momentos..', images: ['amo3.jpg']},
  { x: 50, y: 50, size: 'md', title: 'O BUQUÊ', description: 'Um dos melhores dias!', images: ['buque1.jpg', 'buque2.jpg', 'buque3.jpg', 'buque4.jpg', 'buque5.jpg', 'buque6.jpg', 'buque7.jpg', 'buque8.jpg', 'buque9.jpg']},
  
  {
    x: 95,
    y: 60,
    size: 'lg',
    title: 'Conhecendo o Biel',
    description: 'Quando conhecemos seu best a primeira vez!',
    images: ['conhecendobest.jpg', 'best.jpeg'],
  },
  { x: 18, y: 60, size: 'md', title: 'Primeira vez no Churraskilo', description: 'Gosto desse dia, quase te fiz comer japa...', images: ['dateChurraskilo.webp']},
  { x: 60, y: 45, size: 'lg', title: 'Aqui é sem palavras... KKKKKKK', description: 'Marcado na história, EU QUE MANDO!!!', images: ['eumando.jpg'], isImportant: true},
  { x: 35, y: 25, size: 'md', title: 'AS primeiras fotos..', description: 'Amo essas fotos do inicio de tudo ❤️', images: ['fotojunto1.jpg','fotojunto2.jpg']},
  { x: 88, y: 92, size: 'md', title: 'Conhecendo minha Family', description: 'Fiquei muito feliz esse dia, se nn foi um dos melhores meesmo ❤️❤️❤️ ', images: ['melhorfoto.jpg', 'foto5.jpeg', 'fototop2.jpg', 'natural.jpg'], song: 'https://open.spotify.com/intl-pt/track/4fg8WPI8JiVml405WiK9z9?si=305951b963b14dba', isImportant: true},
  { x: 12, y: 95, size: 'lg', title: 'O Primeiro Buquê', description: 'Esse dia foi tudo, a melhor mentira q ja fiz!!! ❤️❤️❤️', images: ['primeirobuque.jpg'], song: 'https://open.spotify.com/intl-pt/track/5yEais1zgeW1MjLrx7tsie?si=c184714c7f95419f', isImportant: true},
  { x: 78, y: 16, size: 'sm', title: 'Esse desenho...', description: 'Sou completamente apxnd com esse desenho, sou fodaa KKKKKKK', images: ['melhordesenho.jpg']},
  { x: 58, y: 78, size: 'md', title: 'Primeira vez q saimos de carro', description: 'A GCM foi fdp mas esse dia foi topee (qse bati o carro)', images: ['primeirodatecarro.jpg']},
  { x: 28, y: 55, size: 'md', title: 'Primeiro Kinoplex Diamante', description: 'Esse cinema é foda, temos que ir mais vezes.', images: ['primeirokinoplexdiamante.jpg']},
  { x: 68, y: 17, size: 'lg', title: 'Nosso primeiro Dia dos Namorados', description: 'Nosso primeiro dia dos Namorados, pena que a Bê tava muito doente 🥹🥹', images: ['primeironamorados.jpeg', 'segundobuque.jpeg']},
  { x: 22, y: 90, size: 'lg', title: 'Um dos melhores vídeos!', description: 'Amo esse video, só faltou a musica', videos: ['video.mp4'], song:'https://open.spotify.com/intl-pt/track/61uyGDPJ06MkxJtHgPmuyO?si=f030644372ba425c'},
  { x: 72, y: 55, size: 'lg', title: 'O Dia Que Descobri que Te Amo!!', description: 'Mesmo sendo naquela epoca, foi o dia em que comecei a te amar', images: ['foto3.jpeg', 'foto4.jpeg'], song: 'https://open.spotify.com/episode/01A9ynzDceiZ8jmjVtN3Rs?si=24f51916c28149c5', isImportant: true},
  { x: 52, y: 35, size: 'sm', title: 'Nossa foto crianças ❤️', description: 'Amo de coração essa foto!!!', images: ['kids.jpeg']},
  { x: 33, y: 80, size: 'md', title: 'A brincadeira do Pedra, Papel e Tesoura', description: 'Não tenho o vídeo mas a brincadeira foi marcante kkkkk', images: ['pedra.jpeg']},
  { x: 63, y: 22, size: 'lg', title: 'O REENCONTRO', description: 'Não temos registros desse dia juntos, mas pode ter certeza que foi O MAIS MARCANTE POSSIVEL(não esperava) ❤️❤️❤️', images: ['reencontro.jpeg'], isImportant: true},
  { x: 42, y: 55, size: 'lg', title: 'O PRIMEIRO DATE PARTE 2', description: 'Primeira vez que saimos de verdade e o motivo por estarmos ate hoje e eu estar fazendo isso aqui!', images: ['reencontro2.jpeg'], isImportant: true},
  { x: 50, y: 89, size: 'lg', title: 'Declaração', description: 'O dia fatidico que falei que ia namorar contigo KKKKKKKKKKKKKK (bem bebado mas do coração) ❤️❤️❤️', videos: ['video2.mp4'], isImportant: true},
  { x: 47, y: 14, size: 'md', title: 'Nosso primeiro "show" juntos!', description: 'Não estavamos juntos mas cada musica eu sabia que era dedicada pra você (ignora o homi ter traido kkkkk)', images: ['show.jpeg'], song: 'https://open.spotify.com/intl-pt/track/6P7Uodyh8g40Nyc3no6R8E?si=6334b2d970814511'},
];

// Componente para a galeria de imagens dentro do modal
function MemoryImageGallery({ memory }: { memory: Memory }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleImages = memory.images && memory.images.length > 1;

  if (!memory.images || memory.images.length === 0) {
    return null;
  }

  const handleImageClick = () => {
    if (hasMultipleImages) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (memory.images?.length || 1));
    }
  };

  return (
    <div className="relative mb-6 cursor-pointer" onClick={handleImageClick}>
      {/* Efeito de "cartas empilhadas" para indicar múltiplas fotos */}
      {hasMultipleImages && (
        <>
          <div className="absolute top-2 left-2 w-full h-full rounded-xl bg-slate-700/30 -z-10 transform rotate-3" />
          <div className="absolute top-1 left-1 w-full h-full rounded-xl bg-slate-700/40 -z-10 transform rotate-1" />
        </>
      )}
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[memory.images[currentIndex]]}
          alt={memory.title}
          className="relative z-0 w-full object-contain max-h-[60vh] rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  );
}

// Componente para a galeria de vídeos dentro do modal
function MemoryVideoGallery({ memory }: { memory: Memory }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasMultipleVideos = memory.videos && memory.videos.length > 1;

  if (!memory.videos || memory.videos.length === 0) {
    return null;
  }

  const handleVideoClick = () => {
    if (hasMultipleVideos) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (memory.videos?.length || 1));
    }
  };

  return (
    <div className="relative mb-6" onClick={handleVideoClick}>
      {hasMultipleVideos && (
        <p className="text-center text-sm text-slate-400 mb-2">
          (Vídeo {currentIndex + 1} de {memory.videos.length}) {hasMultipleVideos && '- Clique no vídeo para trocar'}
        </p>
      )}
      <AnimatePresence initial={false} mode="wait">
        <motion.video
          key={currentIndex}
          src={videos[memory.videos[currentIndex]]}
          controls
          className="relative z-0 w-full object-contain max-h-[60vh] rounded-xl shadow-lg bg-black"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  );
}

export default function UniversoBe({ onBack }: UniversoBeProps) {
  const [selected, setSelected] = useState<Memory | null>(null);
  
  // Gera estrelas de fundo para um efeito de universo mais denso
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: `bg-star-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() > 0.9 ? Math.random() * 1.5 + 0.5 : Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      animationDuration: `${Math.random() * 5 + 5}s`,
    }));
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 h-screen w-full overflow-hidden bg-gradient-to-tl from-slate-950 via-indigo-950 to-black"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      transition={{ duration: 1.2, ease: 'circOut' }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        {/* Estrelas de Fundo Decorativas */}
        <div className="absolute inset-0 z-0">
          {backgroundStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
              initial={{ opacity: 0 }}
              animate={{ opacity: star.opacity }}
              transition={{ duration: 1.5, delay: 1.2 }}
            />
          ))}
        </div>

        {/* Botão de Voltar e Título */}
        <div className="absolute top-0 left-0 z-20 w-full flex items-center justify-between p-4 sm:p-6 lg:p-8">
          <PageTitle title="🌌 Universo Bê" />
          <button onClick={onBack} aria-label="Voltar" className="inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-black/30">
            ← Voltar
          </button>
        </div>

        {/* Estrelas (Memórias) */}
        <motion.div
          className="absolute inset-0"
          variants={{ visible: { transition: { staggerChildren: 0.04, delayChildren: 1.2 } } }}
          initial="hidden"
          animate="visible"
        >
          {memories.map((star, index) => (
            <motion.button
              key={`${star.title}-${index}`}
              onClick={() => setSelected(star)}
              className={`absolute z-10 rounded-full transition-transform hover:scale-150 ${
                star.isImportant
                  ? 'bg-red-400 shadow-lg shadow-red-400/50'
                  : 'bg-white shadow-lg shadow-white/50'
              }`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: star.size === 'lg' ? '12px' : star.size === 'md' ? '8px' : '4px',
                height: star.size === 'lg' ? '12px' : star.size === 'md' ? '8px' : '4px',
              }}
              variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Modal da Memória Selecionada */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="m-4 w-full max-w-2xl rounded-3xl bg-slate-900/80 p-8 shadow-2xl shadow-purple-500/20 border border-purple-400/20 backdrop-blur-lg">
              <MemoryVideoGallery memory={selected} />
              <MemoryImageGallery memory={selected} />
              <h2 className="text-3xl font-bold text-purple-200 mb-4">{selected.title}</h2>
              {selected.date && (
                <p className="text-sm text-purple-300/70 mb-4 -mt-2">{selected.date}</p>
              )}
              <p className="text-lg text-slate-300 mb-8">{selected.description}</p>

              {selected.song && (
                <a
                  href={selected.song}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-400 mb-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                  Ouvir no Spotify
                </a>
              )}

              <button onClick={() => setSelected(null)} className="rounded-xl bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-500">
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}