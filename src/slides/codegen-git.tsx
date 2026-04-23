import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import Mermaid from "../components/Mermaid";
import type { SlideProps } from "./types";

export const codegenGitId = "codegen-git";
export const codegenGitLabel = "Git Provider Operations";
export const codegenGitPageNumber = 7;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const chart = `
sequenceDiagram
    autonumber
    participant Worker as Worker Service
    participant Repo as Git Provider / Repository

    Worker->>Worker: Parse JSON response from LLM API
    Worker->>Repo: Create new branch from default branch
    Repo-->>Worker: Branch ready

    loop For each generated file
        Worker->>Worker: Resolve file action as create or update
        Worker->>Worker: Build file action list
    end

    Worker->>Repo: Create commit request with file actions
    Repo-->>Worker: Commit recorded and pushed

    Worker->>Repo: Create pull request to default branch
    Repo-->>Worker: Pull request created
`;

export default function CodegenGitSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Codegen Git slide">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[0.7fr_1.3fr] max-w-8xl mx-auto w-full items-center">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-emerald-300/80 font-bold">
              Multi-Platform Code Generation
            </p>
            <h2 className="m-0 mb-6 text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-[-0.04em] font-bold text-white">
              Git Provider Operations
            </h2>
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-emerald-100/70 leading-relaxed text-sm">
                Automating the version control workflow through branch creation, multi-file atomic commits, and pull request orchestration.
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
    <section className={`${sectionClass} border border-white/10`} id={codegenGitId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-emerald-300/10 blur-[80px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
          System Design
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(codegenGitPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none tracking-[-0.04em] font-bold text-white">
        Automated Git Interaction Flow
      </h2>
      <div className="mt-10 overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-5">
        <Mermaid chart={chart} />
      </div>
    </section>
  );
}
