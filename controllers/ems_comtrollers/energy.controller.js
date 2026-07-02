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

module.exports = {
    getEnergyData
};