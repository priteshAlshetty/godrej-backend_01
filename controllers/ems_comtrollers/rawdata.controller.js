const db = require("../../config/mfmDB.js");


async function getRawMeterDataNow(params) {
    try {
        const [rows] = await db.query(`SELECT *
                FROM ${params.meter_name}
                WHERE DATE(date_time) = '${params.date}'
                ORDER BY date_time DESC
                LIMIT 1`);

        if (rows.length > 0) {
            return rows[0];
        } else {
            console.warn(`No raw data found for the specified meter ${params.meter_name} and date: ${new Date().toLocaleString()}`)
            return null;
        }

    } catch (err) {
        console.error(`Error fetching raw data for meter ${params.meter_name}:`, err.message);
        return null;
    }
}

async function getRawDataAvg(params) {
    try {
        const [rows] = await db.query(`SELECT 
            AVG(KWh) AS avg_KWh,
            AVG(KVARh) AS avg_KVARh,
            AVG(KVAh) AS avg_KVAh,
            AVG(current_i1) AS avg_current_i1,
            AVG(current_i2) AS avg_current_i2,
            AVG(current_i3) AS avg_current_i3,
            AVG(phase_v1) AS avg_phase_v1,
            AVG(phase_v2) AS avg_phase_v2,
            AVG(phase_v3) AS avg_phase_v3,
            AVG(line_v1) AS avg_line_v1,
            AVG(line_v2) AS avg_line_v2,
            AVG(line_v3) AS avg_line_v3,
            AVG(line_vtg_avg) AS avg_line_vtg_avg,
            AVG(current_avg) AS avg_current_avg,
            AVG(freq) AS avg_freq,
            AVG(pf) AS avg_pf
            FROM ${params.meter_name}
            WHERE  DATE(date_time) = '${params.date}'`)

        if (rows.length > 0) {
            return rows[0];
        } else {
            console.warn(`No raw data found for the specified meter ${params.meter_name} and date: ${new Date().toLocaleString()}`)
            return null;
        }
    } catch (err) {
        console.error(`error occured in get avg data sql query`)
        return null;
    }


}
async function getRawDataContinuous(params) {
    try {
        const [rows] = await db.query(`
            SELECT  KWh, KVARh, KVAh, 
                    current_i1, current_i2, current_i3,
                    phase_v1, phase_v2, phase_v3,
                    line_v1, line_v2, line_v3,
                    line_vtg_avg, current_avg, freq, pf, date_time
            FROM ${params.meter_name} 
            WHERE DATE(date_time) = '${params.date}'
            ORDER BY date_time ASC`);
        const flattenData = {};
        if (rows.length > 0) {


            for (const row of rows) {
                for (const key in row) {
                    if (!flattenData.hasOwnProperty(key)) {
                        flattenData[key] = [];
                    }
                    flattenData[key].push(row[key]);
                }

            }
            return flattenData;
        }
        else {
            console.warn(`No raw data found for the specified meter ${params.meter_name} and date: ${new Date().toLocaleString()}`)
            return null;
        }
    } catch (err) {
        console.error('error while geting continuous data for meter')
        return null;
    }
}

async function getNames() {
    try {
        const [rows] = await db.query("SELECT name FROM `mfm_map`;");
        if (rows.length > 0) {
            return rows.map(row => row.name);
        }
    } catch (err) {
        console.error('error while fetching MFM names')
        return null;
    }
}


async function getMFMData(params) {
    const rawDataNow = await getRawMeterDataNow(params);
    const rawDataAvg = await getRawDataAvg(params);
    const rawDataContinuous = await getRawDataContinuous(params);
    if (!rawDataNow || !rawDataAvg || !rawDataContinuous) {
        console.warn(`One or more data retrieval functions returned null for meter ${params.meter_name} and date ${params.date} at ${new Date().toLocaleString()}`);
        return null;

    } else {
        return {
            rawDataNow,
            rawDataAvg,
            rawDataContinuous
        }
    }

}


module.exports = {
    getMFMData,
    getNames
}