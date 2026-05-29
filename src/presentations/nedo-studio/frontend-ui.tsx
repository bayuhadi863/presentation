import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";
import codegenJobUiImg from "./assets/codegen-job-ui-completed.png";

export const frontendUiId = "frontend-ui";
export const frontendUiLabel = "Frontend UI";

const TOTAL = 10;
const PAGE = 7;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const uiFeatures = [
  {
    group: "Status & Progress",
    color: "emerald",
    items: [
      "Badge status (pending / queued / processing / completed / failed / cancelled)",
      "Progress bar dengan persentase realtime",
      "Duration counter terupdate setiap detik",
    ],
  },
  {
    group: "Step Indicator",
    color: "sky",
    items: [
      "5 step dengan status pending / active / completed / failed",
      "Timestamp completion per step",
      "Placeholder steps upgrade ke real UUID on-the-fly",
    ],
  },
  {
    group: "Log Viewer",
    color: "violet",
    items: [
      "Stream log masuk secara realtime",
      "Level info / success / warn / error dengan color coding",
      "Timestamp HH:MM:SS per entry",
    ],
  },
  {
    group: "Job Details & Actions",
    color: "amber",
    items: [
      "Repository · branch · commit hash · PR link",
      "Quick Actions: View Repository · View Commit · View PR",
      "Cancel button saat job aktif, Retry saat failed",
    ],
  },
];

const colorMap: Record<
  string,
  { border: string; bg: string; text: string; dot: string }
> = {
  emerald: {
    border: "border-emerald-400/25",
    bg: "bg-emerald-500/[0.07]",
    text: "text-emerald-300/80",
    dot: "bg-emerald-400",
  },
  sky: {
    border: "border-sky-400/25",
    bg: "bg-sky-500/[0.07]",
    text: "text-sky-300/80",
    dot: "bg-sky-400",
  },
  violet: {
    border: "border-violet-400/25",
    bg: "bg-violet-500/[0.07]",
    text: "text-violet-300/80",
    dot: "bg-violet-400",
  },
  amber: {
    border: "border-amber-400/25",
    bg: "bg-amber-500/[0.07]",
    text: "text-amber-300/80",
    dot: "bg-amber-400",
  },
};

function FeatureList({ compact }: { compact?: boolean }) {
  return (
    <div className={`grid grid-cols-2 ${compact ? "gap-2" : "gap-3"}`}>
      {uiFeatures.map((f) => {
        const c = colorMap[f.color];
        return (
          <div
            key={f.group}
            className={`rounded-xl border ${c.border} ${c.bg} px-4 py-3`}
          >
            <p
              className={`m-0 text-[0.7rem] font-bold uppercase tracking-widest ${c.text}`}
            >
              {f.group}
            </p>
            <ul
              className="m-0 mt-2 flex flex-col gap-1 pl-0"
              style={{ listStyle: "none" }}
            >
              {f.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[0.67rem] text-white/55"
                >
                  <span
                    className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${c.dot} opacity-60`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function UIScreenshot({ compact }: { compact?: boolean }) {
  return (
    <img
      src={codegenJobUiImg}
      alt="GenerationJobPage — tampilan live UI dengan progress bar, step indicator, dan log viewer"
      className={`w-full rounded-2xl border border-white/10 object-cover object-top shadow-lg ${compact ? "h-44" : "h-52"}`}
    />
  );
}

export default function FrontendUiSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Frontend UI">
        <div className="flex flex-col gap-5">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Frontend · React
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              <span className="text-sky-300">GenerationJobPage</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <UIScreenshot compact />
            <FeatureList compact />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${sectionClass} border border-white/10`}
      id={frontendUiId}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-sky-500/12 blur-[90px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Frontend · UI Implementation
        </p>
        <span className="font-mono text-sm text-emerald-200/60">
          {formatPageNumber(PAGE, TOTAL)}
        </span>
      </div>

      <div className="mt-7 max-w-5xl">
        <h2 className="m-0 mb-1 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          <span className="text-sky-400">GenerationJobPage</span> — UI Overview
        </h2>
        <p className="m-0 mb-6 text-[0.8rem] text-emerald-200/50">
          Halaman utama monitoring job — 4 kartu informasi dengan realtime data
          binding
        </p>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            <UIScreenshot />
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
              <p className="m-0 text-[0.68rem] leading-relaxed text-white/35">
                Layout 3-kolom:{" "}
                <span className="font-semibold text-white/55">
                  main content (2/3)
                </span>{" "}
                berisi Progress, Steps, Logs — dan{" "}
                <span className="font-semibold text-white/55">
                  sidebar (1/3)
                </span>{" "}
                berisi Job Details + Quick Actions. Responsive dengan{" "}
                <span className="font-mono">lg:grid-cols-3</span>.
              </p>
            </div>
          </div>
          <FeatureList />
        </div>
      </div>
    </section>
  );
}
