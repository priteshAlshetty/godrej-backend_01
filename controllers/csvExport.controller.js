const db = require("../../config/machineData.js");
const fs = require('fs');
const path = require('path');

async function getMachineData(params) {
    try {
        const filePath = path.join(__dirname, 'machine_data.csv');
        const [rows] = await db.query(`SELECT *
            FROM ${params.table_name}
            WHERE DATE(date_time) >='${params.from}' 
            AND DATE(date_time) <='${params.to}'
            ORDER BY date_time DESC`);

        if (rows.length === 0) {
            console.warn(`No machine data found for the specified table ${params.table_name} and date range: ${params.from} to ${params.to}`);
            return null;
        }

        const stream = fs.createWriteStream(filePath, {
            flags: 'w',
            encoding: 'utf8'
        });
        //header
        const headers = Object.keys(rows[0]);
        stream.write(headers.join(',') + '\n');

        //data 
        for (const row of rows) {
            const values = Object.values(row).map(value => {
                if (value === null || value === undefined) {
                    return '';
                }
                return value.toString().replace(/"/g, '""'); // Escape double quotes
            });
            stream.write(values.join(',') + '\n');
        }
        stream.end();
        return filePath; // Return the path to the generated CSV file

    } catch (err) {
        console.error(`Error fetching machine data for table ${params.table_name}:`, err.message);
        return null;
    }
}

module.exports = {
    getMachineData
};