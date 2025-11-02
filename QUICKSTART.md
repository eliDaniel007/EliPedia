# ⚡ Démarrage Rapide - ELIPEDIA

Pour les impatients ! 🚀

## 🎯 En 5 minutes chrono

### 1. Installer PostgreSQL
- Windows : https://www.postgresql.org/download/windows/
- Retenez votre mot de passe !

### 2. Créer la base de données

```bash
# Ouvrir PowerShell
psql -U postgres -c "CREATE DATABASE elipedia;"
psql -U postgres -d elipedia -f database/schema.sql
```

### 3. Configurer le backend

```bash
cd backend
npm install
```

### 4. Créer le fichier `.env`

Créez `backend/.env` avec ce contenu :

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elipedia
DB_USER=postgres
DB_PASSWORD=VOTRE_MOT_DE_PASSE
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 5. Charger les données

```bash
npm run seed
```

### 6. Démarrer le serveur

```bash
npm run dev
```

### 7. Tester

Ouvrez votre navigateur : **http://localhost:3001**

Testez les endpoints :
- http://localhost:3001/api/categories
- http://localhost:3001/api/lists
- http://localhost:3001/api/search?q=Nigeria

## ✅ Ça marche ?

**OUI** ✅ → Félicitations ! Passez à la lecture de `DATA_WORKFLOW.md` pour ajouter vos propres listes.

**NON** ❌ → Lisez `SETUP_GUIDE.md` pour un guide détaillé avec résolution de problèmes.

## 🎮 Ajouter une nouvelle liste en 30 secondes

1. Ouvrez `data/geographie.json`
2. Ajoutez une nouvelle liste dans le tableau `lists`
3. Exécutez `npm run seed` depuis `/backend`
4. Vérifiez : http://localhost:3001/api/lists

C'est tout ! 🎉

## 📚 Documentation Complète

- **Installation détaillée** → `SETUP_GUIDE.md`
- **Gestion des données** → `DATA_WORKFLOW.md`
- **Structure du projet** → `PROJECT_STRUCTURE.md`
- **API Backend** → `backend/README.md`

