import React from 'react';

export type VideoProps = {
  src: string;
  poster?: string;
  width?: number | string;
  height?: number | string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function Video(props: VideoProps): React.JSX.Element {
  const {
    src,
    poster,
    width = '100%',
    height,
    controls = true,
    autoPlay = false,
    muted = false,
    loop = false,
    className,
    style,
  } = props;

  const resolvedWidth = typeof width === 'number' ? `${width}px` : width;
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline
      className={className}
      style={{
        width: resolvedWidth,
        height: resolvedHeight,
        maxWidth: '100%',
        ...style,
      }}
    />
  );
}


