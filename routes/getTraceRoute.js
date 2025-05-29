const express = require('express');
const dayjs = require('dayjs')
const router = express.Router();

const {
    getTraceByBatteryId,
    getTraceByCellId,
    getDataBySingleBatchId,
    getTraceFromElectrodeId,
    getTraceByDate
} = require('../controllers/getTrace');
const { checkUserCred, verifyTokenCookies } = require('../controllers/authentication');
const { Ls } = require('dayjs');

// router.use(verifyTokenCookies);

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
        } else {
            const result = await getDataBySingleBatchId(batch_id);
            // const result = 5;
            if (result && result.SUCCESS) {
                res.status(200).json({
                    response: batch_id,
                    result,
                });
            } else {
                throw new Error('Trace not found for batch_id: ' + batch_id);
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

router.post('/trace/electrode-id', async(req,res) => {
    try{
        const electrode_id = req.body.electrode_id;
        if (!electrode_id){
            res.status(400).json({
                success:false,
                'errMsg': 'missing required field : electrode_id'
            })
        }else{
            const trace = await getTraceFromElectrodeId(electrode_id);
            if (trace && trace.SUCCESS){
                res.status(200).json({
                    success: true,
                    message: 'Trace retrieved successfully',
                    trace: trace,
                });
            }else{
                res.status(400).json({
                    message: 'Trace not found',
                    success: false,
                    result:
                        trace && Object.keys(trace).length > 0
                            ? trace
                            : `Trace not found for electrode_id: ${electrode_id}`,
                });
            }
        }

    }catch(error){

    }
})

router.post('/trace/date', async(req,res) =>{

    try{
        const date = req.body.date;
        if(!date){
            res.status(400).json({
                error: "missing required field: date"
            })
        }else{
            const dateFormatted = dayjs(date).format('YYYY-MM-DD');
            const list = await getTraceByDate(dateFormatted);
            if(list && list.SUCCESS){

                res.status(200).json({
                    success:true,
                    date,
                    trace:list.objectList
                })
            }else{
                res.status(404).json({
                    success:false,
                    date,
                    trace:list,
                    errMsg: 'empty or wrong list returned by controller getTraceByDate()'

                })
            }
        }
    }catch(error){
        res.status(500).json({
            errMsg : "Internal server error",
            success:false,
            error: error.message,
            error_stack: error.stack,
            location: "At api call /trace/date => try-catch block"
        })

    }
})
module.exports = router;
