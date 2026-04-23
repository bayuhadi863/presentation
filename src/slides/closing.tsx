import { slideCount } from ".";
import { formatPageNumber } from "./utils";
import type { SlideProps } from "./types";

export const closingId = "closing";
export const closingLabel = "Thank You";
export const closingPageNumber = 18;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center items-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(16,185,129,0.06),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)] text-center";

export default function ClosingSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Thank you slide">
        <div className="max-w-4xl mx-auto">
          <p className="m-0 mb-6 text-[1rem] font-medium uppercase tracking-[0.4em] text-emerald-300/80">
            Final Project Evaluation
          </p>
          <h1 className="m-0 text-[clamp(3.5rem,8vw,6rem)] leading-none tracking-[-0.05em] font-bold text-white mb-8">
            Thank You<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-sky-100/60 text-xl max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-12">
            "Software engineering is not just about writing code; it's about
            building solutions that bridge platforms and simplify complexity."
          </p>

          <div className="mt-16 flex flex-col items-center">
            <p className="text-white font-bold text-2xl mb-2">
              Bayu Hadi Leksana
            </p>
            <p className="text-emerald-300/60 tracking-widest text-sm uppercase">
              Informatics Engineering • PENS
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${sectionClass} border border-white/10`}
      id={closingId}
    >
      <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-300/80 font-medium">
          Closing
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(closingPageNumber, slideCount)}
        </span>
      </div>

      <div className="mt-20 text-center md:text-left">
        <h2 className="m-0 text-[clamp(2.5rem,5vw,4.5rem)] leading-tight font-bold text-white tracking-tighter">
          Thank You<span className="text-emerald-400">.</span>
        </h2>
        <p className="mt-6 text-sky-100/50 text-lg leading-relaxed max-w-xl">
          Thank you for following the Final Project presentation regarding
          Metadata-Based DSL development.
        </p>

        <div className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start">
          <a
            href="#welcome"
            className="px-8 py-3 rounded-full bg-white !text-slate-950 font-black hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Back to Title
          </a>
        </div>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white font-bold mb-1">Bayu Hadi Leksana</p>
            <p className="text-sky-100/40 text-sm">
              3125640011 • Informatics Engineering
            </p>
          </div>
          <p className="text-sky-100/20 text-xs font-mono">
            Politeknik Elektronika Negeri Surabaya © 2026
          </p>
        </div>
      </div>
    </section>
  );
}
