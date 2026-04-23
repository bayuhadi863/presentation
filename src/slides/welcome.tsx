import { slideCount } from ".";
import type { SlideProps } from "./types";
import { formatPageNumber } from "./utils";

export const welcomeId = "welcome";
export const welcomeLabel = "Title Slide";
export const welcomePageNumber = 1;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

export default function WelcomeSlide({ mode }: SlideProps) {
  const advisors = [
    {
      name: "Umi Sa'adah, S.Kom., M.Kom.",
      id: "197404162000032003",
      role: "Advisor 1",
    },
    {
      name: "Adam Shidqul Aziz, S.ST., M.T.",
      id: "199404032022031008",
      role: "Advisor 2",
    },
    {
      name: "Willy Achmat Fauzi, S.ST., M.T.",
      id: "-",
      role: "Industrial Advisor",
    },
  ];

  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Title slide">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,0.7fr)]">
          <div>
            <p className="m-0 mb-4 text-[0.8rem] font-medium uppercase tracking-[0.3em] text-sky-200/80">
              Final Project Evaluation
            </p>
            <h1 className="m-0 text-[clamp(2.1rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.04em] font-bold text-white">
              Development of Metadata-Based{" "}
              <span className="text-sky-300">DSL</span> Utilizing LLMs for
              Adaptive Multi-Platform Code Generation
            </h1>
            <div className="mt-12 flex flex-col gap-2">
              <span className="text-sky-200/50 text-xs uppercase tracking-[0.25em]">
                Presented by
              </span>
              <div className="flex items-baseline gap-4">
                <h2 className="m-0 text-[clamp(1.7rem,2.8vw,2.5rem)] font-semibold text-white tracking-tight">
                  Bayu Hadi Leksana
                </h2>
                <span className="text-2xl text-sky-300/80 font-mono tracking-wider">
                  3125640011
                </span>
              </div>
            </div>
          </div>
          <aside className="flex flex-col justify-center border-l border-white/10 pl-10">
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.3em] text-sky-200/40 block mb-6 font-medium">
                  Board of Advisors
                </span>
                <div className="space-y-7">
                  {advisors.map((adv) => (
                    <div key={adv.name} className="group">
                      <p className="text-[0.75rem] uppercase tracking-widest text-sky-400/80 font-semibold mb-1.5">
                        {adv.role}
                      </p>
                      <strong className="block text-[1.3rem] leading-tight text-white group-hover:text-sky-100 transition-colors">
                        {adv.name}
                      </strong>
                      {adv.id !== "-" && (
                        <span className="text-sm font-mono text-sky-200/60 mt-1 block">
                          NIP. {adv.id}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-white/10">
                <p className="text-sm text-sky-200/50 leading-relaxed font-medium">
                  Politeknik Elektronika Negeri Surabaya
                  <br />
                  <span className="text-sky-200/30">
                    Informatics Engineering
                  </span>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${sectionClass} border border-white/10`}
      id={welcomeId}
    >
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-64 w-64 rounded-full bg-sky-300/30 blur-[80px]" />
      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] uppercase tracking-[0.2em] text-sky-200/80 font-medium">
          Final Project
        </p>
        <span className="text-sm text-sky-200/60">
          {formatPageNumber(welcomePageNumber, slideCount)}
        </span>
      </div>
      <div className="mt-10 max-w-5xl">
        <h1 className="m-0 text-[clamp(1.8rem,4.5vw,3.8rem)] leading-[1.15] tracking-[-0.03em] font-bold text-white">
          Development of Metadata-Based{" "}
          <span className="text-sky-400">DSL</span> Utilizing Large Language
          Models for Adaptive Multi-Platform Code Generation
        </h1>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-sky-200/40 block mb-4 font-medium">
                Principal Author
              </span>
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-full bg-sky-500/20 flex items-center justify-center border border-sky-400/30 text-sky-300 text-xl font-bold">
                  B
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white tracking-tight">
                    Bayu Hadi Leksana
                  </h2>
                  <p className="text-base font-mono text-sky-300/70">
                    3125640011
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <span className="text-xs uppercase tracking-[0.2em] text-sky-200/40 block mb-5 font-medium">
                Academic Supervisors
              </span>
              <div className="grid gap-8">
                {advisors.slice(0, 2).map((adv) => (
                  <div key={adv.name} className="space-y-1">
                    <p className="text-[0.65rem] uppercase tracking-widest font-bold text-sky-400/80">
                      {adv.role}
                    </p>
                    <p className="text-xl text-white font-semibold leading-tight">
                      {adv.name}
                    </p>
                    <p className="text-sm font-mono text-sky-200/50">
                      NIP. {adv.id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-sky-200/40 block mb-5 font-medium">
                Industrial Insight
              </span>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-sky-500/30 transition-colors">
                <p className="text-[0.65rem] uppercase tracking-widest font-bold text-emerald-400/80 mb-2">
                  Industrial Advisor
                </p>
                <p className="text-xl text-white font-semibold group-hover:text-emerald-50 transition-colors">
                  {advisors[2].name}
                </p>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-sky-900/10 border border-sky-500/10 flex flex-col gap-3">
              <p className="text-[0.9rem] text-sky-200/60 leading-relaxed font-medium">
                Presented for the Final Project Evaluation Committee at{" "}
                <span className="text-sky-300">
                  Politeknik Elektronika Negeri Surabaya
                </span>
                .
              </p>
              <p className="text-[0.85rem] text-sky-200/40 leading-relaxed italic">
                Specializing in Software Engineering & Generative AI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
