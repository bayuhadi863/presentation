import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const progressId = "progress";
export const progressLabel = "Progres";

const TOTAL = 10;
const PAGE = 2;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const deliverables = [
  {
    num: "01",
    title: "Update Backend API",
    color: "emerald",
    scope: "nedo-studio-backend",
    items: [
      "Entitas baru: CodegenJobStep (status, order, startedAt, completedAt)",
      "Entitas baru: CodegenJobLog (message, level, createdDate)",
      "CodegenJobDTO diperbarui: + Steps, Logs, Branch, CommitId, PullRequestId, FilesGeneratedCount",
      "CodegenJobService.GetAsync: return steps (ordered by order) + logs (ordered by createdDate)",
      "EntityService.GenerateCodeAsync: buat CodegenJob + publish RabbitMQ ke worker",
      "EntityController: POST /api/v1/entity/generate-code · CodegenJobController: GET /api/v1/codegen-job/get/:id"
    ]
  },
  {
    num: "02",
    title: "Implementasi Code Generation Frontend",
    color: "sky",
    scope: "nedo-studio-frontend",
    items: [
      "GenerationJobPage — halaman full-featured monitoring job",
      "Integrasi REST API via useOne() hook untuk initial data load",
      "Layout 3-kolom: main content (progress, steps, logs) + sidebar (details, actions)",
      "Status badge 6 variant: pending · queued · processing · completed · failed · cancelled",
      "Quick Actions: View Repository · View Commit · View Pull Request",
      "Cancel button saat aktif · Retry navigation saat failed"
    ]
  },
  {
    num: "03",
    title: "Implementasi Realtime di Code Generation",
    color: "violet",
    scope: "nedo-studio-worker + frontend",
    items: [
      "Status — live update saat job berpindah phase (queued → processing → completed)",
      "Duration — counter detik via Realtime Monitor (1s PeriodicTimer)",
      "Progress — persentase 0–100% realtime di progress bar",
      "Steps — 5 step: active/completed/failed + timestamp per step via WebSocket",
      "Logs — stream log realtime: level info/success/warn/error",
      "Terminal state sync: refetch DB otomatis saat completed/failed untuk data final"
    ]
  }
];

const colorMap: Record<string, {
  border: string; bg: string; label: string; num: string;
  dot: string; tagBorder: string; tagText: string; tagBg: string;
}> = {
  emerald: {
    border: "border-emerald-500/30", bg: "bg-emerald-500/8",
    label: "text-emerald-300", num: "text-emerald-400/50", dot: "bg-emerald-400",
    tagBorder: "border-emerald-400/25", tagText: "text-emerald-300/70", tagBg: "bg-emerald-500/10"
  },
  sky: {
    border: "border-sky-400/30", bg: "bg-sky-500/8",
    label: "text-sky-300", num: "text-sky-400/50", dot: "bg-sky-400",
    tagBorder: "border-sky-400/25", tagText: "text-sky-300/70", tagBg: "bg-sky-500/10"
  },
  violet: {
    border: "border-violet-400/30", bg: "bg-violet-500/8",
    label: "text-violet-300", num: "text-violet-400/50", dot: "bg-violet-400",
    tagBorder: "border-violet-400/25", tagText: "text-violet-300/70", tagBg: "bg-violet-500/10"
  }
};

function DeliverableCard({ d, compact }: { d: typeof deliverables[0]; compact?: boolean }) {
  const c = colorMap[d.color];
  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} ${compact ? "px-4 py-3" : "px-5 py-4"} flex flex-col gap-2`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className={`shrink-0 font-mono text-[0.65rem] font-bold tracking-[0.2em] ${c.num}`}>{d.num}</span>
          <h3 className={`m-0 font-bold text-white leading-snug ${compact ? "text-[0.85rem]" : "text-[0.95rem]"}`}>
            {d.title}
          </h3>
        </div>
        <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wider whitespace-nowrap ${c.tagBorder} ${c.tagText} ${c.tagBg}`}>
          {d.scope}
        </span>
      </div>
      <ul className="m-0 grid grid-cols-2 gap-x-4 gap-y-1 pl-0" style={{ listStyle: "none" }}>
        {d.items.map((item) => (
          <li key={item} className={`flex items-start gap-2 text-white/55 ${compact ? "text-[0.63rem]" : "text-[0.68rem]"}`}>
            <span className={`mt-1.25 h-1 w-1 shrink-0 rounded-full ${c.dot} opacity-60`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProgressSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Progres">
        <div className="flex flex-col gap-5">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Lab Meeting · 29 Mei 2026
            </p>
            <h2 className="m-0 text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold leading-tight tracking-tight text-white">
              Yang Saya <span className="text-emerald-300">Kerjakan</span>
            </h2>
            <p className="m-0 mt-1.5 text-[0.75rem] text-emerald-200/50">
              3 deliverable: Backend API · Frontend · Realtime end-to-end
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            {deliverables.map((d) => (
              <DeliverableCard key={d.num} d={d} compact />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={progressId}>
      <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-emerald-400/12 blur-[90px]" />
      <div className="pointer-events-none absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-violet-500/10 blur-[80px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Progres Saya
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-7 max-w-5xl">
        <h2 className="m-0 mb-1 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          Yang Saya <span className="text-emerald-400">Kerjakan</span>
        </h2>
        <p className="m-0 mb-5 text-[0.82rem] text-emerald-200/50">
          3 deliverable sprint ini — Backend API (nedo-studio-backend) · Frontend · Realtime end-to-end
        </p>

        <div className="flex flex-col gap-3">
          {deliverables.map((d) => (
            <DeliverableCard key={d.num} d={d} />
          ))}
        </div>
      </div>
    </section>
  );
}
