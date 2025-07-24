# 数据库设置指南

## 概述

本项目使用 Supabase 作为后端数据库。在运行应用之前，您需要在 Supabase 中创建必要的数据库表和初始数据。

## 设置步骤

### 1. 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com)
2. 创建新项目或使用现有项目
3. 记录项目的 URL 和 anon key

### 2. 配置环境变量

确保 `.env` 文件中包含正确的 Supabase 配置：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 执行数据库脚本

1. 在 Supabase 控制台中，导航到 "SQL Editor"
2. 复制 `database-setup.sql` 文件的内容
3. 粘贴到 SQL 编辑器中
4. 点击 "Run" 执行脚本

### 4. 验证设置

执行脚本后，您应该看到以下表被创建：

- `prompts` - 存储提示词数据
- `admins` - 存储管理员账户

## 数据库表结构

### prompts 表

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 主键 |
| name | VARCHAR(255) | 提示词名称 |
| source | VARCHAR(100) | 来源 |
| content | TEXT | 提示词内容 |
| description | TEXT | 描述 |
| tags | TEXT[] | 标签数组 |
| translations | JSONB | 翻译内容 |
| category | VARCHAR(100) | 分类 |
| views | INTEGER | 浏览次数 |
| likes | INTEGER | 点赞数 |
| shares | INTEGER | 分享数 |
| is_active | BOOLEAN | 是否激活 |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### admins 表

| 字段 | 类型 | 描述 |
|------|------|------|
| id | UUID | 主键 |
| username | VARCHAR(50) | 用户名 |
| password | VARCHAR(255) | 密码（加密） |
| email | VARCHAR(255) | 邮箱 |
| role | VARCHAR(20) | 角色 |
| created_at | TIMESTAMP | 创建时间 |
| last_login_at | TIMESTAMP | 最后登录时间 |
| updated_at | TIMESTAMP | 更新时间 |

## 初始数据

脚本会自动创建：

1. **管理员账户**：
   - 用户名：`admin`
   - 密码：`admin123`
   - 邮箱：`admin@example.com`

2. **示例提示词**：包含5个不同类别的示例提示词

## 安全设置

脚本会自动配置：

- 行级安全策略（RLS）
- 适当的访问权限
- 性能优化索引

## 故障排除

### 常见错误

1. **"relation does not exist"** - 确保已执行 `database-setup.sql` 脚本
2. **连接错误** - 检查 `.env` 文件中的 Supabase 配置
3. **权限错误** - 确保 RLS 策略已正确设置

### 重置数据库

如果需要重置数据库，可以在 SQL 编辑器中执行：

```sql
DROP TABLE IF EXISTS public.prompts CASCADE;
DROP TABLE IF EXISTS public.admins CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
```

然后重新执行 `database-setup.sql` 脚本。

## 开发建议

1. 在开发环境中使用测试数据
2. 定期备份生产数据
3. 监控数据库性能和使用情况
4. 根据需要调整 RLS 策略

---

完成数据库设置后，您就可以正常运行应用了！