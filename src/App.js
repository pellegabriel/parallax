import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useState } from 'react'
import TextBlock from './textBlock';
import './App.css';
import logoImage from './images/logo.svg';
import missionImage from './images/manos.jpg';
import gabiImage from './images/gabi.jpg';
import tomyImage from './images/tomy.jpg';
import lucasImage from './images/lucas.jpg';
import SocialButtons from './SocialButtons';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="App">
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
  <Parallax pages={1.9} style={{ top: '0', left: '0' }} class="animation">
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
          <div className="company-info section-top">
            <div className="company-logo">
              <img src={logoImage} alt="The Cave Logo" />
            </div>
            <div className="company-logo-desktop">
              <img src={logoImage} alt="The Cave Logo Desktop" />
            </div>
            <div className="company-text">
              <h2 className="company-title">
                BIenvenid<span style={{ color: '#031927' }}>x</span> a
              </h2>
              <span className="brand-large">the cave </span>
              <p className="company-description">
                La innovación encuentra su hogar en cada idea que se transforma en experiencia digital. Creamos soluciones que impulsan el cambio y conectan personas con tecnología.
                Nuestro propósito es convertir la creatividad en impacto real, superando los límites del presente.
              </p>
            </div>
          </div>
        </ParallaxLayer>

        {/* Sección 2 - Medio */}
        <ParallaxLayer offset={0.40} speed={0.2}>
          <div className="company-info section-middle">
            <div className="company-middle-row">
   
              <div className="company-middle-text">
                <p className="company-description">
Creemos que cada proyecto es una oportunidad para superar límites. Nuestro equipo combina estrategia, diseño y tecnología para convertir desafíos en soluciones que dejan huella.
                </p>
                  <p className="company-tagline">
                  ATTE: EQUIPO DE THE CAVE
                  </p>
                  {/* Inline social buttons for middle section */}
                  <div style={{ marginTop: 18 }}>
                    <SocialButtons inline={true} />
                  </div>
              </div>
                         <div className="company-rect-image">
                <img src={missionImage} alt="Nuestra misión" />
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Sección del Equipo */}
        <ParallaxLayer offset={1.0} speed={0.1} style={{ zIndex: 200, width: '100%', height: '100%', overflow: 'visible' }}>
          <div className="team-section">
            <h2 className="team-title">Nuestro Equipo</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">
                  <img src={gabiImage} alt="Gabi - CEO" />
                </div>
                <h3 className="team-name">Gabriel Pelle</h3>
                <p className="team-position">Chief Executive Officer</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">
                  <img src={tomyImage} alt="Tomy - CTO" />
                </div>
                <h3 className="team-name">Tomas Montesinos</h3>
                <p className="team-position">Chief Technology Officer</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">
                  <img src={lucasImage} alt="Lucas - CMO" />
                </div>
                <h3 className="team-name">Lucas Martin</h3>
                <p className="team-position">Chief Marketing Officer</p>
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.0} speed={0} factor={1.0} style={{ zIndex: 5 }}>
          <div id="bottom-cover"></div>
        </ParallaxLayer>
      </Parallax>
      {/* Navbar lateral - Mobile */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <div className="logo-circle"></div>
        <button className="sidebar-button">🏠</button>
        <button className="sidebar-button">📧</button>
        <button className="sidebar-button">📱</button>
        <button className="sidebar-button">ℹ️</button>
      </div>

      {/* Botones de redes sociales flotantes */}
      <SocialButtons />
    </div>
    
  );
}

export default App;
