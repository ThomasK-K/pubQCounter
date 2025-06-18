import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import SplashScreen from './components/SplashScreen'

// Benutzerdefiniertes Event für App-Updates
const swUpdateEvent = new Event('sw-update-available')

// Service Worker für PWA registrieren
registerSW({
  onNeedRefresh() {
    // Statt eines Bestätigungsdialogs senden wir ein Event an die App
    window.dispatchEvent(swUpdateEvent)
  },
  onOfflineReady() {
    console.log('Die App ist bereit für die Offline-Nutzung')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SplashScreen />
  </StrictMode>,
)
