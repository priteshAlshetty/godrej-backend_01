
const pool = require("../config/db.js");

const result = {
    DBStatus: false,
    Data: null
}
async function getCellIDs(){

    try{
        const [rows] = await pool.query(`
            SELECT cell_id FROM cell_main
        `);
        result.DBStatus = true;
        
        if(rows.length > 0){
            result.Data = rows;
            return result.Data = rows;
            
        } else{
            return result.Data = null;
        }

    } catch(err){
        console.error(err.message);
        return result;
    }
}

getCellIDs();