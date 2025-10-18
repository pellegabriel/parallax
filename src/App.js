import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useState, useEffect } from 'react'
import TextBlock from './textBlock';
import './App.css';
import teamStyles from './components/TeamSection.module.css';
import companyStyles from './components/CompanySection.module.css';
import logoImage from './images/logo.svg';
import missionImage from './images/manos.jpg';
import gabiImage from './images/gabi.jpg';
import tomyImage from './images/tomy.jpg';
import lucasImage from './images/lucas.jpg';
import SocialButtons from './SocialButtons';
import sidebarStyles from './components/Sidebar.module.css';
import Loader from './components/loader/Loader';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId;
    const MIN_DELAY = 6000; // ms
    const done = () => {
      // ensure a minimum delay so the loader is perceptible
      timeoutId = setTimeout(() => setIsLoading(false), MIN_DELAY);
    };
    if (document.readyState === 'complete') {
      done();
    } else {
      window.addEventListener('load', done);
    }
    return () => {
      window.removeEventListener('load', done);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 900);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = isMobile ? 2.2 : 1.9;
  const middleOffset = isMobile ? 0.34 : 0.40;
  const teamOffset = isMobile ? 1.0 : 1.0;
  const teamFactor = isMobile ? 1.2 : 1.0;
  const bottomCoverOffset = teamOffset;

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <>
      {/* Header horizontal - Desktop */}
      {/* <header className="top-header">
        <div className="header-logo">The Cave</div>
        <nav className="header-nav">
          <a href="#home" className="header-link">Inicio</a>
          <a href="#about" className="header-link">Nosotros</a>
          <a href="#services" className="header-link">Servicios</a>
          <a href="#contact" className="header-link">Contacto</a>
        </nav>
      </header> */}
      {/* Botón hamburguesa - Mobile */}
      {/* <button className="hamburger" aria-label="Abrir menú" onClick={() => setMenuOpen((v) => !v)}>
        ☰
      </button> */}
  <Parallax pages={pages} style={{ top: '0', left: '0' }} class="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="artback"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div class="animation_layer parallax" id="mountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div class="animation_layer parallax" id="jungle1"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div class="animation_layer parallax" id="jungle2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div class="animation_layer parallax" id="jungle3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          <div class="animation_layer parallax" id="jungle4"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.40}>
          <div class="animation_layer parallax" id="manonmountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div class="animation_layer parallax" id="jungle5"></div>
        </ParallaxLayer>
        {/* Sección 1 - Arriba */}
        <ParallaxLayer offset={0.1} speed={0.3}>
          <div className={`${companyStyles.companyInfo} ${companyStyles.sectionTop}`}>
            <div className={companyStyles.companyLogo}>
              <img src={logoImage} alt="The Cave Logo" />
            </div>
            <div className={companyStyles.companyLogoDesktop}>
              <img src={logoImage} alt="The Cave Logo Desktop" />
            </div>
            <div className={companyStyles.companyText}>
              <h2 className={companyStyles.companyTitle}>
                BIenvenid<span style={{ color: '#031927' }}>x</span> a
              </h2>
              <span className={companyStyles.brandLarge}>the cave </span>
              <p className={companyStyles.companyDescription}>
                La innovación encuentra su hogar en cada idea que se transforma en experiencia digital. Creamos soluciones que impulsan el cambio y conectan personas con tecnología.
                Nuestro propósito es convertir la creatividad en impacto real, superando los límites del presente.
              </p>
            </div>
          </div>
        </ParallaxLayer>

        {/* Sección 2 - Medio */}
        <ParallaxLayer offset={middleOffset} speed={0.3}>
          <div className={`${companyStyles.companyInfo} ${companyStyles.sectionMiddle}`}>
            <div className={companyStyles.companyMiddleRow}>
              <div className={companyStyles.companyMiddleText}>
                <p className={companyStyles.companyDescription}>
                  Creemos que cada proyecto es una oportunidad para superar límites. Nuestro equipo combina estrategia, diseño y tecnología para convertir desafíos en soluciones que dejan huella.
                </p>
                <p className={companyStyles.companyTagline}>
                  ATTE: EQUIPO DE THE CAVE
                </p>
                {/* Inline social buttons for middle section */}
                <div style={{ marginTop: 18 }} className={companyStyles.companyMiddleSocial}>
                  <SocialButtons inline={true} />
                </div>
              </div>
              <div className={companyStyles.companyRectImage}>
                <img src={missionImage} alt="Nuestra misión" />
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Sección del Equipo */}
        <ParallaxLayer offset={teamOffset} speed={0.1} factor={teamFactor} style={{ zIndex: 200, width: '100%', height: '100%', overflow: 'visible' }}>
          <div className={teamStyles.teamSection}>
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
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={bottomCoverOffset} speed={0} factor={teamFactor} style={{ zIndex: 5 }}>
          <div id="bottom-cover"></div>
        </ParallaxLayer>
      </Parallax>
      {/* Navbar lateral - Mobile */}
      <div className={`${sidebarStyles.sidebar} ${menuOpen ? sidebarStyles.open : ''}`} onClick={() => setMenuOpen(false)}>
        <div className={sidebarStyles.logoCircle}></div>
        <button className={sidebarStyles.sidebarButton}>🏠</button>
        <button className={sidebarStyles.sidebarButton}>📧</button>
        <button className={sidebarStyles.sidebarButton}>📱</button>
        <button className={sidebarStyles.sidebarButton}>ℹ️</button>
      </div>

      {/* Botones de redes sociales flotantes */}
      <SocialButtons />
        </>
      )}
      <div className="page-frame" />
    </div>
    
  );
}

export default App;

