import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const systemId = "objectives";
export const systemLabel = "Research Objectives";
export const systemPageNumber = 3;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(168,85,247,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(168,85,247,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function ObjectivesSlide({ mode }: SlideProps) {
  const goals = [
    {
      title: "SSoT-Based Low-Code Platform",
      desc: "Develop a platform using metadata-based DSL (JSON) as the Single Source of Truth for unified multi-platform configuration.",
      icon: "🎯",
    },
    {
      title: "LLM-Powered AI Assistant",
      desc: "Integrate Large Language Models to assist developers in rapid configuration and creative brainstorming.",
      icon: "🤖",
    },
    {
      title: "Multi-Platform Code Generation",
      desc: "Automate the translation of DSL into high-quality ASP.NET Core (Backend) and React TypeScript (Frontend) codebases.",
      icon: "⚡",
    },
  ];

  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Objectives slide">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-purple-300/80">
              Research Goals
            </p>
            <h2 className="m-0 text-[clamp(2.1rem,4vw,4rem)] leading-[1.1] tracking-[-0.04em] font-bold text-white">
              Pioneering an Adaptive Development Workflow
            </h2>
            <div className="mt-10 grid gap-6">
              {goals.map((g) => (
                <div
                  key={g.title}
                  className="group p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/[0.08] transition-all"
                >
                  <div className="flex gap-5">
                    <span className="text-3xl">{g.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {g.title}
                      </h3>
                      <p className="text-[1.05rem] leading-relaxed text-purple-100/60">
                        {g.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/5 rounded-[40px] border border-white/5 animate-pulse" />
            <div className="relative p-10 space-y-8 text-center">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/30 text-4xl mb-4">
                🚀
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-white">The Vision</h4>
                <p className="text-lg text-purple-100/70 leading-relaxed italic">
                  "To bridge the gap between high-level domain intent and
                  production-ready code across platforms."
                </p>
              </div>
              <div className="pt-6 flex justify-center gap-4">
                <div className="px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs text-purple-300 font-mono">
                  DSL
                </div>
                <div className="px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs text-purple-300 font-mono">
                  LLM
                </div>
                <div className="px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-xs text-purple-300 font-mono">
                  Multi-Platform
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={systemId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-purple-400/20 blur-[80px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-purple-300/80 font-medium">
          Research Objectives
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(systemPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.15] tracking-[-0.03em] font-bold text-white">
        What we aim to achieve
      </h2>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {goals.map((g) => (
          <div key={g.title} className="relative group">
            <div className="mb-4 text-4xl">{g.icon}</div>
            <h3 className="text-xl font-bold text-purple-300 mb-3">
              {g.title}
            </h3>
            <p className="text-[0.95rem] leading-relaxed text-sky-100/70">
              {g.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
