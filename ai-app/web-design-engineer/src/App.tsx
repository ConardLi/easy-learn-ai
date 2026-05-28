import { useEffect, useState } from "react";
import { Gallery } from "./components/Gallery";
import { DemoFrame } from "./components/DemoFrame";
import { findRecipe } from "./recipes/registry";

function readHash(): string {
  const raw = window.location.hash.replace(/^#\/?/, "");
  return raw.trim();
}

export function App() {
  const [hash, setHash] = useState<string>(readHash());

  useEffect(() => {
    const handler = () => setHash(readHash());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  if (!hash) return <Gallery />;

  const recipe = findRecipe(hash);
  if (!recipe) return <Gallery />;

  return <DemoFrame recipe={recipe} />;
}
