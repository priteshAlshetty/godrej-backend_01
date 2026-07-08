const express = require("express");
const router = express.Router();
const { getBatteryIDs, getCellIDs, getBatchId } = require("../controllers/getCellBatteryIDs.js");

router.get("/batteryIds", async (req, res) => {
    try {
        const result = await getBatteryIDs();

        if (result.DBStatus && result.Data.length > 0) {

            res.status(200).json({ result });

        } else {
            res.status(400).json({
                success: false,
                errMsg: 'Data not found for the give path.',
                errLocation: 'At api call /batterCell.router => if-else block'
            })
        }
    } catch (err) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: err.message,
            stack: err.stack,
            location: 'At api call /batterCell.router => if-else block'
        })
    }
})


router.get("/cellIds", async (req, res) => {
    try {
        const result = await getCellIDs();

        if (result.DBStatus && result.Data.length > 0) {

            res.status(200).json({ result });

        } else {
            res.status(400).json({
                success: false,
                errMsg: 'Data not found for the give path.',
                errLocation: 'At api call /batterCell.router => if-else block'
            })
        }
    } catch (err) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: err.message,
            stack: err.stack,
            location: 'At api call /batterCell.router => if-else block'
        })
    }
})

router.get("/batchIds", async (req, res) => {
    try {
        const result = await getBatchId();
        if (result.DBStatus && result.Data.length > 0) {
            res.status(200).json({ result });
        } else {
            res.status(400).json({
                success: false,
                errMsg: 'Data not found for the give path.',
                errLocation: 'At api call /batterCell.router => if-else block'
            })
        }
    } catch (err) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: err.message,
            stack: err.stack,
            location: 'At api call /batterCell.router => if-else block'
        })
    }
})


module.exports = router;