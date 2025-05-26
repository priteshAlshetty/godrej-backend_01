const db = require('../config/db');
const { formatToLocal } = require('../utils/formatTimeStamps');
const fs = require('fs');
const { get } = require('http');
const path = require('path');

function saveJsonToFile(jsonObj) {
    const filePath = path.join(__dirname, 'updated.json');
    const jsonString = JSON.stringify(jsonObj, null, 2);

    fs.writeFileSync(filePath, jsonString, 'utf8');
    console.log('File written successfully to battery_output.json');
}
// async function getTraceByBatteryId(battery_id) {
//     const returnObject = {};
//     returnObject['SUCCESS'] = true;

//     try {
//         returnObject.battery_id = battery_id;

//         // 1. Query battery_main for battery details
//         const [batteryMain] = await db.query(
//             'SELECT battery_ocv, manufactured_timestamp FROM battery_main WHERE battery_id = ?',
//             [battery_id]
//         );

//         if (batteryMain.length === 0) {
//             returnObject['SUCCESS'] = false;
//             returnObject['errMsg'] = 'No battery_main record found for battery_id: ' + battery_id;
//             throw new Error(`No battery_main record found for battery_id: ${battery_id}`);
//         }

//         returnObject.battery_ocv = batteryMain[0].battery_ocv;
//         returnObject.manufactured_timestamp = batteryMain[0].manufactured_timestamp;

//         // 2. Query battery_cell_mapping for cell ids
//         const [batteryCells] = await db.query(
//             'SELECT * FROM battery_cell_mapping WHERE battery_id = ?',
//             [battery_id]
//         );

//         if (batteryCells.length === 0) {
//             returnObject['SUCCESS'] = false;
//             returnObject['errMsg'] =
//                 'No battery_cell_mapping record found for battery_id: ' + battery_id;
//             throw new Error(`No battery_cell_mapping found for battery_id: ${battery_id}`);
//         }

//         // Extract all cell_ids (excluding battery_id column)
//         // Assuming battery_id is the first column, rest are cell_ids
//         const cell_array = Object.values(batteryCells[0]).slice(1);

//         // Prepare cell_data array with just cell_ids initially
//         const cell_data = cell_array.map((cell_id) => ({ cell_id }));

//         // 3. For each cell, get details and electrode data
//         for (const cell of cell_data) {
//             // Query cell_main details
//             const [cellMain] = await db.query('SELECT * FROM cell_main WHERE cell_id = ?', [
//                 cell.cell_id,
//             ]);
//             cell.details = cellMain.length > 0 ? cellMain[0] : 'Cell_ID not found in DB!!';

//             // Query cell_electrode_mapping for electrodes
//             const [electrodeMapping] = await db.query(
//                 'SELECT anode_id, cathode_id FROM cell_electrode_mapping WHERE cell_id = ?',
//                 [cell.cell_id]
//             );

//             //4. get electrode data
//             const electrode_data = [];
//             if (electrodeMapping.length === 0) {
//                 electrode_data.push("No electrode found for this cell ID")
//             }
//             else {
//             for (const [key, value] of Object.entries(electrodeMapping[0])) {
//                 try {
//                     const [rows] = await db.query(
//                         'SELECT * FROM electrode WHERE electrode_id = ?',
//                         [value]
//                     );

//                     const dataEntry = {

//                         [`${key.split('_')[0]}_data`]:
//                             rows.length > 0 ? rows[0] : `No data found for ${value}`,
//                     };

//                     electrode_data.push(dataEntry);
//                 } catch (error) {
//                     console.error(`Error fetching data for ${key}: ${value}`, error);
//                     electrode_data.push({
//                         [key]: value,
//                         [`${key.split('_')[0]}_data`]: 'Error querying database',
//                     });
//                 }
//             }
//         }
//             cell.electrode_data = electrode_data;
//         }

//         returnObject.cell_data = cell_data;

//         // Optionally save to file here or return and save outside
//         // saveJsonToFile(returnObject);

//         return returnObject;
//     } catch (error) {
//         console.error('Error in getTraceByBatteryId:', error.message);
//         return {
//             SUCCESS: false,
//             errMsg: error.message || 'Unknown error occurred in getTraceByBatteryId',
//         };
//     }
// }

/**
 * Retrieves the full traceability data for a given battery ID.
 *
 * @param {string} battery_id - The battery ID to trace.
 * @returns {Promise<Object>} Trace object including battery info, cells, and electrode data.
 */
