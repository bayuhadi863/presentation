import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { presentations } from "../presentations";

const keyboardNavKeys = new Set([
  "ArrowRight",
  "ArrowDown",
  "PageDown",
  " ",
  "Spacebar",
  "ArrowLeft",
  "ArrowUp",
  "PageUp",
  "Home",
  "End",
  "Escape",
]);

const bgGradient =
  "pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(44,103,255,0.24),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_26%),radial-gradient(circle_at_bottom_center,rgba(236,72,153,0.14),transparent_34%)]";
const bgGrid =
  "pointer-events-none fixed inset-0 opacity-55 [mask-image:radial-gradient(circle_at_center,black,transparent_86%)]";

export default function Presentation() {
  const { presentationId } = useParams<{ presentationId: string }>();
  const navigate = useNavigate();

  const activePresentation =
    presentations.find((p) => p.id === presentationId) ?? null;
  const slides = activePresentation?.slides ?? [];

  const [mode, setMode] = useState<"web" | "presentation">("web");
  const [activeSlide, setActiveSlide] = useState(0);
  const [_, setIsFullscreen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [pptExportIndex, setPptExportIndex] = useState<number | null>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[activeSlide];

  const backToList = async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // ignore
      }
    }
    setIsFullscreen(false);
    setMode("web");
    navigate("/");
  };

  const handlePrint = () => {
    setIsPrinting(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
        setIsPrinting(false);
      });
    });
  };

  const handleExportPPT = async () => {
    if (pptExportIndex !== null) return;

    const [{ default: html2canvas }, { default: PptxGenJS }] =
      await Promise.all([import("html2canvas"), import("pptxgenjs")]);

    const pptx = new PptxGenJS();
    pptx.layout = "LAYOUT_WIDE";

    for (let i = 0; i < slides.length; i++) {
      setPptExportIndex(i);

      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      const slideEl = document.getElementById("ppt-capture-slide");
      if (!slideEl) continue;

      const canvas = await html2canvas(slideEl, {
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#07111f",
      });

      const imageData = canvas.toDataURL("image/jpeg", 0.9);
      const pptSlide = pptx.addSlide();
      pptSlide.addImage({ data: imageData, x: 0, y: 0, w: "100%", h: "100%" });
    }

    setPptExportIndex(null);
    await pptx.writeFile({ fileName: `${activePresentation!.id}.pptx` });
  };

  const goToSlide = (nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(slides.length - 1, nextIndex));
    setActiveSlide(safeIndex);
  };

  const enterPresentation = async () => {
    setMode("presentation");
    if (deckRef.current && document.fullscreenElement !== deckRef.current) {
      try {
        await deckRef.current.requestFullscreen();
      } catch {
        setIsFullscreen(false);
        return;
      }
    }
    setIsFullscreen(true);
  };

  const exitPresentation = async () => {
    setMode("web");
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // ignore
      }
    }
    setIsFullscreen(false);
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === deckRef.current);
      if (!document.fullscreenElement) {
        setMode("web");
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (mode !== "presentation" && event.key !== "Escape") return;
      if (!keyboardNavKeys.has(event.key)) return;

      const target = event.target as HTMLElement | null;
      const editable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (editable) return;

      event.preventDefault();

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        goToSlide(activeSlide + 1);
      } else if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp" ||
        event.key === "PageUp"
      ) {
        goToSlide(activeSlide - 1);
      } else if (event.key === "Home") {
        goToSlide(0);
      } else if (event.key === "End") {
        goToSlide(slides.length - 1);
      } else if (event.key === "Escape") {
        void exitPresentation();
      }
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSlide, mode]);

  if (!activePresentation) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {/* ── Print-only area ── */}
      {isPrinting && (
        <div id="print-area">
          {slides.map((slide) => (
            <div key={`print-${slide.id}`} className="print-slide">
              <slide.Component mode="presentation" />
            </div>
          ))}
        </div>
      )}

      {/* ── PPT export capture overlay ── */}
      {(() => {
        if (pptExportIndex === null) return null;
        const CaptureSlide = slides[pptExportIndex].Component;
        return (
          <div
            id="ppt-capture-slide"
            className="fixed inset-0 overflow-hidden"
            style={{ zIndex: 9999 }}
          >
            <CaptureSlide mode="presentation" />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-sm text-white">
              Exporting {pptExportIndex + 1} / {slides.length}...
            </div>
          </div>
        );
      })()}

      {/* ── Main application ── */}
      <div
        ref={deckRef}
        id="app-root"
        className={`relative min-h-screen overflow-x-hidden bg-[#07111f] text-[#edf4ff] ${mode === "presentation" ? "overflow-hidden" : ""}`}
      >
        <div className={bgGradient} />
        <div className={bgGrid}>
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px]" />
        </div>

        {mode === "web" ? (
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border border-white/10 bg-[#0c1525]/75 px-4 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl">
            <div className="flex min-w-0 items-center gap-4">
              <button
                type="button"
                onClick={() => void backToList()}
                className="inline-flex min-h-9.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-sm text-[#edf4ff]/70 transition-transform duration-150 hover:-translate-y-0.5"
                aria-label="Kembali ke daftar"
              >
                ← Kembali
              </button>
              <div className="min-w-0">
                <p className="m-0 mb-1 truncate text-[0.74rem] uppercase tracking-[0.2em] text-sky-200/80">
                  Presentasi
                </p>
                <h1 className="m-0 truncate text-lg leading-none tracking-[-0.04em]">
                  {activePresentation.title}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex min-h-11.5 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm text-[#edf4ff] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-50"
                type="button"
                onClick={handlePrint}
                disabled={isPrinting || pptExportIndex !== null}
              >
                Export PDF
              </button>
              <button
                className="inline-flex min-h-11.5 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm text-[#edf4ff] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-50"
                type="button"
                onClick={() => void handleExportPPT()}
                disabled={isPrinting || pptExportIndex !== null}
              >
                {pptExportIndex !== null
                  ? `Exporting ${pptExportIndex + 1}/${slides.length}...`
                  : "Export PPT"}
              </button>
              <button
                className="inline-flex min-h-11.5 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm text-[#edf4ff] transition-transform duration-150 hover:-translate-y-0.5"
                type="button"
                onClick={() => goToSlide(0)}
              >
                Reset slide
              </button>
              <button
                className="inline-flex min-h-11.5 items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#f7f7fb,#d7e7ff)] px-4 text-sm text-[#0c1627] transition-transform duration-150 hover:-translate-y-0.5"
                type="button"
                onClick={() => void enterPresentation()}
              >
                Masuk presentasi
              </button>
            </div>
          </header>
        ) : null}

        <main className="w-full">
          {mode === "web" ? (
            <section className="flex flex-col gap-0" id="slides">
              {slides.map((slide) => (
                <slide.Component key={slide.id} mode="web" />
              ))}
            </section>
          ) : (
            <>
              <div className="fixed inset-x-0 top-0 z-30 flex h-16 items-start justify-end bg-linear-to-b from-black/60 via-black/20 to-transparent px-4 pt-3 opacity-0 transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100">
                <div className="flex items-center gap-3">
                  <span className="mr-3 hidden text-sm text-[#edf4ff]/72 md:inline">
                    {currentSlide?.label} · {activeSlide + 1}/{slides.length}
                  </span>
                  <button
                    className="inline-flex min-h-10.5 items-center justify-center rounded-full border border-white/10 bg-[#0c1525]/80 px-4 text-sm text-[#edf4ff] backdrop-blur-xl transition-transform duration-150 hover:-translate-y-0.5"
                    type="button"
                    onClick={() => goToSlide(activeSlide - 1)}
                  >
                    Prev
                  </button>
                  <button
                    className="inline-flex min-h-10.5 items-center justify-center rounded-full border border-white/10 bg-[#0c1525]/80 px-4 text-sm text-[#edf4ff] backdrop-blur-xl transition-transform duration-150 hover:-translate-y-0.5"
                    type="button"
                    onClick={() => goToSlide(activeSlide + 1)}
                  >
                    Next
                  </button>
                  <button
                    className="inline-flex min-h-10.5 items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#f7f7fb,#d7e7ff)] px-4 text-sm text-[#0c1627] transition-transform duration-150 hover:-translate-y-0.5"
                    type="button"
                    onClick={() => void exitPresentation()}
                  >
                    Exit
                  </button>
                </div>
              </div>

              <div className="fixed inset-0 z-0 overflow-hidden">
                {currentSlide && <currentSlide.Component mode="presentation" />}
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
