# 🎊 ELIPEDIA - Les 54 Pays d'Afrique 🎊

> Application web pour apprendre et jouer avec les 54 pays d'Afrique

---

## 🌟 Présentation

**ELIPEDIA** est une application web simple et efficace pour explorer et mémoriser les **54 pays d'Afrique** reconnus par l'Union Africaine.

---

## ✨ Fonctionnalités

### 📚 Mode Apprendre
- ✅ Navigation intuitive
- ✅ Recherche en temps réel
- ✅ Affichage des capitales, populations et régions
- ✅ Interface moderne et responsive

### 🎮 Mode Jeu
- ✅ Jeu Solo : Trouvez les 54 pays
- ✅ Validation instantanée
- ✅ Score en temps réel
- ✅ Détection des doublons

---

## 🚀 Démarrage Rapide

### Installation

```bash
# 1. Installer PostgreSQL (si pas déjà fait)
# Voir SETUP_GUIDE.md

# 2. Configurer le backend
cd backend
npm install

# 3. Créer .env (voir CONFIG_ENV.md)
cp .env.template .env

# 4. Initialiser la base de données
npm run db:setup

# 5. Charger les 54 pays
npm run seed

# 6. Démarrer le serveur
npm run dev
```

### Utilisation

1. **Lancer le serveur** : `cd backend && npm run dev`
2. **Ouvrir** : `LANCEZ_MOI.html` dans votre navigateur
3. **Explorer** : Mode Apprendre ou Jouer

---

## 📊 Données

- 🏷️ **1 catégorie** : Géographie
- 📋 **1 liste** : Pays d'Afrique
- 📌 **54 pays** avec :
  - Capitales
  - Populations
  - Régions (Ouest, Est, Nord, Centre, Australe)

---

## 🎯 Exemples de Pays

- **Nigeria** : Abuja, 220M hab., Afrique de l'Ouest
- **Égypte** : Le Caire, 104M hab., Afrique du Nord
- **Kenya** : Nairobi, 54M hab., Afrique de l'Est
- **Afrique du Sud** : Pretoria, 60M hab., Afrique australe

---

## 🛠️ Technologies

- **Backend** : Node.js + Express + PostgreSQL
- **Frontend** : HTML5 + CSS3 + JavaScript
- **Base de données** : PostgreSQL avec JSONB

---

## 📡 API Endpoints

- `GET /health` - Health check
- `GET /api/categories` - Catégories
- `GET /api/lists` - Listes
- `GET /api/lists/1` - Les 54 pays
- `GET /api/search?q=query` - Recherche

---

## 🎮 Comment Jouer

1. Cliquez sur **"🎮 Jouer"**
2. La liste "Pays d'Afrique" est automatiquement sélectionnée
3. Cliquez sur **"Commencer la partie"**
4. Tapez les pays que vous connaissez
5. Trouvez les **54 pays** !

---

## 📚 Documentation

- **QUICKSTART.md** - Installation rapide
- **SETUP_GUIDE.md** - Guide détaillé
- **DATA_WORKFLOW.md** - Ajouter des données
- **DEPLOYMENT.md** - Déploiement

---

## 🔗 Repository GitHub

**https://github.com/eliDaniel007/EliPedia**

---

## 📝 Licence

MIT License - Libre d'utilisation

---

**Bon apprentissage des 54 pays d'Afrique !** 🌍✨

*Version 1.0.0 - Novembre 2025*

