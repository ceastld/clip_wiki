import React, { useState } from 'react';
import Lightbox from 'react-modal-image';
import styles from './styles.module.css';

export type ClickableImageProps = {
  /** Image source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional className for additional styling */
  className?: string;
  /** Optional width */
  width?: number | string;
  /** Optional height */
  height?: number | string;
  /** Whether to show lightbox on click */
  showLightbox?: boolean;
  /** Lightbox large image source (if different from src) */
  largeSrc?: string;
};

const ClickableImage: React.FC<ClickableImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  showLightbox = true,
  largeSrc,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageClick = () => {
    if (showLightbox) {
      setIsLightboxOpen(true);
    }
  };

  const handleLightboxClose = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      <Lightbox
        small={src}
        medium={src}
        large={largeSrc || src}
        alt={alt}
        onClose={handleLightboxClose}
        hideDownload={true}
        hideZoom={false}
        showRotate={true}
        hideTitle={true}
        className={`${styles.clickableImage} ${className || ''}`}
        style={{
          cursor: showLightbox ? 'pointer' : 'default',
          maxWidth: '100%',
          height: 'auto',
          imageRendering: 'crisp-edges',
          objectFit: 'contain',
          border: 'none',
          background: 'none',
        }}
      />
    </>
  );
};

export default ClickableImage;
