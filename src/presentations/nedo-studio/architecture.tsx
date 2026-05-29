import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const architectureId = "architecture";
export const architectureLabel = "Architecture Overview";

const TOTAL = 10;
const PAGE = 4;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

function Diagram({ compact }: { compact?: boolean }) {
  const tag = "inline-block rounded border px-1.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-widest";
  const subBox = `rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-1.5 ${compact ? "text-[0.62rem]" : "text-[0.65rem]"}`;
  const flowRow = "flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5";
  const arrowText = "text-white/25 font-mono text-sm";

  return (
    <div className="flex flex-col gap-4">
      {/* Component boxes */}
      <div className="grid grid-cols-4 items-start gap-2">
        {/* Frontend */}
        <div className="flex flex-col gap-1.5">
          <div className="rounded-xl border border-sky-400/30 bg-sky-500/8 px-3.5 py-3">
            <span className={`${tag} border-sky-400/30 text-sky-300/80`}>Frontend</span>
            <p className="m-0 mt-2 text-[0.82rem] font-semibold text-white">React App</p>
            <p className="m-0 mt-0.5 font-mono text-[0.62rem] text-sky-200/50">nedo-studio-frontend</p>
          </div>
          <div className="flex flex-col gap-1 pl-1">
            {["GenerationJobPage", "useHocuspocusProvider", "JobStepIndicator", "JobLogViewer"].map((c) => (
              <div key={c} className={subBox}>
                <p className="m-0 font-mono text-sky-300/75 text-[0.62rem]">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Backend API */}
        <div className="flex flex-col gap-1.5">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/8 px-3.5 py-3">
            <span className={`${tag} border-emerald-500/30 text-emerald-300/80`}>Backend API</span>
            <p className="m-0 mt-2 text-[0.82rem] font-semibold text-white">REST API (.NET 8)</p>
            <p className="m-0 mt-0.5 font-mono text-[0.62rem] text-emerald-200/50">nedo-studio-backend</p>
          </div>
          <div className="flex flex-col gap-1 pl-1">
            {["EntityController", "CodegenJobController", "EntityService", "CodegenJobService"].map((c) => (
              <div key={c} className={subBox}>
                <p className="m-0 font-mono text-emerald-300/75 text-[0.62rem]">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Worker */}
        <div className="flex flex-col gap-1.5">
          <div className="rounded-xl border border-violet-400/30 bg-violet-500/8 px-3.5 py-3">
            <span className={`${tag} border-violet-400/30 text-violet-300/80`}>Worker</span>
            <p className="m-0 mt-2 text-[0.82rem] font-semibold text-white">Worker Service (.NET 8)</p>
            <p className="m-0 mt-0.5 font-mono text-[0.62rem] text-violet-200/50">nedo-studio-worker</p>
          </div>
          <div className="flex flex-col gap-1 pl-1">
            {["EntityCodeGenJobHandler", "CodeGenerationStrategy", "GitCodePublisher", "IScmProvider"].map((c) => (
              <div key={c} className={subBox}>
                <p className="m-0 font-mono text-violet-300/75 text-[0.6rem]">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Realtime */}
        <div className="flex flex-col gap-1.5">
          <div className="rounded-xl border border-teal-400/30 bg-teal-500/8 px-3.5 py-3">
            <span className={`${tag} border-teal-400/30 text-teal-300/80`}>Realtime</span>
            <p className="m-0 mt-2 text-[0.82rem] font-semibold text-white">HocusPocus Server</p>
            <p className="m-0 mt-0.5 font-mono text-[0.62rem] text-teal-200/50">WebSocket · Stateless</p>
          </div>
          <div className="flex flex-col gap-1 pl-1">
            {["CODEGEN_JOB_PROGRESS", "CODEGEN_JOB_STEP_UPDATED", "CODEGEN_JOB_LOG_ADDED"].map((e) => (
              <div key={e} className={subBox}>
                <p className="m-0 font-mono text-teal-300/70 text-[0.58rem]">{e}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data flow rows */}
      <div className="flex flex-col gap-1.5">
        <div className={flowRow}>
          <span className="shrink-0 rounded border border-emerald-400/25 bg-emerald-500/10 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-emerald-300/70">
            Job Trigger
          </span>
          <div className="flex flex-1 items-center gap-1.5 text-[0.67rem]">
            <span className="text-sky-300/70">Frontend</span>
            <span className={arrowText}>──POST generate-code──►</span>
            <span className="text-emerald-300/70">Backend API</span>
            <span className={arrowText}>──RabbitMQ publish──►</span>
            <span className="text-violet-300/70">Worker</span>
            <span className="ml-2 text-[0.6rem] text-white/30">
              EntityService.GenerateCodeAsync() → _rabbitmqService.PublishMessageAsync()
            </span>
          </div>
        </div>

        <div className={flowRow}>
          <span className="shrink-0 rounded border border-teal-400/25 bg-teal-500/10 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-teal-300/70">
            Realtime
          </span>
          <div className="flex flex-1 items-center gap-1.5 text-[0.67rem]">
            <span className="text-violet-300/70">Worker</span>
            <span className={arrowText}>──HTTP BroadcastAsync──►</span>
            <span className="text-teal-300/70">HocusPocus</span>
            <span className={arrowText}>──WebSocket stateless──►</span>
            <span className="text-sky-300/70">Frontend</span>
            <span className="ml-2 text-[0.6rem] text-white/30">
              onStateless(payload) → setJob(...)
            </span>
          </div>
        </div>

        <div className={flowRow}>
          <span className="shrink-0 rounded border border-sky-400/25 bg-sky-500/10 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-sky-300/70">
            Data Fetch
          </span>
          <div className="flex flex-1 items-center gap-1.5 text-[0.67rem]">
            <span className="text-sky-300/70">Frontend</span>
            <span className={arrowText}>──GET codegen-job/get/:id──►</span>
            <span className="text-emerald-300/70">Backend API</span>
            <span className={arrowText}>──DB query──►</span>
            <span className="text-white/45">PostgreSQL</span>
            <span className="ml-2 text-[0.6rem] text-white/30">
              Initial load + refetch on terminal state — returns steps {"&"} logs
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArchitectureSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Architecture Overview">
        <div className="flex flex-col gap-5">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Overview
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              Arsitektur Sistem{" "}
              <span className="text-emerald-300">Nedo Studio</span>
            </h2>
            <p className="m-0 mt-1 text-[0.72rem] text-emerald-200/50">
              4 layer: Frontend · Backend API · Worker · Realtime — 3 data flow terpisah
            </p>
          </div>
          <Diagram compact />
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={architectureId}>
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-52 w-52 rounded-full bg-teal-500/12 blur-[80px]" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-violet-500/10 blur-[90px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Overview Sistem
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-6 max-w-5xl">
        <h2 className="m-0 mb-1 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          Arsitektur <span className="text-emerald-400">Nedo Studio</span>
        </h2>
        <p className="m-0 mb-5 text-[0.8rem] text-emerald-200/50">
          4 layer: Frontend · Backend API · Worker · Realtime — 3 data flow terpisah
        </p>
        <Diagram />
      </div>
    </section>
  );
}
