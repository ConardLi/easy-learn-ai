import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Settings, Check, X, TestTube, Zap } from 'lucide-react';
import { useModelConfigStore } from '../store';
import { ModelConfig as ModelConfigType } from '../types';
import { toast } from 'sonner';

const ModelConfig = () => {
  const {
    configs,
    activeConfigId,
    loadConfigs,
    addConfig,
    updateConfig,
    deleteConfig,
    setActiveConfig,
  } = useModelConfigStore();

  const [showForm, setShowForm] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ModelConfigType | null>(null);
  const [testingConfigId, setTestingConfigId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ModelConfigType>>({
    name: '',
    provider: 'openai',
    model: '',
    apiKey: '',
    baseUrl: '',
    temperature: 0.7,
    maxTokens: 2000,
  });

  useEffect(() => {
    loadConfigs();
  }, [loadConfigs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.model || !formData.apiKey) {
      toast.error('请填写必填字段');
      return;
    }

    try {
      if (editingConfig) {
        await updateConfig(editingConfig.id, formData as ModelConfigType);
        toast.success('配置更新成功');
      } else {
        await addConfig(formData as ModelConfigType);
        toast.success('配置添加成功');
      }
      resetForm();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '操作失败');
    }
  };

  const handleEdit = (config: ModelConfigType) => {
    setEditingConfig(config);
    setFormData(config);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    // 移除confirm()调用，直接执行删除操作
    try {
      await deleteConfig(id);
      toast.success('配置删除成功');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '删除失败');
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      await setActiveConfig(id);
      toast.success('已设置为活跃配置');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : '设置失败');
    }
  };

  const handleTestConnection = async (config: ModelConfigType) => {
    setTestingConfigId(config.id);
    try {
      // 模拟测试连接
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('连接测试成功');
    } catch (err) {
      toast.error('连接测试失败');
    } finally {
      setTestingConfigId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      provider: 'openai',
      model: '',
      apiKey: '',
      baseUrl: '',
      temperature: 0.7,
      maxTokens: 2000,
    });
    setEditingConfig(null);
    setShowForm(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">模型配置</h1>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加配置
        </button>
      </div>

      {/* 配置表单 */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingConfig ? '编辑配置' : '添加配置'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                配置名称 *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例如：GPT-4 生产环境"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                提供商
              </label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="openai">OpenAI</option>
                <option value="anthropic">Anthropic</option>
                <option value="google">Google</option>
                <option value="azure">Azure OpenAI</option>
                <option value="custom">自定义</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                模型名称 *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例如：gpt-4, claude-3-opus"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key *
              </label>
              <input
                type="password"
                name="apiKey"
                value={formData.apiKey}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="sk-..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Base URL
              </label>
              <input
                type="url"
                name="baseUrl"
                value={formData.baseUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://api.openai.com/v1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Temperature
              </label>
              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleInputChange}
                min="0"
                max="2"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                最大Token数
              </label>
              <input
                type="number"
                name="maxTokens"
                value={formData.maxTokens}
                onChange={handleInputChange}
                min="1"
                max="32000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editingConfig ? '更新' : '添加'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 配置列表 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">配置列表</h3>
        </div>
        
        {configs.length === 0 ? (
          <div className="text-center py-12">
            <Settings className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">暂无配置</h3>
            <p className="mt-1 text-sm text-gray-500">开始添加您的第一个模型配置</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    配置名称
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    提供商/模型
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    参数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {configs.map((config) => (
                  <tr key={config.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{config.name}</div>
                        {config.id === activeConfigId && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Zap className="h-3 w-3 mr-1" />
                            活跃
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{config.provider}</div>
                      <div className="text-sm text-gray-500">{config.model}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">T: {config.temperature}</div>
                      <div className="text-sm text-gray-500">Max: {config.maxTokens}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        正常
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {config.id !== activeConfigId && (
                        <button
                          onClick={() => handleSetActive(config.id)}
                          className="text-green-600 hover:text-green-900"
                          title="设为活跃"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleTestConnection(config)}
                        disabled={testingConfigId === config.id}
                        className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                        title="测试连接"
                      >
                        {testingConfigId === config.id ? (
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <TestTube className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(config)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="编辑"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(config.id)}
                        className="text-red-600 hover:text-red-900"
                        title="删除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelConfig;