import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import FeatureCards from '@site/src/components/FeatureCards';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.heroDescription}>
            <p>告别频繁切换窗口的繁琐，让复制粘贴效率提升至全新维度</p>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/clip/">
              🚀 开始使用
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/clip/intro/main">
              📖 详细文档
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <div className={styles.clipboardIcon}>📋</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const features = [
    { icon: '⚡', title: '毫秒唤起', description: '启动极快，界面瞬时展示，几乎无等待。' },
    { icon: '📝', title: '自动记录', description: '后台捕获复制到剪贴板的文本、图片与文件路径，随取随用。' },
    { icon: '🔧', title: '界面个性化', description: '自定义背景、字体与主题色，按照偏好搭建你的工作面板。' },
    { icon: '🔗', title: '智能粘贴', description: '针对不同应用选择更合适的粘贴方式，用起来更顺手。' },
    { icon: '⭐', title: '收藏夹', description: '一键收藏常用片段，随时一键调用。' },
    { icon: '📋', title: '快捷复制粘贴', description: '常用内容一键粘贴，减少切换与重复输入。' },
    { icon: '🔎', title: '全局检索', description: '模糊匹配与关键词高亮，快速定位目标剪贴。' },
    { icon: '🕘', title: '历史回溯', description: '保留使用记录，轻松找回之前的内容。' },
    { icon: '🧩', title: '多格式支持', description: '兼容纯文本、富文本、图片、文件等多类型内容。' },
    { icon: '🔒', title: '本地隐私', description: '数据仅保存在本机，隐私与安全更有保障。' },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            ✨ 主要功能
          </Heading>
          <p className={styles.featuresSubtitle}>
            强大的剪贴板管理功能，让您的工作效率提升到新高度
          </p>
        </div>
        <FeatureCards items={features} columns={4} />
      </div>
    </section>
  );
}

function HomepageCTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2" className={styles.ctaTitle}>
            准备好提升工作效率了吗？
          </Heading>
          <p className={styles.ctaDescription}>
            立即开始使用 BetterClip，体验前所未有的剪贴板管理体验
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/clip/">
              🎯 立即开始
            </Link>
            <Link
              className="button button--outline button--lg"
              to="/docs/clip/intro/main">
              📚 查看教程
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description="BetterClip - 强大的剪贴板管理工具，告别频繁切换窗口的繁琐，让复制粘贴效率提升至全新维度">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageCTA />
      </main>
    </Layout>
  );
}
