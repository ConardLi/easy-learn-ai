import { RECIPES, SCHOOLS, recipesForSchool, type RecipeMeta, type SchoolId } from "../recipes/registry";
import { RecipeCover } from "./RecipeCover";

const SCHOOL_ACCENT: Record<SchoolId, string> = {
  editorial: "#D9C9A0",
  info: "#FFA02F",
  saas: "#A78BFA",
  motion: "#7EE7E1",
  brutalist: "#FFE600",
  humanist: "#FFD06B",
  specialty: "#A8B5D8",
};

export function Gallery() {
  const marqueeIds = [...RECIPES, ...RECIPES].map((r) => r.id);

  return (
    <div className="gallery">
      <div className="gallery-grain" aria-hidden />

      <header className="gallery-hero">
        <div className="gallery-hero-top">
          <div className="gallery-hero-eyebrow">
            <span className="gallery-hero-dot" aria-hidden />
            web-design-engineer · live recipe gallery
          </div>
          <div className="gallery-hero-top-right">
            <a
              className="gallery-hero-gh"
              href="https://github.com/ConardLi/garden-skills/tree/main/skills/web-design-engineer"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View web-design-engineer on GitHub"
            >
              <svg
                className="gallery-hero-gh-icon"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.35.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.14 0 .3.21.66.79.55C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
              <span className="gallery-hero-gh-label">ConardLi/garden-skills</span>
              <span className="gallery-hero-gh-arrow" aria-hidden>↗</span>
            </a>
            <div className="gallery-hero-counter">
              <span>{String(RECIPES.length).padStart(2, "0")}</span>
              <span aria-hidden>/</span>
              <span>{String(RECIPES.length).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        <div className="gallery-hero-kicker">An Agent Skill · Design taste for AI coding</div>

        <h1 className="gallery-hero-title">
          <span className="gallery-hero-line" data-line="1">
            Design <em>taste</em>,
          </span>
          <span className="gallery-hero-line" data-line="2">
            encoded as a
          </span>
          <span className="gallery-hero-line" data-line="3">
            <em>portable skill.</em>
          </span>
        </h1>

        <p className="gallery-hero-deck">
          <code>web-design-engineer</code> is a <code>SKILL.md</code> instruction set that
          gives any AI coding agent — Claude Code, Cursor, Codex — the design judgement to
          ship work that doesn't look immediately like AI. It blocks the defaults
          (<em>Inter + violet gradients + emoji-as-icon</em>), enforces an <strong>oklch</strong>
          token discipline, declares the design system before writing code, and ships a
          library of <strong>25 anchored style recipes</strong> drawn from real brands and
          designers.
        </p>

        <div className="gallery-hero-stats" role="list">
          <div role="listitem">
            <span className="gallery-hero-stat-n">06</span>
            <span className="gallery-hero-stat-l">step workflow</span>
          </div>
          <div role="listitem">
            <span className="gallery-hero-stat-n">{SCHOOLS.length}</span>
            <span className="gallery-hero-stat-l">design schools</span>
          </div>
          <div role="listitem">
            <span className="gallery-hero-stat-n">{RECIPES.length}</span>
            <span className="gallery-hero-stat-l">anchored recipes</span>
          </div>
          <div role="listitem">
            <span className="gallery-hero-stat-n">∞</span>
            <span className="gallery-hero-stat-l">agents supported</span>
          </div>
        </div>

        <div className="gallery-hero-rule">
          <span className="gallery-hero-rule-line" aria-hidden />
          <span className="gallery-hero-rule-num">No. 001 — 025 · this page in action</span>
        </div>

        <p className="gallery-hero-subdeck">
          What you're scrolling through: <strong>one live, full-page artefact per recipe</strong> —
          an apothecary product page for Aesop, a trading workstation for Bloomberg Terminal,
          a Saul-Bass poster for Mid-Century, a Y2K portal for Retrofuturism. Each card commits
          to its recipe's DNA with no shared template. Pick a school below or scroll through
          the catalogue.
        </p>

        <ul className="gallery-hero-schools" role="list">
          {SCHOOLS.map((s) => {
            const count = recipesForSchool(s.id).length;
            return (
              <li key={s.id} style={{ ["--accent" as string]: SCHOOL_ACCENT[s.id] }}>
                <a href={`#school-${s.id}`}>
                  <span className="gallery-hero-school-chip" aria-hidden />
                  <span className="gallery-hero-school-name">{s.label}</span>
                  <span className="gallery-hero-school-count">×{count}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="gallery-hero-marquee" aria-hidden>
          <div className="gallery-hero-marquee-track">
            {marqueeIds.map((id, i) => (
              <span key={`${id}-${i}`}>
                <span className="gallery-hero-marquee-num">
                  {String(((i % RECIPES.length) + 1)).padStart(2, "0")}
                </span>
                {id}
              </span>
            ))}
          </div>
        </div>
      </header>

      {SCHOOLS.map((school) => {
        const items = recipesForSchool(school.id);
        if (!items.length) return null;
        const accent = SCHOOL_ACCENT[school.id];
        return (
          <section
            key={school.id}
            id={`school-${school.id}`}
            className="school-row"
            style={{ ["--accent" as string]: accent }}
          >
            <div className="school-row-header">
              <div className="school-row-left">
                <span className="school-row-chip" aria-hidden />
                <div className="school-row-label">
                  <span className="school-row-num">
                    {String(SCHOOLS.findIndex((s) => s.id === school.id) + 1).padStart(2, "0")}
                  </span>
                  <h2>{school.label}</h2>
                  <span className="school-row-zh">{school.labelZh}</span>
                </div>
              </div>
              <div className="school-row-right">
                <p className="school-row-tagline">{school.tagline}</p>
                <span className="school-row-count">
                  {String(items.length).padStart(2, "0")}{" "}
                  {items.length === 1 ? "recipe" : "recipes"}
                </span>
              </div>
            </div>
            <div className="recipe-grid">
              {items.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          </section>
        );
      })}

      <footer className="gallery-footer">
        <div className="gallery-footer-rule" aria-hidden />
        <div className="gallery-footer-row">
          <div>
            <strong>Deep-link any recipe</strong>
            <span>
              Each demo lives at <code>#/{`<recipe-id>`}</code> — try{" "}
              <a href="#/linear">#/linear</a> · <a href="#/aesop">#/aesop</a> ·{" "}
              <a href="#/bloomberg-terminal">#/bloomberg-terminal</a>.
            </span>
          </div>
          <div>
            <strong>Where these come from</strong>
            <span>
              The recipe specs live in <code>skills/web-design-engineer/references/style-recipes/</code>;
              each <code>.md</code> file is a copy-pasteable design system contract.
            </span>
          </div>
          <div>
            <strong>Keyboard</strong>
            <span>
              Inside a demo, <kbd>H</kbd> toggles the HUD, <kbd>Esc</kbd> returns here.
            </span>
          </div>
        </div>
        <div className="gallery-footer-foot">
          <span>web-design-engineer · style-recipe gallery</span>
          <span>{RECIPES.length} recipes · {SCHOOLS.length} schools · 2026</span>
        </div>
      </footer>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: RecipeMeta }) {
  const accent = SCHOOL_ACCENT[recipe.school];
  return (
    <a
      className="recipe-card"
      href={`#/${recipe.id}`}
      style={{ ["--accent" as string]: accent }}
    >
      <RecipeCover id={recipe.id} />
      <div className="recipe-card-body">
        <div className="recipe-card-headline">
          <span className="recipe-card-num">
            {String(RECIPES.findIndex((r) => r.id === recipe.id) + 1).padStart(2, "0")}
          </span>
          <div className="recipe-card-name">
            <span className="recipe-card-name-en">{recipe.name}</span>
            <span className="recipe-card-name-zh">{recipe.nameZh}</span>
          </div>
        </div>
        <div className="recipe-card-vibe">{recipe.vibe}</div>
        <ul className="recipe-card-signature">
          {recipe.signature.slice(0, 3).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="recipe-card-foot">
          <span className="recipe-card-artifact">{recipe.artifactType}</span>
          <span className="recipe-card-arrow" aria-hidden>↗</span>
        </div>
      </div>
    </a>
  );
}
