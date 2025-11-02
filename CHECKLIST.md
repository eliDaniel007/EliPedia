# ✅ Checklist de Mise en Route - ELIPEDIA

Utilisez cette checklist pour vous assurer que tout est bien configuré.

## 📋 Phase 1 : Prérequis (Installation)

- [ ] **Node.js installé** (v18+)
  - Vérifier : `node --version`
  - Télécharger : https://nodejs.org/

- [ ] **PostgreSQL installé** (v14+)
  - Vérifier : `psql --version`
  - Télécharger : https://www.postgresql.org/download/

- [ ] **Git installé** (optionnel mais recommandé)
  - Vérifier : `git --version`
  - Télécharger : https://git-scm.com/

## 📋 Phase 2 : Configuration de la Base de Données

- [ ] **PostgreSQL est démarré**
  - Windows : Vérifier dans Services → `postgresql-x64-XX`

- [ ] **Base de données `elipedia` créée**
  ```bash
  psql -U postgres -c "CREATE DATABASE elipedia;"
  ```

- [ ] **Schéma SQL appliqué**
  ```bash
  psql -U postgres -d elipedia -f database/schema.sql
  ```

- [ ] **Test de connexion réussi**
  ```bash
  psql -U postgres -d elipedia -c "SELECT * FROM category;"
  # Devrait afficher : (0 rows) si vide, c'est normal !
  ```

## 📋 Phase 3 : Configuration du Backend

- [ ] **Dépendances Node.js installées**
  ```bash
  cd backend
  npm install
  ```

- [ ] **Fichier `.env` créé**
  - Copier le contenu de `CONFIG_ENV.md`
  - Créer `backend/.env`
  - **IMPORTANT** : Remplacer `votre_mot_de_passe_ici` par votre vrai mot de passe

- [ ] **Variables d'environnement vérifiées**
  - `DB_HOST=localhost` ✅
  - `DB_PORT=5432` ✅
  - `DB_NAME=elipedia` ✅
  - `DB_USER=postgres` ✅
  - `DB_PASSWORD=***` ✅ (votre mot de passe)

## 📋 Phase 4 : Chargement des Données

- [ ] **Script de seeding exécuté**
  ```bash
  cd backend
  npm run seed
  ```

- [ ] **Résultat du seeding vérifié**
  - ✅ Connexion à PostgreSQL réussie
  - ✅ 3 fichier(s) trouvé(s) dans /data
  - ✅ Seeding terminé avec succès !

- [ ] **Données vérifiées dans PostgreSQL**
  ```bash
  psql -U postgres -d elipedia -c "SELECT COUNT(*) FROM category;"
  # Devrait afficher : 3
  ```

## 📋 Phase 5 : Démarrage du Serveur

- [ ] **Serveur démarré**
  ```bash
  cd backend
  npm run dev
  ```

- [ ] **Messages de succès affichés**
  - ✅ Connexion à PostgreSQL réussie
  - 🚀 Serveur ELIPEDIA démarré avec succès !
  - 📡 Port: 3001
  - 🌍 URL: http://localhost:3001

## 📋 Phase 6 : Tests de l'API

Ouvrez votre navigateur et testez ces URLs :

- [ ] **Page d'accueil de l'API**
  - URL : http://localhost:3001
  - Attendu : Message de bienvenue JSON

- [ ] **Health check**
  - URL : http://localhost:3001/health
  - Attendu : `{ "status": "ok", "database": "connected" }`

- [ ] **Liste des catégories**
  - URL : http://localhost:3001/api/categories
  - Attendu : 3 catégories (Géographie, Cinéma, Science)

- [ ] **Liste complète**
  - URL : http://localhost:3001/api/lists
  - Attendu : Plusieurs listes avec leur nombre d'items

- [ ] **Détails d'une liste**
  - URL : http://localhost:3001/api/lists/1
  - Attendu : Une liste avec tous ses items

- [ ] **Recherche**
  - URL : http://localhost:3001/api/search?q=Nigeria
  - Attendu : Résultats de recherche

## 📋 Phase 7 : Test de Modification des Données

- [ ] **Modification d'un fichier JSON**
  - Ouvrir `data/geographie.json`
  - Ajouter un nouveau pays dans "Pays d'Afrique"

- [ ] **Re-seeding**
  ```bash
  npm run seed
  ```

- [ ] **Vérification de la mise à jour**
  - Recharger : http://localhost:3001/api/lists/1
  - Vérifier que le nouveau pays apparaît

## 🎉 Installation Terminée !

Si toutes les cases sont cochées, **FÉLICITATIONS** ! 🎊

Votre backend ELIPEDIA est **100% opérationnel** !

## 🚀 Prochaines Étapes

Maintenant que le backend fonctionne :

### Option 1 : Ajouter vos propres données 📝
- Lisez `DATA_WORKFLOW.md`
- Créez vos propres catégories et listes
- Partagez vos connaissances !

### Option 2 : Développer le Frontend 💻
- Choisir : React (Next.js) ou Vue (Nuxt.js)
- Créer l'interface "Encyclopédie"
- Créer l'interface "Jeu"

### Option 3 : Déployer en Production 🌐
- Choisir une plateforme : Render, Railway, ou Fly.io
- Configurer la base de données PostgreSQL en ligne
- Déployer le backend
- Connecter un domaine personnalisé

## 📚 Ressources

- **Documentation complète** → `README.md`
- **Guide d'installation détaillé** → `SETUP_GUIDE.md`
- **Gestion des données** → `DATA_WORKFLOW.md`
- **Structure du projet** → `PROJECT_STRUCTURE.md`
- **Démarrage rapide** → `QUICKSTART.md`

## 🆘 Problèmes ?

Si quelque chose ne fonctionne pas :

1. **Consultez `SETUP_GUIDE.md`** → Section "Problèmes courants"
2. **Vérifiez les logs** du terminal pour les messages d'erreur
3. **Vérifiez PostgreSQL** est bien démarré
4. **Vérifiez le fichier `.env`** (mot de passe correct ?)

## 💡 Conseils pour la Suite

1. **Versionnez avec Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Backend ELIPEDIA"
   ```

2. **Sauvegardez régulièrement**
   - Vos fichiers JSON dans `/data`
   - Votre base de données PostgreSQL

3. **Testez avant de déployer**
   - Toujours tester en local avec `npm run seed`
   - Vérifier les endpoints de l'API

4. **Documentez vos listes**
   - Ajoutez des descriptions claires
   - Structurez bien vos métadonnées

---

**Bon développement !** 🚀✨

