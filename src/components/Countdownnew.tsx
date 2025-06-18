import { useState, useEffect, useRef } from 'react';
import '../styles/Countdown.css';

const Countdownnew = () => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const minutesInputRef = useRef<HTMLInputElement>(null);
  const secondsInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Formatierung in MM:SS
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Audio-Objekt initialisieren
  useEffect(() => {
    // Audio-Element erstellen wenn noch nicht vorhanden
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/boat-horn.mp3');
      audioRef.current.preload = 'auto';
      audioRef.current.volume = 0.7;
      // Optional: Wiederhole den Alarm mehrmals für bessere Aufmerksamkeit
      audioRef.current.loop = true;
    }
    
    return () => {
      // Bereinigung
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Countdown-Logik
  useEffect(() => {
    let interval: number | null = null;

    if (isActive && timeInSeconds > 0) {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timeInSeconds === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true); // Markiere als abgelaufen für Animation
      
      // Ton abspielen, wenn der Countdown endet
      if (audioRef.current && isAudioEnabled) {
        try {
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('Audio wird abgespielt');
                // Nach 10 Sekunden automatisch stoppen, falls der Benutzer den Alarm nicht manuell stoppt
                setTimeout(() => {
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                  }
                }, 10000);
              })
              .catch(err => console.warn("Audio konnte nicht abgespielt werden:", err));
          }
        } catch (error) {
          console.error("Fehler beim Abspielen des Sounds:", error);
        }
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeInSeconds, isAudioEnabled]);

  const handleStart = () => {
    const minutes = Number(minutesInputRef.current?.value) || 0;
    const seconds = Number(secondsInputRef.current?.value) || 0;
    const totalSeconds = minutes * 60 + seconds;
     setIsFinished(false); // Animation zurücksetzen

    if (totalSeconds > 0) {
      setTimeInSeconds(totalSeconds);
      setInitialTime(totalSeconds);
      setIsActive(true);
    } else {
      alert("Bitte eine gültige Zeit eingeben!");
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeInSeconds(0);
    setInitialTime(0); // Fortschrittsbalken zurücksetzen
    setIsFinished(false); // Animation zurücksetzen
    if (minutesInputRef.current) minutesInputRef.current.value = '';
    if (secondsInputRef.current) secondsInputRef.current.value = '';
    
    // Auch den Sound stoppen falls er gerade abgespielt wird
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  // Für den Fortschrittsbalken
  const [initialTime, setInitialTime] = useState<number>(0);
  const progress = initialTime > 0 ? (timeInSeconds / initialTime) * 100 : 0;

  return (
    <div className="countdown-container">
      <h1>Countdown Timer</h1>
      <div className="countdown-inputs">
        <input
          type="number"
          ref={minutesInputRef}
          placeholder="Minuten"
          disabled={isActive}
          className="countdown-input countdown-input-minutes"
          min="0"
        />
        :
        <input
          type="number"
          ref={secondsInputRef}
          placeholder="Sekunden"
          disabled={isActive}
          className="countdown-input countdown-input-seconds"
          min="0"
          max="59"
        />
        <button 
          onClick={handleStart} 
          disabled={isActive} 
          className="countdown-button"
        >
          Start
        </button>
        <button 
          onClick={handleReset} 
          className="countdown-button countdown-reset"
        >
          Zurücksetzen
        </button>
      </div>
      
      <div className={`countdown-display ${isFinished ? 'countdown-finished' : ''}`}>
        {timeInSeconds === 0 && isFinished ? 'ZEIT ABGELAUFEN!' : formatTime(timeInSeconds)}
      </div>
      
      {initialTime > 0 && (
        <div className="countdown-progress-container">
          <div 
            className="countdown-progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      
      {isFinished && (
        <button 
          className="countdown-button stop-alarm"
          onClick={() => {
            if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current.currentTime = 0;
            }
            setIsFinished(false);
          }}
        >
          Alarm Stoppen
        </button>
      )}
      
      <div className="countdown-options">
        <label className="countdown-option">
          <input
            type="checkbox"
            checked={isAudioEnabled}
            onChange={() => setIsAudioEnabled(!isAudioEnabled)}
          />
          <span className="option-text">
            {isAudioEnabled ? '🔊 Ton aktiviert' : '🔇 Ton deaktiviert'}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Countdownnew;