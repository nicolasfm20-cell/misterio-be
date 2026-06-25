import emailjs from '@emailjs/browser';
import { useEffect, useMemo, useState } from 'react';
import PageTitle from '../components/PageTitle';

type Complaint = {
  id: number;
  text: string;
  createdAt: Date;
};

const LOCAL_STORAGE_KEY = 'surpresa-remedio:reclamacoes';

export default function Reclamacoes() {
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const savedComplaints = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedComplaints) {
      // JSON.parse não converte strings de data de volta para objetos Date,
      // então precisamos fazer isso manualmente.
      return (JSON.parse(savedComplaints) as Complaint[]).map((complaint) => ({
        ...complaint,
        createdAt: new Date(complaint.createdAt),
      }));
    }
    return [];
  });
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  const isEmailConfigured = Boolean(
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );

  const groupedComplaints = useMemo(() => {
    const groups = new Map<string, Complaint[]>();

    complaints.forEach((complaint) => {
      const key = complaint.createdAt.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
      });

      const existing = groups.get(key) ?? [];
      existing.push(complaint);
      groups.set(key, existing);
    });

    return Array.from(groups.entries()).sort((a, b) => {
      const dateA = new Date(complaints.find((item) => item.id === Number(a[1][0]?.id))?.createdAt ?? 0);
      const dateB = new Date(complaints.find((item) => item.id === Number(b[1][0]?.id))?.createdAt ?? 0);
      return dateB.getTime() - dateA.getTime();
    });
  }, [complaints]);

  async function handleSubmit() {
    const trimmed = draft.trim();
    if (!trimmed) return;

    const newComplaint: Complaint = {
      id: Date.now(),
      text: trimmed,
      createdAt: new Date(),
    };

    setComplaints((current) => [newComplaint, ...current]);
    setDraft('');
    setIsComposerOpen(false);

    if (!isEmailConfigured) {
      setFeedback('Reclamação registrada. Configure o EmailJS para receber notificação por e-mail.');
      return;
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: 'Você',
          from_name: 'Central de Reclamações',
          message: trimmed,
          complaint_date: newComplaint.createdAt.toLocaleString('pt-BR'),
          reply_to: 'noreply@example.com',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setFeedback('Reclamação registrada e notificação enviada por e-mail.');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      setFeedback('Reclamação registrada, mas a notificação por e-mail não foi enviada.');
    }
  }

  function handleClearComplaints() {
    setComplaints([]);
    setIsConfirmOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageTitle title="📝 Central de Reclamações" />
      <p className="text-slate-300">
        Aqui você pode deixar suas reclamações e acompanhar tudo organizado por dia.
      </p>

      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/20 text-slate-100">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setIsComposerOpen((value) => !value)}
            className="rounded-2xl bg-rose-500/90 px-4 py-3 font-semibold text-white transition hover:bg-rose-400"
          >
            {isComposerOpen ? 'Fechar caixa' : 'Escrever reclamação'}
          </button>

          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-3 font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            Limpar reclamações
          </button>
        </div>

        {isComposerOpen && (
          <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <label className="block text-sm text-slate-300" htmlFor="complaint">
              Sua reclamação
            </label>
            <textarea
              id="complaint"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-3 py-3 text-sm text-slate-100 outline-none ring-0"
              placeholder="Escreva aqui o que você quer reclamar..."
            />
            <button
              type="button"
              onClick={() => void handleSubmit()}
              className="rounded-2xl bg-pink-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-400"
            >
              Enviar reclamação
            </button>

            {feedback && (
              <p className="text-sm text-emerald-300">{feedback}</p>
            )}
          </div>
        )}

        {isConfirmOpen && (
          <div className="mt-4 rounded-2xl border border-rose-400/20 bg-slate-950/80 p-4">
            <p className="text-sm text-slate-200">
              Tem certeza que deseja apagar todas as reclamações?
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={handleClearComplaints}
                className="rounded-2xl bg-rose-500/90 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400"
              >
                Sim, limpar
              </button>
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="rounded-2xl border border-white/10 bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-6">
          {groupedComplaints.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-white/10 bg-slate-950/50 p-4 text-sm text-slate-400">
              Nenhuma reclamação por enquanto.
            </p>
          ) : (
            groupedComplaints.map(([dayLabel, items]) => (
              <div key={dayLabel}>
                <h3 className="mb-3 text-lg font-semibold text-white">{dayLabel}</h3>
                <div className="space-y-3">
                  {items.map((complaint) => (
                    <div key={complaint.id} className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                      <p className="text-slate-100">{complaint.text}</p>
                      <p className="mt-2 text-sm text-slate-400">
                        {complaint.createdAt.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
