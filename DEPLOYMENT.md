# 🚀 Guide de Déploiement - ELIPEDIA

Ce guide vous accompagne pour déployer ELIPEDIA en production.

---

## 🌐 Options de Déploiement

### Option 1 : Déploiement Complet (Backend + DB + Frontend)

**Backend + Database** : Render, Railway, Fly.io  
**Frontend** : Vercel, Netlify

### Option 2 : Déploiement Simple

**Tout-en-un** : Fly.io, Railway (supporte PostgreSQL)

---

## 📋 Prérequis

- ✅ Compte GitHub créé
- ✅ Repository Git initialisé
- ✅ Compte sur la plateforme choisie

---

## 🎯 Méthode Recommandée : Render.com

### Étape 1 : Préparer le Repository

```bash
# Initialiser Git
git init
git add .
git commit -m "Initial commit - ELIPEDIA List Master"

# Créer un repository sur GitHub
# Puis pusher
git remote add origin https://github.com/votre-username/elipedia.git
git push -u origin main
```

### Étape 2 : Déployer PostgreSQL sur Render

1. **Créer une base PostgreSQL** :
   - Go to [render.com](https://render.com)
   - Cliquez "New +" → "PostgreSQL"
   - Nom : `elipedia-db`
   - Région : Europe ou US East
   - Version : 14 ou supérieur
   - Cliquez "Create Database"

2. **Notez les credentials** :
   - Host, Database, Username, Password, Port

### Étape 3 : Déployer le Backend sur Render

1. **Créer un service Web** :
   - "New +" → "Web Service"
   - Connecter votre repository GitHub
   - Service Name : `elipedia-api`
   - Root Directory : `backend`
   - Build Command : `npm install`
   - Start Command : `npm start`

2. **Ajouter les variables d'environnement** :
   ```
   DB_HOST=<host_from_postgres>
   DB_PORT=5432
   DB_NAME=<database_name>
   DB_USER=<username>
   DB_PASSWORD=<password_from_postgres>
   PORT=3001
   NODE_ENV=production
   ALLOWED_ORIGINS=https://votre-domaine.vercel.app
   ```

3. **Advanced → Add Build Hook** :
   - Build Command : `npm run db:setup && npm run seed`

4. **Deploy !**

### Étape 4 : Déployer le Frontend sur Vercel

1. **Aller sur [vercel.com](https://vercel.com)**

2. **"Import Project"** depuis GitHub

3. **Configuration** :
   - Framework Preset : **Other**
   - Root Directory : `frontend`
   - Build Command : *(laisser vide)*
   - Output Directory : *.*

4. **Environment Variables** :
   ```
   REACT_APP_API_URL=https://elipedia-api.onrender.com
   ```

5. **Deploy !**

---

## 🔄 Méthode Alternative : Railway.app

Railway supporte directement PostgreSQL et Node.js.

### Déploiement Backend

1. **Connecter Railway à GitHub**
2. **"New Project" → "Deploy from GitHub"**
3. **Sélectionner votre repository**
4. **Ajouter PostgreSQL** (Add PostgreSQL)
5. **Variables auto-configurées** ✅
6. **Add Build Hook** :
   ```bash
   npm run db:setup && npm run seed
   ```

### Déploiement Frontend

1. **Même projet, nouveau service**
2. **Type** : Static Site
3. **Root Directory** : `frontend`

---

## 🔧 Configuration Post-Déploiement

### 1. Mettre à jour l'API URL dans le Frontend

Éditez `frontend/index.html` :
```javascript
const API_BASE = 'https://votre-backend-url.com/api';
```

### 2. Vérifier CORS

Dans `backend/src/server.js`, ajoutez votre domaine frontend :
```javascript
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'https://votre-domaine.vercel.app',
  'http://localhost:3001'
];
```

### 3. Seeding Initial

Sur Railway, ajoutez dans "Build Command" :
```bash
npm install && npm run db:setup && npm run seed && npm start
```

---

## ✅ Checklist de Déploiement

### Backend
- [ ] PostgreSQL créé et accessible
- [ ] Variables d'environnement configurées
- [ ] CORS autorise votre domaine frontend
- [ ] Build hook avec seeding configuré
- [ ] API accessible publiquement

### Frontend
- [ ] Repository GitHub connecté
- [ ] Build configuré
- [ ] API_BASE mis à jour avec l'URL backend
- [ ] Site déployé et accessible

### Tests
- [ ] Endpoints API fonctionnent
- [ ] Frontend charge les données
- [ ] Mode Jeu fonctionne
- [ ] Recherche fonctionne

---

## 🔐 Sécurité en Production

### Variables d'Environnement
✅ **N'EXPOSEZ JAMAIS** `.env` publiquement  
✅ Utilisez les variables d'environnement de la plateforme  
✅ Rotate les mots de passe PostgreSQL régulièrement

### HTTPS
✅ **Toujours** utiliser HTTPS en production  
✅ Vercel et Render le font automatiquement

### Rate Limiting
À implémenter pour protéger l'API :
```javascript
// À ajouter dans backend
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limiter chaque IP à 100 requêtes
});

app.use('/api/', limiter);
```

---

## 📊 Monitoring

### Logs
- **Render** : Dashboard → Logs
- **Railway** : Deployments → View Logs
- **Vercel** : Deployments → View Function Logs

### Health Check
Endpointe disponible : `https://votre-api.com/health`

### Metrics
À ajouter plus tard :
- Sentry pour l'erreur tracking
- Google Analytics pour le frontend
- PostgreSQL monitoring

---

## 🔄 Mises à Jour

### Code
```bash
git add .
git commit -m "Nouvelle fonctionnalité"
git push origin main
```
Les plateformes redéploient automatiquement !

### Base de Données
Pour ajouter de nouvelles données :
1. Éditez les fichiers dans `/data`
2. Commit et push
3. Réexécuter le seeding :
```bash
npm run seed:prod
```

---

## 💰 Coûts Estimés

### Render.com (Freemium)
- **PostgreSQL** : Gratuit (1 Go)
- **Backend** : Gratuit avec limites
- **Total** : **Gratuit** pour démarrer

### Railway.app
- **Déploiement** : $5-10/mois
- **Inclut** : PostgreSQL + Backend + Frontend

### Vercel
- **Frontend** : Gratuit
- **Limite** : 100 Go bandwidth

---

## 🆘 Dépannage

### L'API ne répond pas
➡️ Vérifiez les logs dans le dashboard  
➡️ Vérifiez que PostgreSQL est accessible  
➡️ Vérifiez les variables d'environnement

### CORS Erreur
➡️ Ajoutez votre domaine dans `ALLOWED_ORIGINS`  
➡️ Vérifiez le format (avec https://)

### Frontend ne charge pas les données
➡️ Vérifiez que `API_BASE` pointe vers l'URL correcte  
➡️ Ouvrez la console du navigateur (F12)

### Base de données vide
➡️ Réexécutez le seeding  
➡️ Vérifiez les logs de build

---

## 🎉 Félicitations !

Une fois déployé, votre application sera accessible 24/7 ! 🚀

---

## 📞 Ressources

- [Documentation Render](https://render.com/docs)
- [Documentation Railway](https://docs.railway.app)
- [Documentation Vercel](https://vercel.com/docs)

**Bon déploiement !** 🌐✨

