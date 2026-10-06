import React, { useEffect, useId, useMemo, useRef } from 'react';
import styles from './LiquidFooter.module.css';
import useMediaQuery from './useMediaQuery';
import SocialButtons from '../SocialButtons';

function getBlobPath(time, width, height, edge) {
  const waveAmp = 22 * (1 - 0.6);
  const waveFreq = 0.006;
  const phase = time * 0.0015;
  const pts = [];
  const steps = 20;

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const waveOffset =
      Math.sin(x * waveFreq + phase) * waveAmp +
      Math.sin(x * waveFreq * 2.3 + phase * 1.7) * waveAmp * 0.4 +
      Math.sin(x * waveFreq * 0.5 + phase * 0.8) * waveAmp * 0.6;
    pts.push({ x, y: edge - waveOffset });
  }

  let d = `M ${pts[0].x},${pts[0].y} `;
  for (let i = 0; i < pts.length - 1; i++) {
    const midY = pts[i].y + (pts[i + 1].y - pts[i].y) * 0.5;
    d += `C ${pts[i].x},${midY} ${pts[i + 1].x},${midY} ${pts[i + 1].x},${pts[i + 1].y} `;
  }
  return `${d}L ${width},${height} L 0,${height} Z`;
}

const DRIPS = [
  { x: 0.25, size: 14 },
  { x: 0.55, size: 18 },
  { x: 0.75, size: 12 },
  { x: 0.4, size: 16 },
];

const copyByLanguage = {
  es: { follow: 'Seguinos', description: 'Estrategia, diseño y tecnología para hacer avanzar tu negocio.', contact: 'Contacto', explore: 'Explorá', team: 'Equipo', projects: 'Proyectos', copy: '© 2026 The Cave — Todos los derechos' },
  en: { follow: 'Follow us', description: 'Strategy, design, and technology to move your business forward.', contact: 'Contact', explore: 'Explore', team: 'Team', projects: 'Projects', copy: '© 2026 The Cave — All rights reserved' },
};

export default function LiquidFooter({ copy, onNavigate, language = 'es' }) {
  const t = copyByLanguage[language];
  const rootRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const dripRefs = useRef(DRIPS.map(() => React.createRef()));
  const isMobile = useMediaQuery('(max-width: 900px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const rawUid = useId();
  const uid = useMemo(() => rawUid.replace(/[^a-zA-Z0-9_-]/g, ''), [rawUid]);
  const ids = useMemo(
    () => ({ goo: `${uid}-footerGoo`, lavaGrad: `${uid}-footerLavaGrad` }),
    [uid],
  );

  useEffect(() => {
    let width = 1200;
    let height = 220;
    let time = 0;
    let start = null;
    let frame = null;
    const edge = isMobile ? 28 : 96;

    const draw = () => {
      pathRef.current?.setAttribute('d', getBlobPath(time, width, height, edge));
      DRIPS.forEach((drip, i) => {
        const el = dripRefs.current[i]?.current;
        if (!el) return;
        const xBase = width * drip.x;
        const phase = time * 0.002 + xBase * 0.01;
        const wobble = Math.sin(phase) * 6;
        const dripProgress = Math.sin(time * 0.001 + xBase) * 0.5 + 0.5;
        el.setAttribute('cx', xBase);
        el.setAttribute('cy', edge + 5 - wobble - drip.size);
        el.setAttribute('rx', drip.size * (1 + dripProgress * 0.4));
        el.setAttribute('ry', drip.size * (0.8 + Math.sin(phase * 2) * 0.2));
      });
    };

    const updateSize = () => {
      const el = rootRef.current;
      if (!el) return;
      height = Math.max(160, el.offsetHeight);
      width = Math.max(1, el.offsetWidth);
      svgRef.current?.setAttribute('viewBox', `0 0 ${width} ${height}`);
      draw();
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateSize);
    if (rootRef.current) observer?.observe(rootRef.current);

    if (!reducedMotion) {
      const animate = (ts) => {
        if (start === null) start = ts;
        time = ts - start;
        draw();
        frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      observer?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [reducedMotion, isMobile]);

  return (
    <footer className={styles.footer}>
      <div ref={rootRef} className={styles.liquidArea}>
        <svg ref={svgRef} className={styles.svg} viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={ids.lavaGrad} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--liquid1)" stopOpacity="1" />
              <stop offset="40%" stopColor="var(--liquid2)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--liquid3)" stopOpacity="1" />
            </linearGradient>
            <filter id={ids.goo} x="-20%" y="-60%" width="140%" height="220%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" mode="screen" />
            </filter>
          </defs>
          <g style={{ filter: `url(#${ids.goo})` }}>
            <path ref={pathRef} className={styles.liquidPath} fill={`url(#${ids.lavaGrad})`} />
            {DRIPS.map((drip, i) => (
              <ellipse key={drip.x} ref={dripRefs.current[i]} className={styles.drip} fill={`url(#${ids.lavaGrad})`} cx={drip.x * 1200} cy={96} rx={0} ry={0} />
            ))}
          </g>
        </svg>
        <div className={styles.content}>
          <div className={styles.socialBar}>
            <h3>{t.follow}</h3>
            <SocialButtons compact />
          </div>
          <div className={styles.details}>
            <div className={styles.columns}>
              <div className={styles.brand}>
                <h2>The Cave</h2>
                <p>{t.description}</p>
              </div>
              <div>
                <h3>{t.contact}</h3>
                <a href="mailto:thecave.ar.contac@gmail.com">thecave.ar.contac@gmail.com</a>
              </div>
              <nav aria-label={t.explore}>
                <h3>{t.explore}</h3>
                <a href="#equipo" onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate('equipo'); } }}>{t.team}</a>
                <a href="#proyectos" onClick={(event) => { if (onNavigate) { event.preventDefault(); onNavigate('proyectos'); } }}>{t.projects}</a>
              </nav>
            </div>
            <p className={styles.copy}>{copy ?? t.copy}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
