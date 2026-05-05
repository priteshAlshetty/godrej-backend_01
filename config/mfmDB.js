const mysql = require('mysql2/promise');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'backend_user',
    password: '1234',
    database: 'godrej_ems',
    port: 3306, //
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    timezone: '+05:30',
});

module.exports = pool;