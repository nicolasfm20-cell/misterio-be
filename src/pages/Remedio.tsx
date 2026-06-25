import { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';

function getTimeRemaining() {
  const now = new Date();
  const target = new Date(now);
  target.setHours(19, 30, 0, 0);

  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  return target.getTime() - now.getTime();
}

export default function Remedio() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeRemaining());

  useEffect(() => {
    if (timeLeft <= 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const isTimeReached = timeLeft <= 0;

  return (
    <div className="space-y-6">
      <PageTitle title="💊 Remédio" />
      <h2 className="mt-3 text-2xl font-semibold text-white">
        Nem todo lembrete é sobre remédio ❤️
      </h2>

      <div className="rounded-2xl border border-pink-400/20 bg-slate-900/70 p-4 shadow-lg shadow-black/20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pink-300/80">
          Temporizador especial
        </p>
        <p className="mt-2 text-xl font-semibold text-white">
          {timeLeft > 0
            ? `Faltam ${hours}h ${minutes}m ${seconds}s para as 19:30`
            : 'Chegou a hora!'}
        </p>
        <p className="mt-1 text-sm text-slate-400">Hoje, às 19:30.</p>
      </div>

      {isTimeReached ? (
        <div className="mt-4 space-y-3 text-slate-300 leading-relaxed">
          <p>
            Hoje eu não queria usar esse espaço só pra te lembrar do remédio.
          </p>

          <p>
            Na verdade, eu estava pensando em como é engraçado que a gente passa a vida esperando pelos grandes momentos. A viagem perfeita, a conquista importante, a próxima fase da vida.
          </p>

          <p>
            Mas quando eu paro para lembrar dos dias que realmente me marcaram com você, quase nunca são esses momentos gigantes.
          </p>

          <p>
            São os detalhes.
          </p>

          <p>
            É você me contando alguma coisa aleatória do seu dia.
          </p>

          <p>
            É uma mensagem sua chegando quando eu menos espero.
          </p>

          <p>
            É uma risada no meio de uma conversa sem sentido.
          </p>

          <p>
            É um abraço que dura alguns segundos a mais.
          </p>

          <p>
            E acho que uma das coisas que mais gosto na gente é isso. A gente consegue transformar dias comuns em lembranças que eu guardo com carinho.
          </p>

          <p>
            Por isso, mesmo que hoje tenha sido só mais um dia comum, eu queria registrar uma coisa:
          </p>

          <p className="text-pink-200 font-medium">
            Eu sou muito feliz por ter você na minha vida.
          </p>

          <p>
            E espero que, daqui muitos anos, a gente ainda esteja colecionando esses momentos simples que parecem pequenos agora, mas que acabam virando as melhores partes da nossa história.
          </p>

          <p>
            Ah, e antes que eu esqueça o motivo de você ter aberto essa página...
          </p>

          <p className="font-medium text-pink-200">
            💊 Vai tomar seu remédio, mocinha.
          </p>

          <p className="font-medium text-pink-200">
            Com amor, do seu namorado que pensa em você mais do que deveria ❤️
          </p>
        </div>
      ) : null}
    </div>
  );
}
