const db = require('../config/db');

async function findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { findAll, findById };
