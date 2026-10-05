import React, { useState, useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import Loader from './components/loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true); // Reactivado el loader
  const [language, setLanguage] = useState(() => localStorage.getItem('the-cave-language') === 'en' ? 'en' : 'es');

  useEffect(() => {
    document.documentElement.lang = language;
    document.querySelector('meta[name="description"]')?.setAttribute('content', language === 'en'
      ? 'The Cave creates thoughtful digital solutions through strategy, design, and technology.'
      : 'Somos The Cave S.A, una empresa dedicada a la creación de soluciones tecnológicas innovadoras.');
    localStorage.setItem('the-cave-language', language);
  }, [language]);

  useEffect(() => {
    let timeoutId;
    const MIN_DELAY = 1000; // Delay mínimo para que el loader sea perceptible
    
    const parallaxImages = [
      './images/background1.png',
      './images/mountains.png',
      './images/jungle1.png',
      './images/jungle2.png',
      './images/jungle3.png',
      './images/jungle4.png',
      './images/jungle5.png',
      './images/man_on_mountain.png'
    ];

    const preloadImages = () => {
      return Promise.all(
        parallaxImages.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Continúa aunque falle una imagen
            img.src = src;
          });
        })
      );
    };

    const done = async () => {
      try {
        // Esperar a que se carguen todas las imágenes del parallax
        await preloadImages();
        // Asegurar un delay mínimo
        timeoutId = setTimeout(() => setIsLoading(false), MIN_DELAY);
      } catch (error) {
        console.warn('Error loading parallax images:', error);
        // Continuar de todos modos después del delay mínimo
        timeoutId = setTimeout(() => setIsLoading(false), MIN_DELAY);
      }
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

  return (
    <div className="App">
      {isLoading ? (
        <Loader language={language} />
      ) : (
        <HomeScreen language={language} onLanguageChange={setLanguage} />
      )}
      <div className="page-frame" />
    </div>
  );
}

export default App;