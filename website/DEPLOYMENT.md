# 部署指南

本项目支持两种部署方式：Vercel 和 GitHub Pages。

## 部署方式对比

| 特性 | Vercel | GitHub Pages |
|------|--------|--------------|
| 自动部署 | ✅ | ✅ |
| 自定义域名 | ✅ | ✅ |
| 预览部署 | ✅ | ✅ |
| 构建速度 | 快 | 中等 |
| 免费额度 | 慷慨 | 完全免费 |
| 全球 CDN | ✅ | ✅ |

## 访问地址

- **Vercel**: https://clip-wiki.vercel.app
- **GitHub Pages**: https://ceastld.github.io/clip_wiki/

## Vercel 部署

### 1. 连接 GitHub 仓库

1. 访问 [Vercel](https://vercel.com) 并登录
2. 点击 "New Project"
3. 导入你的 GitHub 仓库 `clip_wiki`
4. 选择 `website` 目录作为根目录

### 2. 配置构建设置

Vercel 会自动检测到以下配置：

- **Framework Preset**: 无（静态站点）
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 3. 环境变量

Vercel 会自动设置以下环境变量：
- `VERCEL`: `1`
- `NODE_ENV`: `production`

### 4. 部署

点击 "Deploy" 按钮，Vercel 将自动构建和部署你的 Docusaurus 站点。

## GitHub Pages 部署

### 1. 启用 GitHub Pages

1. 在 GitHub 仓库设置中，找到 "Pages" 选项
2. 选择 "GitHub Actions" 作为部署源
3. 确保仓库是公开的（免费账户要求）

### 2. 配置 GitHub Actions

项目已包含 `.github/workflows/deploy.yml` 文件，会自动：
- 在推送到 `main` 分支时触发构建
- 使用正确的环境变量构建项目
- 部署到 GitHub Pages

### 3. 权限设置

确保 GitHub Actions 有足够的权限：
- 在仓库设置中启用 "Read and write permissions"
- 允许 GitHub Actions 创建和批准拉取请求

## 自定义域名

### Vercel 自定义域名

1. 在 Vercel 项目设置中添加自定义域名
2. 更新 `docusaurus.config.ts` 中的 `url` 字段（Vercel 部分）
3. 重新部署

### GitHub Pages 自定义域名

1. 在 GitHub 仓库设置中添加自定义域名
2. 更新 `docusaurus.config.ts` 中的 `url` 字段（GitHub Pages 部分）
3. 重新部署

### 配置示例

```typescript
url: isVercel 
  ? 'https://your-custom-domain.com'  // Vercel 域名
  : 'https://ceastld.github.io',      // GitHub Pages 域名
```

## 自动部署

### Vercel 自动部署

每次推送到 `main` 分支时，Vercel 会自动触发新的部署。

### GitHub Pages 自动部署

每次推送到 `main` 分支时，GitHub Actions 会自动：
1. 构建项目
2. 部署到 GitHub Pages
3. 更新站点

### 预览部署

- **Vercel**: 每个 Pull Request 都会创建预览部署
- **GitHub Pages**: 可以通过 GitHub Actions 配置预览部署

## 本地开发

```bash
cd website
npm install
npm run start
```

## 构建测试

```bash
cd website
npm run build
npm run serve
```

## 注意事项

- 确保 `package.json` 中的 Node.js 版本要求与 Vercel 兼容
- 当前配置的 Node.js 版本要求：`>=18.0`
- 如果遇到构建问题，检查 Vercel 构建日志
