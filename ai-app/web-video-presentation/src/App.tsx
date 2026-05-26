import { useCallback, useEffect, useMemo, useState } from "react";
import { Stage } from "./components/Stage";
import { Gallery } from "./components/Gallery";
import { DEMOS } from "./demos";
import manifest from "./themes.manifest.gen.json";

type ThemeMeta = {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  mood: string[];
  bestFor: string[];
  preview: { shell?: string; surface?: string; text?: string; accent?: string };
};

const THEMES = manifest as ThemeMeta[];

function readHash() {
  const m = /^#\/?(.*?)(?:\?(.*))?$/.exec(window.location.hash);
  const path = m?.[1] ?? "";
  return { themeId: path || null };
}

function writeHash(themeId: string | null) {
  if (themeId) window.location.hash = `#/${themeId}`;
  else window.location.hash = "";
}

export default function App() {
  const [themeId, setThemeId] = useState<string | null>(() => readHash().themeId);
  const [step, setStep] = useState(0);

  useEffect(() => {
    function onHash() {
      const h = readHash();
      setThemeId(h.themeId);
      setStep(0);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Keyboard nav inside a demo.
  useEffect(() => {
    if (!themeId) return;
    function onKey(e: KeyboardEvent) {
      const entry = DEMOS[themeId!];
      if (!entry) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setStep((s) => (s + 1) % entry.steps);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setStep((s) => (s - 1 + entry.steps) % entry.steps);
      } else if (e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault();
        writeHash(null);
      } else if (e.key === "0" || e.key === "Home") {
        e.preventDefault();
        setStep(0);
      } else if (/^[1-9]$/.test(e.key)) {
        const n = Number(e.key) - 1;
        if (n < entry.steps) setStep(n);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [themeId]);

  const onPick = useCallback((id: string) => {
    setStep(0);
    writeHash(id);
  }, []);

  const onAdvance = useCallback(() => {
    if (!themeId) return;
    const entry = DEMOS[themeId];
    if (!entry) return;
    setStep((s) => (s + 1) % entry.steps);
  }, [themeId]);

  const onBack = useCallback(() => {
    writeHash(null);
  }, []);

  const entry = themeId ? DEMOS[themeId] : null;
  const meta = useMemo(
    () => (themeId ? THEMES.find((t) => t.id === themeId) ?? null : null),
    [themeId],
  );

  if (!entry || !themeId) {
    return <Gallery themes={THEMES} onPick={onPick} />;
  }

  const Demo = entry.Component;

  return (
    <>
      <Stage themeId={themeId} onAdvance={onAdvance}>
        <div key={`${themeId}-${step}`} className="scene fade-in">
          <Demo step={step} />
        </div>
      </Stage>
      <DemoHud
        meta={meta}
        step={step}
        steps={entry.steps}
        onBack={onBack}
        onStep={setStep}
      />
    </>
  );
}

function DemoHud({
  meta,
  step,
  steps,
  onBack,
  onStep,
}: {
  meta: ThemeMeta | null;
  step: number;
  steps: number;
  onBack(): void;
  onStep(n: number): void;
}) {
  return (
    <div className="demo-hud">
      <button className="demo-hud-btn" onClick={onBack} title="Back to gallery (Esc)">
        ← Gallery
      </button>
      <div className="demo-hud-meta">
        <span className="demo-hud-id">{meta?.nameZh ?? meta?.id}</span>
        <span className="demo-hud-sep">·</span>
        <span className="demo-hud-mono">{meta?.id}</span>
      </div>
      <div className="demo-hud-dots">
        {Array.from({ length: steps }, (_, i) => (
          <button
            key={i}
            className={`demo-hud-dot${i === step ? " is-active" : ""}`}
            onClick={() => onStep(i)}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>
      <div className="demo-hud-hint">click stage · ← → · esc</div>
    </div>
  );
}
