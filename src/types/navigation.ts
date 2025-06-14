export interface AITool {
  title: string;
  description: string;
  url: string;
  icon: string;
}

export interface NavigationData {
  [category: string]: AITool[];
}

export interface SearchResult extends AITool {
  category: string;
}
