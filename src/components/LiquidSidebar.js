import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import styles from './LiquidSidebar.module.css';

function easeInOutElastic(t) {
  if (t === 0) return 0;
  if (t === 1) return 1;
  const c4 = (2 * Math.PI) / 4.5;
  if (t < 0.5) {
    return -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c4)) / 2;
  }
  return (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c4)) / 2 + 1;
}

function getBlobPath(t, time, height) {
  const h = height;
  const w = 300;

  if (t <= 0) return 'M-20,0 L-20,0 Z';

  const e = easeInOutElastic(Math.min(t, 1));

  const waveAmp = 22 * (1 - t * 0.6);
  const waveFreq = 0.006;
  const phase = time * 0.0015;

  const pts = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const y = (i / steps) * h;
    const waveOffset =
      Math.sin(y * waveFreq + phase) * waveAmp +
      Math.sin(y * waveFreq * 2.3 + phase * 1.7) * waveAmp * 0.4 +
      Math.sin(y * waveFreq * 0.5 + phase * 0.8) * waveAmp * 0.6;
    const x = w * e + waveOffset;
    pts.push({ x, y });
  }

  let d = 'M -20,0 ';

  const topBulge = 30 * e * Math.sin(time * 0.001);
  d += `C ${w * e * 0.3 + topBulge},-15 ${w * e * 0.7 + topBulge},-15 ${pts[0].x},${pts[0].y} `;

  for (let i = 0; i < pts.length - 1; i++) {
    const cp1x = pts[i].x + (pts[i + 1].x - pts[i].x) * 0.5;
    const cp1y = pts[i].y;
    const cp2x = pts[i].x + (pts[i + 1].x - pts[i].x) * 0.5;
    const cp2y = pts[i + 1].y;
    d += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pts[i + 1].x},${pts[i + 1].y} `;
  }

  const botBulge = 25 * e * Math.sin(time * 0.0013 + 1);
  d += `C ${w * e * 0.7 + botBulge},${h + 15} ${w * e * 0.3 + botBulge},${h + 15} -20,${h} `;
  d += 'Z';

  return d;
}

function updateDrips(t, time, height, drips) {
  const h = height;
  const config = [
    { key: 'drip1', yBase: h * 0.25, delay: 0.3, size: 14 },
    { key: 'drip2', yBase: h * 0.55, delay: 0.5, size: 18 },
    { key: 'drip3', yBase: h * 0.75, delay: 0.4, size: 12 },
    { key: 'drip4', yBase: h * 0.4, delay: 0.6, size: 16 },
  ];

  config.forEach((drip) => {
    const el = drips[drip.key]?.current;
    if (!el) return;

    const localT = Math.max(0, (t - drip.delay) / (1 - drip.delay));

    if (localT <= 0) {
      el.setAttribute('rx', 0);
      el.setAttribute('ry', 0);
      return;
    }

    const phase = time * 0.002 + drip.yBase * 0.01;
    const wobble = Math.sin(phase) * 6 * localT;

    const baseX = 295 * easeInOutElastic(Math.min(t, 1));
    const dripProgress = Math.sin(time * 0.001 + drip.yBase) * 0.5 + 0.5;

    const rx = drip.size * localT * (0.8 + Math.sin(phase * 2) * 0.2);
    const ry = drip.size * localT * (1 + dripProgress * 0.4);

    el.setAttribute('cx', baseX + wobble + drip.size);
    el.setAttribute('cy', drip.yBase);
    el.setAttribute('rx', rx);
    el.setAttribute('ry', ry);
  });
}

export default function LiquidSidebar({
  title = 'Navegación',
  items = [],
  footer = '© 2026 — Todos los derechos',
  initialOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const blobSvgRef = useRef(null);
  const mainBlobRef = useRef(null);
  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  const progressRef = useRef(initialOpen ? 1 : 0);
  const velocityRef = useRef(0);
  const targetRef = useRef(initialOpen ? 1 : 0);

  const heightRef = useRef(typeof window !== 'undefined' ? window.innerHeight : 800);

  const dripRefs = useMemo(
    () => ({
      drip1: React.createRef(),
      drip2: React.createRef(),
      drip3: React.createRef(),
      drip4: React.createRef(),
    }),
    [],
  );

  const rawUid = useId();
  const uid = useMemo(() => rawUid.replace(/[^a-zA-Z0-9_-]/g, ''), [rawUid]);
  const ids = useMemo(
    () => ({
      goo: `${uid}-goo`,
      lavaGrad: `${uid}-lavaGrad`,
      lavaRadial: `${uid}-lavaRadial`,
      blobGlow: `${uid}-blobGlow`,
      softGlow: `${uid}-softGlow`,
    }),
    [uid],
  );

  const resizeSVG = useCallback(() => {
    const svg = blobSvgRef.current;
    if (!svg) return;

    const h = window.innerHeight;
    heightRef.current = h;

    svg.setAttribute('viewBox', `0 0 340 ${h}`);
    svg.style.height = `${h}px`;
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    targetRef.current = 1;
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    targetRef.current = 0;
  }, []);

  useEffect(() => {
    resizeSVG();
    window.addEventListener('resize', resizeSVG);
    return () => window.removeEventListener('resize', resizeSVG);
  }, [resizeSVG]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeMenu]);

  useEffect(() => {
    const animate = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const time = ts - startTimeRef.current;

      const spring = 0.06;
      const damping = 0.75;

      velocityRef.current = velocityRef.current * damping + (targetRef.current - progressRef.current) * spring;
      progressRef.current += velocityRef.current;

      if (
        Math.abs(progressRef.current - targetRef.current) < 0.0005 &&
        Math.abs(velocityRef.current) < 0.0005
      ) {
        progressRef.current = targetRef.current;
        velocityRef.current = 0;
      }

      const blobPath = getBlobPath(progressRef.current, time, heightRef.current);
      if (mainBlobRef.current) mainBlobRef.current.setAttribute('d', blobPath);

      updateDrips(progressRef.current, time, heightRef.current, dripRefs);

      if (blobSvgRef.current) {
        blobSvgRef.current.style.pointerEvents = progressRef.current > 0.01 ? 'all' : 'none';
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [dripRefs]);

  const onHamburgerClick = useCallback(() => {
    if (isOpen) closeMenu();
    else openMenu();
  }, [closeMenu, isOpen, openMenu]);

  const onItemClick = useCallback(
    (item) => {
      closeMenu();
      if (typeof item?.onClick === 'function') item.onClick();
    },
    [closeMenu],
  );

  return (
    <div className={styles.root}>
      <svg className={styles.gooFilter} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={ids.goo}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <button
        type="button"
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
        aria-label="Menu"
        aria-expanded={isOpen}
        onClick={onHamburgerClick}
      >
        <span />
        <span />
        <span />
      </button>

      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayActive : ''}`}
        onClick={closeMenu}
      />

      <svg
        ref={blobSvgRef}
        className={styles.blobSvg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 340 800"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={ids.lavaGrad} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--liquid1)" stopOpacity="1" />
            <stop offset="40%" stopColor="var(--liquid2)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--liquid3)" stopOpacity="1" />
          </linearGradient>
          <radialGradient id={ids.lavaRadial} cx="30%" cy="40%" r="70%">
            <stop offset="0%" stopColor="var(--liquid4)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--liquid3)" stopOpacity="1" />
          </radialGradient>
          <filter id={ids.blobGlow}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" mode="screen" />
          </filter>
          <filter id={ids.softGlow}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g style={{ filter: `url(#${ids.blobGlow})` }}>
          <path ref={mainBlobRef} className={styles.lavaBlob} fill={`url(#${ids.lavaGrad})`} d="M-20,-20 L-20,-20 L-20,-20 Z" />
          <ellipse ref={dripRefs.drip1} cx="-50" cy="200" rx="0" ry="0" fill={`url(#${ids.lavaGrad})`} />
          <ellipse ref={dripRefs.drip2} cx="-50" cy="400" rx="0" ry="0" fill={`url(#${ids.lavaGrad})`} />
          <ellipse ref={dripRefs.drip3} cx="-50" cy="600" rx="0" ry="0" fill={`url(#${ids.lavaGrad})`} />
          <ellipse ref={dripRefs.drip4} cx="-50" cy="300" rx="0" ry="0" fill={`url(#${ids.lavaGrad})`} />
        </g>
      </svg>

      <nav className={`${styles.sidebarContent} ${isOpen ? styles.sidebarContentVisible : ''}`}>
        <p className={styles.sidebarTitle}>{title}</p>
        {items.map((item, idx) => (
          <button
            key={`${item.number ?? idx}-${item.label ?? idx}`}
            type="button"
            className={styles.navItem}
            onClick={() => onItemClick(item)}
          >
            {item.number != null && <span className={styles.navNumber}>{item.number}</span>}
            {item.label}
          </button>
        ))}
        <div className={styles.sidebarFooter}>{footer}</div>
      </nav>
    </div>
  );
}
