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

async function createBatteryMappingData(path) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(path);

    const worksheet = workbook.getWorksheet('end_of_line');
    let allRows = [];
    worksheet.eachRow((row) => {
        allRows.push(row.values);
    });
    allRows = allRows.slice(2); // skip coulmn names
    const battery_mapping = {};
    const cell_data = {};
    const battery_data = {};

    allRows.forEach((row) => {
        const battery_id = row[1]; // Index 1 is battery_id (since index 0 is undefined)
        const cell_id = row[2]; // Index 2 is cell_id
        const battery_ocv = row[3]; // Index 3 is cell_id
        const cell_ocv = row[4]; // Index 4 is cell_id
        const cell_ir = row[5]; // Index 5 is cell_id
        const cell_hrd = row[6]; // Index 6 is cell_id

        const date_of_manufactured = dayjs(row[7]).format('YYYY-MM-DD HH:mm:ss');
        const testing_timestamp = dayjs(row[8]).format('YYYY-MM-DD HH:mm:ss');
        // Index 7 is cell_id

        if (!battery_mapping[battery_id]) {
            battery_mapping[battery_id] = [battery_id]; // Initialize with battery_id as first element
        }

        battery_mapping[battery_id].push(cell_id); // Add cell_id to the battery group

        if (!cell_data[cell_id]) {
            cell_data[cell_id] = [cell_id];
        }
        cell_data[cell_id].push(cell_ocv, cell_ir, cell_hrd);

        if (!battery_data[battery_id]) {
            battery_data[battery_id] = [battery_id];
            battery_data[battery_id].push(battery_ocv, date_of_manufactured, testing_timestamp); // only single OCV value for battery_id , avoid repetation hence insterted inside if scope
        }
    });
    const insertObject = {};
    insertObject['battery_mapping'] = battery_mapping;
    insertObject['cell_data'] = cell_data;
    insertObject['battery_data'] = battery_data;
    return insertObject;
}

async function uploadbatteryMappingData(dataObject) {
    const upload_battery_mapping = Object.values(dataObject.battery_mapping);
    const upload_cell_data = Object.values(dataObject.cell_data);
    const upload_battery_data = Object.values(dataObject.battery_data);

    // insert into DB
    upload_battery_mapping.forEach(async (item) => {
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

                console.log(
                    `✅ Data inserted/updated into battery_cell_mapping successfully for battery_id: ${item[0]}`
                );
            } else {
                console.warn(
                    `⚠️ Skipped insert: Expected array of length 10 but got ${item.length} for battery_id: ${item[0]}`
                );
            }
            return 1;
        } catch (err) {
            console.error(`❌ DB 'battery_cell_mapping'Error for battery_id: ${item[0]}`);
            console.error('Error message:', err.message);
            console.error('SQL:', sql);
            console.error('Params:', item);
            return 0;
        }
    });

    upload_battery_data.forEach(async (item) => {
        const sql = `INSERT INTO battery_main 
        (battery_id, battery_ocv, manufactured_timestamp, testing_timestamp)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            battery_ocv = VALUES(battery_ocv),
            manufactured_timestamp = VALUES(manufactured_timestamp),
            testing_timestamp = VALUES(testing_timestamp)`;

        try {
            if (item.length === 4) {
                const [result] = await pool.query(sql, item);
                console.log(
                    `✅ Data inserted/updated in battery_main successfully for battery_id: ${item[0]}`
                );
                // console.warn(`✅ Data : ${item}`);
            } else {
                console.warn(
                    `⚠️ Skipped insert: Expected array of length 4 but got ${item.length} for battery_id: ${item[0]}`
                );
            }
        } catch (err) {
            console.error(`❌ DB 'battery_main' Error for battery_id: ${item[0]}`);
            console.error('Error message:', err.message);
            console.error('SQL:', sql);
            console.error('Params:', item);
        }
    });

    upload_cell_data.forEach(async (item) => {
        const sql = `INSERT INTO cell_main 
        (cell_id, cell_ocv, cell_ir, cell_hrd)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            cell_ocv = VALUES(cell_ocv),
            cell_ir = VALUES(cell_ir),
            cell_hrd = VALUES(cell_hrd)`;

        try {
            if (item.length === 4) {
                const [result] = await pool.query(sql, item);
                console.log(
                    `✅ Data inserted/updated in cell_main successfully for cell_id: ${item[0]}`
                );
                // console.warn(`✅ Data : ${item}`);
            } else {
                console.warn(
                    `⚠️ Skipped insert: Expected array of length 4 but got ${item.length} for cell_id: ${item[0]}`
                );
            }
        } catch (err) {
            console.error(`❌ DB 'cell_main' Error for cell_id: ${item[0]}`);
            console.error('Error message:', err.message);
            console.error('SQL:', sql);
            console.error('Params:', item);
        }
    });
}

// createBatteryMappingData('static/end_of_line.xlsx')
//     .then(async (result) => {
//         // console.log(result);
//         await uploadbatteryMappingData(result);
//         console.log('completed..');
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// (async function getData() {
//     const battery_id = "BAT1233";
//     const returnObject = {};
//     const [data] = await pool.query(
//         `SELECT * FROM battery_cell_mapping WHERE battery_id  = '${battery_id}'`
//     );
//     const cell_array = Object.values(data[0]).slice(1);
//     console.log(cell_array);

