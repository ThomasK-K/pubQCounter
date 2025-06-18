import { useState, useEffect } from 'react';
import '../styles/AnalogClock.css';

interface AnalogClockProps {
  size?: number; // Größe der Uhr in Pixeln
  showSecondHand?: boolean; // Option, um den Sekundenzeiger ein-/auszuschalten
  clockLabel?: string; // Optional: Text unter dem Zifferblatt (z.B. "Swiss Made")
  hourMarkerType?: 'lines' | 'dots' | 'roman'; // Art der Stundenmarkierungen
  theme?: 'classic' | 'modern' | 'vintage'; // Verschiedene Designs
}

const AnalogClock: React.FC<AnalogClockProps> = ({ 
  size = 300, 
  showSecondHand = true,
  clockLabel = 'Uhr',
  hourMarkerType = 'lines',
  theme = 'modern'
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Aktualisieren der Zeit alle 1000ms
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Berechnen der Rotation für die Zeiger
  const secondRotation = (time.getSeconds() / 60) * 360;
  const minuteRotation = ((time.getMinutes() + time.getSeconds() / 60) / 60) * 360;
  const hourRotation = ((time.getHours() % 12 + time.getMinutes() / 60) / 12) * 360;
  
  const clockStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  // Styling für die verschiedenen Zeiger

  const hourHandStyle = {
    transform: `rotate(${hourRotation}deg)`,
    height: `${size * (theme === 'vintage' ? 0.22 : 0.25)}px`,
    width: `${size * (theme === 'modern' ? 0.035 : 0.04)}px`,
    top: `${size * 0.25}px`,
    borderRadius: theme === 'modern' ? '0' : '8px 8px 0 0',
  };

  const minuteHandStyle = {
    transform: `rotate(${minuteRotation}deg)`,
    height: `${size * (theme === 'vintage' ? 0.32 : 0.35)}px`,
    width: `${size * (theme === 'modern' ? 0.025 : 0.03)}px`,
    top: `${size * 0.15}px`,
    borderRadius: theme === 'modern' ? '0' : '4px 4px 0 0',
  };

  const secondHandStyle = {
    transform: `rotate(${secondRotation}deg)`,
    height: `${size * 0.4}px`,
    width: `${size * (theme === 'modern' ? 0.01 : 0.02)}px`,
    top: `${size * 0.1}px`,
    display: showSecondHand ? 'block' : 'none',
    '--rotation': `${secondRotation}deg`, // Für CSS-Animation
    animation: theme !== 'modern' && showSecondHand ? 'ticking 1s steps(1) infinite' : 'none',
  } as React.CSSProperties; // Type cast für benutzerdefinierte CSS-Variablen

  // Römische Zahlen für eine Vintage-Anzeige
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
  
  // Verschiebung für die Zahlen je nach Design
  const getNumberDistance = () => {
    switch (theme) {
      case 'vintage': return size * 0.35;
      case 'modern': return size * 0.38;
      default: return size * 0.4;
    }
  };

  // Erstellen der Ziffern oder Marker für das Zifferblatt
  const renderNumbers = () => {
    if (hourMarkerType === 'dots') return null;
    
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const rotation = (i / 12) * 360;
      const displayNumber = hourMarkerType === 'roman' ? romanNumerals[i-1] : i;
      
      const fontSize = theme === 'vintage' ? 
        `${size * 0.09}px` : theme === 'modern' ? 
        `${size * 0.08}px` : `${size * 0.1}px`;
        
      const fontFamily = theme === 'vintage' ? 
        'Times New Roman, serif' : theme === 'modern' ? 
        'Arial, sans-serif' : 'Arial, sans-serif';
      
      const fontWeight = theme === 'modern' ? '400' : 'bold';
      
      const numberStyle = {
        transform: `rotate(${rotation}deg) translateY(-${getNumberDistance()}px) rotate(-${rotation}deg)`,
        fontSize,
        fontFamily,
        fontWeight,
      };
      
      numbers.push(
        <div key={i} className="clock-number" style={numberStyle}>
          {displayNumber}
        </div>
      );
    }
    return numbers;
  };

  // Erstellen der Stundenmarkierungen
  const renderHourMarkers = () => {
    const markers = [];
    // Anzahl der Marker basierend auf dem Typ
    const totalMarkers = hourMarkerType === 'dots' ? 12 : 60;
    
    for (let i = 1; i <= totalMarkers; i++) {
      const rotation = (i / totalMarkers) * 360;
      const isHourMarker = hourMarkerType === 'dots' || i % 5 === 0;
      
      // Verschiedene Stiloptionen basierend auf dem Theme
      let height, width, top;
      
      if (hourMarkerType === 'dots') {
        // Für Punkte anstelle von Linien
        height = width = theme === 'modern' ? `${size * 0.03}px` : `${size * 0.02}px`;
        top = `${size * 0.05}px`;
      } else {
        // Für Linien
        height = isHourMarker ? 
                (theme === 'vintage' ? `${size * 0.06}px` : `${size * 0.05}px`) : 
                (theme === 'modern' ? `${size * 0.02}px` : `${size * 0.025}px`);
        width = isHourMarker ? 
               (theme === 'modern' ? `${size * 0.015}px` : `${size * 0.02}px`) : 
               (theme === 'modern' ? `${size * 0.008}px` : `${size * 0.01}px`);
        top = isHourMarker ? 
             (theme === 'vintage' ? `${size * 0.04}px` : `${size * 0.05}px`) : 
             `${size * 0.06}px`;
      }
      
      const markerStyle = {
        transform: `rotate(${rotation}deg)`,
        height,
        width,
        top,
        borderRadius: hourMarkerType === 'dots' ? '50%' : '2px',
      };
      
      markers.push(
        <div key={i} className={`clock-marker ${isHourMarker ? 'hour-marker' : 'minute-marker'}`} style={markerStyle}></div>
      );
    }
    return markers;
  };

  return (
    <div className={`analog-clock theme-${theme}`} style={clockStyle}>
      <div className="clock-face">
        {renderHourMarkers()}
        {renderNumbers()}
        <div className="clock-center"></div>
        <div className="clock-hand hour-hand" style={hourHandStyle}></div>
        <div className="clock-hand minute-hand" style={minuteHandStyle}></div>
        <div className="clock-hand second-hand" style={secondHandStyle}></div>
        {clockLabel && <div className="clock-label">{clockLabel}</div>}
      </div>
    </div>
  );
};

export default AnalogClock;
