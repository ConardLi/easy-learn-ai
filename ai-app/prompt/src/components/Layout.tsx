import { Outlet, Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* 主要内容 - 移除容器限制，允许全屏设计 */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 页脚 */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">© 2025 AI提示词库. 让AI创作更简单 ✨</p>
            <div className="mt-4">
              <Link
                to="/admin"
                className="inline-flex items-center space-x-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Settings className="h-3 w-3" />
                <span>管理</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
