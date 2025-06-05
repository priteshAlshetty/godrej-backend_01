const db = require('../config/db');
const excelJs = require('exceljs');
const path = require('path');
const fs = require('fs');

(async function getDailyReport(date = '2020-05-19') {
    try {
        const workbook = new excelJs.Workbook();
        const worksheet = workbook.addWorksheet('battery_report');

        // add battery report

        const [rows] = await db.query(
            'SELECT battery_id, battery_ocv, manufactured_timestamp FROM battery_main WHERE DATE(manufactured_timestamp) = ?',
            [date]
        );

        if (rows && rows.length > 0) {
            // console.log(rows);
            worksheet.columns = Object.keys(rows[0]).map((key) => ({
                header: key,
                key: key,
            }));

            rows.forEach((row) => {
                row.manufactured_timestamp = new Date(row.manufactured_timestamp).toLocaleString();
                worksheet.addRow(row);
            });

            worksheet.spliceRows(1, 0, ['BATTERY REPORT']);

            worksheet.getRow(2).eachCell((cell, colNumber) => {
                cell.font = {
                    bold: true,
                    size: 12,
                    name: 'Consolas',
                    color: {
                        argb: 'FF000000',
                    },
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

        worksheet.getColumn(1).width = 28;
        worksheet.getColumn(2).width = 18;
        worksheet.getColumn(3).width = 28;
        worksheet.getRow(1).height = 30;
        let dateCell = worksheet.getCell('C1');
        dateCell.value = 'DATE : ' + new Date().toLocaleString();

        // battery_cell_mapping

        const sql = ` SELECT bcm.*
        FROM battery_cell_mapping AS bcm
        JOIN battery_main AS bm ON bcm.battery_id = bm.battery_id
        WHERE DATE(bm.manufactured_timestamp) = ?;`;

        const [rows2] = await db.query(sql, [date]);

        const worksheet2 = workbook.addWorksheet('battery_cell_mapping');
        let cell_id_list = new Array();

        if (rows2 && rows2.length > 0) {
            worksheet2.columns = Object.keys(rows2[0]).map((key) => ({
                header: key,
                key: key,
            }));

            rows2.forEach((row) => {
                worksheet2.addRow(row);
                delete row.battery_id;
                let values = Object.values(row);
                cell_id_list.push(...values);
            });

            worksheet2.spliceRows(1, 0, ['BATTERY_CELL_MAPPING']);
            // console.log(cell_id_list);

            worksheet2.getRow(2).eachCell((cell, colNumber) => {
                cell.font = {
                    bold: true,
                    size: 12,
                    name: 'Consolas',
                    color: {
                        argb: 'FF000000',
                    },
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

        for (let i = 1; i < 11; i++) {
            worksheet2.getColumn(i).width = 20;
        }
        worksheet2.getRow(2).height = 30;
        dateCell = worksheet2.getCell('I1');
        dateCell.value = 'DATE : ' + new Date().toLocaleString();

        // cell main mapping
        const worksheet3 = workbook.addWorksheet('cell_main');

        // Set headers once using any sample row
        const [sampleRows] = await db.query('SELECT * FROM cell_main LIMIT 1');
        if (sampleRows.length > 0) {
            worksheet3.columns = Object.keys(sampleRows[0]).map((key) => ({
                header: key,
                key: key,
            }));
        }

        // Optional: insert a title row before headers
        worksheet3.spliceRows(1, 0, ['Cell Main Report']); // Row 1 = title
        worksheet3.getRow(1).height = 25; // optional formatting

        worksheet3.getRow(2).eachCell((cell, colNumber) => {
            cell.font = {
                bold: true,
                size: 12,
                name: 'Consolas',
                color: {
                    argb: 'FF000000',
                },
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

        // Row 2 = headers, data starts from Row 3

        for (let cell_id of cell_id_list) {
            const sql = 'SELECT * FROM cell_main WHERE cell_id = ?';
            const [cellRows] = await db.query(sql, [cell_id]);

            if (cellRows.length > 0) {
                cellRows.forEach((row) => {
                    // Convert timestamp to string if needed
                    row.filling_datetime = new Date(row.filling_datetime).toLocaleString();
                    row.testing_timestamp = new Date(row.testing_timestamp).toLocaleString();

                    worksheet3.addRow(row); // Auto-aligns using keys from worksheet.columns
                });
            }
        }

        for (let i = 1; i < 11; i++) {
            if(i===5 || i===10 || i===7){

                worksheet3.getColumn(i).width = 23;
            }else{
                worksheet3.getColumn(i).width = 14;
            }
        }

        dateCell = worksheet3.getCell('I1');
        dateCell.value = 'DATE : ' + new Date().toLocaleString();
        // Create filename with timestamp
        const timestamp = new Date().toString().replace(/[:. ]/g, '-');

        const fileName = `dailyReports/daily_report_${timestamp}.xlsx`;

        const filePath = path.join(__dirname, fileName);
        await workbook.xlsx.writeFile(filePath);

        console.log(`Excel file saved as ${filePath}`);
    } catch (error) {
        console.log(error);
        return {
            errMsg: 'error in controller getDailyReport(date)',
            error: error.message,
            error_stack: error.stack || null,
            SUCCESS: false,
            location:
                'root/controller/excelReports.js/--> getDailyReport(date) --> try-catch block',
        };
    }
})();
