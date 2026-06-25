import React from "react";
import {
  Hero,
  PromptOnlyFailure,
  SchemaPrimer,
  ConstrainedTrace,
  SchemaBuilder,
  ThreeChoices,
  CorrectShapeWrongFact,
  ProductionChecks,
  Related,
} from "./components/StructuredOutputSections";

export default function App() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Hero />
      <PromptOnlyFailure />
      <SchemaPrimer />
      <ConstrainedTrace />
      <SchemaBuilder />
      <ThreeChoices />
      <CorrectShapeWrongFact />
      <ProductionChecks />
      <Related />
    </div>
  );
}
