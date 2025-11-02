# ⚙️ Configuration du fichier .env

Le fichier `.env` contient vos variables d'environnement sensibles (mot de passe, etc.).

## 📝 Comment créer votre fichier .env

### Méthode 1 : Manuellement

1. Créez un nouveau fichier nommé `.env` dans le dossier `backend/`
2. Copiez-collez le contenu ci-dessous :

```env
# Configuration de la Base de Données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elipedia
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe_ici

# Configuration du Serveur
PORT=3001
NODE_ENV=development

# CORS (pour le frontend)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

3. **IMPORTANT** : Remplacez `votre_mot_de_passe_ici` par votre vrai mot de passe PostgreSQL

### Méthode 2 : Via PowerShell (Windows)

```powershell
cd backend

# Créer le fichier .env
@"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=elipedia
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe_ici
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
"@ | Out-File -FilePath .env -Encoding utf8
```

Puis éditez le fichier pour mettre votre mot de passe.

## 🔐 Sécurité

- ❌ **Ne committez JAMAIS le fichier .env sur Git** (il est déjà dans .gitignore)
- ✅ Le fichier .env reste sur votre machine locale uniquement
- ✅ Pour la production, utilisez les variables d'environnement de votre plateforme (Render, Railway, etc.)

## 🎯 Variables expliquées

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DB_HOST` | Adresse du serveur PostgreSQL | `localhost` (local) ou une URL distante |
| `DB_PORT` | Port de PostgreSQL | `5432` (port par défaut) |
| `DB_NAME` | Nom de la base de données | `elipedia` |
| `DB_USER` | Nom d'utilisateur PostgreSQL | `postgres` |
| `DB_PASSWORD` | Mot de passe PostgreSQL | Votre mot de passe |
| `PORT` | Port du serveur API | `3001` |
| `NODE_ENV` | Environnement | `development` ou `production` |
| `ALLOWED_ORIGINS` | CORS - origines autorisées | URLs séparées par des virgules |

## ✅ Vérification

Pour vérifier que votre fichier .env est bien configuré :

```bash
# Démarrer le serveur
npm run dev

# Si tout va bien, vous devriez voir :
# ✅ Connexion à PostgreSQL réussie
# 🚀 Serveur ELIPEDIA démarré avec succès !
```

## 🔧 Problèmes courants

### Erreur : "password authentication failed"
➡️ Votre mot de passe dans `.env` est incorrect

### Erreur : "database 'elipedia' does not exist"
➡️ Créez la base de données :
```bash
psql -U postgres -c "CREATE DATABASE elipedia;"
```

### Erreur : "ECONNREFUSED"
➡️ PostgreSQL n'est pas démarré. Vérifiez dans les Services Windows.

