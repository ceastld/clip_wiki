import React, { useState, useEffect } from 'react';
import { getLinkPreview } from 'link-preview-js';
import styles from './styles.module.css';

interface LinkPreviewData {
  title: string;
  summary: string;
  icon: string;
  url: string;
}

interface LinkPreviewButtonProps {
  url: string;
  size?: 'big' | 'small';
  className?: string;
  fallbackTitle?: string;
  fallbackSummary?: string;
  fallbackIcon?: string;
}

const LinkPreviewButton: React.FC<LinkPreviewButtonProps> = ({
  url,
  size = 'big',
  className = '',
  fallbackTitle = '',
  fallbackSummary = '',
  fallbackIcon = ''
}) => {
  const [previewData, setPreviewData] = useState<LinkPreviewData>({
    title: fallbackTitle,
    summary: fallbackSummary,
    icon: fallbackIcon,
    url: url
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);
        setError(false);
        
        // Use link-preview-js to get comprehensive link preview data
        const data = await getLinkPreview(url);
        
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        
        // Extract data from the response with proper type checking
        const title = (data as any).title || (data as any).siteName || fallbackTitle || hostname;
        const summary = (data as any).description || fallbackSummary || `访问 ${hostname}`;
        
        // Get the best available image/icon
        let icon = '';
        if ((data as any).images && (data as any).images.length > 0) {
          icon = (data as any).images[0];
        } else if ((data as any).favicons && (data as any).favicons.length > 0) {
          icon = (data as any).favicons[0];
        } else {
          // Fallback to Google favicon service
          icon = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
        }
        
        setPreviewData({
          title: title,
          summary: summary.length > 150 ? summary.substring(0, 150) + '...' : summary,
          icon: icon,
          url: url
        });
        
      } catch (err) {
        console.error('Error fetching link preview:', err);
        setError(true);
        // Use fallback data with Google favicon service
        const urlObj = new URL(url);
        const hostname = urlObj.hostname;
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
        
        setPreviewData({
          title: fallbackTitle || hostname,
          summary: fallbackSummary || `访问 ${hostname}`,
          icon: fallbackIcon || faviconUrl,
          url: url
        });
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPreviewData();
    }
  }, [url, fallbackTitle, fallbackSummary, fallbackIcon]);

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const containerClass = `${styles.container} ${styles[size]} ${className}`;

  return (
    <button 
      className={containerClass}
      onClick={handleClick}
      disabled={loading}
      title={`打开链接: ${url}`}
    >
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h3 className={styles.title}>
            {loading ? '加载中...' : previewData.title}
          </h3>
          <p className={styles.summary}>
            {loading ? '获取预览信息...' : previewData.summary}
          </p>
          <div className={styles.urlContainer}>
            <span className={styles.urlIcon}>🔗</span>
            <span className={styles.url}>{url}</span>
          </div>
        </div>
        <div className={styles.iconContainer}>
          {loading ? (
            <div className={styles.loadingIcon}>⏳</div>
          ) : previewData.icon ? (
            <img 
              src={previewData.icon} 
              alt="网站图标" 
              className={styles.icon}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove(styles.hidden);
              }}
            />
          ) : (
            <div className={`${styles.fallbackIcon} ${previewData.icon ? styles.hidden : ''}`}>
              🌐
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default LinkPreviewButton;
