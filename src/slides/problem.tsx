import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const problemId = "problem";
export const problemLabel = "Problem Statement";
export const problemPageNumber = 2;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(251,191,36,0.08),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function ProblemSlide({ mode }: SlideProps) {
  const points = [
    {
      title: "Manual Multi-Platform Inconsistency",
      desc: "Manual implementation leads to logic drift and synchronization issues across different tech stacks (ASP.NET vs. React).",
    },
    {
      title: "Repetitive & Slow Configuration",
      desc: "Commercial low-code tools lack AI-assisted workflows, forcing developers into manual, repetitive setup tasks.",
    },
    {
      title: "Fragmented Ecosystems",
      desc: "Most generators focus on isolated platforms, lacking a unified 'Single Source of Truth' for the entire ecosystem.",
    },
  ];

  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Problem slide">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-amber-200/80">
              Why this research?
            </p>
            <h2 className="m-0 text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.1] tracking-[-0.04em] font-bold text-white">
              Addressing Inefficiencies in Modern Software Engineering
            </h2>
            <div className="mt-10 space-y-6">
              {points.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {p.title}
                    </h3>
                    <p className="text-[1.1rem] leading-relaxed text-sky-100/70">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-500/5 rounded-[40px] border border-white/5" />
            <div className="relative p-8 space-y-6">
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <strong className="block text-amber-300 text-lg mb-2">
                  Core Challenge
                </strong>
                <p className="text-white/80 leading-relaxed italic">
                  "Maintaining consistency across heterogeneous technology
                  stacks while meeting short release cycles."
                </p>
              </div>
              <p className="text-sm text-sky-200/40 leading-relaxed font-medium">
                Research gap: Unified DSL-Metadata approach combined with
                AI-assisted configuration.
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={problemId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-amber-300/20 blur-[80px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-amber-200/80 font-medium">
          Problem Statement
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(problemPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.15] tracking-[-0.03em] font-bold text-white">
        Modern Multi-Platform Challenges
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {points.map((p) => (
          <div
            key={p.title}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all"
          >
            <h3 className="text-lg font-bold text-amber-300 mb-3">{p.title}</h3>
            <p className="text-[0.95rem] leading-relaxed text-sky-100/70">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
