require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const initializeDatabase = require('./init-db');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection - Railway provides DATABASE_URL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Database connected successfully');
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT DISTINCT category FROM products ORDER BY category'
        );
        res.json(result.rows.map(row => row.category));
    } catch (err) {
        console.error('Error fetching categories:', err);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Search products
app.get('/api/search', async (req, res) => {
    try {
        const { query, category } = req.query;

        let sqlQuery = 'SELECT * FROM products WHERE 1=1';
        const params = [];
        let paramCount = 1;

        // Add name search if query provided
        if (query && query.trim() !== '') {
            sqlQuery += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
            params.push(`%${query}%`);
            paramCount++;
        }

        // Add category filter if provided
        if (category && category !== 'all') {
            sqlQuery += ` AND category = $${paramCount}`;
            params.push(category);
            paramCount++;
        }

        sqlQuery += ' ORDER BY name';

        const result = await pool.query(sqlQuery, params);
        res.json(result.rows);
    } catch (err) {
        console.error('Error searching products:', err);
        res.status(500).json({ error: 'Failed to search products' });
    }
});

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY name');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Initialize database and start server
async function startServer() {
    try {
        // Initialize database if needed
        await initializeDatabase();

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
