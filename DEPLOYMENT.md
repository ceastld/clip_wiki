# GitHub Pages 部署指南

本项目使用 GitHub Actions 自动部署 Docusaurus 网站到 GitHub Pages。

## 部署设置

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库设置页面
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分选择 "GitHub Actions"
4. 保存设置

### 2. 配置仓库权限

确保 GitHub Actions 有足够的权限来部署到 GitHub Pages：

1. 进入仓库设置 → Actions → General
2. 在 "Workflow permissions" 部分选择 "Read and write permissions"
3. 勾选 "Allow GitHub Actions to create and approve pull requests"
4. 保存设置

### 3. 自动部署

一旦设置完成，每次推送到 `main` 分支时，GitHub Actions 会自动：

1. 检出代码
2. 安装 Node.js 18
3. 安装项目依赖
4. 构建 Docusaurus 网站
5. 部署到 GitHub Pages

## 手动触发部署

你也可以手动触发部署：

1. 进入仓库的 "Actions" 标签页
2. 选择 "Deploy to GitHub Pages" 工作流
3. 点击 "Run workflow" 按钮

## 访问网站

部署完成后，你的网站将可以通过以下 URL 访问：

```
https://ceastld.github.io/clip_wiki/
```

## 故障排除

### 构建失败

如果构建失败，请检查：

1. Node.js 版本兼容性（项目要求 >= 18.0）
2. 依赖项是否正确安装
3. Docusaurus 配置是否正确

### 部署失败

如果部署失败，请检查：

1. GitHub Pages 是否已启用
2. 仓库权限是否正确设置
3. 工作流权限是否配置正确

## 本地开发

要在本地运行项目：

```bash
cd website
npm install
npm start
```

要在本地构建项目：

```bash
cd website
npm run build
```

## 配置说明

主要配置文件：

- `.github/workflows/deploy.yml` - GitHub Actions 工作流配置
- `website/docusaurus.config.ts` - Docusaurus 配置
- `website/package.json` - 项目依赖和脚本
