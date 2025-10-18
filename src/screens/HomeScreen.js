import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 900);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pages = isMobile ? 2.2 : 2.2;
  const middleOffset = isMobile ? 0.34 : 0.40;
  const teamOffset = isMobile ? 1.0 : 1.0;
  const teamFactor = isMobile ? 1.2 : 1.0;
  const bottomCoverOffset = teamOffset;

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

      <Parallax pages={pages} style={{ top: '0', left: '0' }} className="animation">
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax" id="jungle2"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.5}>
          <div className="animation_layer parallax" id="jungle3"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.45}>
          <div className="animation_layer parallax" id="jungle4"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.40}>
          <div className="animation_layer parallax" id="manonmountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.35}>
          <div className="animation_layer parallax" id="jungle5"></div>
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
