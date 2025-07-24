import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminLayout from '../components/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import PromptList from '../pages/PromptList';
import PromptDetail from '../pages/PromptDetail';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import ModelConfig from '../pages/ModelConfig';
import PromptManagement from '../pages/PromptManagement';

const AppRouter = () => {
  return (
    <Routes>
      {/* C端路由 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<PromptList />} />
        <Route path="prompts" element={<PromptList />} />
        <Route path="prompts/:id" element={<PromptDetail />} />
      </Route>
      
      {/* 管理员登录 */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* B端路由 */}
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="models" element={<ModelConfig />} />
        <Route path="prompts" element={<PromptManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;