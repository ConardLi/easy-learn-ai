import type { DemoEntry } from "./index";
import MidnightPressDemo from "./midnight-press";
import PaperPressDemo from "./paper-press";
import NewsroomDemo from "./newsroom";
import BauhausBoldDemo from "./bauhaus-bold";
import SunsetZineDemo from "./sunset-zine";
import MonochromePrintDemo from "./monochrome-print";
import VintageEditorialDemo from "./vintage-editorial";
import PastelDreamDemo from "./pastel-dream";
import SplitCanvasDemo from "./split-canvas";
import ElectricStudioDemo from "./electric-studio";
import IndigoPorcelainDemo from "./indigo-porcelain";
import ForestInkDemo from "./forest-ink";
import KraftPaperDemo from "./kraft-paper";
import DuneDemo from "./dune";
import SwissIkbDemo from "./swiss-ikb";
import WarmKeynoteDemo from "./warm-keynote";
import ChalkGardenDemo from "./chalk-garden";
import TerminalGreenDemo from "./terminal-green";
import BlueprintDemo from "./blueprint";
import DarkBotanicalDemo from "./dark-botanical";
import NeonCyberDemo from "./neon-cyber";
import BoldSignalDemo from "./bold-signal";
import CreativeVoltageDemo from "./creative-voltage";

export const DEMOS: Record<string, DemoEntry> = {
  "midnight-press":    { id: "midnight-press",    Component: MidnightPressDemo,    steps: 2 },
  "paper-press":       { id: "paper-press",       Component: PaperPressDemo,       steps: 2 },
  "newsroom":          { id: "newsroom",          Component: NewsroomDemo,         steps: 2 },
  "bauhaus-bold":      { id: "bauhaus-bold",      Component: BauhausBoldDemo,      steps: 2 },
  "sunset-zine":       { id: "sunset-zine",       Component: SunsetZineDemo,       steps: 2 },
  "monochrome-print":  { id: "monochrome-print",  Component: MonochromePrintDemo,  steps: 2 },
  "vintage-editorial": { id: "vintage-editorial", Component: VintageEditorialDemo, steps: 2 },
  "pastel-dream":      { id: "pastel-dream",      Component: PastelDreamDemo,      steps: 2 },
  "split-canvas":      { id: "split-canvas",      Component: SplitCanvasDemo,      steps: 2 },
  "electric-studio":   { id: "electric-studio",   Component: ElectricStudioDemo,   steps: 2 },
  "indigo-porcelain":  { id: "indigo-porcelain",  Component: IndigoPorcelainDemo,  steps: 2 },
  "forest-ink":        { id: "forest-ink",        Component: ForestInkDemo,        steps: 2 },
  "kraft-paper":       { id: "kraft-paper",       Component: KraftPaperDemo,       steps: 2 },
  "dune":              { id: "dune",              Component: DuneDemo,             steps: 2 },
  "swiss-ikb":         { id: "swiss-ikb",         Component: SwissIkbDemo,         steps: 2 },
  "warm-keynote":      { id: "warm-keynote",      Component: WarmKeynoteDemo,      steps: 2 },
  "chalk-garden":      { id: "chalk-garden",      Component: ChalkGardenDemo,      steps: 2 },
  "terminal-green":    { id: "terminal-green",    Component: TerminalGreenDemo,    steps: 2 },
  "blueprint":         { id: "blueprint",         Component: BlueprintDemo,        steps: 2 },
  "dark-botanical":    { id: "dark-botanical",    Component: DarkBotanicalDemo,    steps: 2 },
  "neon-cyber":        { id: "neon-cyber",        Component: NeonCyberDemo,        steps: 2 },
  "bold-signal":       { id: "bold-signal",       Component: BoldSignalDemo,       steps: 2 },
  "creative-voltage":  { id: "creative-voltage",  Component: CreativeVoltageDemo,  steps: 2 },
};
