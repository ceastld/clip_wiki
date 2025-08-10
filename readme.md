# Clip Wiki

知识库项目，基于 Docusaurus 构建。

## 在线访问

🌐 **Vercel 部署**: [https://clip-wiki.vercel.app](https://clip-wiki.vercel.app)  
🌐 **GitHub Pages**: [https://ceastld.github.io/clip_wiki/](https://ceastld.github.io/clip_wiki/)

## 本地开发

```bash
# 进入网站目录
cd website

# 安装依赖
npm install

# 启动开发服务器
npm run start
```

## 部署

本项目支持两种部署方式：

- **Vercel**: 每次推送到 `main` 分支时自动部署
- **GitHub Pages**: 通过 GitHub Actions 自动部署

两种部署方式会同时运行，确保你的站点始终可用。

详细的部署说明请参考 [DEPLOYMENT.md](website/DEPLOYMENT.md)。

## 技术栈

- [Docusaurus](https://docusaurus.io/) - 静态站点生成器
- [React](https://reactjs.org/) - 前端框架
- [TypeScript](https://www.typescriptlang.org/) - 类型安全
- [Vercel](https://vercel.com/) - 部署平台

## 项目结构

```
clip_wiki/
├── website/          # Docusaurus 网站源码
│   ├── docs/         # 文档目录
│   ├── blog/         # 博客目录
│   ├── src/          # 源代码
│   └── static/       # 静态资源
└── README.md         # 项目说明
```

