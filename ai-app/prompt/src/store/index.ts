import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Admin, ModelConfig } from '../types';

// 认证状态
interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (admin: Admin, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    admin: null,
    token: null,
    isAuthenticated: false,
    login: (admin, token) => set({ admin, token, isAuthenticated: true }),
    logout: () => set({ admin: null, token: null, isAuthenticated: false }),
  }),
  {
    name: 'auth-storage',
  }
));

// 模型配置状态
interface ModelConfigState {
  configs: ModelConfig[];
  activeConfig: ModelConfig | null;
  activeConfigId: string | null;
  loadConfigs: () => void;
  addConfig: (config: Omit<ModelConfig, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateConfig: (id: string, config: Partial<ModelConfig>) => void;
  deleteConfig: (id: string) => void;
  setActiveConfig: (id: string) => void;
  getActiveConfig: () => ModelConfig | null;
}

export const useModelConfigStore = create<ModelConfigState>()(persist(
  (set, get) => ({
    configs: [],
    activeConfig: null,
    activeConfigId: null,
    loadConfigs: () => {
      // 从持久化存储中加载配置，这里已经通过persist中间件自动处理
      const state = get();
      if (state.configs.length > 0 && !state.activeConfig) {
        const activeConfig = state.configs.find(c => c.isActive) || state.configs[0];
        set({ activeConfig, activeConfigId: activeConfig?.id || null });
      }
    },
    addConfig: (config) => {
      const newConfig: ModelConfig = {
        ...config,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({ 
        configs: [...state.configs, newConfig],
        activeConfig: state.configs.length === 0 ? newConfig : state.activeConfig
      }));
    },
    updateConfig: (id, updates) => {
      set((state) => ({
        configs: state.configs.map((config) =>
          config.id === id
            ? { ...config, ...updates, updatedAt: new Date().toISOString() }
            : config
        ),
        activeConfig: state.activeConfig?.id === id
          ? { ...state.activeConfig, ...updates, updatedAt: new Date().toISOString() }
          : state.activeConfig
      }));
    },
    deleteConfig: (id) => {
      set((state) => {
        const newConfigs = state.configs.filter((config) => config.id !== id);
        return {
          configs: newConfigs,
          activeConfig: state.activeConfig?.id === id
            ? newConfigs.find(c => c.isActive) || newConfigs[0] || null
            : state.activeConfig
        };
      });
    },
    setActiveConfig: (id) => {
      const config = get().configs.find((c) => c.id === id);
      if (config) {
        set((state) => ({
          configs: state.configs.map((c) => ({ ...c, isActive: c.id === id })),
          activeConfig: config,
          activeConfigId: id
        }));
      }
    },
    getActiveConfig: () => {
      const state = get();
      return state.activeConfig || state.configs.find(c => c.isActive) || null;
    },
  }),
  {
    name: 'model-config-storage',
  }
));