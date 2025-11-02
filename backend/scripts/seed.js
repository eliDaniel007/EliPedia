/**
 * Script de Seeding - Chargement des données depuis /data vers PostgreSQL
 * 
 * Usage:
 *   npm run seed              (utilise .env par défaut)
 *   npm run seed:dev          (environnement de développement)
 *   npm run seed:prod         (environnement de production)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pg;

// Configuration des chemins
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../../data');

// Chargement des variables d'environnement
dotenv.config({ path: path.join(__dirname, '../.env') });

// Configuration de la connexion à la base de données
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'elipedia',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
});

// =============================================================================
// Fonctions utilitaires
// =============================================================================

/**
 * Charge un fichier JSON
 */
function loadJSONFile(filename) {
  const filepath = path.join(dataDir, filename);
  
  if (!fs.existsSync(filepath)) {
    console.warn(`⚠️  Fichier non trouvé: ${filename}`);
    return null;
  }

  try {
    const content = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ Erreur lors de la lecture de ${filename}:`, error.message);
    return null;
  }
}

/**
 * Trouve ou crée une catégorie
 */
async function findOrCreateCategory(client, categoryName) {
  // Chercher la catégorie existante
  const findResult = await client.query(
    'SELECT id FROM category WHERE name = $1',
    [categoryName]
  );

  if (findResult.rows.length > 0) {
    return findResult.rows[0].id;
  }

  // Créer une nouvelle catégorie
  const insertResult = await client.query(
    'INSERT INTO category (name) VALUES ($1) RETURNING id',
    [categoryName]
  );

  console.log(`  ✅ Catégorie créée: "${categoryName}"`);
  return insertResult.rows[0].id;
}

/**
 * Trouve ou crée une liste
 */
async function findOrCreateList(client, listData, categoryId) {
  // Chercher la liste existante
  const findResult = await client.query(
    'SELECT id FROM list WHERE name = $1 AND category_id = $2',
    [listData.name, categoryId]
  );

  if (findResult.rows.length > 0) {
    // Mettre à jour la description si elle a changé
    await client.query(
      'UPDATE list SET description = $1 WHERE id = $2',
      [listData.description || null, findResult.rows[0].id]
    );
    return findResult.rows[0].id;
  }

  // Créer une nouvelle liste
  const insertResult = await client.query(
    'INSERT INTO list (name, description, category_id) VALUES ($1, $2, $3) RETURNING id',
    [listData.name, listData.description || null, categoryId]
  );

  console.log(`    ✅ Liste créée: "${listData.name}"`);
  return insertResult.rows[0].id;
}

/**
 * Ajoute ou met à jour un item
 */
async function upsertItem(client, itemData, listId) {
  // Chercher l'item existant
  const findResult = await client.query(
    'SELECT id FROM item WHERE name = $1 AND list_id = $2',
    [itemData.name, listId]
  );

  if (findResult.rows.length > 0) {
    // Mettre à jour les métadonnées si elles ont changé
    await client.query(
      'UPDATE item SET metadata = $1 WHERE id = $2',
      [JSON.stringify(itemData.metadata || {}), findResult.rows[0].id]
    );
    return findResult.rows[0].id;
  }

  // Créer un nouvel item
  const insertResult = await client.query(
    'INSERT INTO item (name, list_id, metadata) VALUES ($1, $2, $3) RETURNING id',
    [itemData.name, listId, JSON.stringify(itemData.metadata || {})]
  );

  return insertResult.rows[0].id;
}

// =============================================================================
// Fonction principale de seeding
// =============================================================================

async function seedDatabase() {
  const client = await pool.connect();

  try {
    console.log('');
    console.log('🌱 ====================================');
    console.log('🌱 ELIPEDIA - Script de Seeding');
    console.log('🌱 ====================================');
    console.log('');

    // Test de connexion
    const testResult = await client.query('SELECT NOW()');
    console.log('✅ Connexion à PostgreSQL réussie');
    console.log(`📅 Timestamp: ${testResult.rows[0].now}`);
    console.log('');

    // Commencer une transaction
    await client.query('BEGIN');

    // Lire tous les fichiers JSON dans /data
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

    if (files.length === 0) {
      console.warn('⚠️  Aucun fichier JSON trouvé dans /data');
      await client.query('ROLLBACK');
      return;
    }

    console.log(`📂 ${files.length} fichier(s) trouvé(s) dans /data`);
    console.log('');

    let totalCategories = 0;
    let totalLists = 0;
    let totalItems = 0;

    // Traiter chaque fichier
    for (const file of files) {
      console.log(`📄 Traitement de: ${file}`);
      const data = loadJSONFile(file);

      if (!data || !data.category || !data.lists) {
        console.error(`  ❌ Format invalide dans ${file}`);
        continue;
      }

      // Créer ou trouver la catégorie
      const categoryId = await findOrCreateCategory(client, data.category);
      totalCategories++;

      // Traiter chaque liste
      for (const listData of data.lists) {
        const listId = await findOrCreateList(client, listData, categoryId);
        totalLists++;

        // Supprimer les anciens items de cette liste
        await client.query('DELETE FROM item WHERE list_id = $1', [listId]);

        // Ajouter les items
        if (listData.items && listData.items.length > 0) {
          for (const itemData of listData.items) {
            await upsertItem(client, itemData, listId);
            totalItems++;
          }
          console.log(`      ✅ ${listData.items.length} item(s) ajouté(s)`);
        }
      }

      console.log('');
    }

    // Valider la transaction
    await client.query('COMMIT');

    console.log('🎉 ====================================');
    console.log('🎉 Seeding terminé avec succès !');
    console.log('🎉 ====================================');
    console.log('');
    console.log(`📊 Statistiques:`);
    console.log(`   - Catégories: ${totalCategories}`);
    console.log(`   - Listes: ${totalLists}`);
    console.log(`   - Items: ${totalItems}`);
    console.log('');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('');
    console.error('❌ ====================================');
    console.error('❌ Erreur lors du seeding:');
    console.error('❌ ====================================');
    console.error(error);
    console.error('');
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// =============================================================================
// Exécution
// =============================================================================

seedDatabase();

