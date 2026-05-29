import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const realtimeMonitoringId = "realtime-monitoring";
export const realtimeMonitoringLabel = "Realtime Monitoring";

const TOTAL = 10;
const PAGE = 6;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

function FlowDiagram({ compact }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-2 ${compact ? "gap-3" : "gap-4"}`}>
      {/* Left: Backend */}
      <div className="flex flex-col gap-2">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] px-4 py-3">
          <p className="m-0 text-[0.65rem] font-bold uppercase tracking-widest text-emerald-400/60">
            Worker Service · .NET 8
          </p>
          <p className={`m-0 mt-1 font-semibold text-white ${compact ? "text-[0.82rem]" : "text-[0.9rem]"}`}>
            EntityCodeGenJobHandler
          </p>
        </div>

        {/* Two loops */}
        <div className="flex flex-col gap-2 pl-2">
          {/* Realtime loop */}
          <div className="rounded-lg border border-violet-400/30 bg-violet-500/[0.07] px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="m-0 text-[0.7rem] font-semibold text-violet-200">Realtime Monitor</p>
              <span className="rounded border border-violet-400/30 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold text-violet-300">
                1s
              </span>
            </div>
            <p className="m-0 mt-1 font-mono text-[0.62rem] text-violet-200/50">
              RunRealtimeMonitorAsync()
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-violet-400/60" />
              <p className="m-0 text-[0.62rem] text-violet-200/40">
                OnRealtimeTickAsync() → broadcast WS
              </p>
            </div>
          </div>

          {/* DB loop */}
          <div className="rounded-lg border border-amber-400/30 bg-amber-500/[0.07] px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <p className="m-0 text-[0.7rem] font-semibold text-amber-200">DB Persistence Monitor</p>
              <span className="rounded border border-amber-400/30 px-1.5 py-0.5 font-mono text-[0.6rem] font-bold text-amber-300">
                5s
              </span>
            </div>
            <p className="m-0 mt-1 font-mono text-[0.62rem] text-amber-200/50">
              RunDbMonitorAsync()
            </p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-amber-400/60" />
              <p className="m-0 text-[0.62rem] text-amber-200/40">
                OnDbTickAsync() → UpdateAsync() PostgreSQL
              </p>
            </div>
          </div>

          {/* Cancel on terminal */}
          <div className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2">
            <p className="m-0 text-[0.62rem] text-white/35">
              Pada terminal state (completed / failed): kedua CancellationTokenSource di-cancel,{" "}
              <span className="font-mono">Task.WhenAll()</span> di-await sebelum finalize.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Events */}
      <div className="flex flex-col gap-2">
        <div className="rounded-xl border border-teal-500/30 bg-teal-500/[0.07] px-4 py-3">
          <p className="m-0 text-[0.65rem] font-bold uppercase tracking-widest text-teal-400/60">
            HocusPocus WebSocket
          </p>
          <p className={`m-0 mt-1 font-semibold text-white ${compact ? "text-[0.82rem]" : "text-[0.9rem]"}`}>
            3 Tipe Broadcast Event
          </p>
        </div>

        <div className="flex flex-col gap-2 pl-2">
          {[
            {
              event: "CODEGEN_JOB_PROGRESS",
              color: "emerald",
              fields: ["jobId", "duration (s)", "progressPercentage", "phase"],
              trigger: "Setiap Realtime tick (1s)"
            },
            {
              event: "CODEGEN_JOB_STEP_UPDATED",
              color: "sky",
              fields: ["id", "jobId", "label", "status", "order", "startedAt", "completedAt"],
              trigger: "Saat step activate / complete"
            },
            {
              event: "CODEGEN_JOB_LOG_ADDED",
              color: "violet",
              fields: ["id", "jobId", "message", "level", "timestamp"],
              trigger: "Setiap AddLogAsync() dipanggil"
            }
          ].map(({ event, color, fields, trigger }) => (
            <div
              key={event}
              className={`rounded-lg border border-${color}-400/25 bg-${color}-500/[0.07] px-3 py-2.5`}
            >
              <p className={`m-0 font-mono text-[0.62rem] font-semibold text-${color}-300/80`}>
                {event}
              </p>
              <p className={`m-0 mt-0.5 text-[0.6rem] text-${color}-200/40`}>{trigger}</p>
              {!compact && (
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {fields.map((f) => (
                    <span
                      key={f}
                      className={`rounded border border-${color}-400/20 bg-${color}-500/10 px-1 py-0.5 font-mono text-[0.55rem] text-${color}-300/60`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RealtimeMonitoringSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Realtime Monitoring">
        <div className="flex flex-col gap-5">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Backend · Realtime Infrastructure
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              Dual-Loop{" "}
              <span className="text-emerald-300">Monitoring</span>
            </h2>
          </div>
          <FlowDiagram compact />
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={realtimeMonitoringId}>
      <div className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 rounded-full bg-violet-500/15 blur-[90px]" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-teal-500/12 blur-[80px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Worker · Realtime Monitoring
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-7 max-w-5xl">
        <h2 className="m-0 mb-1 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          Dual-Loop <span className="text-emerald-400">Broadcasting</span> Architecture
        </h2>
        <p className="m-0 mb-6 text-[0.8rem] text-emerald-200/50">
          Dua background timer berjalan paralel dengan concern berbeda — realtime UX vs. DB durability
        </p>
        <FlowDiagram />
      </div>
    </section>
  );
}
