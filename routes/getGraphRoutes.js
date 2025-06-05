const express = require('express');
const { getGraphByBatteryId, getGraphByTestingDate,
    getGraphByFillingDate } = require('../controllers/getGraphsData');

const router = express.Router();

router.post('/graph/cell-params/by-battery-id', async (req, res) => {
    try {
        const battery_id = req.body.battery_id;
        if (!battery_id) {
            res.status(400).json({
                errMsg:'Missing required field : Battery_id'
            })
            
            }else{
                const graphData = await getGraphByBatteryId(battery_id);
                if (graphData && graphData.SUCCESS){
                    res.status(200).json({
                    graphData,
                    success:true
            });
                }else{
                    res.status(400).json({
                    success:false,
                    errMsg:'graphData not found or empty',
                    location: 'At api call /graph/cell-params/by-battery-id => if-else block'

                    });    
                }
            }

    } catch (error) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: error.message,
            error_stack: error.stack,
            location: 'At api call /graph/cell-params/by-battery-id => try-catch block',
        });
    }
});

router.post('/graph/cell-params/by-testing-timestamp', async (req, res) => {
    try {
        const from = req.body.From;
        const to = req.body.To;
        if (!from || !to) {
            res.status(400).json({
                errMsg:'Missing required field : From and To'
            })
            
            }else{
                const graphData = await getGraphByTestingDate(from, to);
                if (graphData && graphData.SUCCESS){
                    res.status(200).json({
                    graphData,
                    success:true
            });
                }else{
                    res.status(400).json({
                    success:false,
                    errMsg:'graphData not found or empty',
                    location: 'At api call /graph/cell-params/by-testing-timestamp => if-else block'

                    });    
                }
            }

    } catch (error) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: error.message,
            error_stack: error.stack,
            location: 'At api call /graph/cell-params/by-testing-timestamp  => try-catch block',
        });
    }
});

router.post('/graph/cell-params/by-filling-timestamp', async (req, res) => {
    try {
        const from = req.body.From;
        const to = req.body.To;
        if (!from || !to) {
            res.status(400).json({
                errMsg:'Missing required field : From and To'
            })
            
            }else{
                const graphData = await getGraphByFillingDate(from, to);
                if (graphData && graphData.SUCCESS){
                    res.status(200).json({
                    graphData,
                    success:true
            });
                }else{
                    res.status(400).json({
                    success:false,
                    errMsg:'graphData not found or empty',
                    location: 'At api call /graph/cell-params/by-filling-timestamp => if-else block'

                    });    
                }
            }

    } catch (error) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: error.message,
            error_stack: error.stack,
            location: 'At api call /graph/cell-params/by-filling-timestamp  => try-catch block',
        });
    }
});


module.exports = router;
