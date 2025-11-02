/**
 * ELIPEDIA - List Master Backend Server
 * Point d'entrée principal de l'application
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool, { testConnection } from './config/database.js';

// Import des routes
import categoriesRouter from './routes/categories.js';
import listsRouter from './routes/lists.js';
import searchRouter from './routes/search.js';

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// =============================================================================
// Middlewares
// =============================================================================

// CORS - Autoriser les requêtes depuis le frontend
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: true, // Autoriser toutes les origines (y compris file://)
  credentials: true
}));

// Parser JSON
app.use(express.json());

// Logger simple des requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// =============================================================================
// Routes
// =============================================================================

// Route de santé (health check)
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      status: 'ok',
      timestamp: result.rows[0].now,
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error.message
    });
  }
});

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: '🎮 Bienvenue sur l\'API ELIPEDIA - List Master',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      categories: '/api/categories',
      lists: '/api/lists',
      search: '/api/search?q=query'
    },
    documentation: 'https://github.com/your-repo/elipedia'
  });
});

// Routes API
app.use('/api/categories', categoriesRouter);
app.use('/api/lists', listsRouter);
app.use('/api/search', searchRouter);

// =============================================================================
// Gestion des erreurs 404
// =============================================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route non trouvée',
    path: req.path
  });
});

// =============================================================================
// Gestion globale des erreurs
// =============================================================================

app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(500).json({
    success: false,
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// =============================================================================
// Démarrage du serveur
// =============================================================================

async function startServer() {
  // Test de connexion à la base de données
  const dbConnected = await testConnection();
  
  if (!dbConnected) {
    console.error('❌ Impossible de démarrer le serveur : pas de connexion à la base de données');
    console.error('💡 Vérifiez votre fichier .env et assurez-vous que PostgreSQL est démarré');
    process.exit(1);
  }

  // Démarrage du serveur HTTP
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 ====================================');
    console.log(`🎮 Serveur ELIPEDIA démarré avec succès !`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🌍 URL: http://localhost:${PORT}`);
    console.log(`🗄️  Base de données: ${process.env.DB_NAME}`);
    console.log('🚀 ====================================');
    console.log('');
  });
}

// Gestion de l'arrêt propre du serveur
process.on('SIGTERM', async () => {
  console.log('⏹️  Signal SIGTERM reçu, arrêt du serveur...');
  await pool.end();
  process.exit(0);
});

// Démarrage
startServer();

