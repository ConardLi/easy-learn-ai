import type { ComponentType } from "react";

import { AppleHIGDemo } from "./apple-hig";
import { MujiKenyaHaraDemo } from "./muji-kenya-hara";
import { AesopDemo } from "./aesop";
import { DieterRamsBraunDemo } from "./dieter-rams-braun";
import { MonocleMagazineDemo } from "./monocle-magazine";
import { PentagramDemo } from "./pentagram";
import { VignelliSwissHelveticaDemo } from "./vignelli-swiss-helvetica";
import { BloombergTerminalDemo } from "./bloomberg-terminal";
import { TufteDataInkDemo } from "./tufte-dataink";
import { NytTheDailyDemo } from "./nyt-the-daily";
import { LinearDemo } from "./linear";
import { VercelMeshDemo } from "./vercel-mesh";
import { RaycastDemo } from "./raycast";
import { NotionPreAIDemo } from "./notion-pre-ai";
import { FieldIODemo } from "./field-io";
import { ActiveTheoryDemo } from "./active-theory";
import { ResnStorytellingDemo } from "./resn-storytelling";
import { ArenaDemo } from "./are-na";
import { BusinessweekTurleyDemo } from "./bloomberg-businessweek-turley";
import { BalenciagaDemo } from "./balenciaga-post-2017";
import { MailchimpFreddieDemo } from "./mailchimp-freddie";
import { StripePressDemo } from "./stripe-press";
import { HeadspaceDemo } from "./headspace-meditation";
import { Y2KDemo } from "./y2k-retrofuturism";
import { MidCenturyDemo } from "./mid-century-modern";

export type SchoolId =
  | "editorial"
  | "info"
  | "saas"
  | "motion"
  | "brutalist"
  | "humanist"
  | "specialty";

export interface RecipeMeta {
  id: string;
  name: string;
  nameZh: string;
  school: SchoolId;
  schoolLabel: string;
  artifactType: string;
  artifactTypeZh: string;
  vibe: string;
  vibeZh: string;
  signature: string[];
  Component: ComponentType;
  bgPreview: string;
  inkPreview: string;
}

export const SCHOOLS: { id: SchoolId; label: string; labelZh: string; tagline: string }[] = [
  {
    id: "editorial",
    label: "Editorial / Minimalist",
    labelZh: "编辑 / 极简",
    tagline: "Whitespace, refined typography, quiet luxury.",
  },
  {
    id: "info",
    label: "Information Architecture",
    labelZh: "信息架构",
    tagline: "Rational, data-driven, restrained.",
  },
  {
    id: "saas",
    label: "Modern Tool / Builder SaaS",
    labelZh: "现代工具 / Builder SaaS",
    tagline: "Hairline detail, warm dark, single accent.",
  },
  {
    id: "motion",
    label: "Motion / Experimental",
    labelZh: "动态 / 实验",
    tagline: "Bold, generative, sensory.",
  },
  {
    id: "brutalist",
    label: "Brutalist / Raw",
    labelZh: "粗野 / 反设计",
    tagline: "Anti-design, honest, unpolished.",
  },
  {
    id: "humanist",
    label: "Warm Humanist",
    labelZh: "温暖人文",
    tagline: "Approachable, organic, hand-touched.",
  },
  {
    id: "specialty",
    label: "Specialty / Genre",
    labelZh: "类型 / 流派",
    tagline: "Period-coded, decade-coded, theme-coded.",
  },
];

