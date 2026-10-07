import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Monitor } from 'lucide-react';
import projectList from '../projects';
import useMediaQuery from './useMediaQuery';
import styles from './ProjectsSection.module.css';

const copy = {
  es: {
    title: 'Proyectos', introduction: 'Una ventana a lo que hacemos en The Cave.', carousel: 'Visor de proyectos', previous: 'Proyecto anterior', next: 'Proyecto siguiente',
    open: 'Abrir proyecto', newTab: ' (nueva pestaña)', gallery: (title) => `Capturas de ${title}`, previousShot: 'Desplazar capturas hacia atrás', nextShot: 'Desplazar capturas hacia adelante',
    shotsMissing: 'Capturas no disponibles', emptyPreview: 'Acá se van a ver las capturas de cada proyecto', emptyHint: 'Las capturas de cada proyecto se muestran en esta galería',
    problem: 'El problema', work: 'Lo que hice', result: 'El resultado',
    help: 'Usá las flechas para cambiar de proyecto y deslizá la galería para ver más capturas. Con el foco en el carrusel, usá ←, →, Inicio o Fin.', position: (index, count) => `${index} de ${count}`,
  },
  en: {
    title: 'Projects', introduction: 'A look at what we create at The Cave.', carousel: 'Project carousel', previous: 'Previous project', next: 'Next project',
    open: 'Open project', newTab: ' (new tab)', gallery: (title) => `${title} screenshots`, previousShot: 'Scroll screenshots backwards', nextShot: 'Scroll screenshots forwards',
    shotsMissing: 'Screenshots unavailable', emptyPreview: 'Screenshots of each project will appear here', emptyHint: 'Each project shows its screenshots in this gallery',
    problem: 'The problem', work: 'What I built', result: 'The result',
    help: 'Use the arrows to switch projects and scroll the gallery to see more screenshots. When the carousel has focus, use ←, →, Home, or End.', position: (index, count) => `${index} of ${count}`,
  },
};

function imageAlt(image, language) {
  if (typeof image.alt === 'string') return image.alt;
  return image.alt?.[language] ?? image.alt?.es ?? '';
}

function ProjectGallery({ project, language, reducedMotion, t }) {
  const [failed, setFailed] = useState(() => new Set());
  const stripRef = useRef(null);
  const images = (project.images || []).filter((image) => !failed.has(image.src));

  const scrollStrip = (direction) => {
    const strip = stripRef.current;
    strip?.scrollBy?.({ left: direction * strip.clientWidth * 0.85, top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className={styles.gallery}>
      {images.length > 0 && (
        <button type="button" className={`${styles.shotArrow} ${styles.shotPrev}`} aria-label={t.previousShot} onClick={() => scrollStrip(-1)}>
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
      )}
      <div ref={stripRef} className={styles.strip} role="group" aria-label={t.gallery(project.title)} tabIndex={0}>
        {images.length ? (
          images.map((image) => (
            <img
              key={image.src}
              className={styles.shot}
              src={image.src}
              alt={imageAlt(image, language)}
              loading="lazy"
              onError={() => setFailed((hidden) => new Set(hidden).add(image.src))}
            />
          ))
        ) : (
          <div className={styles.placeholder}>
            <Monitor size={40} aria-hidden="true" />
            <p>{t.shotsMissing}</p>
          </div>
        )}
      </div>
      {images.length > 0 && (
        <button type="button" className={`${styles.shotArrow} ${styles.shotNext}`} aria-label={t.nextShot} onClick={() => scrollStrip(1)}>
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default function ProjectsSection({ projects = projectList, language = 'es' }) {
  const t = copy[language];
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [selectedId, setSelectedId] = useState(null);
  const index = Math.max(0, projects.findIndex((project) => project.id === selectedId));
  const originalProject = projects[index];
  const project = originalProject && { ...originalProject, ...(originalProject.translations?.[language] ?? originalProject.translations?.es) };

  const navigate = (position) => {
    if (projects.length < 2) return;
    const nextIndex = (position + projects.length) % projects.length;
    setSelectedId(projects[nextIndex].id);
  };

  const onKeyDown = (event) => {
    if (event.target !== event.currentTarget || event.altKey || event.ctrlKey || event.metaKey || projects.length < 2) return;
    const positions = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: projects.length - 1 };
    if (positions[event.key] === undefined) return;
    event.preventDefault();
    navigate(positions[event.key]);
  };

  return (
    <section id="proyectos" tabIndex={-1} aria-labelledby="projects-title" className={`page-section ${styles.section}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="projects-title" className={styles.title}>{t.title}</h2>
          <p>{t.introduction}</p>
        </header>
        {!project ? (
          <div className={styles.carousel} role="region" aria-roledescription={language === 'en' ? 'carousel' : 'carrusel'} aria-label={t.carousel}>
            <div className={styles.navigation}>
              <button type="button" className={styles.arrow} aria-label={t.previous} disabled>
                <ArrowLeft size={22} aria-hidden="true" />
              </button>
              <span role="status" className={styles.counter}>{t.position(0, 0)}</span>
              <button type="button" className={styles.arrow} aria-label={t.next} disabled>
                <ArrowRight size={22} aria-hidden="true" />
              </button>
            </div>
            <article className={styles.project}>
              <div className={styles.placeholder}>
                <Monitor size={48} aria-hidden="true" />
                <p>{t.emptyPreview}</p>
                <span>{t.emptyHint}</span>
              </div>
            </article>
          </div>
        ) : (
          <div className={styles.carousel} role="region" aria-roledescription={language === 'en' ? 'carousel' : 'carrusel'} aria-label={t.carousel} aria-describedby="projects-help" tabIndex={0} onKeyDown={onKeyDown}>
            <div className={styles.navigation}>
              <button type="button" className={styles.arrow} aria-label={t.previous} disabled={projects.length < 2} onClick={() => navigate(index - 1)}>
                <ArrowLeft size={22} aria-hidden="true" />
              </button>
              <span role="status" aria-live="polite" aria-atomic="true" className={styles.counter}>
                {t.position(index + 1, projects.length)}<span className={styles.srOnly}>: {project.title}</span>
              </span>
              <button type="button" className={styles.arrow} aria-label={t.next} disabled={projects.length < 2} onClick={() => navigate(index + 1)}>
                <ArrowRight size={22} aria-hidden="true" />
              </button>
            </div>
            <article className={styles.project} aria-labelledby="project-title">
              <h3 id="project-title" className={styles.projectTitle}>{project.title}</h3>
              {project.description && <p className={styles.description}>{project.description}</p>}
              {(project.problem || project.work || project.result) && (
                <dl className={styles.details}>
                  {[['work', t.work], ['problem', t.problem], ['result', t.result]]
                    .filter(([key]) => project[key])
                    .map(([key, label]) => (
                      <div key={key} className={styles.detail}>
                        <dt>{label}</dt>
                        <dd>{project[key]}</dd>
                      </div>
                    ))}
                </dl>
              )}
              <div className={styles.actions}>
                <a className={styles.externalLink} href={project.publicUrl} target="_blank" rel="noopener noreferrer">
                  {t.open} <ExternalLink size={18} aria-hidden="true" />
                  <span className={styles.srOnly}>{t.newTab}</span>
                </a>
              </div>
              <ProjectGallery key={project.id} project={project} language={language} reducedMotion={reducedMotion} t={t} />
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
