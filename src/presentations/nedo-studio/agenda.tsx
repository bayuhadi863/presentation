import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const agendaId = "agenda";
export const agendaLabel = "Agenda";

const TOTAL = 10;
const PAGE = 3;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const topics = [
  {
    num: "01",
    title: "Overview Sistem",
    desc: "Arsitektur keseluruhan Nedo Studio — frontend, realtime layer, dan worker service",
    tag: "Architecture"
  },
  {
    num: "02",
    title: "Code Generation Pipeline",
    desc: "Implementasi 5-step job handler di backend (.NET 8) dengan strategy pattern",
    tag: "Backend"
  },
  {
    num: "03",
    title: "Realtime Monitoring",
    desc: "Dual-loop broadcasting via HocusPocus WebSocket — realtime (1s) & DB persistence (5s)",
    tag: "Backend"
  },
  {
    num: "04",
    title: "Frontend Implementation",
    desc: "GenerationJobPage — live progress, step indicators, log viewer & state management",
    tag: "Frontend"
  },
  {
    num: "05",
    title: "Technical Highlights",
    desc: "Keputusan teknis non-trivial dan kompleksitas implementasi end-to-end",
    tag: "Deep Dive"
  }
];

const tagColors: Record<string, string> = {
  Architecture: "text-violet-300/70 border-violet-400/25 bg-violet-500/8",
  Backend:      "text-emerald-300/70 border-emerald-400/25 bg-emerald-500/8",
  Frontend:     "text-sky-300/70 border-sky-400/25 bg-sky-500/8",
  "Deep Dive":  "text-amber-300/70 border-amber-400/25 bg-amber-500/8"
};

function TopicList({ compact }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-2.5">
      {topics.map((t) => (
        <div
          key={t.num}
          className={`flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 ${compact ? "py-2.5" : "py-3.5"}`}
        >
          <span className="mt-0.5 shrink-0 font-mono text-[0.7rem] font-semibold tracking-widest text-emerald-400/50">
            {t.num}
          </span>
          <div className="flex flex-1 items-start justify-between gap-4">
            <div>
              <p className={`m-0 font-semibold text-white ${compact ? "text-[0.88rem]" : "text-[clamp(0.88rem,1.3vw,1rem)]"}`}>
                {t.title}
              </p>
              {!compact && (
                <p className="m-0 mt-1 text-[0.75rem] leading-relaxed text-emerald-200/45">
                  {t.desc}
                </p>
              )}
            </div>
            <span
              className={`shrink-0 rounded-md border px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider ${tagColors[t.tag]}`}
            >
              {t.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AgendaSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Agenda">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-7">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Lab Meeting · 29 Mei 2026
            </p>
            <h2 className="m-0 text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-tight tracking-tight text-white">
              Agenda
            </h2>
          </div>
          <TopicList compact />
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={agendaId}>
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-400/15 blur-[90px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Agenda
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-8 max-w-3xl">
        <h2 className="m-0 mb-2 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          Apa yang akan dibahas
        </h2>
        <p className="m-0 mb-7 text-[0.85rem] text-emerald-200/50">
          5 topik utama · Lab Meeting 29 Mei 2026
        </p>
        <TopicList />
      </div>
    </section>
  );
}
