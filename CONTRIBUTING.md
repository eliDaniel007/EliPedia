# 🤝 Guide de Contribution - ELIPEDIA

Merci de votre intérêt pour contribuer à **ELIPEDIA** ! Ce document vous guidera dans le processus de contribution.

---

## 🎯 Comment Contribuer

### 1. Fork & Clone

```bash
# Forker le repository
# Puis cloner votre fork
git clone https://github.com/VOTRE_USERNAME/EliPedia.git
cd EliPedia
```

### 2. Créer une Branche

```bash
git checkout -b feature/ma-nouvelle-feature
```

### 3. Faire vos Changements

#### Ajouter des Données
- Éditez les fichiers dans `/data`
- Suivez le format existant
- Ajoutez des métadonnées pertinentes

#### Modifier le Code
- Respectez le style de code existant
- Ajoutez des commentaires pour les parties complexes
- Testez vos changements

### 4. Commit & Push

```bash
git add .
git commit -m "feat: Ajouter une nouvelle liste de capitales"
git push origin feature/ma-nouvelle-feature
```

### 5. Créer une Pull Request

1. Allez sur GitHub
2. Cliquez sur "New Pull Request"
3. Expliquez vos changements
4. Attendez la revue de code

---

## 📝 Guidelines

### Messages de Commit

Utilisez des préfixes clairs :
- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage
- `refactor:` - Refactoring
- `test:` - Tests
- `chore:` - Maintenance

### Code Style

- **JavaScript** : 2 espaces d'indentation
- **JSON** : Sauf pour les fichiers de données (facilité de lecture)
- **Commentaires** : En français

### Données

- Utilisez un français correct et complet
- Vérifiez les métadonnées avant de soumettre
- Respectez le format JSON existant

---

## 🧪 Tests

Avant de soumettre :
1. Vérifiez que le serveur démarre : `npm run dev`
2. Testez les endpoints de l'API
3. Vérifiez l'interface frontend

---

## ❓ Questions ?

Ouvrez une **Issue** sur GitHub pour discuter de vos idées avant de commencer !

---

**Merci pour votre contribution !** 🎉

