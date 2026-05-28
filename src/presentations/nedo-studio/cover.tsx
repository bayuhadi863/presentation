import type { SlideProps } from "../../slides/types";

export const coverId = "cover";
export const coverLabel = "Cover";

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function CoverSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Cover slide">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-emerald-200/80">
              Lab Meeting · 29 Mei 2026
            </p>
            <h1 className="m-0 text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-[-0.04em] font-bold text-white">
              Progres <span className="text-emerald-300">Nedo Studio</span>
            </h1>
            <p className="mt-5 text-[clamp(1rem,1.8vw,1.3rem)] text-emerald-200/60 leading-relaxed max-w-2xl mx-auto">
              Role AI Developer pada Lab Meeting 29 Mei 2026
            </p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center gap-2 w-full max-w-sm">
            <span className="text-emerald-200/40 text-xs uppercase tracking-[0.25em] mb-2">
              Dipresentasikan oleh
            </span>
            <div className="flex flex-col items-center justify-center gap-4">
              <h2 className="m-0 text-[clamp(1.5rem,2.5vw,2.2rem)] font-semibold text-white tracking-tight">
                Bayu Hadi Leksana
              </h2>
              <span className="text-xl text-emerald-300/80 font-mono tracking-wider">
                3125640011
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={coverId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-emerald-400/20 blur-[80px]" />
      <div className="pointer-events-none absolute -left-10 -top-14 h-64 w-64 rounded-full bg-emerald-600/10 blur-[100px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-emerald-200/80 font-medium">
          Lab Meeting
        </p>
        <span className="text-sm text-emerald-200/60 font-mono">01 / 01</span>
      </div>

      <div className="mt-10 max-w-4xl">
        <p className="m-0 mb-3 text-[0.8rem] uppercase tracking-[0.25em] text-emerald-400/70 font-medium">
          29 Mei 2026
        </p>
        <h1 className="m-0 text-[clamp(1.8rem,4.5vw,3.8rem)] leading-[1.15] tracking-[-0.03em] font-bold text-white">
          Progres <span className="text-emerald-400">Nedo Studio</span>
        </h1>
        <p className="mt-4 text-[clamp(0.95rem,1.5vw,1.2rem)] text-emerald-200/60 leading-relaxed max-w-2xl">
          Role AI Developer pada Lab Meeting 29 Mei 2026
        </p>

        <div className="mt-12 border-t border-white/10 pt-10">
          <span className="text-xs uppercase tracking-[0.2em] text-emerald-200/40 block mb-4 font-medium">
            Dipresentasikan oleh
          </span>
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-400/30 text-emerald-300 text-xl font-bold">
              B
            </div>
            <div>
              <h2 className="m-0 text-2xl font-semibold text-white tracking-tight">
                Bayu Hadi Leksana
              </h2>
              <p className="m-0 mt-1 text-base font-mono text-emerald-300/70">
                NRP. 3125640011
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
