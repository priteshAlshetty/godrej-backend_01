

const MACHINE_MAP = require("../config/plcdata-mapping.js");
const pool = require("../config/db.js")

async function getMachineData(machineName, startDate, endDate){

    if(!machineName || typeof machineName !== 'string'){
        throw TypeError(`Error: input argument machineName expected as a string input and it should not be null, ${machineName}`);
    }

    if(!startDate || typeof startDate !== 'string'){
        throw TypeError(`Error: input argument startDate expected as a string input and it should not be null, ${startDate}`);
    }  
    
     if(!endDate || typeof endDate !== 'string'){
        throw TypeError(`Error: input argument endDate expected as a string input and it should not be null, ${endDate}`);
    }   

    if(!MACHINE_MAP){
        throw Error('Error in receiving MACHIN_MAP object, it should not be null or undefined.')
        
    }

    let batch_main_columns = MACHINE_MAP[machineName].batch_main;
    let cell_main_columns = MACHINE_MAP[machineName].cell_main;
    let electrode_columns = MACHINE_MAP[machineName].electrode;
    let battery_main_columns = MACHINE_MAP[machineName].battery_main;

    
    let machineData =  {
        status: false,
        machineName: machineName,
        Data : {
            batch_main_data: null,
            cell_main_data: null,
            electrode_data: null,
            battery_main_data: null,
        }
    }
    
    try{
        if(batch_main_columns.length !== 0){

            const [rows] = await pool.query(`
                SELECT ${batch_main_columns.join(", ")}
                FROM batch_main
                WHERE DATE(start_timestamp) BETWEEN ? AND ?`, 
                [startDate, endDate]
            );

            machineData.Data.batch_main_data = rows;
        }

        if (cell_main_columns.length !== 0) {

            const [rows] = await pool.query(
                `SELECT ${cell_main_columns.join(", ")}
                FROM cell_main 
                WHERE DATE(filling_datetime) BETWEEN ? AND ?`,
                [startDate, endDate]
            );

            machineData.Data.cell_main_data = rows;
        } 

        if(electrode_columns.length !== 0){

            const [rows] = await pool.query(`
                SELECT ${electrode_columns.join(", ")}
                FROM electrode
                WHERE DATE(date_time) BETWEEN ? AND ?`,
                [startDate, endDate]
            );

            machineData.Data.electrode_data = rows;
        }


        if(battery_main_columns.length !== 0){

            const [rows] = await pool.query(`
                SELECT ${battery_main_columns.join(", ")}
                FROM battery_main
                WHERE DATE(date_time) BETWEEN ? AND ?`,
                [startDate, endDate]
            );

            machineData.Data.battery_main_data = rows;
        }
        
        machineData.status = true;
        return machineData;

    } catch(err){
        console.error("DB Error:", err);
        throw err;
    }

}

module.exports = { getMachineData };