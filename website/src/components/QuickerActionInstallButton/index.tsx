import React, {useCallback, useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export type QuickerActionInstallButtonProps = {
  /** Quicker shared action URL. If not provided, will be derived from actionId. */
  url?: string;
  /** Action identifier (equal to code in shared links). */
  actionId?: string;
  /** Optional explicit title to display; if omitted, the component will try to fetch it from the page */
  title?: string;
  /** Optional explicit icon URL; if omitted, the component will try to fetch it from the page */
  iconUrl?: string;
  /** Whether to attempt fetching metadata from the target URL (default: true) */
  fetchMeta?: boolean;
  /** Optional extra class name for the root */
  className?: string;
};

type FetchedMeta = {
  title?: string;
  iconUrl?: string;
  description?: string;
};

function pickTitleFromActionInfo(data: Record<string, unknown>): string | undefined {
  const direct = data['title'];
  if (typeof direct === 'string' && direct.trim()) return direct.trim();
  const candidates = ['name', 'actionName', 'displayName', 'Name', 'ActionName', 'DisplayName'];
  for (const key of candidates) {
    const val = data[key];
    if (typeof val === 'string' && val.trim().length > 0) return val.trim();
  }
  return undefined;
}

function isLikelyImageUrl(s: string): boolean {
  return /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(s) || /image/.test(s);
}

function absolutizeMaybe(urlOrPath: string, baseUrl: string): string {
  try {
    const abs = new URL(urlOrPath, baseUrl);
    return abs.toString();
  } catch {
    return urlOrPath;
  }
}

function pickIconFromActionInfo(data: Record<string, unknown>, baseUrl: string): string | undefined {
  const direct = data['icon'];
  if (typeof direct === 'string' && direct.trim()) {
    return absolutizeMaybe(direct.trim(), baseUrl);
  }
  const candidates = ['iconUrl', 'image', 'imageUrl', 'logo', 'logoUrl', 'cover', 'coverImage', 'thumbnail', 'thumb', 'Icon', 'IconUrl', 'Image', 'ImageUrl'];
  for (const key of candidates) {
    const val = data[key];
    if (typeof val === 'string' && val.trim().length > 0) {
      const v = val.trim();
      if (/^https?:\/\//i.test(v) || v.startsWith('/') || isLikelyImageUrl(v)) {
        return absolutizeMaybe(v, baseUrl);
      }
    }
  }
  return undefined;
}

function pickDescriptionFromActionInfo(data: Record<string, unknown>): string | undefined {
  const direct = data['description'];
  if (typeof direct === 'string' && direct.trim()) return direct.trim();
  return undefined;
}

async function extractActionIdFromSharedUrl(targetUrl: string): Promise<string | undefined> {
  try {
    // Strip optional leading marker like '@' and whitespaces
    const normalized = targetUrl.trim().replace(/^@+/, '');
    const u = new URL(normalized);
    const idFromCode = u.searchParams.get('code');
    if (idFromCode && idFromCode.trim()) return idFromCode.trim();
    const id = u.searchParams.get('id');
    if (id && id.trim()) return id.trim();
  } catch {
    // ignore
  }
  return undefined;
}

type ActionInfo = {
  id?: string;
  title?: string;
  description?: string;
  createUserSerial?: number;
  createUserNickName?: string;
  icon?: string;
  exeFile?: string;
  revision?: number;
  lastUpdateTimeUtc?: string;
  changeLog?: string;
  createTimeUtc?: string;
  userCount?: number;
  voteCount?: number;
  [k: string]: unknown;
};

async function fetchActionInfoById(id: string, signal?: AbortSignal): Promise<ActionInfo | undefined> {
  const localProxyUrl = `/api/quicker?id=${encodeURIComponent(id)}`;
  try {
    console.log('[QuickerAction] fetch via local proxy start', { id, localProxyUrl });
    const r = await fetch(localProxyUrl, {
      method: 'GET',
      headers: { Accept: 'application/json, text/plain, */*' },
      signal,
    });
    if (!r.ok) {
      console.warn('[QuickerAction] local proxy non-OK', { id, status: r.status, statusText: r.statusText });
      return undefined;
    }
    try {
      const json = (await r.json()) as ActionInfo;
      console.log('[QuickerAction] local proxy success (json)', { id, hasTitle: !!json?.title, hasIcon: !!json?.icon });
      return json;
    } catch {
      const text = await r.text();
      try {
        const parsed = JSON.parse(text) as ActionInfo;
        console.log('[QuickerAction] local proxy success (text->json)', { id, hasTitle: !!parsed?.title, hasIcon: !!parsed?.icon });
        return parsed;
      } catch {
        console.error('[QuickerAction] local proxy parse failed', { id });
        return undefined;
      }
    }
  } catch {
    console.error('[QuickerAction] local proxy error', { id });
    return undefined;
  }
}

const QuickerActionInstallButton: React.FC<QuickerActionInstallButtonProps> = ({
  url,
  actionId,
  title,
  iconUrl,
  fetchMeta = true,
  className,
}) => {
  const [meta, setMeta] = useState<FetchedMeta>({});
  const [isCopying, setIsCopying] = useState<boolean>(false);
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  const finalTitle = title ?? meta.title ?? 'Quicker 动作';
  const finalIconUrl = iconUrl ?? meta.iconUrl;
  const linkHref = useMemo(() => {
    if (url && url.trim().length > 0) {
      const normalized = url.trim().replace(/^@+/, '');
      return normalized;
    }
    const id = (actionId ?? '').trim();
    if (id) {
      // Use sharedaction link for consistency
      return `https://getquicker.net/sharedaction?code=${encodeURIComponent(id)}`;
    }
    return '#';
  }, [url, actionId]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadMeta(): Promise<void> {
      if (!fetchMeta) return;
      try {
        // Only use API to fetch metadata
        let resolvedId = (actionId ?? '').trim();
        if (!resolvedId) {
          const idFromUrl = await extractActionIdFromSharedUrl(linkHref);
          if (idFromUrl) resolvedId = idFromUrl;
        }
        if (!resolvedId) {
          console.warn('[QuickerAction] no actionId resolved', { actionIdProp: actionId, linkHref });
        } else {
          console.log('[QuickerAction] resolved actionId', { resolvedId, actionIdProp: actionId, linkHref });
        }
        if (resolvedId) {
          const info = await fetchActionInfoById(resolvedId, controller.signal);
          if (info && isMounted) {
            const next: FetchedMeta = {
              // Prefer API-defined fields, then safe fallbacks
              title: (info.title && String(info.title)) || pickTitleFromActionInfo(info) || undefined,
              iconUrl: (info.icon && absolutizeMaybe(String(info.icon), 'https://getquicker.net'))
                || pickIconFromActionInfo(info, 'https://getquicker.net')
                || undefined,
              description: pickDescriptionFromActionInfo(info) ?? info.description ?? undefined,
            };
            console.log('[QuickerAction] set fetched meta', { title: next.title, iconUrl: next.iconUrl, hasDescription: !!next.description });
            setMeta(next);
          }
        }
      } catch {
        // Silently ignore network/CORS errors; leave fallbacks
      }
    }

    // Only run on client
    if (typeof window !== 'undefined') {
      loadMeta();
    }
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [linkHref, actionId, fetchMeta]);

  const handleCopy = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(linkHref);
      } else {
        // Fallback: create a temporary textarea
        const textarea = document.createElement('textarea');
        textarea.value = linkHref;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setIsCopying(true);
      setTimeout(() => setIsCopying(false), 1200);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2200);
    } catch {
      // noop
    }
  }, [linkHref]);

  const icon = useMemo(() => {
    if (finalIconUrl) {
      return (
        <img
          src={finalIconUrl}
          alt={finalTitle || 'action icon'}
          className={styles.icon}
          loading="lazy"
        />
      );
    }
    return (
      <div className={clsx(styles.icon, styles.iconFallback)} aria-hidden>
        <span>⚡</span>
      </div>
    );
  }, [finalIconUrl]);

  return (
    <>
      <a
        className={clsx(styles.root, className)}
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        title={finalTitle}
      >
        <div className={styles.left}>{icon}</div>
        <div className={styles.center}>
          <div className={styles.title}>
            {finalTitle}
          </div>
          <div className={styles.subtitle}>点击打开动作页面</div>
        </div>
        <div className={styles.right}>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={handleCopy}
            aria-label="复制动作链接到剪贴板"
          >
            {isCopying ? '已复制' : '复制链接'}
          </button>
        </div>
      </a>
      {toastVisible && (
        <div className={styles.toast} role="status" aria-live="polite">
          已复制到剪贴板，请在Quicker面板的空白按钮上点右键粘贴。
        </div>
      )}
    </>
  );
};

export default QuickerActionInstallButton;


