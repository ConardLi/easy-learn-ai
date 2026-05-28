import { useEffect, useRef } from "react";

export function FieldIODemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let running = true;
    let particles: { x: number; y: number; vx: number; vy: number; hue: number }[] = [];

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((width * height) / 6000);
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        hue: 200 + Math.random() * 80,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = (t: number) => {
      if (!running) return;
      ctx.fillStyle = "rgba(5, 5, 5, 0.16)";
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      for (const p of particles) {
        const ang = Math.atan2(p.y - cy, p.x - cx);
        const dist = Math.hypot(p.x - cx, p.y - cy);
        const pull = 0.0006 * (200 - dist);
        p.vx += Math.cos(ang + Math.PI / 2 + Math.sin(t / 2400 + dist / 80) * 0.5) * 0.04;
        p.vy += Math.sin(ang + Math.PI / 2 + Math.cos(t / 2400 + dist / 80) * 0.5) * 0.04;
        p.vx += Math.cos(ang) * pull;
        p.vy += Math.sin(ang) * pull;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.42)`;
        ctx.fillRect(p.x, p.y, 1.2, 1.2);
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="demo-field">
      <canvas ref={canvasRef} className="fi-canvas" aria-hidden />
      <div className="fi-overlay">
        <header className="fi-nav">
          <span className="fi-mark">F/ FIELDWORK ’26</span>
          <nav>
            <a>Work</a>
            <a>Studio</a>
            <a>Writing</a>
            <a className="is-current">Index</a>
          </nav>
          <span className="fi-loc">London &nbsp; 51.5074, ‑0.1278</span>
        </header>

        <section className="fi-hero">
          <div className="fi-meta">
            <span>Case study</span>
            <span>04 / 12</span>
          </div>
          <h1>
            <span className="fi-h-line fi-h-line--1">a&nbsp;million&nbsp;quiet</span>
            <span className="fi-h-line fi-h-line--2">decisions,</span>
            <span className="fi-h-line fi-h-line--3">
              <em>watched</em>&nbsp;in&nbsp;real&nbsp;time.
            </span>
          </h1>
          <p>
            For Helix Capital, we built a generative identity that watches its own assets — a
            kinetic system where every brand surface is a snapshot of the data that runs through
            it.
          </p>
        </section>

        <section className="fi-chapters">
          <article>
            <div className="fi-ch-n">01</div>
            <div className="fi-ch-t">Brief</div>
            <p>
              The identity could not be a logo. It had to be the firm&apos;s posture, frozen for a
              moment, before moving again.
            </p>
          </article>
          <article>
            <div className="fi-ch-n">02</div>
            <div className="fi-ch-t">Engine</div>
            <p>
              A WebGL/Canvas hybrid stack, deployed at the edge. 60 FPS on a laptop, 30 FPS on the
              metro. One animation file, every surface a frame.
            </p>
          </article>
          <article>
            <div className="fi-ch-n">03</div>
            <div className="fi-ch-t">Outcomes</div>
            <p>
              14 surfaces — site, deck, lobby screen, business card. A different image every visit.
              The wordmark used twice. The system became the recognition.
            </p>
          </article>
        </section>

        <footer className="fi-foot">
          <div className="fi-foot-meta">
            <span>Field — Generative Identity Studio</span>
            <span>est. 2014 · London / Berlin</span>
          </div>
          <div className="fi-foot-status">
            <span className="fi-foot-dot" />
            <span>Engine running · 60 FPS · 8,400 particles</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
