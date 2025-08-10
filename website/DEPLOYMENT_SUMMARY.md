# 部署配置总结

## 🎯 配置完成

你的 Clip Wiki 项目现在已经配置为同时支持 **Vercel** 和 **GitHub Pages** 两种部署方式。

## 📁 新增文件

### 配置文件
- `website/vercel.json` - Vercel 部署配置
- `website/.vercelignore` - Vercel 忽略文件
- `.github/workflows/deploy.yml` - GitHub Actions 工作流

### 文档
- `website/DEPLOYMENT.md` - 详细部署指南
- `website/DEPLOYMENT_SUMMARY.md` - 本总结文档

### 脚本
- `website/scripts/test-deployments.js` - 部署配置测试脚本
- `website/scripts/deploy.sh` - Linux/macOS 部署脚本
- `website/scripts/deploy.ps1` - Windows PowerShell 部署脚本

## 🔧 修改文件

### 核心配置
- `website/docusaurus.config.ts` - 添加平台检测逻辑
- `website/package.json` - 添加新的构建脚本和依赖
- `readme.md` - 更新项目说明

## 🌐 访问地址

部署完成后，你的站点将在以下地址可用：

- **Vercel**: https://clip-wiki.vercel.app
- **GitHub Pages**: https://ceastld.github.io/clip_wiki/

## 🚀 部署流程

### 自动部署
1. 推送代码到 `main` 分支
2. Vercel 自动检测并部署
3. GitHub Actions 自动构建并部署到 GitHub Pages

### 手动测试
```bash
# 测试部署配置
npm run test:deploy

# 测试 Vercel 构建
npm run build:vercel

# 测试 GitHub Pages 构建
npm run build:github
```

## ⚙️ 环境变量

### Vercel 环境
- `VERCEL=1` - 标识 Vercel 部署环境
- `NODE_ENV=production` - 生产环境

### GitHub Pages 环境
- `GITHUB_PAGES=1` - 标识 GitHub Pages 部署环境
- `NODE_ENV=production` - 生产环境

## 🔍 配置验证

运行以下命令验证配置：

```bash
cd website
npm run test:deploy
```

## 📋 下一步

1. **提交代码**到 GitHub 仓库
2. **连接 Vercel**：
   - 访问 https://vercel.com
   - 导入你的 GitHub 仓库
   - 选择 `website` 目录作为根目录
3. **启用 GitHub Pages**：
   - 在 GitHub 仓库设置中启用 Pages
   - 选择 "GitHub Actions" 作为部署源
4. **测试部署**：
   - 推送代码到 `main` 分支
   - 检查两个平台的部署状态

## 🎉 完成

配置完成后，你的站点将同时部署到两个平台，提供更好的可用性和冗余性！