export const RECIPES: RecipeMeta[] = [
  {
    id: "apple-hig",
    name: "Apple HIG",
    nameZh: "Apple HIG",
    school: "editorial",
    schoolLabel: "Editorial / Minimalist",
    artifactType: "Hardware product page",
    artifactTypeZh: "硬件产品页",
    vibe: "SF Pro, generous whitespace, soft elevation — the Apple Store voice.",
    vibeZh: "SF Pro、慷慨的留白、柔和阴影 —— Apple Store 的语气。",
    signature: ["SF Pro Display", "Whitespace 144+", "Section dot-nav", "Specs table"],
    Component: AppleHIGDemo,
    bgPreview: "#FBFBFD",
    inkPreview: "#1D1D1F",
  },
  {
    id: "muji-kenya-hara",
    name: "MUJI · Kenya Hara",
    nameZh: "无印良品 · 原研哉",
    school: "editorial",
    schoolLabel: "Editorial / Minimalist",
    artifactType: "Object catalogue",
    artifactTypeZh: "器物目录",
    vibe: "Emptiness as canvas, ash & paper, every object photographed in air.",
    vibeZh: "空作为画布，灰与纸，每件器物悬浮在空气中拍摄。",
    signature: ["A-OTF Ryumin", "Grid of one column", "Center-axis labels", "No accent color"],
    Component: MujiKenyaHaraDemo,
    bgPreview: "#F4F2EE",
    inkPreview: "#1B1B1B",
  },
  {
    id: "aesop",
    name: "Aesop",
    nameZh: "Aesop",
    school: "editorial",
    schoolLabel: "Editorial / Minimalist",
    artifactType: "Apothecary product page",
    artifactTypeZh: "药剂师产品页",
    vibe: "Warm chamois, sage & amber, serif copy reads like a literary magazine.",
    vibeZh: "暖驼黄、鼠尾草 & 琥珀，衬线正文像文学杂志。",
    signature: ["GT Sectra", "Small-caps labels", "Asymmetric layout", "Single sage prop"],
    Component: AesopDemo,
    bgPreview: "#E8E4D9",
    inkPreview: "#1B1B1B",
  },
  {
    id: "dieter-rams-braun",
    name: "Dieter Rams · Braun",
    nameZh: "Dieter Rams · 博朗",
    school: "editorial",
    schoolLabel: "Editorial / Minimalist",
    artifactType: "Industrial archive",
    artifactTypeZh: "工业设计档案",
    vibe: "10 principles, monochrome grids, technical orthographics — function as form.",
    vibeZh: "十大设计原则、灰阶网格、技术正投影 —— 功能即形式。",
    signature: ["Akzidenz Grotesk", "Numbered principles", "Orthographic line art", "Single orange dot"],
    Component: DieterRamsBraunDemo,
    bgPreview: "#EDEDED",
    inkPreview: "#111111",
  },
  {
    id: "monocle-magazine",
    name: "Monocle",
    nameZh: "Monocle 杂志",
    school: "editorial",
    schoolLabel: "Editorial / Minimalist",
    artifactType: "Magazine contents page",
    artifactTypeZh: "杂志目录页",
    vibe: "Cosmopolitan briefings, navy & coral, footnoted curiosity.",
    vibeZh: "世界主义简报、深海蓝与珊瑚色、脚注式好奇心。",
    signature: ["Plantin display", "City briefings", "Footnote columns", "Coral accent rule"],
    Component: MonocleMagazineDemo,
    bgPreview: "#F4F1E8",
    inkPreview: "#0A1E3D",
  },
  {
    id: "pentagram",
    name: "Pentagram",
    nameZh: "Pentagram",
    school: "info",
    schoolLabel: "Information Architecture",
    artifactType: "Identity specimen",
    artifactTypeZh: "标识样本",
    vibe: "One bold typeface used as artwork, grid as scaffold, ink + ground only.",
    vibeZh: "一种大字体即艺术品，网格作骨架，仅墨色与底色。",
    signature: ["Display type as image", "Hairline grid", "All-caps spec table", "No imagery"],
    Component: PentagramDemo,
    bgPreview: "#FFFFFF",
    inkPreview: "#0A0A0A",
  },
  {
    id: "vignelli-swiss-helvetica",
    name: "Vignelli · Swiss",
    nameZh: "Vignelli · 瑞士派",
    school: "info",
    schoolLabel: "Information Architecture",
    artifactType: "Transit wayfinding poster",
    artifactTypeZh: "公共交通指示海报",
    vibe: "Helvetica at every size, six primary colors, the New York Subway diagram.",
    vibeZh: "全字号 Helvetica、六种主色、纽约地铁信号图。",
    signature: ["Helvetica Neue 75", "Color-coded lines", "Black-bar headers", "Tight 4pt grid"],
    Component: VignelliSwissHelveticaDemo,
    bgPreview: "#FFFFFF",
    inkPreview: "#000000",
  },
  {
    id: "bloomberg-terminal",
    name: "Bloomberg Terminal",
    nameZh: "Bloomberg 终端",
    school: "info",
    schoolLabel: "Information Architecture",
    artifactType: "Trading workstation",
    artifactTypeZh: "交易终端",
    vibe: "Amber on navy-black, mono everywhere, density over comfort.",
    vibeZh: "深海军蓝底上的琥珀色，全等宽，密度高于舒适。",
    signature: ["IBM Plex Mono", "Multi-pane workspace", "Color-coded deltas", "Function keys"],
    Component: BloombergTerminalDemo,
    bgPreview: "#0A0E1A",
    inkPreview: "#FFA02F",
  },
  {
    id: "tufte-dataink",
    name: "Tufte · Data-Ink",
    nameZh: "Tufte · 数据墨水",
    school: "info",
    schoolLabel: "Information Architecture",
    artifactType: "Data narrative essay",
    artifactTypeZh: "数据叙事长文",
    vibe: "Sparklines in body copy, small multiples, no chartjunk.",
    vibeZh: "段落内嵌微图、小型多重图、零图表杂质。",
    signature: ["ET Book serif", "Inline sparklines", "Side-margin notes", "Tan-cream paper"],
    Component: TufteDataInkDemo,
    bgPreview: "#FFFFF8",
    inkPreview: "#111111",
  },
  {
    id: "nyt-the-daily",
    name: "NYT · The Daily",
    nameZh: "纽约时报 · The Daily",
    school: "info",
    schoolLabel: "Information Architecture",
    artifactType: "Article + podcast hub",
    artifactTypeZh: "新闻 + 播客中枢",
    vibe: "Cheltenham over Imperial, dateline above all, the gravity of the broadsheet.",
    vibeZh: "Cheltenham 衬线压在 Imperial 之上，日期线居首，宽幅报纸的重量。",
    signature: ["Cheltenham + Imperial", "Drop cap", "Dateline rule", "Black + crimson play"],
    Component: NytTheDailyDemo,
    bgPreview: "#FFFFFF",
    inkPreview: "#121212",
  },
  {
    id: "linear",
    name: "Linear",
    nameZh: "Linear",
    school: "saas",
    schoolLabel: "Modern Tool / Builder SaaS",
    artifactType: "Product landing",
    artifactTypeZh: "产品落地页",
    vibe: "Warm dark, hairline borders, purple flicks of accent, shortcut chips.",
    vibeZh: "暖色调暗夜、发丝边、紫色点缀、键盘快捷键芯片。",
    signature: ["Inter Tight 600", "Hairline 1px borders", "Subtle hero mesh", "Kbd chips"],
    Component: LinearDemo,
    bgPreview: "#08090A",
    inkPreview: "#F7F8F8",
  },
  {
    id: "vercel-mesh",
    name: "Vercel · Mesh",
    nameZh: "Vercel · 网格",
    school: "saas",
    schoolLabel: "Modern Tool / Builder SaaS",
    artifactType: "Deploy hero",
    artifactTypeZh: "部署落地页",
    vibe: "Pure black, geometric mesh gradient, Geist Sans, command-line clarity.",
    vibeZh: "纯黑、几何网格渐变、Geist Sans、命令行式清晰。",
    signature: ["Geist Sans", "Mesh gradient hero", "Hairline grid", "Triangle motif"],
    Component: VercelMeshDemo,
    bgPreview: "#000000",
    inkPreview: "#FFFFFF",
  },
  {
    id: "raycast",
    name: "Raycast",
    nameZh: "Raycast",
    school: "saas",
    schoolLabel: "Modern Tool / Builder SaaS",
    artifactType: "Command launcher",
    artifactTypeZh: "命令启动器",
    vibe: "Glass card on red-tinted void, keyboard-first, condensed list cells.",
    vibeZh: "红光雾里的玻璃卡片、键盘优先、紧凑列表行。",
    signature: ["SF Pro Rounded", "Frosted glass", "Inline action chips", "⌘K vocabulary"],
    Component: RaycastDemo,
    bgPreview: "#0F0608",
    inkPreview: "#FFFFFF",
  },
  {
    id: "notion-pre-ai",
    name: "Notion · Pre-AI",
    nameZh: "Notion · 前 AI 时代",
    school: "saas",
    schoolLabel: "Modern Tool / Builder SaaS",
    artifactType: "Workspace document",
    artifactTypeZh: "工作区文档",
    vibe: "Off-white pages, drag-handle dots, casual emoji headings, callouts everywhere.",
    vibeZh: "米白页面、拖拽点、随性 emoji 标题、随处可见的提示条。",
    signature: ["Toggle headings", "/ command menu", "Emoji titles", "Callout bands"],
    Component: NotionPreAIDemo,
    bgPreview: "#FFFFFF",
    inkPreview: "#37352F",
  },
  {
    id: "field-io",
    name: "Field.io",
    nameZh: "Field.io",
    school: "motion",
    schoolLabel: "Motion / Experimental",
    artifactType: "Generative case study",
    artifactTypeZh: "生成式案例研究",
    vibe: "Particle systems behind editorial type, code-art aesthetic, dark studio.",
    vibeZh: "粒子系统衬着编辑式字体、代码艺术美学、暗色工作室。",
    signature: ["Animated particles", "Mono captions", "Numbered chapters", "Pure black canvas"],
    Component: FieldIODemo,
    bgPreview: "#050505",
    inkPreview: "#EAEAEA",
  },
  {
    id: "active-theory",
    name: "Active Theory",
    nameZh: "Active Theory",
    school: "motion",
    schoolLabel: "Motion / Experimental",
    artifactType: "Immersive product launch",
    artifactTypeZh: "沉浸式产品发布",
    vibe: "WebGL ambitions, full-bleed type, candy colors over deep black.",
    vibeZh: "WebGL 野心、全屏字、深黑底上的糖果色。",
    signature: ["Full-bleed display", "Crawl interactions", "Saturated gradients", "Cinematic cuts"],
    Component: ActiveTheoryDemo,
    bgPreview: "#070314",
    inkPreview: "#FFFFFF",
  },
  {
    id: "resn-storytelling",
    name: "Resn · Storytelling",
    nameZh: "Resn · 叙事",
    school: "motion",
    schoolLabel: "Motion / Experimental",
    artifactType: "Narrative scroll experience",
    artifactTypeZh: "叙事滚动体验",
    vibe: "Surreal, lush, every frame a tableau, headlines on textured noise.",
    vibeZh: "超现实、浓郁、每一帧都是布景，标题压在噪点纹理上。",
    signature: ["Noisy gradients", "Theatre curtains", "Dripped serif", "Cursor-following light"],
    Component: ResnStorytellingDemo,
    bgPreview: "#170F2B",
    inkPreview: "#F2E8DA",
  },
  {
    id: "are-na",
    name: "Are.na",
    nameZh: "Are.na",
    school: "brutalist",
    schoolLabel: "Brutalist / Raw",
    artifactType: "Channel browse",
    artifactTypeZh: "频道浏览",
    vibe: "System fonts on purpose, browser-default blue links, the honest web.",
    vibeZh: "刻意的系统字体、浏览器默认蓝色链接、诚实的网页。",
    signature: ["System serif/sans", "Underlined blue links", "1px gray borders", "No motion"],
    Component: ArenaDemo,
    bgPreview: "#FFFFFF",
    inkPreview: "#000000",
  },
  {
    id: "bloomberg-businessweek-turley",
    name: "Businessweek · Turley",
    nameZh: "Businessweek · Turley",
    school: "brutalist",
    schoolLabel: "Brutalist / Raw",
    artifactType: "Editorial cover",
    artifactTypeZh: "封面式编辑设计",
    vibe: "Yellow caution + black ink, type as collage, hand-cut headlines.",
    vibeZh: "警示黄 + 黑墨、字体作拼贴、手工剪切式标题。",
    signature: ["Druk display", "Bright yellow ground", "Tabloid headlines", "Stickers + arrows"],
    Component: BusinessweekTurleyDemo,
    bgPreview: "#FFE600",
    inkPreview: "#0A0A0A",
  },
  {
    id: "balenciaga-post-2017",
    name: "Balenciaga · Post-2017",
    nameZh: "Balenciaga · 2017 后",
    school: "brutalist",
    schoolLabel: "Brutalist / Raw",
    artifactType: "Fashion collection",
    artifactTypeZh: "时装系列",
    vibe: "All caps, broken grids, deadpan product on white, anti-luxury luxury.",
    vibeZh: "全大写、破碎网格、白底冷面产品、反奢侈的奢侈。",
    signature: ["Helvetica caps", "Center-aligned columns", "Big SKU codes", "No copy fluff"],
    Component: BalenciagaDemo,
    bgPreview: "#FFFFFF",
    inkPreview: "#000000",
  },
  {
    id: "mailchimp-freddie",
    name: "Mailchimp · Freddie",
    nameZh: "Mailchimp · Freddie",
    school: "humanist",
    schoolLabel: "Warm Humanist",
    artifactType: "Send-first-campaign onboarding",
    artifactTypeZh: "首次发送活动引导",
    vibe: "Cavendish yellow, hand-drawn doodles, conversational copy, the small-business cheerleader.",
    vibeZh: "Cavendish 黄、手绘涂鸦、对话式文案、小生意的拉拉队长。",
    signature: ["Cooper Light", "Black + canary yellow", "Hand-drawn doodles", "Conversational copy"],
    Component: MailchimpFreddieDemo,
    bgPreview: "#FFE01B",
    inkPreview: "#241C15",
  },
  {
    id: "stripe-press",
    name: "Stripe Press",
    nameZh: "Stripe Press",
    school: "humanist",
    schoolLabel: "Warm Humanist",
    artifactType: "Book detail",
    artifactTypeZh: "书籍详情页",
    vibe: "Cream paper, GT Super, hand-bound luxury, ideas as objects.",
    vibeZh: "奶白纸、GT Super、手工装帧式奢华、思想作器物。",
    signature: ["GT Super Display", "Foil-stamp accent", "Two-column body", "Pull-quotes"],
    Component: StripePressDemo,
    bgPreview: "#F9F3E8",
    inkPreview: "#1F1B16",
  },
  {
    id: "headspace-meditation",
    name: "Headspace",
    nameZh: "Headspace",
    school: "humanist",
    schoolLabel: "Warm Humanist",
    artifactType: "Meditation session card",
    artifactTypeZh: "冥想课程卡",
    vibe: "Orange suns, rounded blobs, hand-illustrated calm, a daily reset.",
    vibeZh: "橙色太阳、圆润色团、手绘平静感、每日重置。",
    signature: ["Apercu Pro", "Big rounded blobs", "Pastel palette", "Big play CTA"],
    Component: HeadspaceDemo,
    bgPreview: "#FFE0B4",
    inkPreview: "#1F2236",
  },
  {
    id: "y2k-retrofuturism",
    name: "Y2K Retrofuturism",
    nameZh: "Y2K 复古未来",
    school: "specialty",
    schoolLabel: "Specialty / Genre",
    artifactType: "Y2K portal",
    artifactTypeZh: "Y2K 门户",
    vibe: "Chrome bevels, frosted glass, lava blobs, MSN-blue everywhere.",
    vibeZh: "铬合金倒角、磨砂玻璃、熔岩色块、随处可见的 MSN 蓝。",
    signature: ["Eurostile + Square721", "Chrome buttons", "Holographic gradients", "Pixel bevels"],
    Component: Y2KDemo,
    bgPreview: "#000A1F",
    inkPreview: "#E8F0FF",
  },
  {
    id: "mid-century-modern",
    name: "Mid-Century Modern",
    nameZh: "中世纪现代",
    school: "specialty",
    schoolLabel: "Specialty / Genre",
    artifactType: "Olivetti-era poster",
    artifactTypeZh: "Olivetti 时代海报",
    vibe: "Mustard, brick, cyan; cut-paper geometry; the optimism of 1957.",
    vibeZh: "芥末黄、砖红、青蓝；剪纸式几何；1957 年的乐观主义。",
    signature: ["Futura + Clarendon", "Cut-paper shapes", "Limited 4-color print", "Asymmetric balance"],
    Component: MidCenturyDemo,
    bgPreview: "#F1E6CB",
    inkPreview: "#1F1A12",
  },
];

export function recipesForSchool(school: SchoolId): RecipeMeta[] {
  return RECIPES.filter((r) => r.school === school);
}

export function findRecipe(id: string): RecipeMeta | undefined {
  return RECIPES.find((r) => r.id === id);
}
