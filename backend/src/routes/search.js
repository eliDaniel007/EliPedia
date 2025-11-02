/**
 * Routes pour la recherche globale
 */

import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/search?q=query
 * Recherche globale dans les catégories, listes et items
 */
router.get('/', async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim().length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Le paramètre de recherche "q" est requis'
    });
  }

  const searchTerm = `%${q.toLowerCase()}%`;

  try {
    // Recherche dans les catégories
    const categoriesResult = await pool.query(`
      SELECT 
        id,
        name,
        'category' as type
      FROM category
      WHERE LOWER(name) LIKE $1
      LIMIT 5
    `, [searchTerm]);

    // Recherche dans les listes
    const listsResult = await pool.query(`
      SELECT 
        l.id,
        l.name,
        l.description,
        c.name as category_name,
        'list' as type
      FROM list l
      JOIN category c ON c.id = l.category_id
      WHERE LOWER(l.name) LIKE $1 OR LOWER(l.description) LIKE $1
      LIMIT 10
    `, [searchTerm]);

    // Recherche dans les items
    const itemsResult = await pool.query(`
      SELECT 
        i.id,
        i.name,
        i.metadata,
        l.id as list_id,
        l.name as list_name,
        c.name as category_name,
        'item' as type
      FROM item i
      JOIN list l ON l.id = i.list_id
      JOIN category c ON c.id = l.category_id
      WHERE LOWER(i.name) LIKE $1
      LIMIT 20
    `, [searchTerm]);

    res.json({
      success: true,
      query: q,
      results: {
        categories: categoriesResult.rows,
        lists: listsResult.rows,
        items: itemsResult.rows
      },
      total_count: 
        categoriesResult.rows.length + 
        listsResult.rows.length + 
        itemsResult.rows.length
    });
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la recherche'
    });
  }
});

export default router;

