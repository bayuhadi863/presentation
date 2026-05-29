import type { SlideProps } from "../../slides/types";
import { formatPageNumber } from "../../slides/utils";

export const technicalHighlightsId = "technical-highlights";
export const technicalHighlightsLabel = "Technical Highlights";

const TOTAL = 10;
const PAGE = 9;

const sectionClass =
  "relative flex min-h-[calc(100vh-88px)] w-full snap-start flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";
const presentationClass =
  "flex h-full w-full flex-col justify-center overflow-hidden px-[clamp(24px,4vw,56px)] py-[clamp(24px,4vw,56px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02)),rgba(10,18,33,0.72)]";

const highlights = [
  {
    num: "01",
    title: "Dual-Cadence Monitoring",
    color: "violet",
    summary: "Dua loop terpisah untuk concern berbeda",
    detail:
      "Realtime Monitor (1s) prioritaskan UX responsiveness ke frontend. DB Monitor (5s) menjaga write amplification ke PostgreSQL tetap rendah. Keduanya berjalan concurrently via Task dengan CancellationTokenSource independen.",
    tags: ["Worker", "Concurrency"]
  },
  {
    num: "02",
    title: "Placeholder-to-UUID Step Upgrade",
    color: "sky",
    summary: "Optimistic UI tanpa flash kosong",
    detail:
      "Frontend menampilkan DEFAULT_STEPS (id: '1'–'5') sebelum data DB tiba. Saat CODEGEN_JOB_STEP_UPDATED masuk, step di-match dengan `step.id === s.id || step.id === String(s.order)` — lalu upgrade id ke UUID nyata tanpa loading state.",
    tags: ["Frontend", "UX Pattern"]
  },
  {
    num: "03",
    title: "Terminal State Sync Strategy",
    color: "emerald",
    summary: "WebSocket untuk kecepatan, REST untuk konsistensi",
    detail:
      "WebSocket memberikan update realtime selama proses berjalan. Begitu phase 'completed' atau 'failed' diterima, frontend trigger detailQuery.refetch() untuk mendapat data final otoritatif dari DB: branch, commitSha, pullRequestId, filesGeneratedCount.",
    tags: ["Frontend", "Data Consistency"]
  },
  {
    num: "04",
    title: "Scoped DI dalam Background Worker",
    color: "amber",
    summary: "Lifecycle aman di luar HTTP request scope",
    detail:
      "Background worker tidak memiliki HTTP request scope. IServiceScopeFactory.CreateScope() dibuat per job execution untuk mendapat DbContext, repositories, dan services dengan lifetime yang benar — menghindari memory leak dan concurrency issue di EF Core.",
    tags: ["Worker", ".NET DI"]
  },
  {
    num: "05",
    title: "Strategy Pattern untuk Multi-Stack",
    color: "teal",
    summary: "Code generation extensible untuk berbagai framework",
    detail:
      "CodeGenerationStrategyFactory.Resolve(framework, language) memilih implementasi ICodeGenerationStrategy yang tepat. Setiap strategy mengenkapsulasi logika AI prompt, file pattern, dan template yang spesifik untuk kombinasi language/framework tertentu.",
    tags: ["Worker", "Design Pattern"]
  },
  {
    num: "06",
    title: "Graceful Error Propagation",
    color: "rose",
    summary: "Failure handling end-to-end tanpa state inconsistency",
    detail:
      "Pada exception: kedua monitors di-cancel, awaited, lalu job di-mark failed di DB dengan duration aktual. tracker.BroadcastFailedAsync() memastikan frontend mendapat notifikasi kegagalan via WebSocket meskipun HTTP request sudah tidak ada.",
    tags: ["Worker", "Error Handling"]
  }
];

