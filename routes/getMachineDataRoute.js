const express = require('express');
const { getMachineData } = require('../controllers/getmachinewisedata.js');

const { getDatewiseBatchData, getDatewiseBatchCSV } = require('../controllers/csvExport.controller.js');


const router = express.Router();

router.post('/machinewisedata', async (req, res) => {

    let machineName = req.body.machineName;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;

    if (!machineName) {
        res.status(400).json({
            errMsg: 'Required missing field: machineName'
        })
    }
    if (!startDate) {
        res.status(400).json({
            errMsg: 'Required missing field: startDate'
        })
    }
    if (!endDate) {
        res.status(400).json({
            errMsg: 'Required missing field: endDate'
        })
    }

    try {
        const result = await getMachineData(machineName, startDate, endDate);

        if (result.status) {
            res.status(200).json({
                result,
                sccess: true

            })
        } else {
            res.status(400).json({
                success: false,
                errMsg: 'Data not found the the give data range or invalid input arguments.',
                errLocation: 'At api call /machinewisedata => if-else block'
            })
        }

    } catch (err) {

        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: err.message,
            stack: err.stack,
            location: 'At api call /machinewisedata => if-else block'
        })
    }
})
router.get('/getDatewiseBatchData', async (req, res) => {
    const params = {
        from: req.query.from,
        to: req.query.to
    };
    if (!params.from || !params.to) {
        return res.status(400).json({
            success: false,
            message: 'Missing required query parameters: from and to'
        });
    }
    try {
        const result = await getDatewiseBatchData(params);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }
        return res.status(200).json({
            success: true,
            data: result.data
        });

    } catch (error) {
        console.error("Error fetching datewise batch data:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });

    }
});
router.get('/getDatewiseBatchCSV', async (req, res) => {
    const params = {
        from: req.query.from,
        to: req.query.to
    };
    if (!params.from || !params.to) {
        return res.status(400).json({
            success: false,
            message: 'Missing required query parameters: from and to'
        });
    }
    try {
        const result = await getDatewiseBatchCSV(params);
        if (!result.success) {
            return res.status(404).json({
                success: false,
                message: result.message
            });
        }
        // Send the CSV file as a response
        return res.download(result.filePath, 'batch_data.csv', (err) => {
            if (err) {
                console.error("Error sending CSV file:", err);
                return res.status(500).json({
                    success: false,
                    message: 'Error sending CSV file'
                });
            }
        });
    } catch (error) {
        console.error("Error fetching datewise batch CSV data:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }


});

module.exports = router;