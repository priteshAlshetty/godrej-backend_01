const db = require('../config/db');


async function getGraphByBatteryId(battery_id) {
    const returnObject = {
        battery_id: battery_id || null,
        horizontal_axis: {
            cell_id_list: [],
        },
        vertial_axis_dataPoints: {
            cell_ocv: [],
            cell_ir: [],
            cell_hrd: [],
            cell_dry_wt: [],
            cell_filled_wt: [],
            cell_jelly_roll_wt: [],
            cell_jelly_roll_dia: [],
        },
    };

    try {
        if (!battery_id) {
            throw new Error('Missing battery_id parameter');
        }

        const batterySql = 'SELECT * FROM `battery_cell_mapping` WHERE battery_id = ?;';
        const [batteryRows] = await db.query(batterySql, [battery_id]);

        if (!batteryRows || batteryRows.length === 0) {
            throw new Error(`No battery mapping found for battery_id: ${battery_id}`);
        }

        const cell_id_list = [];

        for (const [key, value] of Object.entries(batteryRows[0])) {
            if (key !== 'battery_id' && value != null) {
                cell_id_list.push(value);
            }
        }

        returnObject.horizontal_axis.cell_id_list = cell_id_list;

        for (const cell_id of cell_id_list) {
            const cellSql = 'SELECT * FROM cell_main WHERE cell_id = ?';
            const [cellRows] = await db.query(cellSql, [cell_id]);

            if (!cellRows || cellRows.length === 0) {
                console.warn(`Warning: No data found for cell_id: ${cell_id}`);
                continue;
            }

            const row = cellRows[0];
            const v = returnObject.vertial_axis_dataPoints;

            v.cell_ocv.push(row.cell_ocv ?? null);
            v.cell_ir.push(row.cell_ir ?? null);
            v.cell_hrd.push(row.cell_hrd ?? null);
            v.cell_dry_wt.push(row.dry_weight ?? null);
            v.cell_filled_wt.push(row.filled_weight ?? null);
            v.cell_jelly_roll_wt.push(row.jelly_roll_wt ?? null);
            v.cell_jelly_roll_dia.push(row.jelly_roll_dia ?? null);
        }

        returnObject.SUCCESS = true;
        return returnObject;
    } catch (error) {
        console.error('Error in getGraphByBatteryId():', error.message);
        return {
            error: true,
            message: error.message,
            details: error.stack,
            SUCCESS: false,
        };
    }
}

async function getGraphByTestingDate(from, to) {
    const returnObject = {
        testing_timestamp_from: from || null,
        testing_timestamp_to: to || null,

        horizontal_axis: {
            cell_id_list: [],
        },
        vertial_axis_dataPoints: {
            cell_ocv: [],
            cell_ir: [],
            cell_hrd: [],
            cell_dry_wt: [],
            cell_filled_wt: [],
            cell_jelly_roll_wt: [],
            cell_jelly_roll_dia: [],
        },
    };

    try {
        if (!from || !to) {
            throw new Error('missing required params from: ' + from + '  To: ' + to);
        } else {
            const sql = 'SELECT * FROM cell_main WHERE DATE(filling_datetime) BETWEEN ? AND ?';
            const [rows] = await db.query(sql, [from, to]);

            if (!rows || rows.length === 0) {
                console.warn(`Warning: No data found for this date filter: ${from} -    ${to}`);
            } else {
                for (const row of rows) {
                    const v = returnObject.vertial_axis_dataPoints;
                    const cell = returnObject.horizontal_axis.cell_id_list;

                    cell.push(row.cell_id);
                    v.cell_ocv.push(row.cell_ocv ?? null);
                    v.cell_ir.push(row.cell_ir ?? null);
                    v.cell_hrd.push(row.cell_hrd ?? null);
                    v.cell_dry_wt.push(row.dry_weight ?? null);
                    v.cell_filled_wt.push(row.filled_weight ?? null);
                    v.cell_jelly_roll_wt.push(row.jelly_roll_wt ?? null);
                    v.cell_jelly_roll_dia.push(row.jelly_roll_dia ?? null);
                }
            }

            returnObject.SUCCESS = true;
            return returnObject;
        }
    } catch (error) {
        console.error('Error in getGraphByTestingDate():', error.message);
        return {
            error: true,
            message: error.message,
            details: error.stack,
            SUCCESS: false,
        };
    }
}

async function getGraphByFillingDate(from, to) {
    const returnObject = {
        filling_timestamp_from: from || null,
        filling_timestamp_to: to || null,

        horizontal_axis: {
            cell_id_list: [],
        },
        vertial_axis_dataPoints: {
            cell_ocv: [],
            cell_ir: [],
            cell_hrd: [],
            cell_dry_wt: [],
            cell_filled_wt: [],
            cell_jelly_roll_wt: [],
            cell_jelly_roll_dia: [],
        },
    };

    try {
        if (!from || !to) {
            throw new Error('missing required params from: ' + from + '  To: ' + to);
        } else {
            const sql = 'SELECT * FROM cell_main WHERE DATE(testing_timestamp) BETWEEN ? AND ?';
            const [rows] = await db.query(sql, [from, to]);

            if (!rows || rows.length === 0) {
                console.warn(`Warning: No data found for this date filter: ${from} -    ${to}`);
            } else {
                for (const row of rows) {
                    const v = returnObject.vertial_axis_dataPoints;
                    const cell = returnObject.horizontal_axis.cell_id_list;

                    cell.push(row.cell_id);
                    v.cell_ocv.push(row.cell_ocv ?? null);
                    v.cell_ir.push(row.cell_ir ?? null);
                    v.cell_hrd.push(row.cell_hrd ?? null);
                    v.cell_dry_wt.push(row.dry_weight ?? null);
                    v.cell_filled_wt.push(row.filled_weight ?? null);
                    v.cell_jelly_roll_wt.push(row.jelly_roll_wt ?? null);
                    v.cell_jelly_roll_dia.push(row.jelly_roll_dia ?? null);
                }
            }

            returnObject.SUCCESS = true;
            return returnObject;
        }
    } catch (error) {
        console.error('Error in getGraphByfillingDate():', error.message);
        return {
            error: true,
            message: error.message,
            details: error.stack,
            SUCCESS: false,
        };
    }
}


module.exports = { 
    getGraphByBatteryId, 
    getGraphByTestingDate,
    getGraphByFillingDate };
