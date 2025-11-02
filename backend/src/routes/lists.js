/**
 * Routes pour les listes
 */

import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/lists
 * Récupère toutes les listes (avec filtrage optionnel par catégorie)
 * Query params: ?category_id=X
 */
router.get('/', async (req, res) => {
  const { category_id } = req.query;

  try {
    let query = `
      SELECT 
        l.id,
        l.name,
        l.description,
        l.category_id,
        c.name as category_name,
        l.created_at,
        COUNT(i.id) as item_count
      FROM list l
      JOIN category c ON c.id = l.category_id
      LEFT JOIN item i ON i.list_id = l.id
    `;

    const params = [];
    
    if (category_id) {
      query += ' WHERE l.category_id = $1';
      params.push(category_id);
    }

    query += `
      GROUP BY l.id, l.name, l.description, l.category_id, c.name, l.created_at
      ORDER BY c.name ASC, l.name ASC
    `;

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des listes:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération des listes'
    });
  }
});

/**
 * GET /api/lists/:id
 * Récupère une liste spécifique avec tous ses items
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer la liste
    const listResult = await pool.query(`
      SELECT 
        l.id,
        l.name,
        l.description,
        l.category_id,
        c.name as category_name,
        l.created_at
      FROM list l
      JOIN category c ON c.id = l.category_id
      WHERE l.id = $1
    `, [id]);

    if (listResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Liste non trouvée'
      });
    }

    // Récupérer les items de cette liste
    const itemsResult = await pool.query(`
      SELECT 
        id,
        name,
        metadata,
        created_at
      FROM item
      WHERE list_id = $1
      ORDER BY name ASC
    `, [id]);

    const list = listResult.rows[0];
    list.items = itemsResult.rows;
    list.item_count = itemsResult.rows.length;

    res.json({
      success: true,
      data: list
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la liste:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération de la liste'
    });
  }
});

export default router;

