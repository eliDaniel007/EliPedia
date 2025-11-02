# 🗂️ Workflow de Gestion des Données - ELIPEDIA

Ce document explique comment ajouter, modifier et supprimer des données dans votre application ELIPEDIA.

## 🎯 Philosophie : "Data as Code"

Avec ELIPEDIA, vos données sont **versionnées comme du code**. Tous les changements sont faits en local dans des fichiers JSON, puis synchronisés avec la base de données.

### Avantages :
- ✅ **Contrôle total** : Vous gardez tous vos fichiers sources
- ✅ **Historique** : Avec Git, vous pouvez revenir en arrière
- ✅ **Simplicité** : Pas besoin d'interface d'administration complexe
- ✅ **Portable** : Vos données sont lisibles et modifiables facilement

## 📁 Structure des Fichiers de Données

Tous vos fichiers de données sont dans le dossier `/data` :

```
data/
├── geographie.json    # Catégorie Géographie
├── cinema.json        # Catégorie Cinéma
├── science.json       # Catégorie Science
└── sport.json         # (exemple à ajouter)
```

### Format d'un fichier de données

```json
{
  "category": "Nom de la Catégorie",
  "lists": [
    {
      "name": "Nom de la Liste",
      "description": "Description détaillée de la liste",
      "items": [
        {
          "name": "Item 1",
          "metadata": {
            "key1": "valeur1",
            "key2": "valeur2"
          }
        },
        {
          "name": "Item 2",
          "metadata": {
            "info": "Information supplémentaire"
          }
        }
      ]
    }
  ]
}
```

## 🔄 Workflow Complet

### 1️⃣ Ajouter une nouvelle catégorie

**Exemple : Ajouter une catégorie "Sport"**

1. Créez un nouveau fichier `data/sport.json` :

```json
{
  "category": "Sport",
  "lists": [
    {
      "name": "Vainqueurs de la Coupe du Monde FIFA",
      "description": "Les pays qui ont remporté la Coupe du Monde de football",
      "items": [
        {
          "name": "Brésil",
          "metadata": {
            "victoires": 5,
            "annees": [1958, 1962, 1970, 1994, 2002]
          }
        },
        {
          "name": "Allemagne",
          "metadata": {
            "victoires": 4,
            "annees": [1954, 1974, 1990, 2014]
          }
        }
      ]
    }
  ]
}
```

2. Synchronisez avec la base de données :

```bash
cd backend
npm run seed
```

3. Vérifiez dans votre navigateur :
   - http://localhost:3001/api/categories

### 2️⃣ Ajouter une liste à une catégorie existante

**Exemple : Ajouter "Pays d'Asie" à la catégorie Géographie**

1. Ouvrez `data/geographie.json`

2. Ajoutez une nouvelle liste dans le tableau `lists` :

```json
{
  "category": "Géographie",
  "lists": [
    {
      "name": "Pays d'Afrique",
      "description": "...",
      "items": [...]
    },
    {
      "name": "Pays d'Asie",
      "description": "Les pays du continent asiatique",
      "items": [
        {
          "name": "Japon",
          "metadata": {
            "capital": "Tokyo",
            "population": 125000000
          }
        },
        {
          "name": "Chine",
          "metadata": {
            "capital": "Pékin",
            "population": 1400000000
          }
        }
      ]
    }
  ]
}
```

3. Synchronisez :

```bash
npm run seed
```

### 3️⃣ Modifier une liste existante

**Exemple : Ajouter un pays à "Pays d'Afrique"**

1. Ouvrez `data/geographie.json`

2. Trouvez la liste "Pays d'Afrique"

3. Ajoutez un nouvel item dans le tableau `items` :

```json
{
  "name": "Tanzanie",
  "metadata": {
    "capital": "Dodoma",
    "population": 63000000,
    "region": "Afrique de l'Est"
  }
}
```

4. Synchronisez :

```bash
npm run seed
```

### 4️⃣ Supprimer une liste

1. Ouvrez le fichier contenant la liste (ex: `data/cinema.json`)

2. Supprimez l'objet correspondant du tableau `lists`

3. Synchronisez :

```bash
npm run seed
```

**Note :** Le script de seeding supprime automatiquement les items qui ne sont plus dans vos fichiers JSON.

### 5️⃣ Modifier les métadonnées d'un item

Les métadonnées sont **flexibles**. Chaque item peut avoir des métadonnées différentes.

