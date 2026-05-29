import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const frontendRealtimeId = "frontend-realtime";
export const frontendRealtimeLabel = "Frontend Realtime";

const TOTAL = 10;
const PAGE = 8;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const codeSnippets = [
  {
    label: "CODEGEN_JOB_PROGRESS",
    color: "emerald",
    lines: [
      { text: "setJob(prev => ({", dim: false },
      { text: "  ...prev,", dim: true },
      { text: "  progress: p.progressPercentage,", dim: false },
      { text: "  duration: `${p.duration}s`,", dim: false },
      { text: "  status: isCompleted ? 'completed'", dim: false },
      { text: "       : isFailed    ? 'failed'", dim: false },
      { text: "       : 'processing'", dim: false },
      { text: "}))", dim: false }
    ],
    note: "Auto-refetch ke DB saat status terminal"
  },
  {
    label: "CODEGEN_JOB_STEP_UPDATED",
    color: "sky",
    lines: [
      { text: "steps: prev.steps.map(step =>", dim: false },
      { text: "  step.id === s.id ||", dim: false },
      { text: "  step.id === String(s.order)", dim: false },
      { text: "  ? {", dim: true },
      { text: "      id: s.id, // upgrade UUID", dim: false },
      { text: "      status: s.status,", dim: false },
      { text: "      timestamp: ...", dim: false },
      { text: "    } : step", dim: true }
    ],
    note: "Match by real ID atau placeholder order index"
  },
  {
    label: "CODEGEN_JOB_LOG_ADDED",
    color: "violet",
    lines: [
      { text: "logs: [", dim: false },
      { text: "  ...prev.logs,", dim: true },
      { text: "  {", dim: true },
      { text: "    timestamp: l.timestamp,", dim: false },
      { text: "    message: l.message,", dim: false },
      { text: "    level: l.level", dim: false },
      { text: "  }", dim: true },
      { text: "]", dim: false }
    ],
    note: "Append ke array — scroll auto ke bottom"
  }
];

const colorMap: Record<string, { border: string; bg: string; text: string; label: string }> = {
  emerald: { border: "border-emerald-400/25", bg: "bg-emerald-500/[0.07]", text: "text-emerald-300",  label: "text-emerald-300/80" },
  sky:     { border: "border-sky-400/25",     bg: "bg-sky-500/[0.07]",     text: "text-sky-300",     label: "text-sky-300/80"     },
  violet:  { border: "border-violet-400/25",  bg: "bg-violet-500/[0.07]",  text: "text-violet-300",  label: "text-violet-300/80"  }
};

function EventDiagram({ compact }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Top: hook */}
      <div className="rounded-xl border border-teal-400/25 bg-teal-500/[0.07] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <span className="rounded border border-teal-400/25 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-teal-300/80">
            hook
          </span>
          <p className="m-0 font-mono text-[0.75rem] font-semibold text-teal-200">
            useHocuspocusProvider&lt;BroadcastPayload&gt;
          </p>
          <p className="m-0 ml-auto text-[0.65rem] text-teal-200/40">
            name: <span className="font-mono">{"`codegen-job:${jobId}`"}</span>
          </p>
        </div>
        {!compact && (
          <p className="m-0 mt-1 text-[0.65rem] text-teal-200/40">
            onStateless(payload) → switch(payload.event) dispatches ke 3 handler
          </p>
        )}
      </div>

      {/* Three handlers */}
      <div className={`grid grid-cols-3 ${compact ? "gap-2" : "gap-3"}`}>
        {codeSnippets.map(({ label, color, lines, note }) => {
          const c = colorMap[color];
          return (
            <div key={label} className={`flex flex-col gap-2 rounded-xl border ${c.border} ${c.bg} px-3 py-3`}>
              <p className={`m-0 font-mono text-[0.62rem] font-bold ${c.label}`}>{label}</p>
              <div className={`rounded-lg bg-[rgba(0,0,0,0.25)] p-2 font-mono ${compact ? "text-[0.58rem]" : "text-[0.62rem]"} leading-[1.6]`}>
                {lines.map((line, i) => (
                  <div key={i} className={line.dim ? "text-white/30" : "text-white/70"}>
                    {line.text}
                  </div>
                ))}
              </div>
              {!compact && (
                <p className={`m-0 text-[0.63rem] leading-relaxed ${c.label} opacity-70`}>{note}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom: state flow note */}
      {!compact && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
              Initial Load
            </p>
            <p className="m-0 mt-1 text-[0.68rem] leading-relaxed text-white/35">
              <span className="font-mono">useOne()</span> fetches dari REST API saat mount.
              Data DB di-map ke <span className="font-mono">GenerationJob</span> state.
              Jika steps kosong, tampilkan{" "}
              <span className="font-mono">DEFAULT_STEPS</span> (5 placeholder pending).
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
            <p className="m-0 text-[0.65rem] font-semibold uppercase tracking-wider text-white/40">
              Terminal State Strategy
            </p>
            <p className="m-0 mt-1 text-[0.68rem] leading-relaxed text-white/35">
              Saat PROGRESS event membawa <span className="font-mono">phase === "completed" | "failed"</span>,
              frontend langsung <span className="font-mono">detailQuery.refetch()</span> untuk
              mendapat data final dari DB (branch, commitSha, PR ID, filesCount).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FrontendRealtimeSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Frontend Realtime">
        <div className="flex flex-col gap-5">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Frontend · State Management
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              Realtime{" "}
              <span className="text-sky-300">Event Handling</span>
            </h2>
          </div>
          <EventDiagram compact />
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={frontendRealtimeId}>
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-52 w-52 rounded-full bg-sky-500/12 blur-[80px]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-500/10 blur-[80px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Frontend · Realtime State Management
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-7 max-w-5xl">
        <h2 className="m-0 mb-1 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          Realtime <span className="text-sky-400">Event Handling</span>
        </h2>
        <p className="m-0 mb-6 text-[0.8rem] text-emerald-200/50">
          useHocuspocusProvider dispatches 3 jenis event ke functional setState updaters
        </p>
        <EventDiagram />
      </div>
    </section>
  );
}
