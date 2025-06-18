import { useState } from 'react';
import App from '../App';
import '../styles/SplashScreen.css';

function SplashScreen() {
  const [showApp, setShowApp] = useState(false);

  const handleSplashClick = () => {
    setShowApp(true);
  };

  if (showApp) {
    return <App />;
  }

  return (
    <div className="splash-screen" onClick={handleSplashClick}>
      <div className="splash-content">
        <img 
          src="/web-app-manifest.png" 
          alt="PubQuiz im Jazzclub" 
          width="1024" 
          height="1024"  
          className="splash-image" 
        />
        <div className="splash-text">

          <p>Klicke hier, um zu starten</p>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
