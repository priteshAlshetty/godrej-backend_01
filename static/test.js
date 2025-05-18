const ExcelJS = require('exceljs');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'godrej_traceability',
    port: process.env.DB_PORT || 3310, //
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function readExcelData() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('static/end_of_line.xlsx');

    const worksheet = workbook.getWorksheet(1);
    let rows = [];

    worksheet.eachRow((row) => {
        rows.push(row.values);
    });

    // Skip first two rows (if they are headers, etc.)
    rows = rows.slice(2);

    // console.log(rows);
    return rows;
}

// process data
(async function processData() {
    let rows = await readExcelData();

    const grouped = {};
    rows.forEach((row) => {
        const battery_id = row[1]; // Index 1 is battery_id (since index 0 is undefined)
        const cell_id = row[2]; // Index 2 is cell_id

        if (!grouped[battery_id]) {
            grouped[battery_id] = [battery_id]; // Initialize with battery_id as first element
        }
        grouped[battery_id].push(cell_id); // Add cell_id to the battery group
    });
    // Convert object to array of arrays
    const result = Object.values(grouped);
    // console.log(result);
    // insert data into DB

    result.forEach(async (item) => {
        const sql = `INSERT INTO battery_cell_mapping 
        (battery_id, cell_id_1, cell_id_2, cell_id_3, cell_id_4, cell_id_5, cell_id_6, cell_id_7, cell_id_8, cell_id_9)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            cell_id_1 = VALUES(cell_id_1),
            cell_id_2 = VALUES(cell_id_2),
            cell_id_3 = VALUES(cell_id_3),
            cell_id_4 = VALUES(cell_id_4),
            cell_id_5 = VALUES(cell_id_5),
            cell_id_6 = VALUES(cell_id_6),
            cell_id_7 = VALUES(cell_id_7),
            cell_id_8 = VALUES(cell_id_8),
            cell_id_9 = VALUES(cell_id_9)`;
        try {
            if (item.length === 10) {
                const [result] = await pool.query(sql, item);
                const batteryId = item[0];
                console.log(`Data inserted/updated successfully for battery_id: ${batteryId}`);
            } else {
                console.log(`Array length is not 10 for battery_id: ${item[0]}`);
            }
            // print result

            return result;
        } catch (err) {
            console.log(err);
            return;
        }
    });
})();
