import { ParallaxLayer } from '@react-spring/parallax';

const ParallaxImages = () => {
  return (
    <>
      {/* Patrón: Imagen -> Degradado -> Imagen -> Degradado */}
      
      {/* Capa 1: Artback */}
      <ParallaxLayer offset={0} speed={0.12} factor={0.8}>
        <div className="animation_layer parallax" id="artback"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.13} factor={0.8}>
        <div className="parallax-overlay parallax overlay-light"></div>
      </ParallaxLayer>
      
      {/* Capa 2: Mountain */}
      <ParallaxLayer offset={0} speed={0.15} factor={0.8}>
        <div className="animation_layer parallax" id="mountain"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.16} factor={0.8}>
        <div className="parallax-overlay parallax overlay-light"></div>
      </ParallaxLayer>
      
      {/* Capa 3: Logoland */}
      <ParallaxLayer offset={0} speed={-0.05} factor={0.8}>
        <div className="animation_layer parallax" id="logoland"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={-0.04} factor={0.8}>
        <div className="parallax-overlay parallax "></div>
      </ParallaxLayer>
      
      {/* Capa 4: Jungle1 */}
      <ParallaxLayer offset={0} speed={0.15} factor={0.8}>
        <div className="animation_layer parallax" id="jungle1"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.16} factor={0.8}>
        <div className="parallax-overlay parallax "></div>
      </ParallaxLayer>
      
      {/* Capa 5: Jungle2 */}
      <ParallaxLayer offset={0} speed={0.18} factor={0.8}>
        <div className="animation_layer parallax" id="jungle2"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.19} factor={0.8}>
        <div className="parallax-overlay parallax "></div>
      </ParallaxLayer>
      
      {/* Capa 6: Jungle3 */}
      <ParallaxLayer offset={0} speed={0.25} factor={0.8}>
        <div className="animation_layer parallax" id="jungle3"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.26} factor={0.8}>
        <div className="parallax-overlay parallax "></div>
      </ParallaxLayer>
      
      {/* Capa 7: Jungle4 */}
      <ParallaxLayer offset={0} speed={0.22} factor={0.8}>
        <div className="animation_layer parallax" id="jungle4"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.23} factor={0.8}>
        <div className="parallax-overlay parallax "></div>
      </ParallaxLayer>
      
      {/* Capa 8: Man on Mountain */}
      <ParallaxLayer offset={0} speed={0.20} factor={0.8}>
        <div className="animation_layer parallax" id="manonmountain"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.21} factor={0.8}>
        <div className="parallax-overlay parallax "></div>
      </ParallaxLayer>
      
      {/* Capa 9: Jungle5 */}
      <ParallaxLayer offset={0} speed={0.18} factor={0.8}>
        <div className="animation_layer parallax" id="jungle5"></div>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.19} factor={0.8}>
        <div className="parallax-overlay parallax "></div>
      </ParallaxLayer>
      
      {/* Capa de fondo inferior */}
      <ParallaxLayer offset={1.2} speed={0} factor={0.8} style={{ zIndex: 5 }}>
        <div id="bottom-cover"></div>
      </ParallaxLayer>
    </>
  );
};

export default ParallaxImages;
