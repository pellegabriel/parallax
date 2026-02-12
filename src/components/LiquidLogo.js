import React, { useEffect, useId, useMemo, useRef } from 'react';
import styles from './LiquidLogo.module.css';

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

function buildInnerCirclePath({ cx, cy, r }) {
  return `M ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} Z`;
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

  const rawUid = useId();
  const uid = useMemo(() => rawUid.replace(/[^a-zA-Z0-9_-]/g, ''), [rawUid]);

  const ids = useMemo(
    () => ({
      grad: `${uid}-liquidGrad`,
      glow: `${uid}-liquidGlow`,
    }),
    [uid],
  );

  useEffect(() => {
    const steps = 72;

    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const timeMs = ts - startTimeRef.current;

      const cx = size / 2;
      const cy = size / 2;
      const outerR = size / 2;
      const innerR = Math.max(0, size / 2 - border);

      const outer = buildOuterPath({ cx, cy, rBase: outerR, amp: waveAmp, timeMs, steps });
      const inner = buildInnerCirclePath({ cx, cy, r: innerR });

      if (pathRef.current) {
        pathRef.current.setAttribute('d', `${outer} ${inner}`);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [border, size, waveAmp]);

  const innerSize = Math.max(0, size - border * 2);

  return (
    <div className={`${styles.root} ${className ?? ''}`} style={{ width: size, height: size }}>
      <svg className={styles.svg} width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={ids.grad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--liquid1)" stopOpacity="1" />
            <stop offset="45%" stopColor="var(--liquid2)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--liquid3)" stopOpacity="1" />
          </linearGradient>
          <filter id={ids.glow}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" mode="screen" />
          </filter>
        </defs>

        <path
          ref={pathRef}
          className={styles.liquidRing}
          fill={`url(#${ids.grad})`}
          fillRule="evenodd"
          filter={`url(#${ids.glow})`}
          d="M 0 0 Z"
        />
      </svg>

      <img
        src={src}
        alt={alt}
        className={styles.image}
        style={{
          width: innerSize,
          height: innerSize,
          left: border,
          top: border,
          ...imageStyle,
        }}
      />
    </div>
  );
}
