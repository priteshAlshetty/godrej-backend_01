const ExcelJS = require('exceljs');
const mysql = require('mysql2/promise');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'godrej_traceability',
    port: process.env.DB_PORT || 3310, //
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '+05:30',
});

async function getData(date) {
    const sql = 'SELECT battery_id FROM `battery_main` WHERE DATE(manufactured_timestamp) = ?;'
    const [rows] = await pool.query(sql,[date]) 
    // console.log(rows)
    const battery_id_list = rows.map(row => row.battery_id);
    
    console.log(battery_id_list);
}


getData('2020-05-19');