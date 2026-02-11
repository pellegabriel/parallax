import React, { useEffect } from 'react';
import companyStyles from '../components/CompanySection.module.css';
import teamStyles from '../components/TeamSection.module.css';
import LiquidSidebar from '../components/LiquidSidebar';
import LiquidLogo from '../components/LiquidLogo';
import logoImage from '../images/logo.svg';
import missionImage from '../images/manos.jpg';
import gabiImage from '../images/gabi.jpg';
import tomyImage from '../images/tomy.jpg';
import lucasImage from '../images/lucas.jpg';
import SocialButtons from '../SocialButtons';

function HomeScreen({ onNavigateToContact }) {
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxElements = document.querySelectorAll('.parallax-layer');
          
          const isMobileDevice = window.innerWidth <= 900;
          const speeds = isMobileDevice 
            ? [0.005, 0.01, 0.015, 0.02, 0.025, 0.03, 0.035]
            : [0.003, 0.006, 0.009, 0.012, 0.015, 0.018, 0.021];
          
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
          { number: '01', label: 'Contacto', onClick: onNavigateToContact },
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
            <LiquidLogo src={logoImage} alt="The Cave Logo Desktop" size={180} border={18} waveAmp={6} />
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
    </>
  );
}

export default HomeScreen;
