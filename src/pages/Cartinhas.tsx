import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import PageTitle from '../components/PageTitle';

type Letter = {
  id: number;
  title: string;
  text: string;
};

export default function Cartinhas() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [letters, setLetters] = useState<Letter[]>([]);
  const [openLetterId, setOpenLetterId] = useState<number | null>(null);
  const [editingLetterId, setEditingLetterId] = useState<number | null>(null);

  function resetComposer() {
    setTitle('');
    setText('');
    setEditingLetterId(null);
    setIsComposerOpen(false);
  }

  function handleSubmit() {
    const trimmedTitle = title.trim();
    const trimmedText = text.trim();

    if (!trimmedTitle || !trimmedText) return;

    if (editingLetterId) {
      setLetters((current) =>
        current.map((letter) =>
          letter.id === editingLetterId ? { ...letter, title: trimmedTitle, text: trimmedText } : letter,
        ),
      );
      resetComposer();
      return;
    }

    const newLetter: Letter = {
      id: Date.now(),
      title: trimmedTitle,
      text: trimmedText,
    };

    setLetters((current) => [newLetter, ...current]);
    resetComposer();
  }

  function handleEdit(letter: Letter) {
    setTitle(letter.title);
    setText(letter.text);
    setEditingLetterId(letter.id);
    setIsComposerOpen(true);
    setOpenLetterId(letter.id);
  }

  function handleDelete(letterId: number) {
    setLetters((current) => current.filter((letter) => letter.id !== letterId));
    setOpenLetterId((current) => (current === letterId ? null : current));
  }

  return (
    <div className="space-y-6">
      <PageTitle title="💌 Cartinhas" />
      <p className="text-slate-300">
        Uma tela dedicada só para as cartas que escrevemos um para o outro, sempre quando quisermos ler de novo.
      </p>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20">
        <button
          type="button"
          onClick={() => {
            if (isComposerOpen) {
              resetComposer();
              return;
            }
            setIsComposerOpen(true);
          }}
          className="rounded-2xl bg-rose-500/90 px-4 py-3 font-semibold text-white transition hover:bg-rose-400"
        >
          {isComposerOpen ? 'Fechar caixa' : 'Adicionar carta'}
        </button>

        {isComposerOpen && (
          <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <label className="block text-sm text-slate-300" htmlFor="letter-title">
              Título da carta
            </label>
            <input
              id="letter-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-slate-100 outline-none"
              placeholder="Digite um título"
            />

            <label className="block text-sm text-slate-300" htmlFor="letter-text">
              Texto da carta
            </label>
            <textarea
              id="letter-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-slate-100 outline-none"
              placeholder="Escreva a sua carta..."
            />

            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-2xl bg-pink-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-400"
            >
              {editingLetterId ? 'Salvar alterações' : 'Salvar carta'}
            </button>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {letters.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-4 text-sm text-slate-400">
              Nenhuma carta por enquanto.
            </p>
          ) : (
            letters.map((letter) => {
              const isOpen = openLetterId === letter.id;

              return (
                <div
                  key={letter.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setOpenLetterId(isOpen ? null : letter.id)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-white">{letter.title}</span>
                        <span className="text-sm text-slate-400">{isOpen ? 'Fechar' : 'Abrir'}</span>
                      </div>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(letter)}
                        className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                        aria-label={`Editar carta ${letter.title}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(letter.id)}
                        className="rounded-full p-2 text-rose-300 transition hover:bg-white/10 hover:text-rose-200"
                        aria-label={`Excluir carta ${letter.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {isOpen && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300">{letter.text}</p>}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
