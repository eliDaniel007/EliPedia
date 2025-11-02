/**
 * Routes pour les catégories
 */

import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

/**
 * GET /api/categories
 * Récupère toutes les catégories
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id,
        c.name,
        c.created_at,
        COUNT(l.id) as list_count
      FROM category c
      LEFT JOIN list l ON l.category_id = c.id
      GROUP BY c.id, c.name, c.created_at
      ORDER BY c.name ASC
    `);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération des catégories'
    });
  }
});

/**
 * GET /api/categories/:id
 * Récupère une catégorie spécifique avec ses listes
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer la catégorie
    const categoryResult = await pool.query(
      'SELECT * FROM category WHERE id = $1',
      [id]
    );

    if (categoryResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Catégorie non trouvée'
      });
    }

    // Récupérer les listes de cette catégorie
    const listsResult = await pool.query(`
      SELECT 
        l.id,
        l.name,
        l.description,
        l.created_at,
        COUNT(i.id) as item_count
      FROM list l
      LEFT JOIN item i ON i.list_id = l.id
      WHERE l.category_id = $1
      GROUP BY l.id, l.name, l.description, l.created_at
      ORDER BY l.name ASC
    `, [id]);

    const category = categoryResult.rows[0];
    category.lists = listsResult.rows;

    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de la catégorie:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur lors de la récupération de la catégorie'
    });
  }
});

export default router;