//     cell_array.forEach(async (item) => {
//         const [data] = await pool.query(
//         `SELECT * FROM cell_main WHERE cell_id  = '${item}'`
//     );

//     });

//     // console.log(Object.values(data[0]));
// })();

function saveJsonToFile(jsonObj) {
    const filePath = path.join(__dirname, 'updated.json');
    const jsonString = JSON.stringify(jsonObj, null, 2);

    fs.writeFileSync(filePath, jsonString, 'utf8');
    console.log('File written successfully to battery_output.json');
}

// (async function getData() {
//     const returnObject = {};
//     const battery_id = 'BAT1233';
//     const [data1] = await pool.query(
//         `SELECT * FROM battery_cell_mapping WHERE battery_id  = '${battery_id}'`
//     );
//     const cell_array = Object.values(data1[0]).slice(1);
//     returnObject['battery_id'] = data1[0].battery_id;
//     const cell_object = [];
//     cell_array.forEach(async (item) => {
//         cell_object.push({
//             cell_id: item,
//         });
//     });

//     const [data2] = await pool.query(
//         `SELECT * FROM battery_main WHERE battery_id  = '${battery_id}'`
//     );

//     returnObject['cell_data'] = cell_object;
//     returnObject['battery_ocv'] = data2[0].battery_ocv;
//     returnObject['manufactured_timestamp'] = data2[0].manufactured_timestamp;

//     for (let cell of returnObject['cell_data']) {
//         const [data3] = await pool.query('SELECT * FROM cell_main WHERE cell_id = ?', [
//             cell.cell_id,
//         ]);
//         const [data4] = await pool.query('SELECT anode_id, cathode_id FROM cell_electrode_mapping WHERE cell_id=?', [
//             cell.cell_id,
//         ]);
//         if (data3.length > 0) {
//             cell.details = data3[0];
//         } else {
//             cell.details = 'Cell_ID not found in DB!!';
//         }
//         if (data4.length > 0) {
//             cell.electrode_data = data4[0];
//         } else {
//             cell.electrode_data = 'Cell_ID not found in electrode mapping DB!!';
//         }
//     }

//     // console.log(JSON.stringify(returnObject, null, 2));
//     saveJsonToFile(returnObject)
// })();


/**
 * Get full trace data for a given battery ID.
 * @param {string} battery_id - The battery ID to query.
 * @returns {Promise<Object>} The enriched battery trace data.
 */
async function getTraceByBatteryId(battery_id) {
    const returnObject = {};

    try {
        returnObject.battery_id = battery_id;

        // 1. Query battery_main for battery details
        const [batteryMain] = await pool.query(
            'SELECT battery_ocv, manufactured_timestamp FROM battery_main WHERE battery_id = ?',
            [battery_id]
        );

        if (batteryMain.length === 0) {
            throw new Error(`No battery_main record found for battery_id: ${battery_id}`);
        }

        returnObject.battery_ocv = batteryMain[0].battery_ocv;
        returnObject.manufactured_timestamp = batteryMain[0].manufactured_timestamp;

        // 2. Query battery_cell_mapping for cell ids
        const [batteryCells] = await pool.query(
            'SELECT * FROM battery_cell_mapping WHERE battery_id = ?',
            [battery_id]
        );

        if (batteryCells.length === 0) {
            throw new Error(`No battery_cell_mapping found for battery_id: ${battery_id}`);
        }

        // Extract all cell_ids (excluding battery_id column)
        // Assuming battery_id is the first column, rest are cell_ids
        const cell_array = Object.values(batteryCells[0]).slice(1);

        

        // Prepare cell_data array with just cell_ids initially
        const cell_data = cell_array.map((cell_id) => ({ cell_id }));

        

        // 3. For each cell, get details and electrode data
        for (const cell of cell_data) {
            // Query cell_main details
            const [cellMain] = await pool.query('SELECT * FROM cell_main WHERE cell_id = ?', [
                cell.cell_id,
            ]);
            cell.details = cellMain.length > 0 ? cellMain[0] : 'Cell_ID not found in DB!!';

            // Query cell_electrode_mapping for electrodes
            const [electrodeMapping] = await pool.query(
                'SELECT anode_id, cathode_id FROM cell_electrode_mapping WHERE cell_id = ?',
                [cell.cell_id]
            );
            cell.electrode_data =
                electrodeMapping.length > 0
                    ? electrodeMapping[0]
                    : 'Cell_ID not found in electrode mapping DB!!';
        }

        returnObject.cell_data = cell_data;

        // Optionally save to file here or return and save outside
        // saveJsonToFile(returnObject);

        return returnObject;
    } catch (error) {
        console.error('Error in getTraceByBatteryId:', error.message);
        // throw error; // re-throw so caller can handle if needed
    }
}

(async ()=> {
    
    const result = await getTraceByBatteryId('BAT1233');
    saveJsonToFile(result)
})();