const db = require('../config/db');

async function testDBConnection() {
    try {
        const [rows] = await db.query('SELECT 1+1 AS Result');
        return { STATUS: true, MESSAGE: 'DB connected', DATA: rows };
    } catch (err) {
        return { STATUS: false, MESSAGE: 'DB connection failed', ERROR: err.message };
    }
}

module.exports = {
    testDBConnection
};