import { useEffect, useRef, useState } from "react";
import { slides } from "./slides";

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

function App() {
  const [mode, setMode] = useState<"web" | "presentation">("web");
  const [activeSlide, setActiveSlide] = useState(0);
  const [_, setIsFullscreen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[activeSlide];

  const handlePrint = () => {
    setIsPrinting(true);
    // Wait for React to render all slides in print area, then trigger print
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
        setIsPrinting(false);
      });
    });
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
        // Ignore fullscreen exit failures and keep the UI usable.
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
      if (mode !== "presentation" && event.key !== "Escape") {
        return;
      }
      if (!keyboardNavKeys.has(event.key)) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const editable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (editable) {
        return;
      }

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

  return (
    <>
      {/* ── Print-only area: all slides rendered in presentation mode ── */}
      {isPrinting && (
        <div id="print-area">
          {slides.map((slide) => (
            <div key={`print-${slide.id}`} className="print-slide">
              <slide.Component mode="presentation" />
            </div>
          ))}
        </div>
      )}

      {/* ── Main application (hidden during print via CSS) ── */}
      <div
        ref={deckRef}
        id="app-root"
        className={`relative min-h-screen overflow-x-hidden bg-[#07111f] text-[#edf4ff] ${mode === "presentation" ? "overflow-hidden" : ""}`}
      >
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(44,103,255,0.24),transparent_32%),radial-gradient(circle_at_top_right,rgba(16,185,129,0.2),transparent_26%),radial-gradient(circle_at_bottom_center,rgba(236,72,153,0.14),transparent_34%)]" />
        <div className="pointer-events-none fixed inset-0 opacity-55 [mask-image:radial-gradient(circle_at_center,black,transparent_86%)]">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {mode === "web" ? (
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border border-white/10 bg-[#0c1525]/75 px-4 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-xl">
            <div>
              <p className="m-0 mb-2 text-[0.74rem] uppercase tracking-[0.2em] text-sky-200/80">
                Presentation
              </p>
              <h1 className="m-0 text-lg leading-none tracking-[-0.04em]">
                Build your own presentation with code.
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm text-[#edf4ff] transition-transform duration-150 hover:-translate-y-0.5 disabled:opacity-50"
                type="button"
                onClick={handlePrint}
              >
                Export PDF
              </button>
              <button
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 text-sm text-[#edf4ff] transition-transform duration-150 hover:-translate-y-0.5"
                type="button"
                onClick={() => goToSlide(0)}
              >
                Reset slide
              </button>
              <button
                className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#f7f7fb,#d7e7ff)] px-4 text-sm text-[#0c1627] transition-transform duration-150 hover:-translate-y-0.5"
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
              <div className="fixed inset-x-0 top-0 z-30 flex h-16 items-start justify-end bg-gradient-to-b from-black/60 via-black/20 to-transparent px-4 pt-3 opacity-0 transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100">
                <div className="flex items-center gap-3">
                  <span className="mr-3 hidden text-sm text-[#edf4ff]/72 md:inline">
                    {currentSlide.label} · {activeSlide + 1}/{slides.length}
                  </span>
                  <button
                    className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-white/10 bg-[#0c1525]/80 px-4 text-sm text-[#edf4ff] backdrop-blur-xl transition-transform duration-150 hover:-translate-y-0.5"
                    type="button"
                    onClick={() => goToSlide(activeSlide - 1)}
                  >
                    Prev
                  </button>
                  <button
                    className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-white/10 bg-[#0c1525]/80 px-4 text-sm text-[#edf4ff] backdrop-blur-xl transition-transform duration-150 hover:-translate-y-0.5"
                    type="button"
                    onClick={() => goToSlide(activeSlide + 1)}
                  >
                    Next
                  </button>
                  <button
                    className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,#f7f7fb,#d7e7ff)] px-4 text-sm text-[#0c1627] transition-transform duration-150 hover:-translate-y-0.5"
                    type="button"
                    onClick={() => void exitPresentation()}
                  >
                    Exit
                  </button>
                </div>
              </div>

              <div className="fixed inset-0 z-0 overflow-hidden">
                <currentSlide.Component mode="presentation" />
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
