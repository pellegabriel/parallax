import React, { useCallback, useEffect, useState } from 'react';
import companyStyles from '../components/CompanySection.module.css';
import teamStyles from '../components/TeamSection.module.css';
import LiquidSidebar from '../components/LiquidSidebar';
import LiquidLogo from '../components/LiquidLogo';
import LiquidFormBackground from '../components/LiquidFormBackground';
import logoImage from '../images/logo.svg';
import missionImage from '../images/manos.jpg';
import gabiImage from '../images/gabi.jpg';
import tomyImage from '../images/tomy.jpg';
import BlobButton from '../components/BlobButton';
import useMediaQuery from '../components/useMediaQuery';
import ProjectsSection from '../components/ProjectsSection';
import LiquidFooter from '../components/LiquidFooter';

const copy = {
  es: {
    language: 'Idioma', navigation: 'Navegación', menu: 'Menú', contact: 'Contacto', projects: 'Proyectos', team: 'Equipo', teamRegion: 'Nuestro Equipo', rights: 'Todos los derechos',
    welcome: 'Bienvenid', welcomeEnd: ' a', description: 'Tu negocio necesita soluciones que trabajen juntas. En The Cave conectamos estrategia, diseño y tecnología para fortalecer tu marca, simplificar procesos y abrir nuevas oportunidades de crecimiento. Te acompañamos desde la primera idea hasta su puesta en marcha.',
    call: 'Agendá una llamada', services: 'Conocé nuestros servicios', approach: 'Nos involucramos en lo que hace avanzar a tu negocio.', approachDescription: 'Trabajamos con vos para entender los desafíos, definir prioridades y llevar las ideas a la práctica. Cada decisión de diseño y tecnología responde a una necesidad concreta, con un equipo que acompaña la implementación y su evolución.',
    missionAlt: 'Nuestra misión', contactPrompt: '¿Algun proyecto o consulta? Escribinos.', name: 'Tu nombre', email: 'Tu email', message: 'Tu mensaje', send: 'Enviar email',
    emailSubject: (name) => `Nuevo mensaje de ${name} - The Cave`, emailBody: (name, email, message) => `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
  },
  en: {
    language: 'Language', navigation: 'Navigation', menu: 'Menu', contact: 'Contact', projects: 'Projects', team: 'Team', teamRegion: 'Our Team', rights: 'All rights reserved',
    welcome: 'Welcom', welcomeEnd: ' to', description: 'Your business needs solutions that work together. At The Cave, we bring strategy, design, and technology together to strengthen your brand, streamline processes, and create new opportunities for growth. We support you from the first idea through launch.',
    call: 'Schedule a call', services: 'Explore our services', approach: 'We get involved in what moves your business forward.', approachDescription: 'We work with you to understand challenges, set priorities, and turn ideas into action. Every design and technology decision addresses a real need, with a team that supports implementation and what comes next.',
    missionAlt: 'Our mission', contactPrompt: 'Have a project or a question? Get in touch.', name: 'Your name', email: 'Your email', message: 'Your message', send: 'Send email',
    emailSubject: (name) => `New message from ${name} - The Cave`, emailBody: (name, email, message) => `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  },
};