const colorMap: Record<string, { border: string; bg: string; label: string; tag: string; num: string }> = {
  violet: { border: "border-violet-400/25", bg: "bg-violet-500/[0.07]", label: "text-violet-300/80", tag: "border-violet-400/25 bg-violet-500/10 text-violet-300/70", num: "text-violet-400/50" },
  sky:    { border: "border-sky-400/25",    bg: "bg-sky-500/[0.07]",    label: "text-sky-300/80",    tag: "border-sky-400/25 bg-sky-500/10 text-sky-300/70",       num: "text-sky-400/50"    },
  emerald:{ border: "border-emerald-400/25",bg: "bg-emerald-500/[0.07]",label: "text-emerald-300/80",tag: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300/70",num: "text-emerald-400/50"},
  amber:  { border: "border-amber-400/25",  bg: "bg-amber-500/[0.07]",  label: "text-amber-300/80",  tag: "border-amber-400/25 bg-amber-500/10 text-amber-300/70",  num: "text-amber-400/50"  },
  teal:   { border: "border-teal-400/25",   bg: "bg-teal-500/[0.07]",   label: "text-teal-300/80",   tag: "border-teal-400/25 bg-teal-500/10 text-teal-300/70",    num: "text-teal-400/50"   },
  rose:   { border: "border-rose-400/25",   bg: "bg-rose-500/[0.07]",   label: "text-rose-300/80",   tag: "border-rose-400/25 bg-rose-500/10 text-rose-300/70",    num: "text-rose-400/50"   }
};

function HighlightCard({ h, compact }: { h: typeof highlights[0]; compact?: boolean }) {
  const c = colorMap[h.color];
  return (
    <div className={`rounded-xl border ${c.border} ${c.bg} px-4 ${compact ? "py-2.5" : "py-3.5"} flex flex-col gap-2`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[0.62rem] font-bold tracking-widest ${c.num}`}>{h.num}</span>
          <p className={`m-0 font-semibold text-white ${compact ? "text-[0.78rem]" : "text-[0.84rem]"}`}>
            {h.title}
          </p>
        </div>
        <div className="flex shrink-0 gap-1">
          {h.tags.map((tag) => (
            <span key={tag} className={`rounded border px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider ${c.tag}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className={`m-0 text-[0.68rem] italic ${c.label} opacity-80`}>{h.summary}</p>
      {!compact && (
        <p className="m-0 text-[0.67rem] leading-relaxed text-white/40">{h.detail}</p>
      )}
    </div>
  );
}

export default function TechnicalHighlightsSlide({ mode }: SlideProps) {
  if (mode === "presentation") {
    return (
      <section className={presentationClass} aria-label="Technical Highlights">
        <div className="flex flex-col gap-4">
          <div>
            <p className="m-0 mb-2 text-[0.72rem] font-medium uppercase tracking-[0.3em] text-emerald-200/60">
              Deep Dive
            </p>
            <h2 className="m-0 text-[clamp(1.5rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              Technical <span className="text-emerald-300">Highlights</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {highlights.map((h) => (
              <HighlightCard key={h.num} h={h} compact />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${sectionClass} border border-white/10`} id={technicalHighlightsId}>
      <div className="pointer-events-none absolute -right-10 -bottom-14 h-56 w-56 rounded-full bg-emerald-400/12 blur-[90px]" />
      <div className="pointer-events-none absolute -left-10 -top-10 h-44 w-44 rounded-full bg-violet-500/12 blur-[80px]" />

      <div className="flex items-center justify-between gap-3">
        <p className="m-0 text-[0.74rem] font-medium uppercase tracking-[0.2em] text-emerald-200/80">
          Technical Highlights
        </p>
        <span className="font-mono text-sm text-emerald-200/60">{formatPageNumber(PAGE, TOTAL)}</span>
      </div>

      <div className="mt-7 max-w-5xl">
        <h2 className="m-0 mb-1 text-[clamp(1.4rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-white">
          6 Keputusan Teknis <span className="text-emerald-400">Non-Trivial</span>
        </h2>
        <p className="m-0 mb-6 text-[0.8rem] text-emerald-200/50">
          Aspek implementasi yang tidak tampak dari permukaan tapi krusial untuk robustness sistem
        </p>
        <div className="grid grid-cols-2 gap-3">
          {highlights.map((h) => (
            <HighlightCard key={h.num} h={h} />
          ))}
        </div>
      </div>
    </section>
  );
}
