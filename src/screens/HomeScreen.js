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
import lucasImage from '../images/lucas.jpg';
import SocialButtons from '../SocialButtons';

function HomeScreen() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

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

    const subject = `Nuevo mensaje de ${name} - The Cave`;
    const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;

    const mailto = `mailto:thecave.ar.contac@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxElements = document.querySelectorAll('.parallax-layer');
          
          const isMobileDevice = window.innerWidth <= 900;
          const speeds = isMobileDevice 
            ? [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07]
            : [0.006, 0.012, 0.018, 0.024, 0.03, 0.036, 0.042];
          
          parallaxElements.forEach((element, index) => {
            const speed = speeds[index] || 0.01;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`; 
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <LiquidSidebar
        title="Navegación"
        items={[
          { number: '01', label: 'Contacto', onClick: openContact },
          { number: '02', label: 'Equipo', onClick: () => {
            const teamSection = document.querySelector('[class*="teamSection"]');
            if (teamSection) teamSection.scrollIntoView({ behavior: 'smooth' });
          }},
        ]}
        footer="© 2026 — Todos los derechos"
      />

      <div className="parallax-background">
        <div className="parallax-layer animation_layer parallax" id="artback"></div>
        <div className="parallax-layer animation_layer parallax" id="mountain"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle2"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle3"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle4"></div>
        <div className="parallax-layer animation_layer parallax" id="manonmountain"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle5"></div>
      </div>

      <div className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        <section className={`${companyStyles.companyInfo} ${companyStyles.sectionTop}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', margin: '0 auto' }}>
          <div className={companyStyles.companyLogo} style={{ display: 'block', order: -1 }}>
            <LiquidLogo src={logoImage} alt="The Cave Logo" size={130} border={16} waveAmp={5} />
          </div>
          <div className={companyStyles.companyLogoDesktop} style={{ display: 'none' }}>
            <LiquidLogo src={logoImage} alt="The Cave Logo Desktop" size={280} border={22} waveAmp={6} />
          </div>
          <div className={companyStyles.companyText}>
            <h2 className={companyStyles.companyTitle}>
              BIenvenid<span style={{ color: '#000000' }}>x</span> a
            </h2>
            <span className={companyStyles.brandLarge}>the cave </span>
            <p className={companyStyles.companyDescription}>
              Hey, que tal? Llegaste a <span style={{ color: '#000000', fontWeight: 'bold' }}>The Cave</span>, tu <span style={{ color: '#000000', fontWeight: 'bold' }}>aliado digital</span>. Nos encargamos de todo: <span style={{ color: '#000000', fontWeight: 'bold' }}>desarrollo de software</span>, <span style={{ color: '#000000', fontWeight: 'bold' }}>marketing digital</span>, <span style={{ color: '#000000', fontWeight: 'bold' }}>diseño de marca y logos</span>. El paquete completo para que tu proyecto brille desde el primer momento.
            </p>
          </div>
        </section>

        <section className={`${companyStyles.companyInfo} ${companyStyles.sectionMiddle}`}>
          <div className={companyStyles.companyMiddleRow}>
            <div className={companyStyles.companyMiddleText}>
              <p className={companyStyles.companyDescription}>
                En esta seccion podes <span style={{ color: '#000000', fontWeight: 'bold' }}>conocer a todo el equipo</span> que va a trabajar en tu proyecto. Queres charlar? <span style={{ color: '#000000', fontWeight: 'bold' }}>Usa nuestras redes sociales</span> o <span style={{ color: '#000000', fontWeight: 'bold' }}>escribinos directamente</span> desde la <span style={{ color: '#000000', fontWeight: 'bold' }}>seccion de contacto</span>. Estamos aca para lo que necesites!
              </p>
              <p className={companyStyles.companyTagline}>
                ATTE: EQUIPO DE THE CAVE
              </p>
              <div style={{ marginTop: 18 }} className={companyStyles.companyMiddleSocial}>
                <SocialButtons inline={true} />
              </div>
            </div>
            <div className={companyStyles.companyRectImage}>
              <img src={missionImage} alt="Nuestra misión" />
            </div>
          </div>
        </section>

        <section className={teamStyles.teamSection}>
          <h2 className={teamStyles.teamTitle}>Nuestro Equipo</h2>
          <div className={teamStyles.teamGrid}>
            <div className={teamStyles.teamMember}>
              <div className={teamStyles.teamAvatar}>
                <img src={gabiImage} alt="Gabi - CEO" />
              </div>
              <h3 className={teamStyles.teamName}>Gabriel Pelle</h3>
              <p className={teamStyles.teamPosition}>Chief Executive Officer</p>
            </div>
            <div className={teamStyles.teamMember}>
              <div className={teamStyles.teamAvatar}>
                <img src={tomyImage} alt="Tomy - CTO" />
              </div>
              <h3 className={teamStyles.teamName}>Tomas Montesinos</h3>
              <p className={teamStyles.teamPosition}>Chief Technology Officer</p>
            </div>
            <div className={teamStyles.teamMember}>
              <div className={teamStyles.teamAvatar}>
                <img src={lucasImage} alt="Lucas - CMO" />
              </div>
              <h3 className={teamStyles.teamName}>Lucas Martin</h3>
              <p className={teamStyles.teamPosition}>Chief Marketing Officer</p>
            </div>
          </div>
        </section>
      </div>

      <SocialButtons />

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

            <button type="button" className="contact-modal-close" aria-label="Cerrar" onClick={closeContact}>
              ×
            </button>

            <div className="contact-modal-header">
              <div className="contact-modal-titleWrap">
                <h3 id="contact-modal-title">Contacto</h3>
                <p>¿Algun proyecto o consulta? Escribinos.</p>
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
                <input type="text" name="name" placeholder="Tu nombre" required />
                <input type="email" name="email" placeholder="Tu email" required />
                <textarea name="message" placeholder="Tu mensaje" rows="5" required />
                <button type="submit">Enviar email</button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default HomeScreen;