function HomeScreen({ language: selectedLanguage, onLanguageChange }) {
  const [localLanguage, setLocalLanguage] = useState('es');
  const language = selectedLanguage ?? localLanguage;
  const changeLanguage = onLanguageChange ?? setLocalLanguage;
  const t = copy[language];
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 901px)');
  const isWideDesktop = useMediaQuery('(min-width: 1280px)');
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const navigateTo = (id) => {
    const section = document.getElementById(id);
    section?.focus({ preventScroll: true });
    section?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const openContact = useCallback(() => {
    setIsContactOpen(true);
    setContactLoading(true);
  }, []);

  const closeContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  useEffect(() => {
    if (!isContactOpen) return;
    const t = setTimeout(() => setContactLoading(false), 800);
    return () => clearTimeout(t);
  }, [isContactOpen]);

  useEffect(() => {
    if (!isContactOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevHeight = document.body.style.height;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.documentElement.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.height = prevHeight;
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;
    };
  }, [isContactOpen]);

  useEffect(() => {
    if (!isContactOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeContact();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeContact, isContactOpen]);

  const handleContactSubmit = useCallback((e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const message = data.get('message') || '';

    const subject = t.emailSubject(name);
    const body = t.emailBody(name, email, message);

    const mailto = `mailto:thecave.ar.contac@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }, [t]);

  useEffect(() => {
    const layers = document.querySelectorAll('.parallax-layer');
    if (reducedMotion) {
      layers.forEach((element) => { element.style.transform = 'none'; });
      return;
    }
    let frame;
    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const speeds = isDesktop
          ? [0.006, 0.012, 0.018, 0.024, 0.03, 0.036, 0.042]
          : [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07];
        layers.forEach((element, index) => {
          const speed = speeds[index] || 0.01;
          const maxY = Math.max(0, element.offsetHeight - window.innerHeight);
          const y = Math.min(window.pageYOffset * speed, maxY);
          element.style.transform = `translate3d(0, ${-y}px, 0)`;
        });
        frame = null;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, [isDesktop, reducedMotion]);

  return (
    <>
      <LiquidSidebar
        title={t.navigation}
        toggleLabel={t.menu}
        items={[
          { number: '01', label: t.contact, onClick: openContact },
          { number: '02', label: t.projects, onClick: () => navigateTo('proyectos') },
          { number: '03', label: t.team, onClick: () => navigateTo('equipo') },
        ]}
        footer={`© 2026 — ${t.rights}`}
      />

      <div className="language-switch" role="group" aria-label={t.language}>
        <button type="button" lang="es" aria-label={language === 'es' ? 'Español, seleccionado' : 'Español'} aria-pressed={language === 'es'} onClick={() => changeLanguage('es')}>ES</button>
        <span aria-hidden="true">|</span>
        <button type="button" lang="en" aria-label={language === 'en' ? 'English, selected' : 'English'} aria-pressed={language === 'en'} onClick={() => changeLanguage('en')}>EN</button>
      </div>

      <div className="parallax-background">
        <div className="parallax-layer animation_layer parallax" id="artback"></div>
        <div className="parallax-layer animation_layer parallax" id="mountain"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle2"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle3"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle4"></div>
        <div className="parallax-layer animation_layer parallax" id="manonmountain"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle5"></div>
      </div>

      <main className="main-content">
        <section className={`page-section intro-section ${companyStyles.companyInfo} ${companyStyles.sectionTop}`} style={isWideDesktop ? undefined : { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 auto' }}>
          <div className={isDesktop ? companyStyles.companyLogoDesktop : companyStyles.companyLogo}>
            <LiquidLogo src={logoImage} alt="The Cave Logo" size={isWideDesktop ? 300 : isDesktop ? 280 : 130} border={isWideDesktop ? 30 : isDesktop ? 22 : 16} waveAmp={isWideDesktop ? 8 : isDesktop ? 6 : 5} />
          </div>
          <div className={companyStyles.companyText}>
            <h1 className={companyStyles.companyTitle}>
              {t.welcome}<span style={{ color: '#000000' }}>x</span>{t.welcomeEnd}
              <span className={companyStyles.brandLarge}>the cave</span>
            </h1>
            <p className={companyStyles.companyDescription}>{t.description}</p>
            <div className={companyStyles.blobButtonWrapper}>
              <BlobButton className={companyStyles.primaryAction} onClick={() => window.open('https://wa.me/542966305853?text=Hola%21%20Tengo%20inter%C3%A9s%20en%20trabajar%20con%20ustedes%20y%20quer%C3%ADa%20saber%20c%C3%B3mo%20podemos%20avanzar.', '_blank', 'noopener,noreferrer')}>
                {t.call}
              </BlobButton>
              <BlobButton className={companyStyles.secondaryAction} onClick={() => window.open('/servicios.pdf', '_blank', 'noopener,noreferrer')}>
                {t.services}
              </BlobButton>
            </div>
          </div>
        </section>

        <section id="equipo" tabIndex={-1} aria-label={t.teamRegion} className={`page-section services-section ${companyStyles.companyInfo} ${companyStyles.sectionMiddle}`}>
          <div className={companyStyles.companyMiddleRow}>
            <div className={companyStyles.companyMiddleText}>
              <h2 className={companyStyles.approachTitle}>{t.approach}</h2>
              <p className={companyStyles.companyDescription}>{t.approachDescription}</p>
              <div className={`${teamStyles.teamGrid} ${teamStyles.compactTeam}`}>
                <div className={teamStyles.teamMember}>
                  <div className={teamStyles.teamAvatar}>
                    <img src={gabiImage} alt="Gabriel Pelle - CEO" />
                  </div>
                  <h3 className={teamStyles.teamName}>Gabriel Pelle</h3>
                  <p className={teamStyles.teamPosition}>CEO</p>
                </div>
                <div className={teamStyles.teamMember}>
                  <div className={teamStyles.teamAvatar}>
                    <img src={tomyImage} alt="Tomas Montesinos - CTO" />
                  </div>
                  <h3 className={teamStyles.teamName}>Tomas Montesinos</h3>
                  <p className={teamStyles.teamPosition}>CTO</p>
                </div>
              </div>
            </div>
            <div className={companyStyles.companyRectImage}>
              <img src={missionImage} alt={t.missionAlt} />
            </div>
          </div>
        </section>

        <ProjectsSection language={language} />
      </main>

      <LiquidFooter language={language} onNavigate={navigateTo} />

      {isContactOpen && (
        <div className="contact-modal-root" role="presentation">
          <div className="contact-modal-overlay" onClick={closeContact} />
          <div
            className="contact-modal contact-modal-liquid"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <LiquidFormBackground width={900} height={650} waveAmp={22} className="contact-modal-blob" />

            <button type="button" className="contact-modal-close" aria-label={language === 'en' ? 'Close' : 'Cerrar'} onClick={closeContact}>
              ×
            </button>

            <div className="contact-modal-header">
              <div className="contact-modal-titleWrap">
                <h3 id="contact-modal-title">{t.contact}</h3>
                <p>{t.contactPrompt}</p>
              </div>
            </div>

            {contactLoading ? (
              <div className="contact-skeleton">
                <div className="skeleton skeleton-line" style={{ width: '50%', height: 18 }}></div>
                <div className="skeleton skeleton-line" style={{ width: '100%', height: 44, marginTop: 12 }}></div>
                <div className="skeleton skeleton-line" style={{ width: '100%', height: 44, marginTop: 10 }}></div>
                <div className="skeleton skeleton-block" style={{ width: '100%', height: 120, marginTop: 10 }}></div>
                <div className="skeleton skeleton-line" style={{ width: 140, height: 44, marginTop: 14 }}></div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input type="text" name="name" placeholder={t.name} required />
                <input type="email" name="email" placeholder={t.email} required />
                <textarea name="message" placeholder={t.message} rows="5" required />
                <button type="submit">{t.send}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HomeScreen;
