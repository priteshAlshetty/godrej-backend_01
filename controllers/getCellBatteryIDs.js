
const pool = require("../config/db.js");

const batteryResult = {
    DBStatus: false,
    Data: null
}
async function getBatteryIDs() {

    try {
        const [rows] = await pool.query(`
            SELECT battery_id FROM battery_main
        `);
        batteryResult.DBStatus = true;

        if (rows.length > 0) {
            batteryResult.Data = rows;
            console.log(batteryResult);
            return batteryResult;

        } else {
            batteryResult.Data = null;
            console.log(batteryResult);
            return batteryResult;
        }

    } catch (err) {
        console.error(err.message);
        console.log(batteryResult);
        console.log(batteryResult);
        return batteryResult;
    }
}


const cellResult = {
    DBStatus: false,
    Data: null
}
async function getCellIDs() {

    try {
        const [rows] = await pool.query(`
            SELECT cell_id FROM cell_main
        `);
        cellResult.DBStatus = true;

        if (rows.length > 0) {
            cellResult.Data = rows;
            console.log(cellResult);
            return cellResult;

        } else {
            cellResult.Data = null;
            console.log(cellResult);
            return cellResult;
        }

    } catch (err) {
        console.error(err.message);
        console.log(cellResult);
        return cellResult;
    }
}

async function getBatchId() {
    try {
        const [rows] = await pool.query(`
            SELECT batch_id FROM batch_main
        `);
        batteryResult.DBStatus = true;

        if (rows.length > 0) {
            batteryResult.Data = rows;
            return batteryResult;

        } else {
            batteryResult.Data = null;
            return batteryResult;
        }

    } catch (err) {
        console.error(err.message);
        return batteryResult;
    }
}

module.exports = { getBatteryIDs, getCellIDs, getBatchId }