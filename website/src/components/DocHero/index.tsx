import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type DocHeroProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  badge?: string;
  className?: string;
};

export default function DocHero(props: DocHeroProps): React.ReactElement {
  const {title, subtitle, align = 'left', badge, className} = props;

  return (
    <section className={clsx(styles.hero, className)}>
      <div className="container">
        <div className={clsx(styles.inner, align === 'center' && styles.center)}>
          {badge ? <span className={styles.badge}>{badge}</span> : null}
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </div>
    </section>
  );
}


