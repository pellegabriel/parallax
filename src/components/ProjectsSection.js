import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Monitor } from 'lucide-react';
import BlobButton from './BlobButton';
import projectList from '../projects';
import styles from './ProjectsSection.module.css';

const copy = {
  es: {
    title: 'Proyectos', introduction: 'Una ventana a lo que hacemos en The Cave.', carousel: 'Visor de proyectos', previous: 'Proyecto anterior', next: 'Proyecto siguiente',
    enter: 'Activar vista interactiva', exit: 'Salir de la vista interactiva', open: 'Abrir proyecto', newTab: ' (nueva pestaña)', frame: (title) => `Vista interactiva de ${title}`, preview: (title) => `Vista previa de ${title}`, coverMissing: 'Portada no disponible',
    slow: 'Si el sitio tarda o no permite mostrarse aquí, podés salir de la vista interactiva para volver a la vista previa o abrir el proyecto en otra pestaña.',
    interactiveHint: 'La web se carga únicamente al activar la vista interactiva. También podés abrirla en otra pestaña.', noEmbed: 'Este proyecto está disponible en una pestaña nueva; no tiene una vista interactiva integrada.',
    emptyPreview: 'Acá se va a ver la vista interactiva de cada proyecto', emptyHint: 'El sitio web del proyecto se carga en este recuadro solo cuando lo actives', help: 'Usá las flechas o deslizá la vista previa. Con el foco en el carrusel, usá ←, →, Inicio o Fin.', position: (index, count) => `${index} de ${count}`,
  },
  en: {
    title: 'Projects', introduction: 'A look at what we create at The Cave.', carousel: 'Project carousel', previous: 'Previous project', next: 'Next project',
    enter: 'Enable interactive preview', exit: 'Exit interactive preview', open: 'Open project', newTab: ' (new tab)', frame: (title) => `Interactive preview of ${title}`, preview: (title) => `Preview of ${title}`, coverMissing: 'Cover unavailable',
    slow: 'If the site takes a while to load or cannot be displayed here, you can exit the interactive preview or open the project in a new tab.',
    interactiveHint: 'The website loads only when you enable the interactive preview. You can also open it in a new tab.', noEmbed: 'This project opens in a new tab and has no embedded interactive preview.',
    emptyPreview: 'An interactive preview of each project will appear here', emptyHint: 'The project website loads in this frame only when you enable it', help: 'Use the arrows or swipe the preview. When the carousel has focus, use ←, →, Home, or End.', position: (index, count) => `${index} of ${count}`,
  },
};

function ProjectPreview({ project, onSwipe, t }) {
  const [interactive, setInteractive] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);
  const touch = useRef(null);
  const actionRef = useRef(null);

  const toggleInteractive = () => {
    setInteractive((active) => !active);
    actionRef.current?.focus({ preventScroll: true });
  };

  const startTouch = (event) => {
    const point = event.touches[0];
    touch.current = event.touches.length === 1 ? { x: point.clientX, y: point.clientY } : null;
  };

  const moveTouch = (event) => {
    if (!touch.current) return;
    const point = event.touches[0];
    if (event.touches.length !== 1 ||
      Math.abs(point.clientY - touch.current.y) > Math.max(12, Math.abs(point.clientX - touch.current.x))) {
      touch.current = null;
    }
  };

  const endTouch = (event) => {
    const start = touch.current;
    touch.current = null;
    if (!start || !event.changedTouches.length) return;
    const point = event.changedTouches[0];
    const dx = point.clientX - start.x;
    const dy = point.clientY - start.y;
    if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5) onSwipe(dx < 0 ? 1 : -1);
  };

  return (
    <article className={styles.project} aria-labelledby="project-title">
      <h3 id="project-title" className={styles.projectTitle}>{project.title}</h3>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.actions}>
        {project.embedUrl && (
          <BlobButton ref={actionRef} onClick={toggleInteractive} aria-controls="project-viewport" aria-pressed={interactive} className={styles.interactiveButton}>
            {interactive ? t.exit : t.enter}
          </BlobButton>
        )}
        <a className={styles.externalLink} href={project.publicUrl} target="_blank" rel="noopener noreferrer">
          {t.open} <ExternalLink size={18} aria-hidden="true" />
          <span className={styles.srOnly}>{t.newTab}</span>
        </a>
      </div>
      <div id="project-viewport" className={styles.viewport}>
        {interactive ? (
          <iframe
            key={project.id}
            className={styles.iframe}
            src={project.embedUrl}
            title={t.frame(project.title)}
            referrerPolicy="no-referrer"
            sandbox={(project.embedSandbox || []).join(' ')}
            allow={project.embedAllow?.length ? project.embedAllow.join('; ') : undefined}
          />
        ) : (
          <div
            className={styles.preview}
            role="group"
            aria-label={t.preview(project.title)}
            onTouchStart={startTouch}
            onTouchMove={moveTouch}
            onTouchEnd={endTouch}
            onTouchCancel={() => { touch.current = null; }}
          >
            {project.coverImage && !coverFailed ? (
              <img className={styles.cover} src={project.coverImage} alt={project.coverAlt} onError={() => setCoverFailed(true)} loading="lazy" />
            ) : (
              <div className={styles.placeholder}>
                <Monitor size={48} aria-hidden="true" />
                <p>{project.coverAlt || t.preview(project.title)}</p>
                <span>{t.coverMissing}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <p className={styles.hint}>
        {interactive ? t.slow : project.embedUrl ? t.interactiveHint : t.noEmbed}
      </p>
    </article>
  );
}

export default function ProjectsSection({ projects = projectList, language = 'es' }) {
  const t = copy[language];
  const [selectedId, setSelectedId] = useState(null);
  const index = Math.max(0, projects.findIndex((project) => project.id === selectedId));
  const originalProject = projects[index];
  const project = originalProject && { ...originalProject, ...originalProject.translations?.[language] };

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
              <div className={styles.viewport}>
                <div className={styles.preview}>
                  <div className={styles.placeholder}>
                    <Monitor size={48} aria-hidden="true" />
                    <p>{t.emptyPreview}</p>
                    <span>{t.emptyHint}</span>
                  </div>
                </div>
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
            <p id="projects-help" className={styles.hint}>{t.help}</p>
            <ProjectPreview key={`${project.id}:${project.embedUrl || ''}`} project={project} onSwipe={(direction) => navigate(index + direction)} t={t} />
          </div>
        )}
      </div>
    </section>
  );
}
