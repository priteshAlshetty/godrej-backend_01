const db = require("../config/db.js");
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
            throw new Error(`No machine data found for the specified table ${params.table_name} and date range: ${params.from} to ${params.to}`);
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
        await new Promise((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
            stream.end();
        });

        return filePath; // Return the path to the generated CSV file

    } catch (err) {
        console.error(`Error fetching machine data for table ${params.table_name}:`, err.message);
        throw err;
    }
}
async function getDatewiseBatchData(params) {
    try {
        const [rows] = await db.query(`SELECT 
            batch_id,
            DATE_FORMAT(start_timestamp, '%Y-%m-%d %H:%i:%s') AS start_timestamp,
            DATE_FORMAT(stop_timestamp, '%Y-%m-%d %H:%i:%s') AS stop_timestamp,
            mixing_time, ambient_temp, Humidity, final_paste_temp, max_current, max_torque, recipe_id, batch_size, paste_moisture, paste_density, water, teflon, zinc_emd, graphite_indium, bismuth, laponite, BNB90, MX25
            FROM batch_main WHERE DATE(start_timestamp) >= ? AND DATE(start_timestamp) <= ? ORDER BY start_timestamp DESC`, [params.from, params.to]);
        if (!rows.length > 0) {
            console.warn(`No batch data found for the specified date range: ${params.from} to ${params.to}`);
            return { success: false, message: `No batch data found for the specified date range: ${params.from} to ${params.to}` };
        }
        return { success: true, data: rows };
    } catch (error) {
        console.error("Error fetching datewise batch data:", error);
        throw error;
    }
}
async function getDatewiseBatchCSV(params) {

    try {
        const result = await getDatewiseBatchData(params);
        if (!result.success) {
            return { success: false, message: result.message };
        }
        const rows = result.data;
        const filePath = path.join(__dirname, 'batch_data.csv');
        // delete the old CSV file if exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const stream = fs.createWriteStream(filePath, {
            flags: 'w',
            encoding: 'utf8'
        });

        //headers
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
        //save file and return its path
        await new Promise((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
            stream.end();
        });

        return {
            success: true,
            filePath
        };
    } catch (error) {
        console.error("Error fetching datewise batch CSV data:", error);
        throw error;
    }
}

module.exports = {
    getMachineData,
    getDatewiseBatchData,
    getDatewiseBatchCSV
};