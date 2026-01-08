const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
    });

    try {
        // Check if products table exists
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables
                WHERE table_name = 'products'
            );
        `);

        if (!tableCheck.rows[0].exists) {
            console.log('Products table does not exist. Creating and seeding database...');

            // Read and execute database.sql
            const sqlScript = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
            await pool.query(sqlScript);

            console.log('Database initialized successfully!');
        } else {
            console.log('Products table already exists. Skipping initialization.');
        }
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

module.exports = initializeDatabase;
