const ExcelJS = require('exceljs');
const mysql = require('mysql2/promise');
const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'godrej_traceability',
    port: process.env.DB_PORT || 3310, //
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: '+05:30',
});

// async function getData(battery_id) {
//     const sql = 'SELECT * FROM `battery_cell_mapping` WHERE battery_id = ?;';
//     const [rows] = await pool.query(sql, [battery_id]);
//     // // console.log(rows)
//     // const battery_id_list = rows.map(row => row.battery_id);

//     const cell_id_list = [];
//     const cell_ocv = [];
//     const cell_ir = [];
//     const cell_hrd = [];
//     const cell_dry_wt = [];
//     const cell_filled_wt =[];
//     const cell_jelly_roll_wt = [];
//     const cell_jelly_roll_dia = [];
//     Object.entries(rows[0]).forEach(([key, value]) => {
//         // console.log(key, value);
//         if (key !== 'battery_id') {
//             cell_id_list.push(value);
//         }
//     });

//     cell_id_list.forEach(async(item) =>{
//         const sql  = 'SELECT * FROM cell_main WHERE cell_id = ?'
//         const [rows] = await pool.query(sql,[item]);
//         console.log(rows[0].cell_ocv)
//         cell_ocv.push(rows[0].cell_ocv);
//         cell_ir.push(rows[0].cell_ir);
//         cell_hrd.push(rows[0].cell_hrd);
//         cell_dry_wt.push(rows[0].dry_weight);
//         cell_filled_wt.push(rows[0].filled_weight);
//         cell_jelly_roll_wt.push(rows[0].jelly_roll_wt);
//         cell_jelly_roll_dia.push(rows[0].jelly_roll_dia);

//     })

// const returnObject = {};

// returnObject['battery_id'] = battery_id;
// returnObject['horizontal_axis'] = {
//     cell_id_list
// };
// returnObject['vertial_axis_dataPoints'] = {
//     cell_ocv,
//     cell_ir,
//     cell_hrd,
//     cell_dry_wt,
//     cell_filled_wt,
//     cell_jelly_roll_wt,
//     cell_jelly_roll_dia,
// } ;

// console.log(JSON.stringify(returnObject, null, 2));

// }

// async function getData(battery_id) {
//     const returnObject = {
//         battery_id: battery_id || null,
//         horizontal_axis: {
//             cell_id_list: []
//         },
//         vertial_axis_dataPoints: {
//             cell_ocv: [],
//             cell_ir: [],
//             cell_hrd: [],
//             cell_dry_wt: [],
//             cell_filled_wt: [],
//             cell_jelly_roll_wt: [],
//             cell_jelly_roll_dia: []
//         }
//     };

//     try {
//         if (!battery_id) {
//             throw new Error("Missing battery_id parameter");
//         }

//         const batterySql = 'SELECT * FROM `battery_cell_mapping` WHERE battery_id = ?;';
//         const [batteryRows] = await pool.query(batterySql, [battery_id]);

//         if (!batteryRows || batteryRows.length === 0) {
//             throw new Error(`No battery mapping found for battery_id: ${battery_id}`);
//         }

//         const cell_id_list = [];

//         for (const [key, value] of Object.entries(batteryRows[0])) {
//             if (key !== 'battery_id' && value != null) {
//                 cell_id_list.push(value);
//             }
//         }

//         returnObject.horizontal_axis.cell_id_list = cell_id_list;

//         for (const cell_id of cell_id_list) {
//             const cellSql = 'SELECT * FROM cell_main WHERE cell_id = ?';
//             const [cellRows] = await pool.query(cellSql, [cell_id]);

//             if (!cellRows || cellRows.length === 0) {
//                 console.warn(`Warning: No data found for cell_id: ${cell_id}`);
//                 continue;
//             }

//             const row = cellRows[0];
//             const v = returnObject.vertial_axis_dataPoints;

//             v.cell_ocv.push(row.cell_ocv ?? null);
//             v.cell_ir.push(row.cell_ir ?? null);
//             v.cell_hrd.push(row.cell_hrd ?? null);
//             v.cell_dry_wt.push(row.dry_weight ?? null);
//             v.cell_filled_wt.push(row.filled_weight ?? null);
//             v.cell_jelly_roll_wt.push(row.jelly_roll_wt ?? null);
//             v.cell_jelly_roll_dia.push(row.jelly_roll_dia ?? null);
//         }

//         console.log(JSON.stringify(returnObject, null, 2));
//         return returnObject;

//     } catch (error) {
//         console.error('Error in getData:', error.message);
//         return {
//             error: true,
//             message: error.message,
//             details: error.stack
//         };
//     }
// }

// (async function getData() {
//     const [rows] = await pool.query('SELECT * FROM cell_main');
//     if (rows && rows.length > 0) {
//         const workbook = new ExcelJS.Workbook();
//         const worksheet = workbook.addWorksheet('Test Data');

