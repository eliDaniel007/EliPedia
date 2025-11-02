# 📖 Index de la Documentation - ELIPEDIA

Bienvenue dans la documentation complète d'ELIPEDIA ! Ce fichier vous guide vers tous les documents du projet.

## 🎯 Par où commencer ?

### 🚀 Je veux démarrer RAPIDEMENT
➡️ **`QUICKSTART.md`** - 5 minutes pour avoir le backend fonctionnel

### 📚 Je veux tout comprendre pas à pas
➡️ **`SETUP_GUIDE.md`** - Guide d'installation détaillé avec résolution de problèmes

### ✅ Je veux une checklist de vérification
➡️ **`CHECKLIST.md`** - Cochez chaque étape pour valider votre installation

---

## 📚 Documentation Complète

### 📋 Documentation Générale

| Fichier | Description | Quand le lire ? |
|---------|-------------|-----------------|
| **`README.md`** | Vue d'ensemble du projet | En premier |
| **`QUICKSTART.md`** | Démarrage ultra-rapide | Si vous êtes pressé |
| **`SETUP_GUIDE.md`** | Installation détaillée | Pour une installation pas à pas |
| **`CHECKLIST.md`** | Checklist de mise en route | Pour vérifier que tout fonctionne |

### 🏗️ Documentation Technique

| Fichier | Description | Quand le lire ? |
|---------|-------------|-----------------|
| **`ARCHITECTURE.md`** | Architecture technique | Pour comprendre le système |
| **`PROJECT_STRUCTURE.md`** | Structure des dossiers | Pour naviguer dans le code |
| **`DATA_WORKFLOW.md`** | Gestion des données | Pour ajouter vos propres listes |

### 🔧 Documentation du Backend

| Fichier | Description | Quand le lire ? |
|---------|-------------|-----------------|
| **`backend/README.md`** | Documentation de l'API | Pour utiliser les endpoints |
| **`backend/CONFIG_ENV.md`** | Configuration .env | Si vous avez des problèmes de connexion |

### 📊 Fichiers de Code

| Fichier | Description |
|---------|-------------|
| **`database/schema.sql`** | Schéma de la base de données PostgreSQL |
| **`backend/src/server.js`** | Point d'entrée du serveur Express |
| **`backend/scripts/seed.js`** | Script de synchronisation des données |

### 🗂️ Fichiers de Données

| Fichier | Description |
|---------|-------------|
| **`data/geographie.json`** | Catégorie Géographie avec listes et items |
| **`data/cinema.json`** | Catégorie Cinéma avec listes et items |
| **`data/science.json`** | Catégorie Science avec listes et items |

---

## 🗺️ Parcours de Lecture Recommandés

### 👨‍💻 Je suis Développeur Débutant

1. ✅ `QUICKSTART.md` - Démarrez rapidement
2. ✅ `SETUP_GUIDE.md` - Comprenez chaque étape
3. ✅ `CHECKLIST.md` - Validez votre installation
4. ✅ `DATA_WORKFLOW.md` - Apprenez à ajouter des données
5. ✅ `PROJECT_STRUCTURE.md` - Explorez le code

### 🎓 Je suis Développeur Expérimenté

1. ✅ `README.md` - Vue d'ensemble
2. ✅ `ARCHITECTURE.md` - Architecture technique
3. ✅ `QUICKSTART.md` - Installation rapide
4. ✅ `backend/README.md` - API endpoints
5. ✅ Code source - Explorez directement

### 📝 Je veux juste ajouter des données

1. ✅ `QUICKSTART.md` - Installez le projet
2. ✅ `DATA_WORKFLOW.md` - Apprenez le workflow
3. ✅ Éditez `data/*.json` - Ajoutez vos listes
4. ✅ `npm run seed` - Synchronisez

### 🚀 Je veux déployer en production

1. ✅ `SETUP_GUIDE.md` - Installation locale
2. ✅ `ARCHITECTURE.md` - Section Déploiement
3. ✅ Configuration de Render/Railway
4. ✅ Variables d'environnement
5. ✅ `npm run seed:prod`

---

## 📊 Arborescence Visuelle des Documents

```
ELIPEDIA/
│
├── 📄 README.md                    ← Commencez ici
├── 📄 INDEX.md                     ← Ce fichier (guide de navigation)
│
├── 🚀 Guides de Démarrage
│   ├── QUICKSTART.md               ← Démarrage rapide (5 min)
│   ├── SETUP_GUIDE.md              ← Installation détaillée
│   └── CHECKLIST.md                ← Checklist de vérification
│
├── 🏗️ Documentation Technique
│   ├── ARCHITECTURE.md             ← Architecture du système
│   ├── PROJECT_STRUCTURE.md        ← Structure des dossiers
│   └── DATA_WORKFLOW.md            ← Workflow de gestion des données
│
├── 📂 Backend
│   ├── backend/README.md           ← Documentation de l'API
│   └── backend/CONFIG_ENV.md       ← Configuration .env
│
└── 🗂️ Données
    ├── data/geographie.json        ← Exemple : Géographie
    ├── data/cinema.json            ← Exemple : Cinéma
    └── data/science.json           ← Exemple : Science
```

---

## 🎯 Cas d'Usage

### ❓ "Je n'arrive pas à me connecter à PostgreSQL"
➡️ Lisez : `backend/CONFIG_ENV.md` et `SETUP_GUIDE.md` (section Dépannage)

### ❓ "Comment ajouter une nouvelle liste ?"
➡️ Lisez : `DATA_WORKFLOW.md` (section "Ajouter une liste")

### ❓ "Quels sont les endpoints de l'API ?"
➡️ Lisez : `backend/README.md` ou `ARCHITECTURE.md`

### ❓ "Comment déployer en production ?"
➡️ Lisez : `ARCHITECTURE.md` (section Déploiement)

### ❓ "Comment est organisé le projet ?"
➡️ Lisez : `PROJECT_STRUCTURE.md`

### ❓ "Je veux comprendre l'architecture technique"
➡️ Lisez : `ARCHITECTURE.md`

---

## 📚 Glossaire Rapide

| Terme | Définition |
|-------|------------|
| **Category** | Thème général (ex: Géographie, Cinéma) |
| **List** | Liste à deviner (ex: Pays d'Afrique) |
| **Item** | Élément d'une liste (ex: Nigeria) |
| **Metadata** | Informations supplémentaires sur un item (format JSON) |
| **Seeding** | Processus de chargement des données JSON vers PostgreSQL |
| **Endpoint** | URL de l'API (ex: `/api/lists`) |

---

## 🛠️ Commandes Essentielles

```bash
# Installation
cd backend && npm install

# Créer la base de données
psql -U postgres -c "CREATE DATABASE elipedia;"
psql -U postgres -d elipedia -f database/schema.sql

# Charger les données
npm run seed

# Démarrer le serveur
npm run dev

# Tester l'API
curl http://localhost:3001/api/lists
```

---

## 📞 Support et Ressources

### 📖 Documentation Officielle
- [Node.js](https://nodejs.org/docs/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/docs/)

### 🆘 Problèmes ?
1. Consultez `SETUP_GUIDE.md` → Section "Problèmes courants"
2. Vérifiez les logs dans le terminal
3. Vérifiez votre fichier `.env`

---

## ✨ Prochaines Étapes

Une fois le backend fonctionnel :

1. **Ajoutez vos données** → `DATA_WORKFLOW.md`
2. **Créez le frontend** → React ou Vue (à venir)
3. **Déployez en production** → Render, Railway, Vercel

---

**Bonne lecture et bon développement !** 🚀

*Mise à jour : Novembre 2025*

