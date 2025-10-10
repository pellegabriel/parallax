import { ParallaxLayer } from '@react-spring/parallax';

const ParallaxContent = () => {
  return (
    <>
      {/* Sección 1 - Información de la empresa (arriba) */}
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

      {/* Sección 2 - Misión de la empresa (medio) */}
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

      {/* Sección 3 - Equipo de trabajo */}
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
    </>
  );
};

export default ParallaxContent;
