import { Parallax } from '@react-spring/parallax'
import { useState } from 'react'
import ParallaxImages from './ParallaxImages';
import ParallaxContent from './ParallaxContent';
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
        {/* Componente de imágenes del parallax */}
        <ParallaxImages />
        
        {/* Componente de contenido de texto */}
        <ParallaxContent />
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