# GitHub Repository Setup

## ✅ Branch Protection Rules (für main)

Gehe zu: Settings → Branches → Add rule

### Empfohlene Einstellungen:

- [x] **Require a pull request before merging**
  - [ ] Require approvals (optional für Solo-Entwicklung)
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [ ] Require review from CODEOWNERS (optional)

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - Status checks:
    - `quality` (Code Quality)
    - `build-test` (Build Test)

- [x] **Require conversation resolution before merging**

- [ ] **Require signed commits** (optional, aber empfohlen)

- [x] **Include administrators** (auch du musst die Regeln befolgen)

## 🔑 GitHub Secrets einrichten

Gehe zu: Settings → Secrets and variables → Actions

### Erforderliche Secrets:

1. **EXPO_TOKEN**
   ```bash
   # Generieren auf: https://expo.dev/accounts/[username]/settings/access-tokens
   eas login
   eas credentials:manager
   ```

2. **SENTRY_AUTH_TOKEN** (optional)
   ```bash
   # Generieren auf: https://sentry.io/settings/auth-tokens/
   ```

3. **OPENAI_API_KEY** (für Tests)
   ```bash
   # Von: https://platform.openai.com/api-keys
   ```

## 📱 EAS Build Setup

```bash
# EAS CLI installieren
npm install -g eas-cli

# Login
eas login

# Projekt initialisieren
eas build:configure

# Erste Builds erstellen
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

## 🚀 Deployment Workflow

### 1. Feature Branch erstellen
```bash
git checkout -b feature/neue-funktion
```

### 2. Änderungen committen
```bash
git add .
git commit -m "feat: neue funktion hinzugefügt"
```

### 3. Push und Pull Request
```bash
git push origin feature/neue-funktion
```
→ Erstelle Pull Request auf GitHub

### 4. Automatische Checks
- ✅ Linting
- ✅ Type Checking  
- ✅ Tests
- ✅ Preview Build (optional)

### 5. Merge zu main
Nach erfolgreichen Checks → Merge

### 6. Automatisches Deployment
- Build wird erstellt
- Upload zu TestFlight/Play Console

## 📊 Status Badges

Füge diese zu deiner README hinzu:

```markdown
![CI/CD](https://github.com/AndreasKalkusinski/VoiceFlow/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/github/license/AndreasKalkusinski/VoiceFlow)
![Version](https://img.shields.io/github/package-json/v/AndreasKalkusinski/VoiceFlow)
```

## 🔄 GitHub Actions aktivieren

1. Gehe zu: Actions Tab
2. Klicke auf "I understand my workflows, go ahead and enable them"
3. Workflows sollten automatisch bei Push/PR laufen

## 📝 PR Template

Erstelle `.github/pull_request_template.md`:

```markdown
## Beschreibung
Kurze Beschreibung der Änderungen

## Art der Änderung
- [ ] Bug fix
- [ ] Neue Funktion
- [ ] Breaking change
- [ ] Dokumentation

## Checkliste
- [ ] Code folgt den Style Guidelines
- [ ] Selbst-Review durchgeführt
- [ ] Tests hinzugefügt/aktualisiert
- [ ] Dokumentation aktualisiert
```

## 🎯 Nächste Schritte

1. ✅ Repository ist live
2. ⏳ Branch Protection Rules aktivieren
3. ⏳ GitHub Secrets hinzufügen
4. ⏳ EAS Build konfigurieren
5. ⏳ Erste Preview Build erstellen

## 🔗 Wichtige Links

- Repository: https://github.com/AndreasKalkusinski/VoiceFlow
- Actions: https://github.com/AndreasKalkusinski/VoiceFlow/actions
- Releases: https://github.com/AndreasKalkusinski/VoiceFlow/releases
- Issues: https://github.com/AndreasKalkusinski/VoiceFlow/issues