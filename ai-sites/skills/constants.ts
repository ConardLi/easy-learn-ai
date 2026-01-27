import { SceneHook } from './scenes/SceneHook';
import { SceneIntro } from './scenes/SceneIntro';
import { SceneTimeline } from './scenes/SceneTimeline';
import { SceneTraditionalAI } from './scenes/SceneTraditionalAI';
import { SceneAgentMetaphor } from './scenes/SceneAgentMetaphor';
import { SceneProgrammingAnalogy } from './scenes/SceneProgrammingAnalogy';
import { SceneSkillStructure } from './scenes/SceneSkillStructure';
import { SceneSkillDiscovery } from './scenes/SceneSkillDiscovery';
import { SceneSkillExample } from './scenes/SceneSkillExample';
import { SceneAlternatives } from './scenes/SceneAlternatives';
import { SceneContextExplosion } from './scenes/SceneContextExplosion';
import { SceneProgressiveDisclosure } from './scenes/SceneProgressiveDisclosure';
import { SceneLibraryAnalogy } from './scenes/SceneLibraryAnalogy';
import { SceneMetadataLayer } from './scenes/SceneMetadataLayer';
import { SceneInstructionsLayer } from './scenes/SceneInstructionsLayer';
import { SceneRuntimeReference } from './scenes/SceneRuntimeReference';
import { SceneRuntimeScript } from './scenes/SceneRuntimeScript';
import { SceneRuntimeSummary } from './scenes/SceneRuntimeSummary';
import { SceneMCPTransition } from './scenes/SceneMCPTransition';
import { SceneMCPAnalogy } from './scenes/SceneMCPAnalogy';
import { SceneMCPHiddenCost } from './scenes/SceneMCPHiddenCost';
import { SceneMCPTokenCost } from './scenes/SceneMCPTokenCost';
import { SceneMCPAtlas } from './scenes/SceneMCPAtlas';
import { SceneSolutionRecap } from './scenes/SceneSolutionRecap';
import { SceneMCPConclusion } from './scenes/SceneMCPConclusion';
import { SceneMCPValue } from './scenes/SceneMCPValue';
import { SceneSkillUseCases } from './scenes/SceneSkillUseCases';
import { SceneFutureLandscape } from './scenes/SceneFutureLandscape';
import { SceneConfig } from './types';

