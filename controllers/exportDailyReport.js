const db = require('../config/db');
const excelJs = require('exceljs');
const path = require('path');
const fs = require('fs');



//helper function no need to export
function applyHeaderStyle(row) {
    row.eachCell((cell) => {
        cell.font = {
            bold: true,
            size: 12,
            name: 'Consolas',
            color: { argb: 'FF000000' },
        };
        cell.alignment = {
            vertical: 'middle',
            horizontal: 'center',
            wrapText: true,
        };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFDAEEF3' },
        };
    });
}

async function exportDailyReport(date) {
    try {
        const reportsDir = path.join(__dirname, '../dailyReports');
        if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir);

        const workbook = new excelJs.Workbook();

        // -------------------- BATTERY REPORT --------------------
        const worksheet = workbook.addWorksheet('battery_report');
        const [batteryRows] = await db.query(
            'SELECT battery_id, battery_ocv, manufactured_timestamp FROM battery_main WHERE DATE(manufactured_timestamp) = ?',
            [date]
        );

        if (batteryRows.length > 0) {
            worksheet.columns = Object.keys(batteryRows[0]).map((key) => ({ header: key, key }));
            batteryRows.forEach(row => {
                row.manufactured_timestamp = new Date(row.manufactured_timestamp).toLocaleString();
                worksheet.addRow(row);
            });
            worksheet.spliceRows(1, 0, ['BATTERY REPORT']);
            applyHeaderStyle(worksheet.getRow(2));
        }

        worksheet.getColumn(1).width = 28;
        worksheet.getColumn(2).width = 18;
        worksheet.getColumn(3).width = 28;
        worksheet.getRow(1).height = 30;
        worksheet.getCell('C1').value = 'DATE : ' + new Date().toLocaleString();

        // -------------------- BATTERY-CELL MAPPING --------------------
        const sql2 = `SELECT bcm.* FROM battery_cell_mapping AS bcm JOIN battery_main AS bm ON bcm.battery_id = bm.battery_id WHERE DATE(bm.manufactured_timestamp) = ?`;
        const [mappingRows] = await db.query(sql2, [date]);

        const worksheet2 = workbook.addWorksheet('battery_cell_mapping');
        const cell_id_list = [];

        if (mappingRows.length > 0) {
            worksheet2.columns = Object.keys(mappingRows[0]).map(key => ({ header: key, key }));

            mappingRows.forEach(row => {
                worksheet2.addRow(row);
                delete row.battery_id;
                cell_id_list.push(...Object.values(row));
            });

            worksheet2.spliceRows(1, 0, ['BATTERY_CELL_MAPPING']);
            applyHeaderStyle(worksheet2.getRow(2));
        }

        for (let i = 1; i <= 10; i++) worksheet2.getColumn(i).width = 20;
        worksheet2.getRow(2).height = 30;
        worksheet2.getCell('I1').value = 'DATE : ' + new Date().toLocaleString();

        // -------------------- CELL MAIN --------------------
        const worksheet3 = workbook.addWorksheet('cell_main');
        const [sampleRows] = await db.query('SELECT * FROM cell_main LIMIT 1');

        if (sampleRows.length > 0) {
            worksheet3.columns = Object.keys(sampleRows[0]).map((key) => ({ header: key, key }));
        }

        worksheet3.spliceRows(1, 0, ['CELL MAIN REPORT']);
        worksheet3.getRow(1).height = 25;
        applyHeaderStyle(worksheet3.getRow(2));

        for (const cell_id of cell_id_list) {
            const [cellRows] = await db.query('SELECT * FROM cell_main WHERE cell_id = ?', [cell_id]);

            cellRows.forEach(row => {
                row.filling_datetime = new Date(row.filling_datetime).toLocaleString();
                row.testing_timestamp = new Date(row.testing_timestamp).toLocaleString();
                worksheet3.addRow(row);
            });
        }

        for (let i = 1; i <= 10; i++) {
            worksheet3.getColumn(i).width = [5, 10, 7].includes(i) ? 23 : 14;
        }

        worksheet3.getCell('I1').value = 'DATE : ' + new Date().toLocaleString();

        // Save Excel
        const timestamp = new Date().toString().replace(/[:. ]/g, '-');
        const fileName = `../dailyReports/daily_report_${timestamp}.xlsx`;
        const filePath = path.join(__dirname, fileName);
        await workbook.xlsx.writeFile(filePath);

        return {
            SUCCESS: true,
            filePath,
        };

    } catch (error) {
        console.error('Export Daily Report Error:', error);
        return {
            SUCCESS: false,
            error: error.message,
            stack: error.stack,
            location: 'controller/exportDailyReport'
        };
    }
}

module.exports = { exportDailyReport };
