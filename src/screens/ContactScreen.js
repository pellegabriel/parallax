import React, { useState, useEffect } from 'react';
import LiquidSidebar from '../components/LiquidSidebar';
import { sendEmail } from '../services/emailService';

function ContactScreen({ onNavigateToHome }) {
  const [isMobile, setIsMobile] = useState(false);
  const [contactLoading, setContactLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('');

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

const handleContactSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setSubmitStatus(null);
  setErrorMessage('');

  const data = new FormData(e.currentTarget);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const message = data.get('message') || '';
  
  const subject = `Nuevo mensaje de ${name} - The Cave`;
  const fullMessage = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;

  try {
    await sendEmail({
      email,
      subject,
      message: fullMessage,
    });
    setSubmitStatus('success');
    e.target.reset();
  } catch (error) {
    setSubmitStatus('error');
    setErrorMessage(error.message || 'Error al enviar el mensaje');
  } finally {
    setSubmitting(false);
  }
};


  return (
    <div className="contact-screen">
      <LiquidSidebar
        title="Navegación"
        items={[
          { number: '01', label: 'Inicio', onClick: onNavigateToHome },
        ]}
        footer="© 2026 — Todos los derechos"
      />

      <div className="contact-background">
        <div className="animation_layer parallax static-jungle" id="jungle2"></div>
        <div className="animation_layer parallax static-jungle" id="jungle3"></div>
        <div className="animation_layer parallax static-jungle" id="jungle4"></div>
        <div className="animation_layer parallax static-jungle" id="manonmountain"></div>
        <div className="animation_layer parallax static-jungle" id="jungle5"></div>
      </div>
      <section id="contact" className="contact-section">
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
            <input type="text" name="name" placeholder="Tu nombre" required disabled={submitting} />
            <input type="email" name="email" placeholder="Tu email" required disabled={submitting} />
            <textarea name="message" placeholder="Tu mensaje" rows="5" required disabled={submitting} />
            <button type="submit" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar mensaje'}
            </button>
            {submitStatus === 'success' && (
              <p className="form-success">¡Mensaje enviado correctamente!</p>
            )}
            {submitStatus === 'error' && (
              <p className="form-error">{errorMessage}</p>
            )}
          </form>
        )}
      </section>
    </div>
  );
}

export default ContactScreen;
