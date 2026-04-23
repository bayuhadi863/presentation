import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const backendCoverageId = "backend-coverage";
export const backendCoverageLabel = "Backend Artifact Coverage";
export const backendCoveragePageNumber = 14;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function BackendCoverageSlide({ mode }: SlideProps) {
  const artifacts = [
    { name: "Entity Class", layer: "Domain", desc: "Domain entity representation generated from DSL metadata." },
    { name: "Database Context", layer: "Infrastructure", desc: "Data context for database access management." },
    { name: "Interface Repository", layer: "Application", desc: "Data access contracts for each entity." },
    { name: "Repository Impl", layer: "Infrastructure", desc: "Data access implementation on the infrastructure layer." },
    { name: "Repository Extensions", layer: "Infrastructure", desc: "Extension classes for repository service registration." },
    { name: "DTO / Pagination / Param", layer: "Application", desc: "Data transfer objects and search parameter filters." },
    { name: "Interface Service", layer: "Application", desc: "Application service contracts for each entity." },
    { name: "Service Implementation", layer: "Application", desc: "Application service logic implementation on the backend." },
    { name: "Service Extensions", layer: "Application", desc: "Extension classes for service registration in DI container." },
    { name: "Request Model & Controller", layer: "API", desc: "API endpoints and request models for entity operations." },
  ];

  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Backend Coverage Slide">
        <div className="max-w-7xl mx-auto w-full">
          <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-emerald-300/80">
            Experimental Results
          </p>
          <h2 className="m-0 mb-10 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight tracking-[-0.04em] font-bold text-white text-center">
            Backend Code Generation Artifact Coverage
          </h2>
          
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-8 py-5 text-emerald-400 font-bold uppercase tracking-wider text-sm">Layer</th>
                  <th className="px-8 py-5 text-emerald-400 font-bold uppercase tracking-wider text-sm">Artifacts</th>
                  <th className="px-8 py-5 text-emerald-400 font-bold uppercase tracking-wider text-sm">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {artifacts.map((art, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-8 py-4 font-mono text-emerald-300/90 text-sm whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        {art.layer}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-white font-medium">{art.name}</td>
                    <td className="px-8 py-4 text-sky-100/60 text-sm">{art.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={backendCoverageId}>
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
          Experimental Results
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(backendCoveragePageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none tracking-[-0.04em] font-bold text-white mb-8">
        Backend Artifacts & Layered Architecture
      </h2>
      <div className="overflow-auto rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-left">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-xs font-bold text-emerald-400 uppercase">Layer</th>
              <th className="px-4 py-3 text-xs font-bold text-emerald-400 uppercase">Artifact</th>
              <th className="px-4 py-3 text-xs font-bold text-emerald-400 uppercase">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {artifacts.map((art, i) => (
              <tr key={i}>
                <td className="px-4 py-3 text-emerald-300 text-sm">{art.layer}</td>
                <td className="px-4 py-3 text-white text-sm whitespace-nowrap">{art.name}</td>
                <td className="px-4 py-3 text-sky-100/60 text-xs">{art.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
