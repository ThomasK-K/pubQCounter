# CounterApp - Progressive Web App

Eine moderne Progressive Web App (PWA) mit React und TypeScript, die einen Zähler, einen Countdown-Timer und eine elegante analoge Uhr implementiert.

## Features

- **Multi-Tool-Funktionalität**: Wechseln Sie zwischen Counter, Countdown und Analoger Uhr
- **Analoge Uhr**:
  - Drei verschiedene Designs (Klassisch, Modern, Vintage)
  - Verschiedene Stundenmarkierungen (Striche, Punkte, römische Ziffern)
  - Realistische Schatten- und Glanzeffekte
  - Animierte Sekundenzeiger
- **Countdown-Timer**: Einfache Eingabe von Minuten und Sekunden mit visueller Anzeige
- **Counter**: Einfacher Zähler mit Plus, Minus und Reset-Funktion
- **Offline-Verwendung**: Funktioniert auch ohne Internetverbindung
- **Lokale Datenspeicherung**: Zählerstände werden im Browser gespeichert
- **Installierbar**: Kann auf dem Homescreen hinzugefügt werden
- **Online/Offline-Indikator**: Zeigt den aktuellen Verbindungsstatus
- **Update-Benachrichtigung**: Informiert über neue App-Versionen
- **Responsive Design**: Optimiert für alle Gerätetypen und Bildschirmgrößen
- **Dark Mode**: Automatische Anpassung an das System-Farbschema

## Installation

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für Produktion bauen
npm run build

# Vorschau der Produktionsversion
npm run preview
```

## Nutzung

Nach dem Start der App kannst du zwischen den drei Hauptfunktionen wechseln:

### Counter

- Nutze die Plus- und Minus-Buttons, um den Zähler zu erhöhen oder zu verringern
- Der "Reset"-Button setzt den Zähler auf Null zurück
- Der aktuelle Zählerstand wird automatisch im lokalen Speicher gesichert

### Countdown

- Gib die gewünschte Zeit in Minuten und Sekunden ein
- Klicke auf "Start", um den Countdown zu beginnen
- Ein Alarm wird ausgelöst, wenn der Countdown Null erreicht
- Mit "Zurücksetzen" kannst du den Timer jederzeit abbrechen

### Analoge Uhr

- Wähle zwischen drei verschiedenen Designs: Klassisch, Modern und Vintage
- Die Uhr zeigt die aktuelle Systemzeit an
- Hover-Effekte und Animationen verbessern die visuelle Darstellung
- Die Uhr passt sich automatisch an Dark Mode und verschiedene Bildschirmgrößen an

## Responsive Design

Die App wurde für verschiedene Bildschirmgrößen optimiert:

- **Desktop**: Volle Funktionalität mit großen, übersichtlichen Elementen
- **Tablet**: Angepasstes Layout für mittlere Bildschirmgrößen
- **Smartphone**: Kompakte Darstellung mit optimierter Touch-Bedienung

## PWA-Features

Diese App verfügt über folgende PWA-Funktionen:

- **Service Worker**: Ermöglicht Offline-Funktionalität
- **Web App Manifest**: Definiert, wie die App auf dem Homescreen erscheint
- **App-Shell-Architektur**: Schnelle Ladezeit und flüssige Navigation

## Technologien

- React 19
- TypeScript 5.8
- Vite 6
- vite-plugin-pwa (für PWA-Funktionalität)
- CSS-Module für komponentenbasiertes Styling
- Modulares Dateistruktur-Design

## Projektstruktur

```
/
├── public/               # Statische Assets und PWA-Icons
├── src/                  # Quellcode
│   ├── components/       # React-Komponenten
│   │   ├── AnalogClock.tsx
│   │   └── Countdownnew.tsx
│   ├── styles/           # CSS-Dateien
│   │   ├── AnalogClock.css
│   │   └── Countdown.css
│   ├── App.tsx           # Hauptkomponente
│   ├── App.css           # Globale Styles
│   └── main.tsx          # Einstiegspunkt
├── package.json          # Abhängigkeiten und Scripts
└── vite.config.ts        # Vite-Konfiguration mit PWA-Plugin
```

## Uhr-Themes

Die analoge Uhr bietet drei verschiedene Themes:

1. **Klassisch**: Traditionelles Design mit klaren Ziffern und schlanken Zeigern
2. **Modern**: Minimalistisches Design mit punktförmigen Markierungen und eckigen Zeigern
3. **Vintage**: Nostalgisches Design mit römischen Ziffern und stilisierten Zeigern

Alle Themes unterstützen automatisch den Dark Mode und passen ihre Farben entsprechend an.

## Weiterentwicklung

Mögliche Erweiterungen für zukünftige Versionen:

- Wecker-Funktionalität
- Zusätzliche Uhr-Themes
- Weltzeituhr mit mehreren Zeitzonen
- Speichern mehrerer Timer-Voreinstellungen
- Statistiken für den Counter

## Screenshots

_Bilder der App können hier hinzugefügt werden, um die verschiedenen Ansichten und Themes zu zeigen._

```
Counter-Ansicht           Countdown-Ansicht          Analoge Uhr (Klassisch)
+------------------+      +------------------+      +------------------+
|                  |      |                  |      |                  |
|       123        |      |     03:45        |      |       XII        |
|                  |      |                  |      |    XI      I     |
| [−]  [Reset]  [+]|      |   [Zurücksetzen] |      |  X          II   |
|                  |      |                  |      |                  |
+------------------+      +------------------+      +------------------+

Analoge Uhr (Modern)      Analoge Uhr (Vintage)
+------------------+      +------------------+
|                  |      |                  |
|       ⋅⋅⋅        |      |      XII         |
|    ⋅       ⋅     |      |    IX     III    |
|  ⋅           ⋅   |      |   VIII     IV    |
|                  |      |                  |
+------------------+      +------------------+
```

## Kontakt

Bei Fragen, Feedback oder Verbesserungsvorschlägen freue ich mich über Ihre Nachricht.

---

_Entwickelt mit ❤️ und React_

## Lizenz

MIT-Lizenz

## Docker-Unterstützung

Die CounterApp kann einfach mit Docker entwickelt und bereitgestellt werden. Wir bieten dafür verschiedene Optionen an:

### Einfache Verwendung mit dem Docker-Script

Wir haben ein praktisches Shell-Script erstellt, das die häufigsten Docker-Befehle vereinfacht:

```bash
# Entwicklungsumgebung starten (mit Hot Reload)
./docker.sh dev

# Produktionsumgebung starten (optimiert)
./docker.sh prod

# Nur Images bauen ohne zu starten
./docker.sh build

# Alle Container stoppen
./docker.sh stop

# Container, Images und Volumes aufräumen
./docker.sh clean
```

### Direkte Verwendung von Docker Compose

Sie können auch direkt mit Docker Compose arbeiten:

```bash
# Entwicklungsumgebung starten
docker-compose up app-dev

# Produktionsumgebung starten
docker-compose up --build app-prod

# Alle Container stoppen
docker-compose down
```

### Container-Ports

- Entwicklungsumgebung: http://localhost:3000
- Produktionsumgebung: http://localhost:8080
