# 🎉 Friendship 18 Site

Eine interaktive Website zum Feiern von 18 Jahren Freundschaft!

## Features

✨ **Interaktive Elemente:**
- 🎬 Tourneeplakat (Fullscreen-Viewer)
- ⭐ Selbsttest Quiz mit Resultat
- 🚗 Zeitstrahl (Auto-Animation)
- 📬 Bildersammlung mit Upload
- 📅 Kalender mit Gutscheinen
- 📝 Pinnwand mit Notizen
- 🚽 Geistiger Dünnschiss (Easter Egg)
- 👥 Besucher-Counter

🔊 **Sound-Effekte:**
- Blättern, Klicken, Quietschen
- Motor, Papiergeräusch
- Confetti & Fanfare

🔐 **Sicherheit:**
- Login mit Sicherheitsfrage
- Bilder verschwommen für Unberechtigte
- 18+ Altersbestätigung

💾 **Firebase Integration:**
- Echtzeit-Datenbank
- Bild-Upload
- Besucher-Tracking

## Setup

### 1. Firebase konfigurieren
- Gehe zu [Firebase Console](https://console.firebase.google.com/)
- Erstelle ein neues Projekt: `friendship-18-site`
- Aktiviere Realtime Database und Storage
- Kopiere deine Firebase Config in `app.js`

### 2. Sicherheitsfrage ändern
In `app.js` Zeile 88:
```javascript
const correctAnswer = 'deine-antwort-hier'; // ← Hier anpassen!
```

### 3. Website deployen

#### Option A: GitHub Pages (kostenlos)
```bash
git push origin main
```
Dann gehe zu Repository Settings → Pages → wähle `main` Branch

#### Option B: Firebase Hosting
```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

#### Option C: Vercel / Netlify
Verbinde dein GitHub-Repository und deploye mit 1 Klick!

## Domain verbinden

1. Kaufe deine Domain (z.B. bei Namecheap, GoDaddy)
2. Gehe zu den DNS-Einstellungen deiner Domain
3. Füge CNAME-Records hinzu (je nach Hosting-Service verschieden)
4. GitHub Pages: `www` → `<username>.github.io`
5. Firebase: Folge der [Firebase Docs](https://firebase.google.com/docs/hosting/custom-domain)

## Customize

### Hintergrund ändern
In `styles.css` Zeile 17:
```css
background: linear-gradient(135deg, #deine-farbe1 0%, #deine-farbe2 100%);
```

### Farben anpassen
Suche nach `#c17a6b` in `styles.css` und ersetze mit deinen Farben

### Quizfragen ändern
In `app.js` Funktion `loadQuiz()` - passe die `questions` an

### Zeitstrahl Events
Klicke im Kalender auf "Neues Event hinzufügen" oder füge direkt in Firebase hinzu

## Troubleshooting

**❌ Firebase lädt nicht:**
- Prüfe deine API-Keys in `app.js`
- Kontrolliere Firebase Security Rules

**❌ Bilder zeigen nicht:**
- Prüfe Firebase Storage Permissions
- Nutze Incognito-Fenster (Cache-Problem)

**❌ Sounds spielen nicht:**
- Browser muss Audio-Kontext erlauben
- Prüfe Lautstärke in `sounds.js`

## Lizenz

Frei verwendbar für private Projekte! 🎉

---

Viel Spaß mit deiner Website! 🚀✨