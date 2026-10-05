import React, { useEffect, useRef } from 'react';
import styles from './LiquidLogo.module.css';
import useMediaQuery from './useMediaQuery';

function catmullRomToBezierPath(points, closed = true) {
  if (!points.length) return 'M 0 0 Z';

  const n = points.length;
  let d = `M ${points[0].x} ${points[0].y}`;

  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i % n];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;

    if (!closed && i === n - 2) break;
  }

  return `${d} Z`;
}

function buildOuterPath({ cx, cy, rBase, amp, timeMs, steps }) {
  const phase = timeMs * 0.0012;
  const phase2 = timeMs * 0.0009;
  const freq1 = 3;
  const freq2 = 7;

  const pts = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const wobble = Math.sin(a * freq1 + phase) + 0.55 * Math.sin(a * freq2 - phase2 * 1.4);
    const r = rBase + amp * wobble;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    pts.push({ x, y });
  }

  return catmullRomToBezierPath(pts, true);
}

export default function LiquidLogo({
  src,
  alt,
  size = 120,
  border = 14,
  waveAmp = 5,
  className,
  imageStyle,
}) {
  const pathRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const staticPath = buildOuterPath({ cx: size / 2, cy: size / 2, rBase: size / 2, amp: waveAmp, timeMs: 0, steps: 72 });

  useEffect(() => {
    if (reducedMotion) {
      pathRef.current?.setAttribute('d', staticPath);
      return;
    }
    const steps = 72;

    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const timeMs = ts - startTimeRef.current;

      const cx = size / 2;
      const cy = size / 2;
      const outerR = size / 2;

      const outer = buildOuterPath({ cx, cy, rBase: outerR, amp: waveAmp, timeMs, steps });

      if (pathRef.current) {
        pathRef.current.setAttribute('d', outer);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [size, waveAmp, reducedMotion, staticPath]);

  const logoSize = Math.max(0, size - border * 2) * 0.65;
  const logoOffset = (size - logoSize) / 2;

  return (
    <div className={`${styles.root} ${className ?? ''}`} style={{ width: size, height: size }}>
      <svg className={styles.svg} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          className={styles.liquidRing}
          fill="var(--liquid-color)"
          d={staticPath}
        />
      </svg>

      <img
        src={src}
        alt={alt}
        className={styles.image}
        style={{
          width: logoSize,
          height: logoSize,
          left: logoOffset,
          top: logoOffset,
          ...imageStyle,
        }}
      />
    </div>
  );
}
