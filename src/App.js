import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useState } from 'react'
import TextBlock from './textBlock';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="App">
      {/* Header horizontal - Desktop */}
      <header className="top-header">
        <div className="header-logo">The Cave</div>
        <nav className="header-nav">
          <a href="#home" className="header-link">Inicio</a>
          <a href="#about" className="header-link">Nosotros</a>
          <a href="#services" className="header-link">Servicios</a>
          <a href="#contact" className="header-link">Contacto</a>
        </nav>
      </header>
      {/* Botón hamburguesa - Mobile */}
      <button className="hamburger" aria-label="Abrir menú" onClick={() => setMenuOpen((v) => !v)}>
        ☰
      </button>
      <Parallax pages={2} style={{ top: '0', left: '0' }} class="animation">
        <ParallaxLayer offset={0} speed={0.25}>
          <div class="animation_layer parallax" id="artback"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={0.3}>
          <div class="animation_layer parallax" id="mountain"></div>
        </ParallaxLayer>
        <ParallaxLayer offset={0} speed={-0.1}>
          <div class="animation_layer parallax" id="logoland"></div>
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
            <h2 className="company-title">The Cave</h2>
            <p className="company-description">
              Bienvenido a The Cave, donde la innovación encuentra su hogar. 
              Somos pioneros en transformar ideas revolucionarias en 
              realidades digitales que cambian el mundo.
            </p>
            <p className="company-tagline">
              "El futuro comienza aquí"
            </p>
          </div>
        </ParallaxLayer>

        {/* Sección 2 - Medio */}
        <ParallaxLayer offset={0.5} speed={0.2}>
          <div className="company-info section-middle">
            <h2 className="company-title">Nuestra Misión</h2>
            <p className="company-description">
              En The Cave, creemos que cada proyecto es una oportunidad 
              para superar límites. Nuestro equipo multidisciplinario 
              combina creatividad, tecnología y estrategia para entregar 
              soluciones excepcionales.
            </p>
            <p className="company-tagline">
              "Innovación sin límites"
            </p>
          </div>
        </ParallaxLayer>

        {/* Sección del Equipo */}
        <ParallaxLayer offset={1.2} speed={0.1} style={{ zIndex: 200 }}>
          <div className="team-section">
            <h2 className="team-title">Nuestro Equipo</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="team-avatar">
                  <img src="/api/placeholder/150/150" alt="CEO" />
                </div>
                <h3 className="team-name">CEO</h3>
                <p className="team-position">Chief Executive Officer</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">
                  <img src="/api/placeholder/150/150" alt="CTO" />
                </div>
                <h3 className="team-name">CTO</h3>
                <p className="team-position">Chief Technology Officer</p>
              </div>
              <div className="team-member">
                <div className="team-avatar">
                  <img src="/api/placeholder/150/150" alt="CMO" />
                </div>
                <h3 className="team-name">CMO</h3>
                <p className="team-position">Chief Marketing Officer</p>
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={1.2} speed={0} factor={0.8} style={{ zIndex: 5 }}>
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
    </div>
    
  );
}

export default App;