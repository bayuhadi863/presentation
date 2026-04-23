import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import Mermaid from "../components/Mermaid";
import type { SlideProps } from "./types";

export const codegenMainId = "codegen-main";
export const codegenMainLabel = "Codegen Workflow";
export const codegenMainPageNumber = 5;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const chart = `
sequenceDiagram
    autonumber
    actor User
    participant Frontend as Frontend Web
    participant Backend as Backend Service
    participant Broker as Message Broker
    participant Worker as Worker Service
    participant Git as Git Provider

    User->>Frontend: Trigger generate code
    Frontend->>Backend: Generate code request
    Backend->>Broker: Publish code generation job
    Broker-->>Worker: Deliver job
    Worker->>Git: Sync repository changes
    Git-->>Worker: Return sync result
    Worker-->>Backend: Job completed
    Backend-->>Frontend: Update job status
    Frontend-->>User: Show progress/result
`;

export default function CodegenMainSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Codegen Main slide">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[0.7fr_1.3fr] max-w-8xl mx-auto w-full items-center">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-emerald-300/80 font-bold">
              Multi-Platform Code Generation
            </p>
            <h2 className="m-0 mb-6 text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-[-0.04em] font-bold text-white">
              Primary System Workflow
            </h2>
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-100/70 leading-relaxed text-sm">
                A high-level view of how the generation request is orchestrated across services using an asynchronous message-driven architecture.
              </p>
            </div>
          </div>
          <div className="w-full bg-white/[0.03] rounded-3xl border border-white/5 p-6 backdrop-blur-sm overflow-auto max-h-[85vh]">
            <Mermaid chart={chart} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={codegenMainId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-emerald-300/10 blur-[80px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
          System Design
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(codegenMainPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none tracking-[-0.04em] font-bold text-white">
        Multi-Platform Codegen: Main Flow
      </h2>
      <div className="mt-10 overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5">
        <Mermaid chart={chart} />
      </div>
    </section>
  );
}
