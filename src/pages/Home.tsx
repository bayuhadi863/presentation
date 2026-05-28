import { useNavigate } from "react-router-dom";
import { presentations } from "../presentations";

const bgGradient =
  "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(44,103,255,0.24),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_26%),radial-gradient(circle_at_bottom_center,rgba(236,72,153,0.14),transparent_34%)]";
const bgGrid =
  "pointer-events-none fixed inset-0 opacity-55 [mask-image:radial-gradient(circle_at_center,black,transparent_86%)]";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#07111f] text-[#edf4ff]">
      <div className={bgGradient} />
      <div className={bgGrid}>
        <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
      </div>

      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border border-white/10 bg-[#0c1525]/75 px-6 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl">
        <div>
          <p className="m-0 mb-1 text-[0.74rem] uppercase tracking-[0.2em] text-sky-200/80">
            Presentation Hub
          </p>
          <h1 className="m-0 text-lg leading-none tracking-[-0.04em]">
            Pilih Presentasi
          </h1>
        </div>
      </header>

      <main className="relative mx-auto max-w-4xl px-6 py-14">
        <p className="mb-8 text-sm text-[#edf4ff]/50">
          {presentations.length} presentasi tersedia
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {presentations.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/${p.id}`)}
              className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 text-left transition-all duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(44,103,255,0.08),transparent_60%)]" />
              <h2 className="m-0 text-xl font-semibold tracking-tight text-white">
                {p.title}
              </h2>
              {p.description && (
                <p className="m-0 text-sm leading-relaxed text-[#edf4ff]/50">
                  {p.description}
                </p>
              )}
              <span className="mt-auto text-xs font-mono text-sky-300/70">
                {p.slides.length} slide
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
