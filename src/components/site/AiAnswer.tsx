'use client';

import { useEffect, useState } from 'react';
import { Spark } from './Icons';

const ENGINES = ['ChatGPT', 'Perplexity', 'Gemini', 'Claude'];
const SOURCES = ['Votre site', 'Article de presse', 'Avis clients'];

type Phase = 'typing' | 'thinking' | 'answering' | 'done';

export default function AiAnswer({ prompt, answer }: { prompt: string; answer: string }) {
  const words = answer.split(/(\s+)/);
  const [engine, setEngine] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [chars, setChars] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setChars(prompt.length);
      setShown(words.length);
      setPhase('done');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'typing') {
      if (chars < prompt.length) t = setTimeout(() => setChars((c) => c + 1), 28);
      else t = setTimeout(() => setPhase('thinking'), 350);
    } else if (phase === 'thinking') {
      t = setTimeout(() => setPhase('answering'), 1100);
    } else if (phase === 'answering') {
      if (shown < words.length) t = setTimeout(() => setShown((s) => s + 2), 45);
      else setPhase('done');
    } else if (phase === 'done') {
      t = setTimeout(() => {
        setEngine((e) => (e + 1) % ENGINES.length);
        setChars(0);
        setShown(0);
        setPhase('typing');
      }, 6500);
    }
    return () => clearTimeout(t);
  }, [phase, chars, shown, prompt.length, words.length]);

  function select(i: number) {
    setEngine(i);
    setChars(prompt.length);
    setShown(words.length);
    setPhase('done');
  }

  const answerNodes = words.slice(0, shown).map((w, i) => {
    const m = w.match(/^\*([^*]+)\*(.*)$/);
    if (m) {
      return (
        <span key={i}>
          <mark className="animate-mark rounded-[3px] bg-transparent bg-gradient-to-r from-citron to-citron bg-no-repeat px-0.5 font-semibold text-ink">
            {m[1]}
          </mark>
          {m[2]}
        </span>
      );
    }
    return <span key={i}>{w.replace(/\*/g, '')}</span>;
  });

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(closest-side,rgba(217,242,107,0.55),transparent)] blur-2xl" />
      <div className="overflow-hidden rounded-[22px] border border-ink/10 bg-paper-50 shadow-[0_40px_80px_-40px_rgba(17,20,18,0.45),0_2px_0_rgba(255,255,255,0.8)_inset]">
        <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
          <div className="flex gap-1" role="tablist" aria-label="Moteur d’IA simulé">
            {ENGINES.map((name, i) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={i === engine}
                onClick={() => select(i)}
                className={`rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors ${
                  i === engine ? 'bg-ink text-paper' : 'text-ink-500 hover:bg-ink/5'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink-400 sm:block">Simulation</span>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-ink px-4 py-3 text-[15px] leading-relaxed text-paper">
            {prompt.slice(0, chars)}
            {phase === 'typing' && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-citron" />}
          </div>

          <div className="flex gap-3">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-citron text-ink">
              <Spark className="h-3.5 w-3.5" />
            </span>
            <div className="min-h-[168px] flex-1 text-[15px] leading-relaxed text-ink-700">
              {phase === 'thinking' && (
                <span className="inline-flex gap-1 pt-2" aria-label="Réflexion en cours">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-400"
                      style={{ animationDelay: `${d * 160}ms` }}
                    />
                  ))}
                </span>
              )}
              {(phase === 'answering' || phase === 'done') && <p>{answerNodes}</p>}
              {phase === 'done' && (
                <div className="mt-4 flex flex-wrap gap-2 animate-rise">
                  {SOURCES.map((s, i) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-paper px-2.5 py-1 font-mono text-[11px] text-ink-500"
                    >
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-ink/10 text-[9px] text-ink">{i + 1}</span>
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
