import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type QuickerActionInstallButtonProps = {
  /** Action identifier (code in shared links). */
  actionId: string;
  /** Optional extra class name for the root */
  className?: string;
};

type ActionInfo = {
  title?: string;
  icon?: string;
};

async function fetchActionInfoById(id: string): Promise<ActionInfo | undefined> {
  const apiUrl = `https://getquicker.net/open/api/actions/getactioninfo?id=${encodeURIComponent(id)}`;
  try {
    const res = await fetch(apiUrl, { headers: { Accept: 'application/json' } });
    if (!res.ok) return undefined;
    return (await res.json()) as ActionInfo;
  } catch {
    return undefined;
  }
}

const QuickerActionInstallButton: React.FC<QuickerActionInstallButtonProps> = ({ actionId, className }) => {
  const [title, setTitle] = useState<string>('Quicker 动作');
  const [iconUrl, setIconUrl] = useState<string | undefined>(undefined);

  const linkHref = `https://getquicker.net/sharedaction?code=${encodeURIComponent(actionId)}`;

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (!actionId) return;
      const info = await fetchActionInfoById(actionId);
      if (!isMounted || !info) return;
      if (info.title && info.title.trim()) setTitle(info.title.trim());
      if (info.icon && info.icon.trim()) setIconUrl(info.icon.trim());
    })();
    return () => {
      isMounted = false;
    };
  }, [actionId]);

  return (
    <a
      className={clsx(styles.root, className)}
      href={linkHref}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
    >
      <div className={styles.left}>
        {iconUrl ? (
          <img src={iconUrl} alt="action icon" className={styles.icon} loading="lazy" />
        ) : (
          <div className={clsx(styles.icon, styles.iconFallback)} aria-hidden>
            <span>⚡</span>
          </div>
        )}
      </div>
      <div className={styles.center}>
        <div className={styles.title}>{title}</div>
      </div>
    </a>
  );
};

export default QuickerActionInstallButton;


