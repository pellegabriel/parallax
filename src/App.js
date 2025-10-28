import React, { useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
// import Loader from './components/loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(false); // Comentado el loader
  const [route, setRoute] = useState('home'); // 'home' | 'contact'

  // useEffect(() => {
  //   let timeoutId;
  //   const MIN_DELAY = 6000; // ms
  //   const done = () => {
  //     // ensure a minimum delay so the loader is perceptible
  //     timeoutId = setTimeout(() => setIsLoading(false), MIN_DELAY);
  //   };
  //   if (document.readyState === 'complete') {
  //     done();
  //   } else {
  //     window.addEventListener('load', done);
  //   }
  //   return () => {
  //     window.removeEventListener('load', done);
  //     if (timeoutId) clearTimeout(timeoutId);
  //   };
  // }, []);

  const handleNavigateToContact = () => setRoute('contact');
  const handleNavigateToHome = () => setRoute('home');

  return (
    <div className="App">
      {/* Loader comentado - ahora muestra directamente el contenido */}
      <>
        {route === 'home' && (
          <HomeScreen onNavigateToContact={handleNavigateToContact} />
        )}
        {route === 'contact' && (
          <ContactScreen onNavigateToHome={handleNavigateToHome} />
        )}
      </>
      <div className="page-frame" />
    </div>
  );
}

export default App;