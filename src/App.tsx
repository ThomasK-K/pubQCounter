import { useState, useEffect } from "react";
import Countdown from "./components/Countdownnew";

import "./App.css";

function App() {
  const [count] = useState<number>(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? parseInt(savedCount) : 0;
  });

  // Speichere den Count-Wert im LocalStorage, wenn er sich ändert
  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  // Prüfe die Online/Offline-Verbindung
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [newVersionAvailable, setNewVersionAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Überprüfe, ob eine PWA-Aktualisierung verfügbar ist
    window.addEventListener("sw-update-available", () => {
      setNewVersionAvailable(true);
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("sw-update-available", () => {
        setNewVersionAvailable(false);
      });
    };
  }, []);

  const updateApp = () => {
    // Eine benutzerdefinierte Funktion, die den Service Worker aktualisiert
    window.location.reload();
  };

  return (
    <div className="app-container">
      <header>
        <div className={`connection-status ${isOnline ? "online" : "offline"}`}>
          {isOnline ? "Online" : "Offline"}
        </div>
      </header>

      {newVersionAvailable && (
        <div className="update-banner">
          <p>Eine neue Version ist verfügbar!</p>
          <button onClick={updateApp} className="update-btn">
            Aktualisieren
          </button>
        </div>
      )}
      <Countdown />

      {/* <p className="pwa-info">
        Diese App funktioniert auch offline. Du kannst sie zu deinem Homescreen hinzufügen!
      </p> */}
    </div>
  );
}

export default App;
