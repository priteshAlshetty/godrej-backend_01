const express = require('express');
const router = express.Router();

const { getTraceByBatteryId } = require('../controllers/getTrace');
const { checkUserCred, verifyTokenCookies } = require('../controllers/authentication');

router.use(verifyTokenCookies);

router.post('/trace/battery-id', async (req, res) => {
    // POST /api/trace/battery-id
    // Body { "battery__id": "BAT1233" }
    try {
        const battery_id = req.body.battery_id;
        if (!battery_id) {
            return res.status(400).json({ 
                success: false,
                error: 'Missing required fields: battery_id' });
        } else {
            const trace = await getTraceByBatteryId(battery_id);

            if (trace.SUCCESS) {
                
                res.status(200).json({
                    message: 'Trace retrieved successfully',
                    trace: trace,
                    success: true,
                });
            } else {
                res.status(400).json({
                    message: 'Trace not found',
                    success: false,
                    trace: trace,
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error on /api/trace/battery-id' ,
            success: false,
            errMsg: err.message,
            errStack: err.stack,
            errLocation: 'rootDirectory ==> routes/getTraceRoute.js at API call : /api/trace/battery-id'
        });   
    }
});
module.exports = router;
