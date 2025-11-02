-- =============================================================================
-- ELIPEDIA - List Master Database Schema
-- =============================================================================
-- Description: Schéma PostgreSQL pour l'application List Master
-- Tables: Category, List, Item
-- =============================================================================

-- Suppression des tables existantes (pour réinitialisation propre)
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS list CASCADE;
DROP TABLE IF EXISTS category CASCADE;

-- =============================================================================
-- Table: Category
-- =============================================================================
-- Description: Regroupe les grands thèmes de l'encyclopédie
-- Exemples: Géographie, Cinéma, Science, Sport, Histoire...
-- =============================================================================

CREATE TABLE category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances de recherche
CREATE INDEX idx_category_name ON category(name);

-- =============================================================================
-- Table: List
-- =============================================================================
-- Description: Représente une liste à deviner (cœur du jeu)
-- Exemples: "Pays d'Afrique", "Films de Tarantino", "Capitales d'Europe"
-- =============================================================================

CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INTEGER NOT NULL REFERENCES category(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contrainte: Une liste doit avoir un nom unique dans sa catégorie
    UNIQUE(name, category_id)
);

-- Index pour améliorer les performances
CREATE INDEX idx_list_category ON list(category_id);
CREATE INDEX idx_list_name ON list(name);

-- =============================================================================
-- Table: Item
-- =============================================================================
-- Description: Représente un élément d'une liste (les réponses)
-- Exemples: "Nigeria", "Pulp Fiction", "Paris"
-- metadata: Champ JSON pour stocker des infos supplémentaires (mode Apprendre)
-- =============================================================================

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    list_id INTEGER NOT NULL REFERENCES list(id) ON DELETE CASCADE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contrainte: Un item ne peut apparaître qu'une seule fois dans une liste
    UNIQUE(name, list_id)
);

-- Index pour améliorer les performances
CREATE INDEX idx_item_list ON item(list_id);
CREATE INDEX idx_item_name ON item(name);

-- Index GIN pour les recherches JSON dans metadata
CREATE INDEX idx_item_metadata ON item USING GIN (metadata);

-- =============================================================================
-- Fonctions utiles
-- =============================================================================

-- Fonction pour compter le nombre d'items dans une liste
CREATE OR REPLACE FUNCTION count_items_in_list(list_id_param INTEGER)
RETURNS INTEGER AS $$
    SELECT COUNT(*)::INTEGER FROM item WHERE list_id = list_id_param;
$$ LANGUAGE SQL STABLE;

-- =============================================================================
-- Données de test (optionnel - sera écrasé par le script de seeding)
-- =============================================================================

-- Vous pouvez décommenter ces lignes pour tester rapidement :
/*
INSERT INTO category (name) VALUES ('Géographie'), ('Cinéma'), ('Science');

INSERT INTO list (name, description, category_id) VALUES
    ('Pays d''Afrique', 'Les 54 pays reconnus du continent africain', 1),
    ('Films de Quentin Tarantino', 'La filmographie principale de QT', 2);

INSERT INTO item (name, list_id, metadata) VALUES
    ('Nigeria', 1, '{"capital": "Abuja", "population": 220000000}'),
    ('Égypte', 1, '{"capital": "Le Caire", "population": 104000000}'),
    ('Pulp Fiction', 2, '{"year": 1994, "awards": "Palme d''Or"}');
*/

-- =============================================================================
-- Fin du schéma
-- =============================================================================

