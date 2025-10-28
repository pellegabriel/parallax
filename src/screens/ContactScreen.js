import React, { useState, useEffect } from 'react';
import sidebarStyles from '../components/Sidebar.module.css';

function ContactScreen({ onNavigateToHome }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [contactLoading, setContactLoading] = useState(true);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth <= 900);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Show skeleton on mount
  useEffect(() => {
    const t = setTimeout(() => setContactLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll while on contact screen
  useEffect(() => {
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
  }, []);

const handleContactSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const message = data.get('message') || '';
  
  const subject = `Nuevo mensaje de ${name} - The Cave`;
  const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
  
  // dirección a la que se enviará el correo
  const mailto = `mailto:thecave.ar.contac@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.location.href = mailto;
};


  return (
    <div className="contact-screen">
      {/* Hamburger button for all screen sizes */}
      <button className="hamburger" aria-label="Abrir menú" onClick={() => setMenuOpen((v) => !v)}>☰</button>
      
      {/* Desktop header */}
      {!isMobile && (
        <header className="top-header">
          <div className="header-logo">The Cave</div>
          <nav className="header-nav">
            <a href="#home" className="header-link" onClick={(e) => { e.preventDefault(); onNavigateToHome(); }}>
              Inicio
            </a>
          </nav>
        </header>
      )}

      {menuOpen && (
        <div className="overlay-backdrop" onClick={() => setMenuOpen(false)}></div>
      )}

      {/* Static background trees */}
      <div className="contact-background">
        <div className="animation_layer parallax static-jungle" id="jungle2"></div>
        <div className="animation_layer parallax static-jungle" id="jungle3"></div>
        <div className="animation_layer parallax static-jungle" id="jungle4"></div>
        <div className="animation_layer parallax static-jungle" id="manonmountain"></div>
        <div className="animation_layer parallax static-jungle" id="jungle5"></div>
      </div>

      {/* Contact form */}
      <section id="contact" className="contact-section">
        <button className="back-button" onClick={onNavigateToHome}>←</button>
        <h3>Contacto</h3>
        <p>¿Algun proyecto o consulta? Escribinos.</p>
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
      </section>

      {/* Sidebar móvil */}
      <div className={`${sidebarStyles.sidebar} ${menuOpen ? sidebarStyles.open : ''}`} onClick={() => setMenuOpen(false)}>
        <div className={`${sidebarStyles.verticalLabel} ${sidebarStyles.firstItemOffset}`}
          onClick={() => { onNavigateToHome(); setMenuOpen(false); }}
          aria-label="Ir a inicio"
          title="Inicio">
          <span className={sidebarStyles.letter}>{'>>'}</span> 
          <span className={sidebarStyles.letter}>{''}</span> 
          <span className={sidebarStyles.letter}>I</span>
          <span className={sidebarStyles.letter}>N</span>
          <span className={sidebarStyles.letter}>I</span>
          <span className={sidebarStyles.letter}>C</span>
          <span className={sidebarStyles.letter}>I</span>
          <span className={sidebarStyles.letter}>O</span>
          <span className={sidebarStyles.letter}>{''}</span> 
          <span className={sidebarStyles.letter}>{'>>'}</span> 
        </div>
      </div>
    </div>
  );
}

export default ContactScreen;
