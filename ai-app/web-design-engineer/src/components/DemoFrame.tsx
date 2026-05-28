import { useEffect, useState } from "react";
import type { RecipeMeta } from "../recipes/registry";

export function DemoFrame({ recipe }: { recipe: RecipeMeta }) {
  const [hudOpen, setHudOpen] = useState(true);
  const Component = recipe.Component;

  useEffect(() => {
    document.body.classList.add("demo-active");
    document.body.dataset.demo = recipe.id;
    return () => {
      document.body.classList.remove("demo-active");
      delete document.body.dataset.demo;
    };
  }, [recipe.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.location.hash = "";
      }
      if (e.key === "h" || e.key === "H") {
        setHudOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="demo-host">
      <div className={`demo-canvas demo-canvas--${recipe.id}`}>
        <Component />
      </div>
      <div className={`demo-hud ${hudOpen ? "is-open" : "is-collapsed"}`}>
        <button
          className="demo-hud-toggle"
          aria-label={hudOpen ? "Collapse HUD" : "Expand HUD"}
          onClick={() => setHudOpen((v) => !v)}
        >
          {hudOpen ? "—" : "i"}
        </button>
        {hudOpen && (
          <>
            <a className="demo-hud-back" href="#" aria-label="Back to gallery">
              ← Gallery
            </a>
            <div className="demo-hud-id">
              <span className="demo-hud-id-tag">{recipe.schoolLabel}</span>
              <h2>{recipe.name}</h2>
              <span className="demo-hud-id-zh">{recipe.nameZh}</span>
            </div>
            <div className="demo-hud-vibe">{recipe.vibe}</div>
            <ul className="demo-hud-signature">
              {recipe.signature.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="demo-hud-foot">
              <span>{recipe.artifactType}</span>
              <span>press H to hide · Esc to exit</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
