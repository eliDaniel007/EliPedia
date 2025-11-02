# 🚀 Guide d'Installation Rapide - ELIPEDIA

Ce guide vous accompagne pas à pas pour mettre en place le projet ELIPEDIA sur votre machine.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

1. **Node.js** (version 18 ou supérieure)
   - Télécharger : https://nodejs.org/
   - Vérifier : `node --version`

2. **PostgreSQL** (version 14 ou supérieure)
   - Windows : https://www.postgresql.org/download/windows/
   - Vérifier : `psql --version`

3. **Git** (optionnel, pour le versioning)
   - Télécharger : https://git-scm.com/

## 🎯 Installation étape par étape

### Étape 1 : Installer PostgreSQL

1. Téléchargez et installez PostgreSQL
2. Notez bien le **mot de passe** que vous définissez pour l'utilisateur `postgres`
3. PostgreSQL devrait démarrer automatiquement

### Étape 2 : Créer la base de données

Ouvrez un terminal (PowerShell sur Windows) et exécutez :

```bash
# Connexion à PostgreSQL
psql -U postgres

# Dans le prompt psql, créez la base de données :
CREATE DATABASE elipedia;

# Quitter psql
\q
```

### Étape 3 : Initialiser le schéma de la base de données

```bash
# Depuis la racine du projet ELIPEDIA
psql -U postgres -d elipedia -f database/schema.sql
```

Vous devriez voir :
```
DROP TABLE
DROP TABLE
DROP TABLE
CREATE TABLE
CREATE INDEX
CREATE TABLE
...
```

### Étape 4 : Configurer le backend

```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances Node.js
npm install
```

### Étape 5 : Configurer les variables d'environnement

1. Créez un fichier `.env` dans le dossier `backend` :

```bash
# Dans backend/
copy .env.template .env
```

2. Ouvrez `.env` avec un éditeur de texte et modifiez :

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elipedia
DB_USER=postgres
DB_PASSWORD=VOTRE_MOT_DE_PASSE_ICI  # ⚠️ Important : mettez votre vrai mot de passe
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Étape 6 : Charger les données d'exemple

```bash
# Toujours dans backend/
npm run seed
```

Vous devriez voir :
```
🌱 ====================================
🌱 ELIPEDIA - Script de Seeding
🌱 ====================================

✅ Connexion à PostgreSQL réussie
📂 3 fichier(s) trouvé(s) dans /data

📄 Traitement de: geographie.json
  ✅ Catégorie créée: "Géographie"
  ...

🎉 Seeding terminé avec succès !
```

### Étape 7 : Démarrer le serveur

```bash
npm run dev
```

Vous devriez voir :
```
🚀 ====================================
🎮 Serveur ELIPEDIA démarré avec succès !
📡 Port: 3001
🌍 URL: http://localhost:3001
🗄️  Base de données: elipedia
🚀 ====================================
```

### Étape 8 : Tester l'API

Ouvrez votre navigateur et allez sur :

👉 **http://localhost:3001**

Vous devriez voir :
```json
{
  "message": "🎮 Bienvenue sur l'API ELIPEDIA - List Master",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "categories": "/api/categories",
    "lists": "/api/lists",
    "search": "/api/search?q=query"
  }
}
```

Testez les endpoints :
- http://localhost:3001/api/categories
- http://localhost:3001/api/lists
- http://localhost:3001/api/lists/1
- http://localhost:3001/api/search?q=Nigeria

## ✅ Vérification de l'installation

Si tout fonctionne, vous devriez pouvoir :

- ✅ Voir la liste des catégories sur `/api/categories`
- ✅ Voir la liste des listes sur `/api/lists`
- ✅ Voir les détails d'une liste avec ses items sur `/api/lists/1`
- ✅ Rechercher "Nigeria" et obtenir des résultats

## 🔧 Problèmes courants

### ❌ "Erreur de connexion à PostgreSQL"

**Solution :**
1. Vérifiez que PostgreSQL est démarré
2. Sur Windows, allez dans Services et vérifiez que "postgresql-x64-XX" est démarré
3. Vérifiez votre mot de passe dans le fichier `.env`

### ❌ "database 'elipedia' does not exist"

**Solution :**
```bash
psql -U postgres -c "CREATE DATABASE elipedia;"
```

### ❌ "Cannot find module 'express'"

**Solution :**
```bash
cd backend
npm install
```

### ❌ Le seeding ne fonctionne pas

**Solution :**
1. Vérifiez que le schéma est bien créé :
   ```bash
   psql -U postgres -d elipedia -f database/schema.sql
   ```
2. Réessayez le seeding :
   ```bash
   npm run seed
   ```

## 🎯 Prochaines étapes

Maintenant que le backend fonctionne, vous pouvez :

1. **Ajouter vos propres données** : Modifiez les fichiers dans `/data`
2. **Développer le frontend** : React avec Next.js (à venir)
3. **Déployer en production** : Sur Render ou Railway

## 📚 Ressources

- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Documentation Express](https://expressjs.com/)
- [Documentation Node.js](https://nodejs.org/docs/)

## 💡 Workflow quotidien

Pour travailler sur le projet :

1. **Démarrer PostgreSQL** (généralement automatique sur Windows)
2. **Démarrer le serveur backend** :
   ```bash
   cd backend
   npm run dev
   ```
3. **Modifier les données** : Éditez les fichiers dans `/data`
4. **Synchroniser** : `npm run seed`

C'est tout ! 🎉

