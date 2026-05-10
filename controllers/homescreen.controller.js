const db = require("../config/db.js");

async function getHomescreenData(params) {
    {
        try {
            const [result] = await db.query("SELECT *, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS created_at_ist FROM homescreen_data LIMIT 1");
            if (result.length > 0) {
                return result[0];
            } else {
                throw new Error("No homescreen data found");
            }
        } catch (error) {
            console.error("Error fetching homescreen data:", error);
            return null;
        }
    }
}

module.exports = {
    getHomescreenData,
};
