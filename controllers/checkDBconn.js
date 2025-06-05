const db = require('../config/db');

async function testDBConnection() {
    try {
        const [rows] = await db.query('SELECT 1+1 AS Result');
        return { STATUS: true, 
            MESSAGE: 'DB connected', 
            DATA: rows,
            Host:'MySQL 8.0.1',
            PORT: '3310',
            RUNNING_TEST_TIMESTAMP: new Date().toLocaleString(),
            COMPILED_ON: 'Win64 WSL(x86-64) 64-Bit system',
            AUTHENTICATION: 'ROOT USER (all access)'
        };
    } catch (err) {
        return { STATUS: false, MESSAGE: 'DB connection failed', ERROR: err.message };
    }
}

module.exports = {
    testDBConnection
};