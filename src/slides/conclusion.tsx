import { Rocket, Target, Shield, Zap } from "lucide-react";
import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const conclusionId = "conclusion";
export const conclusionLabel = "Research Conclusion";
export const conclusionPageNumber = 16;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function ConclusionSlide({ mode }: SlideProps) {
  const points = [
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: "Unified Single Source of Truth",
      desc: "Metadata-based DSL effectively maintains architectural consistency across diverse platforms, drastically reducing technical debt.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "AI-Driven Efficiency Gains",
      desc: "The AI Assistant significantly optimizes the development lifecycle by automating complex module configurations and reducing manual input errors.",
    },
    {
      icon: <Target className="w-6 h-6 text-sky-400" />,
      title: "Production-Ready Quality",
      desc: "Multi-platform code generation achieves 'Excellent' quality ratings, producing clean and maintainable ASP.NET Core & React boilerplate.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-purple-400" />,
      title: "Seamless Orchestration",
      desc: "Successful integration of DSL, LLM-based assistants, and automated Git workflows within a cohesive high-performance low-code platform.",
    },
  ];

  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Conclusion Slide">
        <div className="max-w-7xl mx-auto w-full">
          <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-emerald-300/80">
            Final Synthesis
          </p>
          <h2 className="m-0 mb-12 text-[clamp(2.2rem,4vw,3.5rem)] leading-tight tracking-[-0.04em] font-bold text-white">
            Research Conclusion
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            {points.map((point, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-sky-100/50 text-sm leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 rounded-[32px] bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-white/10 backdrop-blur-sm">
            <p className="m-0 text-center text-emerald-100 font-medium italic text-lg">
              "Transforming complex multi-platform development into a
              streamlined, consistent, and AI-accelerated process."
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${sectionClass} border border-white/10`}
      id={conclusionId}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
          Final Synthesis
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(conclusionPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.8rem,4vw,2.8rem)] leading-none tracking-[-0.04em] font-bold text-white mb-8 text-center md:text-left">
        Research Conclusion
      </h2>
      <div className="space-y-6 overflow-auto pr-2">
        {points.map((point, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-5 rounded-2xl"
          >
            <h4 className="text-emerald-300 font-bold mb-2 flex items-center gap-3">
              {point.title}
            </h4>
            <p className="text-sky-100/60 text-sm leading-relaxed">
              {point.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
