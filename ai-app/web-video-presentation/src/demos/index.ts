import type { ComponentType } from "react";

export interface DemoStepProps {
  step: number;
}

export interface DemoEntry {
  id: string;
  Component: ComponentType<DemoStepProps>;
  steps: number;
}

// Registry is populated by demos/registry.ts (separated so each demo file
// can stay self-contained without circular imports).
export { DEMOS } from "./registry";
