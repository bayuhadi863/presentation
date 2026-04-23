import Mermaid from "../components/Mermaid";
import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const aiWorkflowId = "ai-flow";
export const aiWorkflowLabel = "AI Assistant Workflow";
export const aiWorkflowPageNumber = 4;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(34,211,238,0.07),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(34,211,238,0.07),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const chart = `
sequenceDiagram
    autonumber
    actor User
    participant Frontend as Frontend Web
    participant Backend as Backend Service
    participant LLM as LLM API

    User->>Frontend: Enter prompt
    Frontend->>Backend: Send prompt request
    Backend->>LLM: Classify AI intent
    LLM-->>Backend: Intent classification result (JSON)
    Backend->>Backend: Resolve intent and build request payload
    Backend->>LLM: Execute intent action
    LLM-->>Backend: AI generation result (JSON)
    Backend->>Backend: Build frontend response payload
    Backend-->>Frontend: AI assistant response
    Frontend-->>User: Render interactive chat output
`;

export default function AIWorkflowSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="AI Workflow slide">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[0.7fr_1.3fr] max-w-8xl mx-auto w-full items-center">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-sky-200/80">
              System Design Update
            </p>
            <h2 className="m-0 mb-6 text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-[-0.04em] font-bold text-white">
              AI Assistant Workflow (Direct Integration)
            </h2>
            <div className="p-6 rounded-2xl bg-sky-500/10 border border-sky-500/20">
              <p className="text-sky-100/70 leading-relaxed italic text-sm">
                "The Backend Service now communicates directly with the LLM API,
                facilitating faster intent resolution and response generation."
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
    <section className={`${sectionClass} border border-white/10`} id={aiWorkflowId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-cyan-300/10 blur-[80px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-sky-200/80 font-medium">
          System Design
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(aiWorkflowPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none tracking-[-0.04em] font-bold text-white">
        AI Assistant Workflow Update
      </h2>
      <div className="mt-10 overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5">
        <Mermaid chart={chart} />
      </div>
    </section>
  );
}
