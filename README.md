# 🎊 ELIPEDIA - LIST MASTER 🎊

> Votre Encyclopédie Interactive de Listes - Version Complète

---

## 🌟 Présentation

**ELIPEDIA** est une application web complète permettant d'apprendre et de jouer avec des listes de connaissances. Que ce soit les **54 pays d'Afrique**, les films de Tarantino, ou les planètes du système solaire, explorez vos connaissances de manière interactive !

---

## ✨ Fonctionnalités

### 📚 Mode Apprendre (Encyclopédie)
- ✅ Navigation intuitive par catégories
- ✅ Recherche en temps réel
- ✅ Affichage des métadonnées détaillées
- ✅ Interface moderne et responsive

### 🎮 Mode Jeu
- ✅ Jeu Solo avec validation instantanée
- ✅ Score en temps réel
- ✅ Détection des doublons
- ✅ Feedback visuel immédiat

### 🗂️ Contenu Riche
- ✅ **117 items** de connaissances
- ✅ **54 pays d'Afrique** complets
- ✅ Films, Capitales, Océans, Éléments chimiques...
- ✅ Métadonnées JSON flexibles

---

## 🏗️ Architecture du Projet

Le projet utilise une approche **"Data as Code"** où toutes les données sont gérées localement puis synchronisées avec la base de données.

```
ELIPEDIA/
├── backend/              # API Node.js + Express
│   ├── src/
│   │   ├── routes/       # Routes de l'API
│   │   ├── models/       # Modèles de données
│   │   └── server.js     # Point d'entrée
│   ├── database/
│   │   └── schema.sql    # Schéma PostgreSQL
│   └── scripts/
│       └── seed.js       # Script de seeding
├── data/                 # Fichiers de données locaux (JSON)
│   ├── geographie.json
│   ├── cinema.json
│   └── science.json
└── frontend/             # À venir (React/Next.js)
```

## 🗄️ Schéma de Base de Données

Le projet repose sur 3 tables principales :

- **Category** : Les grands thèmes (Géographie, Cinéma, Science...)
- **List** : Les listes à deviner (Pays d'Afrique, Films de Tarantino...)
- **Item** : Les éléments de chaque liste (Nigeria, Pulp Fiction...)

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (v18+)
- PostgreSQL (v14+)

### Installation

```bash
# Installer les dépendances du backend
cd backend
npm install

# Configurer la base de données
psql -U postgres -f database/schema.sql

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres de connexion

# Lancer le script de seeding
npm run seed

# Démarrer le serveur
npm run dev
```

## 📊 Workflow de Gestion des Données

1. **Éditer les données localement** : Modifier les fichiers JSON dans `/data`
2. **Synchroniser avec la DB** : Exécuter `npm run seed` depuis `/backend`
3. **Déployer** : Les changements sont automatiquement reflétés dans l'API

## 🎯 Fonctionnalités

### Module 1 : API & Gestion des Données
- ✅ Backend API RESTful
- ✅ Base de données PostgreSQL
- ✅ Gestion locale des données (JSON)
- ✅ Script de seeding automatique

### Module 2 : Mode "Apprendre" ✅
- ✅ Encyclopédie interactive
- ✅ Recherche et filtres
- ✅ Interface responsive

### Module 3 : Mode "Jeu" ✅
- ✅ Jeu Solo avec validation
- ✅ Score en temps réel
- ✅ Interface de jeu moderne

## 📡 Endpoints de l'API

- `GET /health` - Health check
- `GET /api/categories` - Liste toutes les catégories
- `GET /api/lists` - Liste toutes les listes (avec filtres)
- `GET /api/lists/:id` - Détails d'une liste avec tous ses items
- `GET /api/search?q=...` - Recherche globale

## 🛠️ Stack Technique

- **Backend** : Node.js + Express
- **Base de Données** : PostgreSQL
- **Frontend** : HTML5 + CSS3 + JavaScript
- **Déploiement** : Render/Railway (backend) + Vercel (frontend)

## 📚 Documentation Complète

- 📖 **INDEX.md** - Index de navigation
- 🚀 **QUICKSTART.md** - Installation rapide
- 📋 **CHECKLIST.md** - Vérification complète
- 🏗️ **ARCHITECTURE.md** - Architecture technique
- 🗂️ **DATA_WORKFLOW.md** - Gestion des données
- 🌐 **DEPLOYMENT.md** - Déploiement production

## 📈 Statistiques

- 🗄️ **3 tables** SQL
- 🏷️ **3 catégories** (Géographie, Cinéma, Science)
- 📋 **9 listes** complètes
- 📌 **117 items** de connaissances
- 🌍 **54 pays africains** complets

## 🚀 Utilisation Rapide

1. **Démarrer** : `LANCEZ_SERVEUR.bat`
2. **Ouvrir** : `LANCEZ_MOI.html`
3. **Explorer** : Mode Apprendre ou Jouer

## 📝 Licence

Projet personnel - Libre d'utilisation  
© 2025 - ELIPEDIA