// The order of scenes in the presentation
export const SCENE_REGISTRY: SceneConfig[] = [
  {
    id: 'hook',
    title: '本期看点',
    component: SceneHook,
    totalSteps: 6, // 1 title + 5 questions
  },
  {
    id: 'intro',
    title: '开场介绍',
    component: SceneIntro,
    totalSteps: 2, // 1 hello + 1 identity
  },
  {
    id: 'timeline',
    title: '发展历程',
    component: SceneTimeline,
    totalSteps: 5, // 1 intro + 4 milestones
  },
  {
    id: 'traditional_ai',
    title: '传统模式',
    component: SceneTraditionalAI,
    totalSteps: 5, // Title, Data, Context, Intern, Pivot
  },
  {
    id: 'agent_metaphor',
    title: 'Skills 原理',
    component: SceneAgentMetaphor,
    totalSteps: 4, // Brain, Toolbox, Manual, Workflow
  },
  {
    id: 'prog_analogy',
    title: '代码隐喻',
    component: SceneProgrammingAnalogy,
    totalSteps: 5, // Intro, Logic, Import, NodeModules, Exec
  },
  {
    id: 'skill_structure',
    title: '结构解析',
    component: SceneSkillStructure,
    totalSteps: 6, // Intro, Root, MD, Ref, Script, Asset
  },
  {
    id: 'skill_discovery',
    title: '自动发现',
    component: SceneSkillDiscovery,
    totalSteps: 6, // Intro, Explorer, Chat, Typing, Scanning, Success
  },
  {
    id: 'skill_example',
    title: '实战示例',
    component: SceneSkillExample,
    totalSteps: 4, // Intro, Frontmatter, Details, Body
  },
  {
    id: 'alternatives',
    title: '普通方案？',
    component: SceneAlternatives,
    totalSteps: 4, // Title, Inputs, Merge, Conclusion
  },
  {
    id: 'context_explosion',
    title: 'Context 爆炸',
    component: SceneContextExplosion,
    totalSteps: 4, // Scenario, Filling, Cost, Distraction
  },
  {
    id: 'progressive_disclosure',
    title: '渐进式披露',
    component: SceneProgressiveDisclosure,
    totalSteps: 4, // Title, Term, Meaning, Smart
  },
  {
    id: 'library_analogy',
    title: '图书馆隐喻',
    component: SceneLibraryAnalogy,
    totalSteps: 4, // Title, Step1, Step2, Step3
  },
  {
    id: 'metadata_layer',
    title: '第一层：Metadata',
    component: SceneMetadataLayer,
    totalSteps: 4, // Title, When/What, Why, Result
  },
  {
    id: 'instructions_layer',
    title: '第二层：Instructions',
    component: SceneInstructionsLayer,
    totalSteps: 4, // Title, When, What, Utility
  },
  {
    id: 'runtime_ref',
    title: '第三层：Reference',
    component: SceneRuntimeReference,
    totalSteps: 4, // Title, When, Intent, Split
  },
  {
    id: 'runtime_script',
    title: '第三层：Scripts',
    component: SceneRuntimeScript,
    totalSteps: 4, // Title, HeavyFile, Block, Result
  },
  {
    id: 'runtime_summary',
    title: '核心优势',
    component: SceneRuntimeSummary,
    totalSteps: 5, // Title, Package, Brain, Block, Text
  },
  {
    id: 'mcp_transition',
    title: '似曾相识？',
    component: SceneMCPTransition,
    totalSteps: 4, // Title, Visuals, Similarity, Confusion
  },
  {
    id: 'mcp_analogy',
    title: 'MCP 复习',
    component: SceneMCPAnalogy,
    totalSteps: 4, // Title, Hub, Connect, Text
  },
  {
    id: 'mcp_hidden_cost',
    title: 'MCP 隐形成本',
    component: SceneMCPHiddenCost,
    totalSteps: 4, // Title, Setup, Illusion, Reality
  },
  {
    id: 'mcp_token_cost',
    title: 'Token 黑洞',
    component: SceneMCPTokenCost,
    totalSteps: 4, // Title, Math, Multiplier, Contrast
  },
  {
    id: 'mcp_atlas',
    title: 'MCP Atlas',
    component: SceneMCPAtlas,
    totalSteps: 4, // Title, Attention Drop, Atlas Setup, Chart
  },
  {
    id: 'solution_recap',
    title: '双重优势',
    component: SceneSolutionRecap,
    totalSteps: 4, // Title, Token Saving, Attention Funnel, Conclusion
  },
  {
    id: 'mcp_conclusion',
    title: 'MCP 终局',
    component: SceneMCPConclusion,
    totalSteps: 3, // Title, Answer, Chart
  },
  {
    id: 'mcp_value',
    title: 'MCP 核心价值',
    component: SceneMCPValue,
    totalSteps: 3, // Title, Contrast, Connect World
  },
  {
    id: 'skill_use_cases',
    title: 'Skill 场景',
    component: SceneSkillUseCases,
    totalSteps: 3, // Title, Cases, Evolution
  },
  {
    id: 'future_landscape',
    title: '未来格局',
    component: SceneFutureLandscape,
    totalSteps: 5, // Title, Core, MCP, Skills, Orchestration
  },
];

export const COLORS = {
  chalkWhite: '#f4f4f5',
  chalkYellow: '#fde047',
  chalkBlue: '#93c5fd',
  chalkRed: '#fca5a5',
  chalkGreen: '#86efac',
  bg: '#1e1e24', // Dark slate
};