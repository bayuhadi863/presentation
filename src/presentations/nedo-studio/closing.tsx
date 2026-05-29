import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const closingId = "closing";
export const closingLabel = "Closing";

const TOTAL = 10;
const PAGE = 10;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const achievements = [
  {
    layer: "Backend API",
    project: "nedo-studio-backend",
    color: "emerald",
    items: [
      "Entitas CodegenJobStep + CodegenJobLog",
      "CodegenJobDTO + Steps & Logs",
      "EntityService.GenerateCodeAsync → RabbitMQ",
      "CodegenJobService.GetAsync dengan steps & logs"
    ]
  },
  {
    layer: "Worker",
    project: "nedo-studio-worker",
    color: "violet",
    items: [
      "EntityCodeGenJobHandler 5-step pipeline",
      "Dual monitor: 1s realtime + 5s DB persist",
      "CodeGenerationStrategy multi-framework",
      "Graceful error propagation end-to-end"
    ]
  },
  {
    layer: "Frontend",
    project: "nedo-studio-frontend",
    color: "sky",
    items: [
      "GenerationJobPage realtime data binding",
      "3 event handler: Progress · Step · Log",
      "Placeholder step → UUID upgrade pattern",
      "Terminal state DB refetch consistency"
    ]
  }
];

const colorMap: Record<string, { border: string; bg: string; label: string; sub: string; dot: string }> = {
  emerald: { border: "border-emerald-500/25", bg: "bg-emerald-500/8",  label: "text-emerald-300/80", sub: "text-emerald-200/35", dot: "bg-emerald-400" },
  violet:  { border: "border-violet-400/25",  bg: "bg-violet-500/8",   label: "text-violet-300/80",  sub: "text-violet-200/35",  dot: "bg-violet-400"  },
  sky:     { border: "border-sky-400/25",      bg: "bg-sky-500/8",      label: "text-sky-300/80",     sub: "text-sky-200/35",     dot: "bg-sky-400"     }
};

function AchievementCards({ compact }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-3 ${compact ? "gap-2.5" : "gap-3"}`}>
      {achievements.map((a) => {
        const c = colorMap[a.color];
        return (
          <div key={a.layer} className={`rounded-xl border ${c.border} ${c.bg} px-4 ${compact ? "py-3" : "py-3.5"}`}>
            <p className={`m-0 text-[0.68rem] font-bold uppercase tracking-[0.15em] ${c.label}`}>
              {a.layer}
            </p>
            <p className={`m-0 mb-2.5 font-mono text-[0.58rem] ${c.sub}`}>{a.project}</p>
            <ul className="m-0 flex flex-col gap-1.5 pl-0" style={{ listStyle: "none" }}>
              {a.items.map((item) => (
                <li key={item} className={`flex items-start gap-2 text-white/55 ${compact ? "text-[0.64rem]" : "text-[0.68rem]"}`}>
                  <span className={`mt-1.25 h-1 w-1 shrink-0 rounded-full ${c.dot} opacity-65`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default function ClosingSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Closing">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-7 text-center">
          <div>
            <p className="m-0 mb-3 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Lab Meeting · 29 Mei 2026
            </p>
            <h2 className="m-0 text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight tracking-tight text-white">
              Terima Kasih
            </h2>
            <p className="m-0 mt-3 text-[clamp(0.82rem,1.5vw,1rem)] text-emerald-200/50">
              Code generation end-to-end: Backend API · Worker · Frontend — realtime di setiap langkah.
            </p>
          </div>

          <div className="w-full">
            <AchievementCards compact />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15 text-lg font-bold text-emerald-300">
              B
            </div>
            <div className="text-left">
              <p className="m-0 font-semibold text-white">Bayu Hadi Leksana</p>
              <p className="m-0 font-mono text-xs text-emerald-300/60">NRP. 3125640011 · AI Developer</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={closingId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-72 w-72 rounded-full bg-emerald-400/12 blur-[100px]" />
      <div className="pointer-events-none absolute -left-10 -top-14 h-60 w-60 rounded-full bg-violet-500/10 blur-[90px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Closing
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-8 max-w-5xl">
        <p className="m-0 mb-2 text-[0.8rem] uppercase tracking-[0.2em] text-emerald-400/60">
          Lab Meeting · 29 Mei 2026
        </p>
        <h2 className="m-0 mb-2 text-[clamp(1.8rem,4vw,3.2rem)] font-bold leading-tight tracking-tight text-white">
          Terima Kasih
        </h2>
        <p className="m-0 mb-7 text-[clamp(0.85rem,1.4vw,1.05rem)] leading-relaxed text-emerald-200/55">
          Implementasi code generation end-to-end: Backend API · Worker · Frontend —
          realtime di setiap langkah pipeline, dari trigger hingga pull request.
        </p>

        <AchievementCards />

        <div className="mt-7 border-t border-white/[0.07] pt-7">
          <span className="mb-4 block text-[0.7rem] font-medium uppercase tracking-[0.2em] text-emerald-200/40">
            Dipresentasikan oleh
          </span>
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15 text-xl font-bold text-emerald-300">
              B
            </div>
            <div>
              <h3 className="m-0 text-2xl font-semibold tracking-tight text-white">
                Bayu Hadi Leksana
              </h3>
              <p className="m-0 mt-1 font-mono text-base text-emerald-300/60">
                NRP. 3125640011 · AI Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