async function getTraceByBatteryId(battery_id) {
    const returnObject = {
        SUCCESS: true,
    };

    try {
        // 1. Get battery basic info
        const [batteryMain] = await db.query(
            /*sql*/ `SELECT battery_ocv, manufactured_timestamp 
            FROM battery_main 
            WHERE battery_id = ?`,
            [battery_id]
        );

        if (!batteryMain || batteryMain.length === 0) {
            throw new Error(`No battery_main record found for battery_id: ${battery_id}`);
        }

        returnObject.battery_ocv = batteryMain[0].battery_ocv;
        returnObject.manufactured_timestamp = batteryMain[0].manufactured_timestamp;

        // 2. Get mapped cell IDs
        const [batteryCells] = await db.query(
            'SELECT * FROM battery_cell_mapping WHERE battery_id = ?',
            [battery_id]
        );

        if (!batteryCells || batteryCells.length === 0) {
            throw new Error(`No battery_cell_mapping record found for battery_id: ${battery_id}`);
        }

        // Extract cell_ids (excluding first column which is battery_id)
        const cell_array = Object.values(batteryCells[0]).slice(1);
        const cell_data = [];

        // 3. For each cell, get its details and mapped electrode data
        for (const cell_id of cell_array) {
            const cell = { cell_id };

            // 3a. Fetch cell_main details
            const [cellMain] = await db.query('SELECT * FROM cell_main WHERE cell_id = ?', [
                cell_id,
            ]);
            cell.data = cellMain.length > 0 ? cellMain[0] : 'Cell_ID not found in DB!!';

            // 3b. Get electrode IDs (anode & cathode)
            const [electrodeMapping] = await db.query(
                'SELECT anode_id, cathode_id FROM cell_electrode_mapping WHERE cell_id = ?',
                [cell_id]
            );

            const electrode_data = [];

            if (!electrodeMapping || electrodeMapping.length === 0) {
                electrode_data.push({
                    error: `No electrode mapping found for cell_id: ${cell_id}`,
                });
            } else {
                // 4. For each electrode ID (anode, cathode), get its detailed data
                for (const [key, value] of Object.entries(electrodeMapping[0])) {
                    try {
                        const [rows] = await db.query(
                            'SELECT * FROM electrode WHERE electrode_id = ?',
                            [value]
                        );

                        const dataEntry = {
                            [`${key.split('_')[0]}_data`]:
                                rows.length > 0 ? rows[0] : `No data found for ${value}`,
                        };

                        electrode_data.push(dataEntry);
                    } catch (error) {
                        console.error(`Error querying electrode ${value} for ${key}:`, err);
                        electrode_data.push({
                            [key]: value,
                            [`${key.split('_')[0]}_data`]: 'Error querying database',
                        });
                    }
                }
            }

            cell.electrode_data = electrode_data;
            cell_data.push(cell);
        }

        returnObject.cell_data = cell_data;
        returnObject.battery_id = battery_id;
        return returnObject;
    } catch (error) {
        console.error('Error in getTraceByBatteryId:', error);

        return {
            SUCCESS: false,
            battery_id,
            errMsg: error.message || 'Unknown error occurred',
            location: 'getTraceByBatteryId controller function call ==> try-catch block',
            stack: error.stack || null,
            error: error,
        };
    }
}

async function getBatteryIdFromCellId(cell_id) {
    try {
        // 1. Get battery_id from cell_id
        const values = Array(9).fill(cell_id); // same value for each placeholder
        const query = `SELECT battery_id
                        FROM battery_cell_mapping
                        WHERE cell_id_1 = ?
                        OR cell_id_2 = ?
                        OR cell_id_3 = ?
                        OR cell_id_4 = ?
                        OR cell_id_5 = ?
                        OR cell_id_6 = ?
                        OR cell_id_7 = ?
                        OR cell_id_8 = ?
                        OR cell_id_9 = ?
                        LIMIT 1`;

        const [rows] = await db.query(query, values);

        if (!rows || rows.length === 0) {
            throw new Error(`No battery_id found for cell_id: ${cell_id}`);
        }
        battery_id = rows[0].battery_id;
        return {
            SUCCESS: true,
            battery_id,
        };
    } catch (error) {
        console.error('Error in getBatteryIdFromCellId:', error);

        return {
            SUCCESS: false,
            cell_id,
            errMsg: error.message || 'Unknown error occurred',
            location: 'getBatteryIdFromCellId controller function call ==> try-catch block',
            stack: error.stack || null,
            error: error,
            battery_id: null,
        };
    }
}

async function getTraceByCellId(cell_id) {
    try {
        const result = await getBatteryIdFromCellId(cell_id);
        if (result && result.SUCCESS && result.battery_id != null && result.battery_id !== '') {
            const returnObject = await getTraceByBatteryId(result.battery_id);
            return returnObject;
        } else if (result.battery_id === null) {
            throw new Error(
                'Error in getBatteryIdFromCellId ==> No battery_id found for cell_id:' + cell_id
            );
        } else {
            throw new Error(
                'Error in getBatteryIdFromCellId at call of getTraceByCellId ==> if-else block'
            );
        }
    } catch (error) {
        console.error('Error in getTraceByCellId:', error);
        return {
            SUCCESS: false,
            cell_id,
            errMsg: error.message || 'Unknown error occurred',
            location: 'getTraceByCellId controller function call ==> try-catch block',
            stack: error.stack || null,
        };
    }
}

async function getDataBySingleBatchId(batch_id) {
    try {
        const [rows] = await db.query('SELECT * FROM batch_main WHERE batch_id = ?', [batch_id]);

        if (!rows || rows.length === 0) {
            throw new Error(`No data found for batch: ${batch_id}`);
        } else {
            const batchData = rows[0];
            batchData.start_timestamp = formatToLocal(batchData.start_timestamp);
            batchData.stop_timestamp = formatToLocal(batchData.stop_timestamp);
            return {
                SUCCESS: true,
                batch_data: batchData,
            };
        }
    } catch (error) {
        console.error('Error in getDataBySingleBatchId:', error);
        return {
            SUCCESS: false,
            batch_id,
            errMsg: error.message || 'Unknown error occurred',
            location: 'getDataBySingleBatchId controller function call ==> try-catch block',
            stack: error.stack || null,
        };
    }
}

module.exports = {
    getTraceByBatteryId,
    getTraceByCellId,
    getDataBySingleBatchId,
};
