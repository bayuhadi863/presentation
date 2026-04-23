import {
  Globe,
  BrainCircuit,
  ShieldAlert,
  BarChart3,
  Repeat,
  Layers,
} from "lucide-react";
import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const suggestionsId = "suggestions";
export const suggestionsLabel = "Future Suggestions";
export const suggestionsPageNumber = 17;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(14,165,233,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(14,165,233,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function SuggestionsSlide({ mode }: SlideProps) {
  const points = [
    {
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      title: "Full CRUD Frontend Generation",
      desc: "Implement complete code generation for the frontend layer: Request/Response models, API Clients, and UI components.",
    },
    {
      icon: <Globe className="w-5 h-5 text-sky-400" />,
      title: "Platform Expansion",
      desc: "Extend generator support for Mobile (Flutter/React Native) and diverse backend ecosystems (Go/Python).",
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
      title: "Advanced AI Orchestration",
      desc: "Broaden AI assistance to complex modules: Workflow logic and API contracts.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-amber-400" />,
      title: "Adaptive DSL Validation",
      desc: "Implement real-time interactive feedback for syntactic and semantic errors within the metadata DSL.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
      title: "Enterprise Scale Testing",
      desc: "Evaluate performance in high-complexity scenarios with large volumes of entities and attributes.",
    },
    {
      icon: <Repeat className="w-5 h-5 text-rose-400" />,
      title: "Automated CI/CD Workflows",
      desc: "Seamless integration with system deployment pipelines for end-to-end automation from DSL to Production.",
    },
  ];

  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Suggestions Slide">
        <div className="max-w-7xl mx-auto w-full">
          <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-sky-300/80">
            Future Roadmap
          </p>
          <h2 className="m-0 mb-12 text-[clamp(2.2rem,4vw,3.5rem)] leading-tight tracking-[-0.04em] font-bold text-white">
            Research Suggestions
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {points.map((point, i) => (
              <div
                key={i}
                className={`p-8 rounded-[32px] bg-white/[0.03] border border-white/10 hover:border-sky-500/30 transition-all duration-300 group ${i >= 3 ? "md:col-span-1.5" : ""}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {point.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {point.title}
                </h3>
                <p className="text-sky-100/50 text-sm leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${sectionClass} border border-white/10`}
      id={suggestionsId}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-sky-300/80 font-medium">
          Future Roadmap
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(suggestionsPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.8rem,4vw,2.8rem)] leading-none tracking-[-0.04em] font-bold text-white mb-8">
        Research Suggestions
      </h2>
      <div className="space-y-4 overflow-auto pr-2 custom-scrollbar">
        {points.map((point, i) => (
          <div
            key={i}
            className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl items-start"
          >
            <div className="mt-1">{point.icon}</div>
            <div>
              <h4 className="text-sky-300 font-bold text-sm mb-1">
                {point.title}
              </h4>
              <p className="text-sky-100/60 text-xs leading-relaxed">
                {point.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