//         // Add header row
//         worksheet.columns = Object.keys(rows[0]).map((key) => ({
//             header: key,
//             key: key,
//         }));

//         worksheet.getRow(1).eachCell((cell, colNumber) => {
//             cell.font = {
//                 bold: true,
//                 size: 12,
//                 name: 'Consolas',
//                 color: {
//                     argb: 'FF000000',
//                 },
//             };
//             cell.alignment = {
//                 vertical: 'middle',
//                 horizontal: 'center',
//                 wrapText: true,
//             };
//             cell.border = {
//                 top: { style: 'thin' },
//                 left: { style: 'thin' },
//                 bottom: { style: 'thin' },
//                 right: { style: 'thin' },
//             };
//             cell.fill = {
//                 type: 'pattern',
//                 pattern: 'solid',
//                 fgColor: { argb: 'FFDAEEF3' },
//             };
//         });

//         worksheet.getRow(1).height = 45;

//         rows.forEach((row) => {
//             worksheet.addRow(row);
//         });
//         // Adjust column widths (optional)
//         worksheet.getColumn(1).width = 18; // Column A (1st column) cell_id
//         worksheet.getColumn(2).width = 15; // Column B (2nd column) cell_ocv
//         worksheet.getColumn(3).width = 15; // Column C (3rd column) cell_ir
//         worksheet.getColumn(4).width = 15; // Column D (4th column) cell_hrd
//         worksheet.getColumn(5).width = 22; // Column E (5th column) filling_datetime
//         worksheet.getColumn(6).width = 18; // Column F (6th column) dry_weight
//         worksheet.getColumn(7).width = 18; // Column G (7th column) filled_weight
//         worksheet.getColumn(8).width = 18; // Column H (8th column) jelly_roll_wt
//         worksheet.getColumn(9).width = 18; // Column I (9th column) jelly_roll_dia
//         worksheet.getColumn(10).width = 22; // Column J (4th column) filling_datetime

//         // Create filename with timestamp
//         const timestamp = new Date().toString().replace(/[:. ]/g, '-');
//         const fileName = `cell_data_${timestamp}.xlsx`;

//         const filePath = path.join(__dirname, fileName);
//         await workbook.xlsx.writeFile(filePath);
//         console.log(`Excel file saved as ${filePath}`);
//     }
// })();

// IIFE starts here

(async function exportTraceToExcel() {
    const trace = require('./battery.json').trace; // Replace with your actual trace JSON file

    const workbook = new ExcelJS.Workbook();

    // 1. Battery Info Sheet
    const batterySheet = workbook.addWorksheet('Battery Info');

    batterySheet.addRow(['Battery ID', 'Battery OCV', 'Manufactured Timestamp']);
    batterySheet.addRow([
        trace.battery_id,
        trace.battery_ocv,
        new Date(trace.manufactured_timestamp).toLocaleString(),
    ]);

    // 2. Cell Data Sheet
    const cellSheet = workbook.addWorksheet('Cell Data');
    const cellHeaders = Object.keys(trace.cell_data[0].data);
    cellSheet.addRow(cellHeaders);
    trace.cell_data.forEach((cell) => {
        cellSheet.addRow(Object.values(cell.data));
    });

    // 3. Anode Sheet
    const anodeSheet = workbook.addWorksheet('Anode Data');
    const cathodeSheet = workbook.addWorksheet('Cathode Data');
    const errorSheet = workbook.addWorksheet('Errors');

    // Headers (from first valid data found)
    let anodeHeadersSet = false;
    let cathodeHeadersSet = false;
    anodeSheet.addRow(['Cell ID', '...']);
    cathodeSheet.addRow(['Cell ID', '...']);
    errorSheet.addRow(['Cell ID', 'Error']);

    trace.cell_data.forEach((cell) => {
        cell.electrode_data.forEach((entry) => {
            if (entry.anode_data && typeof entry.anode_data === 'object') {
                if (!anodeHeadersSet) {
                    anodeSheet.getRow(1).values = ['Cell ID', ...Object.keys(entry.anode_data)];
                    anodeHeadersSet = true;
                }
                anodeSheet.addRow([cell.cell_id, ...Object.values(entry.anode_data)]);
            }

            if (entry.cathode_data && typeof entry.cathode_data === 'object') {
                if (!cathodeHeadersSet) {
                    cathodeSheet.getRow(1).values = ['Cell ID', ...Object.keys(entry.cathode_data)];
                    cathodeHeadersSet = true;
                }
                cathodeSheet.addRow([cell.cell_id, ...Object.values(entry.cathode_data)]);
            }

            if (entry.error || typeof entry.cathode_data === 'string') {
                errorSheet.addRow([cell.cell_id, entry.error || entry.cathode_data]);
            }
        });
    });

    // Save with timestamped name
    const fileName = `Battery_Trace_${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
    const filePath = path.join(__dirname, fileName);
    await workbook.xlsx.writeFile(filePath);

    console.log(`✅ Excel file '${fileName}' created successfully.`);
})();




