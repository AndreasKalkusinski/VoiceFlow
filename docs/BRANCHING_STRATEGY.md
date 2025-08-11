# Branch Strategy für VoiceFlow

## Empfohlene Strategie: GitHub Flow (Schlank & CI/CD-freundlich)

### Branches:
```
main (production-ready)
  └── feature/* oder fix/* (kurzlebige Branches)
```

### Warum KEIN develop Branch?

1. **Continuous Deployment**: Jeder Merge zu `main` sollte production-ready sein
2. **Weniger Komplexität**: Keine Sync-Probleme zwischen develop und main
3. **Schnellere Releases**: Direkte Pipeline von Feature → Production
4. **Feature Flags statt Branches**: Nutze Feature Toggles für unfertige Features

### Workflow:

```bash
# 1. Neues Feature starten
git checkout -b feature/speech-improvements

# 2. Entwickeln & committen
git add .
git commit -m "feat: improve speech recognition accuracy"

# 3. Push & Pull Request
git push origin feature/speech-improvements

# 4. Nach Review & Tests → Merge zu main
# 5. Automatisches Deployment
```

### CI/CD Pipeline:

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      
  build-ios:
    if: github.ref == 'refs/heads/main'
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: expo/expo-github-action@v8
      - run: eas build --platform ios --non-interactive
      
  deploy:
    needs: [test, build-ios]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: eas submit --platform ios
```

## Feature Flags Implementation:

```typescript
// src/config/features.ts
export const FEATURES = {
  NEW_VOICE_ENGINE: process.env.ENABLE_NEW_VOICE || false,
  ADVANCED_SETTINGS: process.env.ENABLE_ADVANCED || false,
  OFFLINE_MODE: false, // Noch in Entwicklung
};

// Verwendung:
if (FEATURES.NEW_VOICE_ENGINE) {
  // Neuer Code
} else {
  // Stabiler Code
}
```

## Versionierung:

```json
{
  "version": "1.2.3",
  // 1 = Major (Breaking Changes)
  // 2 = Minor (Neue Features)  
  // 3 = Patch (Bugfixes)
}
```

## Deployment Strategie:

### 1. Automatisch (Empfohlen)
- Main → Staging (automatisch)
- Tag → Production (automatisch)

```bash
# Production Release
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin v1.2.3
```

### 2. Progressive Rollout
- 10% der User → 50% → 100%
- Via TestFlight oder Play Console

## Testing Strategie:

### Pre-Merge (Pull Request):
- ✅ Unit Tests
- ✅ Integration Tests
- ✅ Linting
- ✅ Type Checking
- ✅ Bundle Size Check

### Post-Merge (main):
- ✅ E2E Tests
- ✅ Performance Tests
- ✅ Build für alle Plattformen

## Notfall-Rollback:

```bash
# Schneller Revert
git revert <commit-hash>
git push origin main

# Oder via GitHub UI: "Revert" Button beim PR
```

## Vorteile dieser Strategie:

1. **Einfachheit**: Nur ein Long-Living Branch
2. **Schnelligkeit**: Features kommen schneller in Production
3. **Sicherheit**: Alles wird getestet bevor es zu main kommt
4. **Flexibilität**: Feature Flags erlauben sichere Experimente

## Tools Empfehlungen:

- **CI/CD**: GitHub Actions (bereits integriert)
- **Monitoring**: Sentry (bereits integriert)
- **Feature Flags**: LaunchDarkly oder selbst gebaut
- **Testing**: Jest + Detox (E2E)
- **Deployment**: EAS (Expo Application Services)

## Branch Naming Convention:

```
feature/kurze-beschreibung
fix/issue-123-beschreibung
hotfix/kritischer-bug
chore/dependencies-update
docs/api-documentation
```

## Commit Convention (Conventional Commits):

```
feat: Neue Funktion
fix: Bugfix
docs: Dokumentation
style: Formatierung
refactor: Code Refactoring
test: Tests hinzufügen
chore: Wartungsarbeiten
```

## Fazit:

**KISS - Keep It Simple, Stupid!**

Ein develop Branch macht nur Sinn wenn:
- Du ein großes Team hast (5+ Entwickler)
- Du scheduled Releases machst (z.B. monatlich)
- Du eine komplexe QA-Phase brauchst

Für dein Projekt: **main-only mit Feature Flags** ist optimal!