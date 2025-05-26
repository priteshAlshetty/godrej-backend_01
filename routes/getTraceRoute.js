const express = require('express');
const router = express.Router();

const {
    getTraceByBatteryId,
    getTraceByCellId,
    getDataBySingleBatchId,
} = require('../controllers/getTrace');
const { checkUserCred, verifyTokenCookies } = require('../controllers/authentication');
const { Ls } = require('dayjs');

router.use(verifyTokenCookies);

router.post('/trace/battery-id', async (req, res) => {
    // POST /api/trace/battery-id
    // Body { "battery_id": "BAT1233" }
    try {
        const battery_id = req.body.battery_id;
        if (!battery_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: battery_id',
            });
        } else {
            const trace = await getTraceByBatteryId(battery_id);

            if (trace && trace.SUCCESS) {
                res.status(200).json({
                    message: 'Trace retrieved successfully',
                    trace: trace,
                    success: true,
                });
            } else {
                res.status(400).json({
                    message: 'Trace not found',
                    success: false,
                    result:
                        trace && Object.keys(trace).length > 0
                            ? trace
                            : `Trace not found for battery_id: ${battery_id}`,
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error on /api/trace/battery-id',
            success: false,
            errMsg: error.message,
            errStack: error.stack,
            errLocation:
                'rootDirectory ==> routes/getTraceRoute.js at API call : /api/trace/battery-id',
        });
    }
});

router.post('/trace/cell-id', async (req, res) => {
    /**
     * POST /api/trace/cell-id
     * BODY  { "cell_id"  : "ACELL0103"}
     *
     */
    try {
        const cell_id = req.body.cell_id;
        if (!cell_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: cell_id',
            });
        } else {
            const trace = await getTraceByCellId(cell_id);

            if (trace && trace.SUCCESS) {
                res.status(200).json({
                    success: true,
                    message: 'Trace retrieved successfully',
                    trace: trace,
                });
            } else {
                res.status(400).json({
                    message: 'Trace not found',
                    success: false,
                    result:
                        trace && Object.keys(trace).length > 0
                            ? trace
                            : `Trace not found for cell_id: ${cell_id}`,
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error on /api/trace/cell-id',
            success: false,
            errMsg: error.message,
            errStack: error.stack,
            errLocation:
                'rootDirectory ==> routes/getTraceRoute.js at API call : /api/trace/cell-id',
        });
    }
});

router.post('/trace/batch-id', async (req, res) => {
    try {
        const batch_id = req.body.batch_id;
        if (!batch_id) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: batch_id',
            });
        }else{

            const result = await getDataBySingleBatchId(batch_id);
            // const result = 5;
            if (result && result.SUCCESS ){
                res.status(200).json({
                    response: batch_id,
                    result,
                });
            }else{
                throw new Error('Trace not found for batch_id: '+ batch_id);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Internal server error on /api/trace/batch-id',
            success: false,
            errMsg: error.message,
            errStack: error.stack,
            errLocation:
                'rootDirectory ==> routes/getTraceRoute.js at API call : /api/trace/batch-id',
        });
    }
});
module.exports = router;