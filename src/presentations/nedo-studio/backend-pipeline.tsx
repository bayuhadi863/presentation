import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const backendPipelineId = "backend-pipeline";
export const backendPipelineLabel = "Backend Pipeline";

const TOTAL = 10;
const PAGE = 5;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const steps = [
  {
    num: "01",
    title: "Initializing",
    details: ["Status → Processing", "Tracker init", "Monitors start"]
  },
  {
    num: "02",
    title: "Reading Metadata",
    details: ["Load AppGitRepository", "Load EntityMetadata", "Connect to SCM"]
  },
  {
    num: "03",
    title: "Loading Files",
    details: ["Resolve strategy", "Fetch existing files", "Match by entity names"]
  },
  {
    num: "04",
    title: "Generating Code",
    details: ["AI code generation", "Strategy.GenerateAsync()", "N files produced"]
  },
  {
    num: "05",
    title: "Publishing",
    details: ["Git push to branch", "Commit SHA recorded", "PR auto-created"]
  }
];

function PipelineSteps({ compact }: { compact?: boolean }) {
  return (
    <div className="flex items-start gap-0">
      {steps.map((step, idx) => (
        <div key={step.num} className="flex flex-1 items-start">
          <div className="flex flex-1 flex-col gap-2">
            <div
              className={`rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] ${compact ? "px-3 py-2.5" : "px-3.5 py-3"}`}
            >
              <span className="font-mono text-[0.6rem] font-bold tracking-[0.2em] text-emerald-400/60">
                STEP {step.num}
              </span>
              <p className={`m-0 mt-1 font-semibold text-white ${compact ? "text-[0.78rem]" : "text-[0.82rem]"}`}>
                {step.title}
              </p>
              {!compact && (
                <ul className="m-0 mt-2 flex flex-col gap-0.5 pl-0" style={{ listStyle: "none" }}>
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-1.5 text-[0.67rem] text-emerald-200/50">
                      <span className="shrink-0 text-emerald-400/40">·</span>
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {idx < steps.length - 1 && (
            <div className="flex shrink-0 items-center self-center px-1 pt-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-emerald-400/40">
                <path d="M4 8h8M9 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MonitoringLoops({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex gap-3 ${compact ? "mt-3" : "mt-4"}`}>
      <div className="flex-1 rounded-xl border border-violet-400/25 bg-violet-500/[0.07] px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="m-0 text-[0.7rem] font-bold uppercase tracking-widest text-violet-300/70">
              Realtime Monitor
            </p>
            <p className={`m-0 mt-1 font-semibold text-white ${compact ? "text-[0.8rem]" : "text-[0.88rem]"}`}>
              PeriodicTimer — 1 detik
            </p>
            {!compact && (
              <p className="m-0 mt-1 text-[0.7rem] text-violet-200/50">
                tracker.OnRealtimeTickAsync() → BroadcastAsync ke frontend via WebSocket
              </p>
            )}
          </div>
          <span className="shrink-0 rounded-lg border border-violet-400/25 bg-violet-500/10 px-2 py-1 font-mono text-[0.68rem] font-bold text-violet-300">
            1s
          </span>
        </div>
      </div>
      <div className="flex-1 rounded-xl border border-amber-400/25 bg-amber-500/[0.07] px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="m-0 text-[0.7rem] font-bold uppercase tracking-widest text-amber-300/70">
              DB Persistence Monitor
            </p>
            <p className={`m-0 mt-1 font-semibold text-white ${compact ? "text-[0.8rem]" : "text-[0.88rem]"}`}>
              PeriodicTimer — 5 detik
            </p>
            {!compact && (
              <p className="m-0 mt-1 text-[0.7rem] text-amber-200/50">
                tracker.OnDbTickAsync() → codegenJobRepo.UpdateAsync() ke PostgreSQL
              </p>
            )}
          </div>
          <span className="shrink-0 rounded-lg border border-amber-400/25 bg-amber-500/10 px-2 py-1 font-mono text-[0.68rem] font-bold text-amber-300">
            5s
          </span>
        </div>
      </div>
    </div>
  );
}

export default function BackendPipelineSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Backend Pipeline">
        <div className="flex flex-col gap-5">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Worker Service
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              Code Generation{" "}
              <span className="text-emerald-300">Pipeline</span>
            </h2>
            <p className="m-0 mt-1.5 text-[0.78rem] text-emerald-200/50">
              nedo-studio-worker · EntityCodeGenJobHandler · 5 tahap berurutan + 2 background monitor paralel
            </p>
          </div>
          <PipelineSteps compact />
          <MonitoringLoops compact />
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={backendPipelineId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-60 w-60 rounded-full bg-emerald-400/15 blur-[90px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Worker · Code Generation Pipeline
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-7 max-w-5xl">
        <h2 className="m-0 mb-1 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          <span className="text-emerald-400">5-Step</span> Job Handler Pipeline
        </h2>
        <p className="m-0 mb-6 text-[0.8rem] text-emerald-200/50">
          nedo-studio-worker · EntityCodeGenJobHandler.cs · Sequential execution + 2 parallel background monitors
        </p>

        <PipelineSteps />
        <MonitoringLoops />

        <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
          <p className="m-0 text-[0.7rem] leading-relaxed text-white/40">
            <span className="font-semibold text-emerald-300/60">Strategy Pattern:</span>{" "}
            <span className="font-mono">CodeGenerationStrategyFactory.Resolve(framework, language)</span> — memilih strategy yang tepat
            berdasarkan kombinasi framework (misal: ASP.NET Core) dan bahasa pemrograman (misal: C#).
            Setiap strategy mengimplementasikan <span className="font-mono">ICodeGenerationStrategy</span> dengan metode{" "}
            <span className="font-mono">GenerateAsync(context)</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
