const dayjs = require('dayjs');
const ExcelJS = require('exceljs');

const pool = require('../config/db');

async function createBatteryMappingData(path) {
    try {
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
    } catch (err) {
        console.log('Error while reading end_of_line file >>: ' + err);
        return err;
    }
}
// old style
// async function uploadbatteryMappingData(dataObject) {
//     const upload_battery_mapping = Object.values(dataObject.battery_mapping);
//     const upload_cell_data = Object.values(dataObject.cell_data);
//     const upload_battery_data = Object.values(dataObject.battery_data);

//     // insert into DB
//     upload_battery_mapping.forEach(async (item) => {
//         const sql = `INSERT INTO battery_cell_mapping 
//         (battery_id, cell_id_1, cell_id_2, cell_id_3, cell_id_4, cell_id_5, cell_id_6, cell_id_7, cell_id_8, cell_id_9)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         ON DUPLICATE KEY UPDATE
//             cell_id_1 = VALUES(cell_id_1),
//             cell_id_2 = VALUES(cell_id_2),
//             cell_id_3 = VALUES(cell_id_3),
//             cell_id_4 = VALUES(cell_id_4),
//             cell_id_5 = VALUES(cell_id_5),
//             cell_id_6 = VALUES(cell_id_6),
//             cell_id_7 = VALUES(cell_id_7),
//             cell_id_8 = VALUES(cell_id_8),
//             cell_id_9 = VALUES(cell_id_9)`;
//         try {
//             if (item.length === 10) {
//                 const [result] = await pool.query(sql, item);

//                 console.log(
//                     `✅ Data inserted/updated into battery_cell_mapping successfully for battery_id: ${item[0]}`
//                 );
//             } else {
//                 console.warn(
//                     `⚠️ Skipped insert: Expected array of length 10 but got ${item.length} for battery_id: ${item[0]}`
//                 );
//             }
            
//         } catch (err) {
//             console.error(`❌ DB 'battery_cell_mapping'Error for battery_id: ${item[0]}`);
//             console.error('Error message:', err.message);
//             console.error('SQL:', sql);
//             console.error('Params:', item);
            
//         }
//     });

//     upload_battery_data.forEach(async (item) => {
//         const sql = `INSERT INTO battery_main 
//         (battery_id, battery_ocv, manufactured_timestamp, testing_timestamp)
//         VALUES (?, ?, ?, ?)
//         ON DUPLICATE KEY UPDATE
//             battery_ocv = VALUES(battery_ocv),
//             manufactured_timestamp = VALUES(manufactured_timestamp),
//             testing_timestamp = VALUES(testing_timestamp)`;

//         try {
//             if (item.length === 4) {
//                 const [result] = await pool.query(sql, item);
//                 console.log(
//                     `✅ Data inserted/updated in battery_main successfully for battery_id: ${item[0]}`
//                 );
//                 // console.warn(`✅ Data : ${item}`);
//             } else {
//                 console.warn(
//                     `⚠️ Skipped insert: Expected array of length 4 but got ${item.length} for battery_id: ${item[0]}`
//                 );
//             }
//         } catch (err) {
//             console.error(`❌ DB 'battery_main' Error for battery_id: ${item[0]}`);
//             console.error('Error message:', err.message);
//             console.error('SQL:', sql);
//             console.error('Params:', item);
//         }
//     });

//     upload_cell_data.forEach(async (item) => {
//         const sql = `INSERT INTO cell_main 
//         (cell_id, cell_ocv, cell_ir, cell_hrd)
//         VALUES (?, ?, ?, ?)
//         ON DUPLICATE KEY UPDATE
//             cell_ocv = VALUES(cell_ocv),
//             cell_ir = VALUES(cell_ir),
//             cell_hrd = VALUES(cell_hrd)`;

//         try {
//             if (item.length === 4) {
//                 const [result] = await pool.query(sql, item);
//                 console.log(
//                     `✅ Data inserted/updated in cell_main successfully for cell_id: ${item[0]}`
//                 );
                
//             } else {
//                 console.warn(
//                     `⚠️ Skipped insert: Expected array of length 4 but got ${item.length} for cell_id: ${item[0]}`
//                 );
//             }
//         } catch (err) {
//             console.error(`❌ DB 'cell_main' Error for cell_id: ${item[0]}`);
//             console.error('Error message:', err.message);
//             console.error('SQL:', sql);
//             console.error('Params:', item);
//         }
//     });
// }

// new style with promise
async function uploadbatteryMappingData(dataObject) {
    const upload_battery_mapping = Object.values(dataObject.battery_mapping);
    const upload_cell_data = Object.values(dataObject.cell_data);
    const upload_battery_data = Object.values(dataObject.battery_data);

    // 🔧 battery_cell_mapping insert
    await Promise.all(upload_battery_mapping.map(async (item) => {
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
                await pool.query(sql, item);
                console.log(`✅ Inserted/updated battery_cell_mapping for battery_id: ${item[0]}`);
            } else {
                console.warn(`⚠️ Invalid item length (${item.length}) for battery_cell_mapping battery_id: ${item[0]}`);
            }
        } catch (err) {
            console.error(`❌ Error inserting into battery_cell_mapping for battery_id: ${item[0]}`);
            console.error(err);
        }
    }));

    // 🔧 battery_main insert
    await Promise.all(upload_battery_data.map(async (item) => {
        const sql = `INSERT INTO battery_main 
        (battery_id, battery_ocv, manufactured_timestamp, testing_timestamp)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            battery_ocv = VALUES(battery_ocv),
            manufactured_timestamp = VALUES(manufactured_timestamp),
            testing_timestamp = VALUES(testing_timestamp)`;

        try {
            if (item.length === 4) {
                await pool.query(sql, item);
                console.log(`✅ Inserted/updated battery_main for battery_id: ${item[0]}`);
            } else {
                console.warn(`⚠️ Invalid item length (${item.length}) for battery_main battery_id: ${item[0]}`);
            }
        } catch (err) {
            console.error(`❌ Error inserting into battery_main for battery_id: ${item[0]}`);
            console.error(err);
        }
    }));

    // 🔧 cell_main insert
    await Promise.all(upload_cell_data.map(async (item) => {
        const sql = `INSERT INTO cell_main 
        (cell_id, cell_ocv, cell_ir, cell_hrd)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            cell_ocv = VALUES(cell_ocv),
            cell_ir = VALUES(cell_ir),
            cell_hrd = VALUES(cell_hrd)`;

        try {
            if (item.length === 4) {
                await pool.query(sql, item);
                console.log(`✅ Inserted/updated cell_main for cell_id: ${item[0]}`);
            } else {
                console.warn(`⚠️ Invalid item length (${item.length}) for cell_main cell_id: ${item[0]}`);
            }
        } catch (err) {
            console.error(`❌ Error inserting into cell_main for cell_id: ${item[0]}`);
            console.error(err);
        }
    }));

    return true; // ✅ signal that all inserts are done
}

async function addDataToServer() {
    try {
        const result = await createBatteryMappingData('uploads/end_of_line.xlsx');
        await uploadbatteryMappingData(result);
        console.log('completed..');
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    addDataToServer,
};
