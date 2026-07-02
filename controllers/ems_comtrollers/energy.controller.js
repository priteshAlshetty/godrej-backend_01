const db = require("../../config/mfmDB.js");

async function getEnergyData(params) {

    const sql = `WITH hourly_data AS (
    SELECT
        DATE_FORMAT(date_time, '%Y-%m-%d %H:00') AS hour_time,
        KWh,
        current_avg,
        current_i1,
        current_i2,
        current_i3,
        ROW_NUMBER() OVER (
            PARTITION BY DATE_FORMAT(date_time, '%Y-%m-%d %H')
            ORDER BY date_time DESC
        ) AS rn
    FROM ${params.meter_name}
    WHERE DATE(date_time) >= ?
    AND DATE(date_time) <  ?
)

SELECT
    hour_time,
    ROUND(KWh,2) AS kwh,
    ROUND(
        KWh - LAG(KWh) OVER (ORDER BY hour_time),
        2
    ) AS consumption_kwh,
    ROUND(current_avg,2) AS current_avg,
    ROUND(current_i1,2) AS current_i1,
    ROUND(current_i2,2) AS current_i2,
    ROUND(current_i3,2) AS current_i3
FROM hourly_data
WHERE rn = 1
ORDER BY hour_time;`;

    const [rows] = await db.query(sql, [params.from, params.to]);
    return rows;

}

async function getEnergyDataAllMachines(params) {

    try {
        const [rows] = await db.query(`SELECT name FROM mfm_map`);
        const energyData = {};

        for (const row of rows) {
            const [data] = await db.query(
                `SELECT
                        (
                            SELECT KWh
                            FROM ${row.name}
                            WHERE date_time >= ?
                                AND date_time < ?
                            ORDER BY date_time DESC
                            LIMIT 1
                        )
                        -
                        (
                            SELECT KWh
                            FROM ${row.name}
                            WHERE date_time >= ?
                                AND date_time < ?
                            ORDER BY date_time ASC
                            LIMIT 1
                        ) AS KWh_consumption;`,
                [params.from, params.to, params.from, params.to]);
            energyData[row.name] = data[0].KWh_consumption;
        }
        for (const machine in energyData) {
            if (energyData[machine] === null) {
                energyData[machine] = 0;
            }
        }

        return energyData;
    } catch (error) {
        console.error("Error fetching energy data for all machines:", error);
        throw error;
    }
}

module.exports = {
    getEnergyData,
    getEnergyDataAllMachines
};