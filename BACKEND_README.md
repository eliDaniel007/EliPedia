# 🔧 Backend API - ELIPEDIA

API RESTful Node.js + Express + PostgreSQL pour l'application ELIPEDIA.

## 🚀 Démarrage Rapide

```bash
# Installer les dépendances
npm install

# Configurer .env (voir CONFIG_ENV.md)
cp .env.template .env

# Initialiser la base de données
npm run db:setup

# Charger les données
npm run seed

# Démarrer le serveur
npm run dev
```

## 📡 Endpoints

### Health Check
- `GET /health` - Statut du serveur et de la DB

### Catégories
- `GET /api/categories` - Toutes les catégories
- `GET /api/categories/:id` - Détails d'une catégorie

### Listes
- `GET /api/lists` - Toutes les listes
- `GET /api/lists?category_id=X` - Filtrer par catégorie
- `GET /api/lists/:id` - Détails avec items

### Recherche
- `GET /api/search?q=query` - Recherche globale

## 🗄️ Base de Données

Tables : `category`, `list`, `item`

## 📚 Documentation Complète

Voir le README.md principal à la racine du projet.

