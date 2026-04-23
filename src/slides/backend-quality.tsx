import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const backendQualityId = "backend-quality";
export const backendQualityLabel = "Code Quality Evaluation";
export const backendQualityPageNumber = 15;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function BackendQualitySlide({ mode }: SlideProps) {
  const criteria = [
    {
      title: "Layered Architecture Implementation",
      desc: "Full CRUD module generation across Domain, Infrastructure, Application, and API layers using SDI standards.",
      score: 4,
      highlight: true,
    },
    {
      title: "Naming Convention Compliance",
      desc: "Strict adherence to ASP.NET Core and Clean Architecture naming standards (PascalCase, Interface prefixes).",
      score: 4,
    },
    {
      title: "EF Core & Data Annotations",
      desc: "Optimized DbContext configuration and comprehensive use of Data Annotation Attributes for entity validation.",
      score: 4,
    },
    {
      title: "Separation of Concerns",
      desc: "Decoupled logic preventing cross-layer pollution (e.g., Domain models remaining independent of API models).",
      score: 4,
    },
    {
      title: "Readability & Maintainability",
      desc: "Clean, consistent code structure with meaningful abstractions that support future development.",
      score: 4,
    },
  ];

  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Backend Quality Slide">
        <div className="max-w-7xl mx-auto w-full">
          <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-emerald-300/80">
            Experimental Results
          </p>
          <h2 className="m-0 mb-10 text-[clamp(1.8rem,3vw,3rem)] leading-tight tracking-[-0.04em] font-bold text-white">
            Backend Code Quality Metrics
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {criteria.map((item, i) => (
              <div
                key={i}
                className={`relative p-6 rounded-3xl border transition-all ${
                  item.highlight
                    ? "bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.1)] scale-[1.02] z-10"
                    : "bg-white/[0.03] border-white/10"
                }`}
              >
                {item.highlight && (
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Major Update
                  </span>
                )}
                <div className="flex justify-between items-start mb-3">
                  <h3
                    className={`text-xl font-bold ${item.highlight ? "text-emerald-300" : "text-white"}`}
                  >
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-emerald-400 font-bold">4.0</span>
                    <span className="text-white/20 text-xs">/ 4</span>
                  </div>
                </div>
                <p className="text-sky-100/60 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className="h-1.5 flex-1 rounded-full bg-emerald-500"
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center p-8 rounded-3xl border border-dashed border-white/20 bg-emerald-500/5">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  Sangat Baik
                </div>
                <p className="text-sky-200/40 text-sm">
                  Overall Quality Category
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${sectionClass} border border-white/10`}
      id={backendQualityId}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
          Experimental Results
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(backendQualityPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none tracking-[-0.04em] font-bold text-white mb-6">
        Backend Quality Assessment
      </h2>
      <div className="space-y-4 overflow-auto pr-2">
        {criteria.map((item, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border ${item.highlight ? "bg-emerald-500/10 border-emerald-500/30" : "bg-white/5 border-white/10"}`}
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-white text-sm">{item.title}</h4>
              <span className="text-emerald-400 font-bold text-xs">4/4</span>
            </div>
            <p className="text-sky-100/60 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
