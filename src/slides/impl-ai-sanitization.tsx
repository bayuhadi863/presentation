import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";
import screenshot from "../assets/fe-ai-sanitization.png";

export const aiImplSanitizationId = "ai-impl-sanitization";
export const aiImplSanitizationLabel = "AI Sanitization";
export const aiImplSanitizationPageNumber = 12;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(56,189,248,0.08),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(56,189,248,0.08),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function AIImplSanitizationSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="AI Implementation Sanitization">
        <div className="flex flex-col h-full max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <p className="m-0 mb-3 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-sky-300/80">
              Implementation: Frontend AI Assistant
            </p>
            <h2 className="m-0 text-[clamp(1.8rem,3vw,2.8rem)] leading-tight tracking-[-0.04em] font-bold text-white">
              Module: Data Sanitization Rules
            </h2>
          </div>
          <div className="flex-1 min-h-0 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm overflow-hidden flex items-center justify-center">
            <img src={screenshot} alt="AI Assistant Sanitization" className="max-h-full max-w-full object-contain rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={aiImplSanitizationId}>
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-sky-300/80 font-medium">
          Implementation Showcase
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(aiImplSanitizationPageNumber, slideCount)}
        </span>
      </div>
      <h2 className="mt-8 text-[clamp(1.5rem,2.6vw,2.35rem)] leading-none tracking-[-0.04em] font-bold text-white">
        AI Assistant: Data Sanitization
      </h2>
      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 overflow-hidden">
        <img src={screenshot} alt="AI Assistant Sanitization" className="w-full rounded-lg" />
      </div>
    </section>
  );
}
