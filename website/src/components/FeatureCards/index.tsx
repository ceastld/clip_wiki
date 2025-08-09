import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type FeatureCardItem = {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
};

export type FeatureCardsProps = {
  items: FeatureCardItem[];
  columns?: number;
  className?: string;
};

function IconContainer({icon}: {icon: React.ReactNode}): JSX.Element {
  const content = typeof icon === 'string' ? (
    <span className={styles.icon} aria-hidden>
      {icon}
    </span>
  ) : (
    <span className={styles.icon}>{icon}</span>
  );
  return <div className={styles.iconWrap}>{content}</div>;
}

export default function FeatureCards(props: FeatureCardsProps): JSX.Element {
  const {items, columns = 4, className} = props;
  const normalizedColumns = Math.min(6, Math.max(1, Math.floor(columns)));
  const colSize = Math.max(1, Math.min(12, Math.floor(12 / normalizedColumns)));

  return (
    <section className={clsx(styles.grid, className)}>
      <div className="container">
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className={clsx('col', `col--${colSize}`)}>
              <div className={styles.card}>
                <IconContainer icon={item.icon} />
                <div className={styles.content}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.desc}>{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


