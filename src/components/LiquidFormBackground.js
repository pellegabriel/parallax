import React, { useEffect, useId, useMemo, useRef } from 'react';

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

function buildBlobPath({ cx, cy, rx, ry, amp, timeMs, steps }) {
  const phase = timeMs * 0.0008;
  const phase2 = timeMs * 0.0006;
  const freq1 = 4;
  const freq2 = 9;

  const pts = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const wobble = Math.sin(a * freq1 + phase) + 0.45 * Math.sin(a * freq2 - phase2 * 1.3);
    const rX = rx + amp * wobble;
    const rY = ry + amp * wobble * 0.7;
    const x = cx + Math.cos(a) * rX;
    const y = cy + Math.sin(a) * rY;
    pts.push({ x, y });
  }

  return catmullRomToBezierPath(pts, true);
}

export default function LiquidFormBackground({
  width = 600,
  height = 500,
  waveAmp = 18,
  className,
  style,
}) {
  const pathRef = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const rawUid = useId();
  const uid = useMemo(() => rawUid.replace(/[^a-zA-Z0-9_-]/g, ''), [rawUid]);

  const ids = useMemo(
    () => ({
      grad: `${uid}-liquidFormGrad`,
      glow: `${uid}-liquidFormGlow`,
    }),
    [uid],
  );

  useEffect(() => {
    const steps = 64;

    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const timeMs = ts - startTimeRef.current;

      const cx = width / 2;
      const cy = height / 2;
      const rx = width / 2 - waveAmp - 10;
      const ry = height / 2 - waveAmp - 10;

      const blobD = buildBlobPath({ cx, cy, rx, ry, amp: waveAmp, timeMs, steps });

      if (pathRef.current) {
        pathRef.current.setAttribute('d', blobD);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [width, height, waveAmp]);

  return (
    <svg
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        ...style,
      }}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={ids.grad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#031927" stopOpacity="1" />
          <stop offset="50%" stopColor="#052540" stopOpacity="1" />
          <stop offset="100%" stopColor="#031927" stopOpacity="1" />
        </linearGradient>
        <filter id={ids.glow}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -5"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" mode="normal" />
        </filter>
      </defs>

      <path
        ref={pathRef}
        fill={`url(#${ids.grad})`}
        filter={`url(#${ids.glow})`}
        d="M 0 0 Z"
      />
    </svg>
  );
}
