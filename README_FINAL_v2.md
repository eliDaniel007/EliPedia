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

## 🚀 Démarrage Rapide

### Installation

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/elipedia.git
cd elipedia

# 2. Installer PostgreSQL (si pas déjà fait)
# Voir SETUP_GUIDE.md

# 3. Configurer le backend
cd backend
npm install

# 4. Créer .env (copier .env.template et adapter)
cp .env.template .env

# 5. Initialiser la base de données
npm run db:setup

# 6. Charger les données
npm run seed

# 7. Démarrer le serveur
npm run dev
```

### Utilisation

1. **Lancer le serveur** : `cd backend && npm run dev`
2. **Ouvrir** : `LANCEZ_MOI.html` dans votre navigateur
3. **Explorer** : Utilisez les 2 modes (Apprendre / Jouer)

---

## 🏗️ Architecture

```
ELIPEDIA/
├── 📂 backend/          # API Node.js + Express
│   ├── src/
│   │   ├── routes/      # Endpoints RESTful
│   │   └── config/      # Configuration DB
│   └── scripts/
│       └── seed.js      # Seeding automatique
│
├── 📂 frontend/         # Interface HTML/CSS/JS
│   └── index.html       # Application principale
│
├── 📂 data/             # Données en JSON
│   ├── geographie.json  # 54 pays + autres
│   ├── cinema.json
│   └── science.json
│
└── 📂 database/         # Schéma SQL
    └── schema.sql
```

---

## 📡 API Endpoints

### Catégories
- `GET /api/categories` - Liste toutes les catégories
- `GET /api/categories/:id` - Détails d'une catégorie

### Listes
- `GET /api/lists` - Liste toutes les listes
- `GET /api/lists?category_id=X` - Filtrer par catégorie
- `GET /api/lists/:id` - Détails d'une liste avec items

### Recherche
- `GET /api/search?q=query` - Recherche globale

### Health Check
- `GET /health` - Vérifier le statut

---

## 🗄️ Base de Données

### Tables

**category** - Catégories (Géographie, Cinéma, Science)  
**list** - Listes (Pays d'Afrique, Films Tarantino...)  
**item** - Items (Nigeria, Pulp Fiction, Jupiter...)

### Schéma
```sql
category (id, name, created_at)
  └─ list (id, name, description, category_id, created_at)
      └─ item (id, name, list_id, metadata JSONB, created_at)
```

---

## 📊 Données

| Catégorie | Listes | Items |
|-----------|--------|-------|
| **Géographie** | 3 | 67 |
| **Cinéma** | 3 | 27 |
| **Science** | 3 | 23 |
| **TOTAL** | **9** | **117** |

### Highlights
- 🌍 **54 pays africains** avec capitales
- 🎬 **10 films Tarantino**
- 🎬 **11 Oscar du Meilleur Film**
- 🌊 **5 océans**
- 🪐 **8 planètes**
- ⚗️ **10 éléments chimiques**

---

## 🛠️ Technologies

### Backend
- **Node.js** v20
- **Express.js** 4.18
- **PostgreSQL** 14+
- **pg** (client PostgreSQL)

### Frontend
- **HTML5**
- **CSS3** (Gradients, Flexbox, Grid, Animations)
- **JavaScript** ES6+ (Fetch API, async/await)

### Outils
- **npm** - Gestion des dépendances
- **Git** - Versioning
- **dotenv** - Variables d'environnement

---

## 📚 Documentation

### Guides de Démarrage
- **WELCOME.txt** - Message de bienvenue
- **QUICKSTART.md** - Installation rapide
- **SETUP_GUIDE.md** - Guide détaillé
- **CHECKLIST.md** - Vérification étape par étape

### Technique
- **ARCHITECTURE.md** - Architecture complète
- **PROJECT_STRUCTURE.md** - Structure du projet
- **DATA_WORKFLOW.md** - Gestion des données

### Fonctionnalités
- **NOUVELLES_FONCTIONNALITES.md** - Features récentes
- **INSTALLATION_COMPLETE.md** - Récapitulatif
- **PROJECT_COMPLETE.md** - État final

### Déploiement
- **DEPLOYMENT.md** - Guide de production

---

## 🎯 Workflow "Data as Code"

### Ajouter une Liste

1. **Éditer** un fichier JSON dans `/data`
2. **Ajouter** vos listes et items
3. **Exécuter** : `npm run seed`
4. **C'est fait !** ✅

### Exemple
```json
{
  "category": "Histoire",
  "lists": [
    {
      "name": "Rois de France",
      "items": [
        {"name": "Louis XIV", "metadata": {"regne": "1643-1715"}}
      ]
    }
  ]
}
```

---

## 🎮 Exemples d'Usage

### Exploration
1. Ouvrez **Mode Apprendre**
2. Cliquez sur **"Géographie"**
3. Sélectionnez **"Pays d'Afrique"**
4. Explorez les **54 pays** avec leurs métadonnées !

### Jeu
1. Ouvrez **Mode Jeu**
2. Choisissez **"Pays d'Afrique"**
3. Tapez les pays à trouver
4. Essayez de trouver les **54** !

### Recherche
1. Tapez **"Nigeria"** dans la barre de recherche
2. Résultat : Nigeria, Abuja, 220M hab., Afrique de l'Ouest

---

## 🚀 Déploiement en Production

Voir **DEPLOYMENT.md** pour les instructions complètes.

### Quick Start
- **Backend** : Render.com ou Railway.app
- **Database** : PostgreSQL managé
- **Frontend** : Vercel ou Netlify

---

## 📈 Statistiques du Projet

```
📂 Fichiers :          25+
📝 Lignes de code :    ~3000+
📚 Documentation :     12+ fichiers .md
🗄️  Tables SQL :        3
🏷️  Catégories :        3
📋  Listes :            9
📌  Items :            117
⏰ Dev time :          ~8 heures
```

---

## 🎓 Points d'Apprentissage

Ce projet démontre :
- ✅ Architecture RESTful
- ✅ Conception de base de données
- ✅ Frontend responsive
- ✅ Gestion de données JSON
- ✅ Workflow Git
- ✅ Documentation professionnelle

---

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 TODO Futur

### Court Terme
- [ ] Chronomètre pour le mode jeu
- [ ] Sauvegarde des scores (localStorage)
- [ ] Mode multijoueur local

### Moyen Terme
- [ ] Multijoueur en ligne (WebSockets)
- [ ] Authentification utilisateurs
- [ ] Système de classements

### Long Terme
- [ ] Application mobile (React Native)
- [ ] Mode IA contre joueur
- [ ] Analytics et reporting

---

## 📄 Licence

Projet personnel - Libre d'utilisation  
© 2025 - ELIPEDIA

---

## 🙏 Remerciements

- **Union Africaine** pour la liste officielle des 54 pays
- **Community** pour les suggestions
- **Open Source** pour l'inspiration

---

## 📞 Contact & Support

- 📖 Documentation : Voir `INDEX.md`
- 🐛 Issues : GitHub Issues
- 💬 Questions : Consultez la doc

---

**Bon apprentissage et bon amusement avec ELIPEDIA !** 🎉🚀

---

*Version 1.0.0 - Novembre 2025*