**Exemple 1 : Film**
```json
{
  "name": "Inception",
  "metadata": {
    "year": 2010,
    "director": "Christopher Nolan",
    "genre": "Science-fiction",
    "imdb_rating": 8.8
  }
}
```

**Exemple 2 : Pays**
```json
{
  "name": "Canada",
  "metadata": {
    "capital": "Ottawa",
    "population": 38000000,
    "langues": ["Anglais", "Français"]
  }
}
```

**Exemple 3 : Élément chimique**
```json
{
  "name": "Fer",
  "metadata": {
    "symbole": "Fe",
    "numero_atomique": 26,
    "masse_atomique": 55.845,
    "etat": "Solide"
  }
}
```

## 🚀 Bonnes Pratiques

### ✅ À faire

1. **Sauvegarder régulièrement** : Faites des commits Git après chaque modification
2. **Tester localement** : Exécutez `npm run seed` et testez l'API avant de déployer
3. **Structurer les métadonnées** : Gardez une structure cohérente pour les items d'une même liste
4. **Documenter** : Ajoutez des descriptions claires à vos listes

### ❌ À éviter

1. **Ne modifiez jamais la base de données directement** : Passez toujours par les fichiers JSON
2. **Ne créez pas de doublons** : Vérifiez que la liste/item n'existe pas déjà
3. **Ne laissez pas d'items vides** : Chaque liste doit avoir au moins un item

## 📊 Exemple Complet : Ajouter une Catégorie "Histoire"

### 1. Créer `data/histoire.json`

```json
{
  "category": "Histoire",
  "lists": [
    {
      "name": "Rois de France",
      "description": "Les rois de France de Clovis à Louis XVI",
      "items": [
        {
          "name": "Louis XIV",
          "metadata": {
            "surnom": "Le Roi-Soleil",
            "regne": "1643-1715",
            "duree_annees": 72
          }
        },
        {
          "name": "François Ier",
          "metadata": {
            "surnom": "Le Père et Restaurateur des Lettres",
            "regne": "1515-1547",
            "duree_annees": 32
          }
        }
      ]
    },
    {
      "name": "Présidents des États-Unis",
      "description": "Les présidents des États-Unis d'Amérique",
      "items": [
        {
          "name": "George Washington",
          "metadata": {
            "numero": 1,
            "mandats": "1789-1797",
            "parti": "Indépendant"
          }
        },
        {
          "name": "Abraham Lincoln",
          "metadata": {
            "numero": 16,
            "mandats": "1861-1865",
            "parti": "Républicain"
          }
        }
      ]
    }
  ]
}
```

### 2. Synchroniser

```bash
cd backend
npm run seed
```

### 3. Vérifier

```bash
# Toutes les catégories
curl http://localhost:3001/api/categories

# La nouvelle catégorie Histoire
curl http://localhost:3001/api/categories/4

# Toutes les listes
curl http://localhost:3001/api/lists

# Recherche
curl http://localhost:3001/api/search?q=Louis
```

## 🔧 Dépannage

### Le seeding échoue

**Erreur : "Format invalide"**
- Vérifiez que votre JSON est valide (pas de virgules en trop, guillemets fermés)
- Utilisez un validateur JSON : https://jsonlint.com/

**Erreur : "Connexion à la base de données"**
- Vérifiez que PostgreSQL est démarré
- Vérifiez votre fichier `.env`

### Les données n'apparaissent pas

1. Vérifiez que le seeding s'est bien passé (regardez les messages dans le terminal)
2. Rechargez la page dans votre navigateur (Ctrl + F5)
3. Vérifiez l'API directement : http://localhost:3001/api/lists

## 🎯 Déploiement en Production

Quand vous déployez sur Render ou Railway :

1. **Poussez vos fichiers JSON sur Git**
2. **Configurez les variables d'environnement** sur votre plateforme
3. **Exécutez le seeding** :
   ```bash
   npm run seed:prod
   ```

Votre base de données en production sera synchronisée avec vos fichiers !

## 📚 Résumé des Commandes

```bash
# Synchroniser les données en développement
npm run seed

# Synchroniser les données en production
npm run seed:prod

# Démarrer le serveur
npm run dev
```

---

**Astuce finale** : Avec ce workflow, vous pouvez même partager vos fichiers de données avec d'autres personnes qui peuvent contribuer ! 🎉

