import { useState, useEffect } from 'react'
import Countdown from './components/Countdownnew'
import AnalogClock from './components/AnalogClock'
import './App.css'

function App() {
  const [count, setCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('count')
    return savedCount ? parseInt(savedCount) : 0
  })
  
  // Aktuelle Ansicht (Zähler, Countdown oder Uhr)
  const [activeView, setActiveView] = useState<'counter' | 'countdownnew' | 'clock'>('counter')
  
  // Theme für die Analoguhr
  const [clockTheme, setClockTheme] = useState<'classic' | 'modern' | 'vintage'>('classic')
  
  // Speichere den Count-Wert im LocalStorage, wenn er sich ändert
  useEffect(() => {
    localStorage.setItem('count', count.toString())
  }, [count])

  // Prüfe die Online/Offline-Verbindung
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)
  const [newVersionAvailable, setNewVersionAvailable] = useState<boolean>(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Überprüfe, ob eine PWA-Aktualisierung verfügbar ist
    window.addEventListener('sw-update-available', () => {
      setNewVersionAvailable(true)
    })

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('sw-update-available', () => {
        setNewVersionAvailable(false)
      })
    }
  }, [])

  const updateApp = () => {
    // Eine benutzerdefinierte Funktion, die den Service Worker aktualisiert
    window.location.reload()
  }

  return (
    <div className="app-container">
      <header>
        <h1>Multi-Counter App</h1>
        <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      </header>

      {newVersionAvailable && (
        <div className="update-banner">
          <p>Eine neue Version ist verfügbar!</p>
          <button onClick={updateApp} className="update-btn">Aktualisieren</button>
        </div>
      )}
      
      <div className="view-selector">
        <button 
          className={`view-btn ${activeView === 'counter' ? 'active' : ''}`}
          onClick={() => setActiveView('counter')}
        >
          Zähler
        </button>
        <button 
          className={`view-btn ${activeView === 'countdownnew' ? 'active' : ''}`}
          onClick={() => setActiveView('countdownnew')}
        >
          Countdown
        </button>
        <button 
          className={`view-btn ${activeView === 'clock' ? 'active' : ''}`}
          onClick={() => setActiveView('clock')}
        >
          Uhr
        </button>
      </div>

      {activeView === 'counter' ? (
        <>
          <div className="counter-display">
            <span>{count}</span>
          </div>
          
          <div className="controls">
            <button 
              className="control-btn decrease" 
              onClick={() => setCount(count - 1)}
              aria-label="Verringern"
            >
              -
            </button>
            <button 
              className="control-btn reset" 
              onClick={() => setCount(0)}
              aria-label="Zurücksetzen"
            >
              Reset
            </button>
            <button 
              className="control-btn increase" 
              onClick={() => setCount(count + 1)}
              aria-label="Erhöhen"
            >
              +
            </button>
          </div>
        </>
      ) : activeView === 'countdownnew' ? (
        <Countdown />
      ) : (
        <div className="clock-container">
          <h1>Analoge Uhr</h1>
          <div className="clock-themes">
            <button 
              onClick={() => setClockTheme('classic')}
              className={clockTheme === 'classic' ? 'active' : ''}
            >
              Klassisch
            </button>
            <button 
              onClick={() => setClockTheme('modern')}
              className={clockTheme === 'modern' ? 'active' : ''}
            >
              Modern
            </button>
            <button 
              onClick={() => setClockTheme('vintage')}
              className={clockTheme === 'vintage' ? 'active' : ''}
            >
              Vintage
            </button>
          </div>
          <AnalogClock 
            size={300} 
            showSecondHand={true} 
            theme={clockTheme} 
            hourMarkerType={clockTheme === 'vintage' ? 'roman' : clockTheme === 'modern' ? 'dots' : 'lines'} 
          />
        </div>
      )}

      {/* <p className="pwa-info">
        Diese App funktioniert auch offline. Du kannst sie zu deinem Homescreen hinzufügen!
      </p> */}
    </div>
  )
}

export default App
