import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTitle from '../components/PageTitle';

type PorQueEuTeAmoProps = {
  onBack: () => void;
};

const reasons = [
  'Porque você transforma dias comuns em aventuras.',
  'Pelo seu sorriso que ilumina tudo ao redor.',
  'Pela forma como você me olha, como se eu fosse a única pessoa no mundo.',
  'Porque você me entende como ninguém.',
  'Pelo seu abraço, que é o meu lugar seguro.',
  'Porque você me faz rir até a barriga doer.',
  'Pela sua inteligência e pela forma como vê o mundo.',
  'Porque você é a pessoa mais carinhosa que eu conheço.',
  'Pela sua paciência infinita comigo (na maioria das vezes).',
  'Porque você me inspira a ser uma pessoa melhor a cada dia.',
  'Pelo seu cheiro que fica na minha roupa e não sai da minha cabeça.',
  'Porque você cuida de mim de um jeito único e especial.',
  'Pela sua força e determinação para conquistar seus sonhos.',
  'Porque você torna meus próprios sonhos mais reais e possíveis.',
  'Pela forma como seus olhos brilham quando fala de algo que ama.',
  'Porque você sempre sabe o que dizer para me acalmar.',
  'Pelo seu jeito de me fazer sentir a pessoa mais especial do universo.',
  'Porque cada momento com você é uma memória que eu guardo com carinho.',
  'Pela sua risada contagiante que eu amo provocar.',
  'Porque você é minha melhor amiga e meu grande amor, tudo em uma pessoa só.',
  'Pelo seu apoio incondicional em todas as minhas loucuras.',
  'Porque você é linda de todas as formas, por dentro e por fora.',
  'Pela sua bondade com todos ao seu redor.',
  'Porque você me ensinou o que é amor de verdade.',
  'Pelo seu gosto musical que embala nossos momentos.',
  'Porque você é a calmaria no meio da minha tempestade.',
  'Pela sua paixão pela vida, que me inspira a viver mais intensamente.',
  'Porque você é a primeira pessoa em quem penso ao acordar e a última antes de dormir.',
  'Pelo seu jeito de dançar pela casa quando ninguém está vendo.',
  'Porque você faz a melhor comida (ou pelo menos tenta com muito amor).',
  'Pela sua capacidade de me surpreender quando eu menos espero.',
  'Porque você é a minha paz.',
  'Pelo seu otimismo que me ajuda a ver o lado bom das coisas.',
  'Porque você é a peça que faltava no meu quebra-cabeça.',
  'Pela sua criatividade e imaginação sem limites.',
  'Porque você me aceita exatamente como eu sou, com todas as minhas falhas.',
  'Pelo seu toque que me arrepia da cabeça aos pés.',
  'Porque você é a estrela mais brilhante do meu universo particular.',
  'Pela sua voz, que eu poderia ouvir por horas sem cansar.',
  'Porque você é a resposta para perguntas que eu nem sabia que tinha.',
  'Pelo seu jeito de fazer birra que, no fundo, eu acho a coisa mais fofa.',
  'Porque você é minha parceira para qualquer aventura.',
  'Pela sua honestidade, mesmo quando a verdade é difícil.',
  'Porque você me faz sentir em casa, não importa onde estejamos.',
  'Pelo seu coração gigante, que sempre pensa nos outros.',
  'Porque você é a aventura que eu sempre quis viver.',
  'Pela sua coragem de ser autêntica em um mundo que tenta nos moldar.',
  'Porque você é a melodia da minha música favorita.',
  'Pelo seu jeito de me mimar e cuidar de cada detalhe.',
  'Porque você é meu porto seguro.',
  'Pela forma como você se emociona com as pequenas coisas.',
  'Porque você é a razão do meu sorriso mais bobo e sincero.',
  'Pelo seu jeito único de resolver problemas.',
  'Porque você é mais forte do que imagina.',
  'Pela sua lealdade e por ser a pessoa em quem mais confio.',
  'Porque você me ensina algo novo todos os dias.',
  'Pelo seu olhar que diz tudo sem precisar de palavras.',
  'Porque você faz meu coração acelerar só de pensar em você.',
  'Pela forma como você segura minha mão.',
  'Porque você ri das minhas piadas sem graça.',
  'Pela sua mania de organizar as coisas (e a minha vida).',
  'Porque você é a minha pessoa favorita para não fazer nada junto.',
  'Pelo seu jeito de me desafiar a sair da minha zona de conforto.',
  'Porque você é a personificação de um sonho bom.',
  'Pela sua capacidade de perdoar e seguir em frente.',
  'Porque você é a minha notificação preferida.',
  'Pelo seu jeito de me dar bronca quando eu preciso.',
  'Porque você é a minha inspiração para escrever as coisas mais bonitas.',
  'Pela sua paixão por aprender coisas novas.',
  'Porque você é a minha sorte grande.',
  'Pelo seu jeito de me fazer sentir amado e valorizado.',
  'Porque você é a única pessoa com quem eu quero dividir minhas manias.',
  'Pela sua energia que me renova.',
  'Porque você é a minha saudade diária.',
  'Pelo seu jeito de se entregar por inteiro a tudo que faz.',
  'Porque você é a obra de arte mais linda que eu já vi.',
  'Pela sua capacidade de transformar um dia ruim em um dia bom.',
  'Porque você é a minha cúmplice.',
  'Pelo seu jeito de me dar espaço quando eu preciso.',
  'Porque você é a minha certeza em um mundo de incertezas.',
  'Pela sua fé em mim, mesmo quando eu duvido.',
  'Porque você é a minha história de amor favorita.',
  'Pelo seu jeito de me fazer sentir o homem mais sortudo do mundo.',
  'Porque você é a minha definição de felicidade.',
  'Pela sua forma de amar, que é única e só sua.',
  'Porque você é a razão pela qual eu acredito em "para sempre".',
  'Pelo seu jeito de me fazer sentir completo.',
  'Porque você é a minha pessoa, simples assim.',
  'Pela sua teimosia, que me desafia e me faz crescer.',
  'Porque você é a minha aventura e meu refúgio.',
  'Pelo seu jeito de me fazer esquecer dos problemas.',
  'Porque você é a minha melhor escolha, todos os dias.',
  'Pela sua alma linda e transparente.',
  'Porque você é a minha pessoa favorita para compartilhar o silêncio.',
  'Pelo seu jeito de me fazer sentir que tudo vai ficar bem.',
  'Porque você é, e sempre será, o meu grande amor.',
];

const getRandomReason = (current?: number) => {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * reasons.length);
  } while (newIndex === current);
  return newIndex;
};

export default function PorQueEuTeAmo({ onBack }: PorQueEuTeAmoProps) {
  const [reasonIndex, setReasonIndex] = useState(() => getRandomReason());

  const handleNextReason = () => {
    setReasonIndex(getRandomReason(reasonIndex));
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between">
        <PageTitle title="💖 Por que eu te amo" />
        <button
          onClick={onBack}
          aria-label="Voltar"
          className="inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-sm backdrop-blur-sm hover:bg-black/30"
        >
          ← Voltar
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={reasonIndex}
            onClick={handleNextReason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="relative w-full max-w-2xl cursor-pointer rounded-3xl bg-gradient-to-br from-rose-500/80 to-pink-500/70 p-8 sm:p-12 shadow-2xl shadow-rose-500/30 border border-white/20 min-h-[300px] flex items-center justify-center"
          >
            <p className="text-2xl sm:text-3xl font-semibold text-white drop-shadow-lg">
              {reasons[reasonIndex]}
            </p>
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 text-rose-200/80 animate-pulse">Toque no cartão para ver outro motivo</p>
      </div>
    </div>
  );
}