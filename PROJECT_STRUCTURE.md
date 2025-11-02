# 📂 Structure du Projet ELIPEDIA

Ce document décrit l'organisation complète du projet.

## 🌳 Arborescence

```
ELIPEDIA/
│
├── 📁 backend/                    # Application serveur (API)
│   ├── 📁 src/
│   │   ├── 📁 config/
│   │   │   └── database.js        # Configuration PostgreSQL
│   │   ├── 📁 routes/
│   │   │   ├── categories.js      # Routes /api/categories
│   │   │   ├── lists.js           # Routes /api/lists
│   │   │   └── search.js          # Route /api/search
│   │   └── server.js              # Point d'entrée principal
│   │
│   ├── 📁 scripts/
│   │   └── seed.js                # Script de synchronisation des données
│   │
│   ├── package.json               # Dépendances Node.js
│   ├── .env                       # Variables d'environnement (à créer)
│   ├── CONFIG_ENV.md              # Guide pour créer .env
│   └── README.md                  # Documentation du backend
│
├── 📁 database/
│   └── schema.sql                 # Schéma PostgreSQL (tables)
│
├── 📁 data/                       # 🎯 VOS DONNÉES (à gérer localement)
│   ├── geographie.json            # Catégorie Géographie
│   ├── cinema.json                # Catégorie Cinéma
│   └── science.json               # Catégorie Science
│
├── 📁 frontend/                   # (À venir) Application React
│   └── (à créer)
│
├── README.md                      # Documentation principale
├── SETUP_GUIDE.md                 # Guide d'installation
├── DATA_WORKFLOW.md               # Guide de gestion des données
├── PROJECT_STRUCTURE.md           # Ce fichier
└── .gitignore                     # Fichiers à ignorer par Git
```

## 📚 Description des Dossiers

### `/backend` - Le Serveur API

C'est le cœur de votre application. Il expose les données via une API REST.

**Technologies :**
- Node.js + Express
- PostgreSQL (via le module `pg`)

**Fichiers importants :**
- `src/server.js` : Lance le serveur HTTP
- `src/config/database.js` : Gère la connexion à PostgreSQL
- `src/routes/*.js` : Définissent les endpoints de l'API

### `/database` - Schéma de la Base de Données

Contient le fichier SQL qui crée les tables (Category, List, Item).

**Utilisation :**
```bash
psql -U postgres -d elipedia -f database/schema.sql
```

### `/data` - Vos Données en JSON

🎯 **C'est ICI que vous ajoutez et modifiez vos listes !**

Chaque fichier JSON représente une catégorie avec ses listes et items.

**Workflow :**
1. Modifier un fichier JSON
2. Exécuter `npm run seed`
3. Les données sont synchronisées avec PostgreSQL

### `/frontend` - L'Interface Web (À venir)

Sera créé plus tard avec React + Next.js.

## 🔄 Flux de Données

```
┌─────────────────┐
│   /data/*.json  │  ← Vous éditez ici (en local)
└────────┬────────┘
         │
         │ npm run seed
         ↓
┌─────────────────┐
│   PostgreSQL    │  ← Base de données
└────────┬────────┘
         │
         │ Requêtes SQL
         ↓
┌─────────────────┐
│   API Express   │  ← Backend (src/server.js)
└────────┬────────┘
         │
         │ HTTP GET /api/*
         ↓
┌─────────────────┐
│   Frontend      │  ← Interface web (à venir)
└─────────────────┘
         │
         │ HTTP GET
         ↓
┌─────────────────┐
│   Utilisateur   │  ← Joueur final
└─────────────────┘
```

## 🚀 Scripts Disponibles

### Backend

```bash
cd backend

# Démarrer le serveur en mode développement
npm run dev

# Démarrer en mode production
npm start

# Synchroniser les données depuis /data
npm run seed

# Initialiser le schéma de la base de données
npm run db:setup
```

## 📡 Endpoints de l'API

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | Vérifie que le serveur fonctionne |
| GET | `/api/categories` | Liste toutes les catégories |
| GET | `/api/categories/:id` | Détails d'une catégorie |
| GET | `/api/lists` | Liste toutes les listes |
| GET | `/api/lists?category_id=X` | Listes filtrées par catégorie |
| GET | `/api/lists/:id` | Détails d'une liste avec ses items |
| GET | `/api/search?q=query` | Recherche globale |

## 🗄️ Structure de la Base de Données

### Table `category`
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(100) UNIQUE
created_at      TIMESTAMP
```

### Table `list`
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(200)
description     TEXT
category_id     INTEGER (FK → category.id)
created_at      TIMESTAMP
```

### Table `item`
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(200)
list_id         INTEGER (FK → list.id)
metadata        JSONB (flexible)
created_at      TIMESTAMP
```

## 🎨 Format des Données JSON

```json
{
  "category": "Nom de la Catégorie",
  "lists": [
    {
      "name": "Nom de la Liste",
      "description": "Description",
      "items": [
        {
          "name": "Item",
          "metadata": {
            "key": "value"
          }
        }
      ]
    }
  ]
}
```

## 📦 Dépendances Principales

### Backend
- **express** : Framework web
- **pg** : Client PostgreSQL
- **dotenv** : Gestion des variables d'environnement
- **cors** : Autoriser les requêtes cross-origin

## 🔐 Sécurité

### Fichiers sensibles (dans .gitignore)
- `.env` : Variables d'environnement
- `node_modules/` : Dépendances Node.js

### Variables d'environnement requises
- `DB_PASSWORD` : Mot de passe PostgreSQL
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`

## 📝 Fichiers de Documentation

| Fichier | Description |
|---------|-------------|
| `README.md` | Vue d'ensemble du projet |
| `SETUP_GUIDE.md` | Installation pas à pas |
| `DATA_WORKFLOW.md` | Comment gérer les données |
| `PROJECT_STRUCTURE.md` | Ce fichier - structure du projet |
| `backend/README.md` | Documentation de l'API |
| `backend/CONFIG_ENV.md` | Configuration du fichier .env |

## 🎯 Prochaines Étapes

1. ✅ Backend fonctionnel
2. ✅ Données d'exemple chargées
3. 🔲 Créer le frontend (React + Next.js)
4. 🔲 Implémenter le mode "Apprendre"
5. 🔲 Implémenter le mode "Jeu"
6. 🔲 Ajouter WebSockets pour le multijoueur
7. 🔲 Déployer en production

## 💡 Conseils

- **Versionner vos données** : Utilisez Git pour `/data`
- **Tester localement** : Avant chaque déploiement
- **Documenter vos listes** : Ajoutez des descriptions claires
- **Sauvegarder régulièrement** : La base de données ET les fichiers JSON

---

Pour toute question, référez-vous aux autres fichiers de documentation ! 🚀

