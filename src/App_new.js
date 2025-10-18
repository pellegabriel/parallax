import React, { useState, useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import Loader from './components/loader/Loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState('home'); // 'home' | 'contact'

  useEffect(() => {
    let timeoutId;
    const MIN_DELAY = 0; // ms
    const done = () => {
      // ensure a minimum delay so the loader is perceptible
      timeoutId = setTimeout(() => setIsLoading(false), MIN_DELAY);
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

  const handleNavigateToContact = () => setRoute('contact');
  const handleNavigateToHome = () => setRoute('home');

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {route === 'home' && (
            <HomeScreen onNavigateToContact={handleNavigateToContact} />
          )}
          {route === 'contact' && (
            <ContactScreen onNavigateToHome={handleNavigateToHome} />
          )}
        </>
      )}
      <div className="page-frame" />
    </div>
  );
}

export default App;
