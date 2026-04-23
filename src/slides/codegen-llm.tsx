import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import Mermaid from "../components/Mermaid";
import type { SlideProps } from "./types";

export const codegenLLMId = "codegen-llm";
export const codegenLLMLabel = "LLM Integration";
export const codegenLLMPageNumber = 6;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const chart = `
sequenceDiagram
    autonumber
    participant Worker as Worker Service
    participant DB as Database
    participant Repo as Git Repository
    participant BackendAgent as Backend AI Agent
    participant FrontendAgent as Frontend AI Agent
    participant LLM as LLM API

    Worker->>DB: Fetch application metadata
    DB-->>Worker: Metadata records
    Worker->>Worker: Build context from metadata

    Worker->>Repo: Fetch related existing source files
    Repo-->>Worker: File contents and references
    Worker->>Worker: Build context from repository files

    alt Backend code generation
        note over Worker,BackendAgent: Backend generation uses looping batches of 5 files to avoid large token responses.

        loop Per 5 files
            Worker->>BackendAgent: Send prompt + context bundle
            BackendAgent->>LLM: Call LLM API
            LLM-->>BackendAgent: JSON response
            BackendAgent-->>Worker: JSON response
        end
    else Frontend code generation
        Worker->>FrontendAgent: Send prompt + context bundle
        FrontendAgent->>LLM: Call LLM API
        LLM-->>FrontendAgent: JSON response
        FrontendAgent-->>Worker: JSON response
    end

    Worker->>Worker: Parse JSON response
    Worker-->>Worker: Prepare generated files
`;

export default function CodegenLLMSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Codegen LLM slide">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[0.7fr_1.3fr] max-w-8xl mx-auto w-full items-center">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-emerald-300/80 font-bold">
              Multi-Platform Code Generation
            </p>
            <h2 className="m-0 mb-6 text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-[-0.04em] font-bold text-white">
              LLM API Call Mechanism
            </h2>
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-100/70 leading-relaxed text-sm">
                Detailing the batched prompting strategy and context assembly to ensure scalability and high-quality code responses.
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
    <section className={`${sectionClass} border border-white/10`} id={codegenLLMId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-emerald-300/10 blur-[80px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
          System Design
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(codegenLLMPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none tracking-[-0.04em] font-bold text-white">
        LLM Execution & Batching Flow
      </h2>
      <div className="mt-10 overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5">
        <Mermaid chart={chart} />
      </div>
    </section>
  );
}
