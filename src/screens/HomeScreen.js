import React, { useState, useEffect } from 'react';
import companyStyles from '../components/CompanySection.module.css';
import teamStyles from '../components/TeamSection.module.css';
import sidebarStyles from '../components/Sidebar.module.css';
import logoImage from '../images/logo.png';
import missionImage from '../images/manos.jpg';
import gabiImage from '../images/gabi.jpg';
import tomyImage from '../images/tomy.jpg';
import lucasImage from '../images/lucas.jpg';
import SocialButtons from '../SocialButtons';

function HomeScreen({ onNavigateToContact }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // Initialize mobile states correctly to prevent desktop header flash
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 900 : true);
  const [isSmallMobile, setIsSmallMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth <= 600 : false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth <= 900);
      setIsSmallMobile(window.innerWidth <= 600);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxElements = document.querySelectorAll('.parallax-layer');
          
          // More parallax movement
          const isMobileDevice = window.innerWidth <= 900;
          const speeds = isMobileDevice 
            ? [0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.035] // More mobile movement
            : [0.012, 0.025, 0.04, 0.055, 0.07, 0.085, 0.1]; // More desktop movement
          
          parallaxElements.forEach((element, index) => {
            const speed = speeds[index] || 0.01;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`; // Use translate3d for hardware acceleration
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop header */}
      {!isMobile && (
        <header className="top-header">
          <div className="header-logo">The Cave</div>
          <nav className="header-nav">
            <a href="#contact" className="header-link" onClick={(e) => { e.preventDefault(); onNavigateToContact(); }}>
              Contacto
            </a>
          </nav>
        </header>
      )}
      
      {/* Mobile hamburger */}
      {isMobile && (
        <button className="hamburger" aria-label="Abrir menú" onClick={() => setMenuOpen((v) => !v)}>☰</button>
      )}

      {/* Fondo parallax decorativo que responde al scroll */}
      <div className="parallax-background">
        <div className="parallax-layer animation_layer parallax" id="artback"></div>
        <div className="parallax-layer animation_layer parallax" id="mountain"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle2"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle3"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle4"></div>
        <div className="parallax-layer animation_layer parallax" id="manonmountain"></div>
        <div className="parallax-layer animation_layer parallax" id="jungle5"></div>
      </div>

      {/* Contenido principal scrolleable */}
      <div className="main-content" style={{ position: 'relative', zIndex: 10 }}>
        {/* Sección 1 - Bienvenida */}
        <section className={`${companyStyles.companyInfo} ${companyStyles.sectionTop}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <div className={companyStyles.companyLogo} style={{ display: 'block', order: -1 }}>
            <img src={logoImage} alt="The Cave Logo" />
          </div>
          <div className={companyStyles.companyLogoDesktop} style={{ display: 'none' }}>
            <img src={logoImage} alt="The Cave Logo Desktop" />
          </div>
          <div className={companyStyles.companyText}>
            <h2 className={companyStyles.companyTitle}>
              BIenvenid<span style={{ color: '#00211F' }}>x</span> a
            </h2>
            <span className={companyStyles.brandLarge}>the cave </span>
            <p className={companyStyles.companyDescription}>
              Hey, que tal? Llegaste a <span style={{ color: '#00211F', fontWeight: 'bold' }}>The Cave</span>, tu <span style={{ color: '#00211F', fontWeight: 'bold' }}>aliado digital</span>. Nos encargamos de todo: <span style={{ color: '#00211F', fontWeight: 'bold' }}>desarrollo de software</span>, <span style={{ color: '#00211F', fontWeight: 'bold' }}>marketing digital</span>, <span style={{ color: '#00211F', fontWeight: 'bold' }}>diseño de marca y logos</span>. El paquete completo para que tu proyecto brille desde el primer momento.
            </p>
          </div>
        </section>

        {/* Sección 2 - Información */}
        <section className={`${companyStyles.companyInfo} ${companyStyles.sectionMiddle}`}>
          <div className={companyStyles.companyMiddleRow}>
            <div className={companyStyles.companyMiddleText}>
              <p className={companyStyles.companyDescription}>
                En esta seccion podes <span style={{ color: '#00211F', fontWeight: 'bold' }}>conocer a todo el equipo</span> que va a trabajar en tu proyecto. Queres charlar? <span style={{ color: '#00211F', fontWeight: 'bold' }}>Usa nuestras redes sociales</span> o <span style={{ color: '#00211F', fontWeight: 'bold' }}>escribinos directamente</span> desde la <span style={{ color: '#00211F', fontWeight: 'bold' }}>seccion de contacto</span>. Estamos aca para lo que necesites!
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

        {/* Sección 3 - Equipo */}
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

      {menuOpen && (
        <div className="overlay-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Sidebar móvil */}
      <div className={`${sidebarStyles.sidebar} ${menuOpen ? sidebarStyles.open : ''}`} onClick={() => setMenuOpen(false)}>
        <div className={`${sidebarStyles.verticalLabel} ${sidebarStyles.firstItemOffset}`}
          onClick={() => { onNavigateToContact(); setMenuOpen(false); }}
          aria-label="Ir a contacto"
          title="Contacto">
          <span className={sidebarStyles.letter}>{'>>'}</span> 
          <span className={sidebarStyles.letter}>{''}</span> 
          <span className={sidebarStyles.letter}>M</span>
          <span className={sidebarStyles.letter}>E</span>
          <span className={sidebarStyles.letter}>N</span>
          <span className={sidebarStyles.letter}>S</span>
          <span className={sidebarStyles.letter}>A</span>
          <span className={sidebarStyles.letter}>J</span>
          <span className={sidebarStyles.letter}>E</span>
          <span className={sidebarStyles.letter}>{''}</span> 
          <span className={sidebarStyles.letter}>{'>>'}</span> 
        </div>
      </div>

      {/* Botones de redes sociales flotantes */}
      <SocialButtons />
    </>
  );
}

export default HomeScreen;
