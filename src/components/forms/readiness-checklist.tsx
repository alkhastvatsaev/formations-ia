"use client";

import { useMemo, useState } from "react";

const QUESTIONS = [
  {
    id: "goal",
    label: "J’ai un cas concret (même flou) que je veux faire avancer.",
  },
  { id: "time", label: "Je peux bloquer le temps de l’atelier." },
  {
    id: "share",
    label:
      "Je peux parler de mon contexte métier (sans données sensibles) — on construit dessus.",
  },
] as const;

export function ReadinessChecklist() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const yesCount = useMemo(
    () => QUESTIONS.filter((q) => answers[q.id]).length,
    [answers],
  );

  return (
    <div className="border border-[var(--line)] bg-[var(--paper-soft)]/40 p-5">
      <h2 className="text-lg font-semibold text-[var(--ink)]">
        3 petits oui
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Pour voir si c’est le bon moment pour vous — pas un examen.
      </p>
      <ul className="mt-4 space-y-3">
        {QUESTIONS.map((q) => (
          <li key={q.id}>
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-[var(--ink-soft)]">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={Boolean(answers[q.id])}
                onChange={(e) =>
                  setAnswers((prev) => ({ ...prev, [q.id]: e.target.checked }))
                }
              />
              <span>{q.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <p
        className="mt-4 text-sm font-medium text-[var(--accent)]"
        role="status"
        aria-live="polite"
      >
        {yesCount === 3
          ? "3/3 — vous êtes prêt·e à réserver, ou à en parler 20 min."
          : yesCount === 0
            ? "Cochez ce qui vous parle — chaque oui compte."
            : `${yesCount}/3 — un échange de 20 min peut compléter le reste.`}
      </p>
    </div>
  );
}
