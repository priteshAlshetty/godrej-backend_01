const express = require('express');
const { setPath, getPath } = require('../config/reportPath');
const { exportDailyReport } = require('../controllers/exportDailyReport');
const { getMachineData } = require('../controllers/csvExport.controller');
const router = express.Router();
const fs = require('fs');



router.post('/download/generate-daily-report', async (req, res) => {
    try {
        const date = req.body.date;
        if (!date) {
            return res.status(400).json({
                success: true,
                errMsg: 'missing required field : date',
            });
        }
        const result = await exportDailyReport(date);
        if (result.SUCCESS) {
            setPath(result.filePath || null);
            console.log(result.filePath)
            res.status(200).json({
                success: true,
                message: 'Daily report exported successfully',
                filePath: result.filePath,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Failed to export daily report',
                errMsg: result.errMsg,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            errMsg: 'Internal server error',
            error: error.message,
            error_stack: error.stack,
            location: 'At api call /export-daily-report => try-catch block',
        });
    }
});

router.get('/download/downloadReport', async (req, res) => {
    try {
        const filePath = getPath();
        if (!filePath) {
            return res.status(404).json({
                errMsg: 'File not found',
            });
        } else {
            res.download(filePath, 'report.xlsx', (err) => {
                if (!err) {
                    fs.unlinkSync(filePath);
                } else {
                    console.log("***while deleting report file: " + err);
                }
            });

        }
    } catch (error) {
        res.status(500).json({
            success: false,
            errMsg: 'Internal server error',
            error: error.message,
            error_stack: error.stack,
            location: 'At api call /download/downloadReport => try-catch block',
        });
    }
});

router.get('/download/csv', async (req, res) => {
    try {
        const table_name = req.query.tableName;
        const from = req.query.from;
        const to = req.query.to;
        const filePath = await getMachineData({ table_name, from, to });

        if (!table_name || !from || !to) {
            return res.status(400).json({
                success: false,
                errMsg: 'Missing required query parameters: tableName, from, to',
            });
        }

        if (filePath) {
            res.download(filePath, 'machine_data.csv', (err) => {
                if (!err) {
                    fs.unlinkSync(filePath);
                } else {
                    console.log("***while deleting machine data file: " + err);
                }
            });
        } else {
            res.status(404).json({
                errMsg: 'File not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            errMsg: 'Internal server error',
            error: error.message,
            error_stack: error.stack,
            location: 'At api call /download/csv => try-catch block',
        });
    }
});

module.exports = router;
