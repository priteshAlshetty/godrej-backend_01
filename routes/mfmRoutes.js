const express = require("express");
const router = express.Router();
const { getNames, getMFMData } = require("../controllers/ems_comtrollers/rawdata.controller.js");
const { getEnergyData } = require("../controllers/ems_comtrollers/energy.controller.js");

router.get("/meterNames", async (req, res) => {
    try {
        const result = await getNames();
        if (result && result.length > 0) {
            res.status(200).json({
                success: true,
                data: result
            })
        } else {
            res.status(400).json({
                success: false,
                errMsg: 'Data not found for the give path.',
                errLocation: 'At api call /ems/rawdata/meterNames => if-else block'
            })
        }
    } catch (err) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: err.message,
            stack: err.stack,
            location: 'At api call /ems/rawdata/meterNames => catch block'
        })
    }
})


router.get("/meterData", async (req, res) => {
    try {
        const meter_name = req.query.name;
        const date = req.query.date;
        const params = {
            meter_name,
            date
        }
        const result = await getMFMData(params);
        if (result) {

            res.status(200).json({
                success: true,
                data: result
            });
        } else {
            res.status(400).json({
                success: false,
                Msg: `Data not found for meter: ${params.meter_name} and date: ${params.date}.`,

            })
        }
    } catch (err) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: err.message,
            stack: err.stack,
            location: 'At api call /ems/rawdata/meterData => catch block'
        });
    }
});

router.get("/energyData", async (req, res) => {
    try {
        const meter_name = req.query.meterName;
        const from = req.query.from;
        const to = req.query.to;
        const params = {
            meter_name,
            from,
            to
        };
        const result = await getEnergyData(params);
        if (result) {
            res.status(200).json({
                success: true,
                data: result
            });
        } else {
            res.status(400).json({
                success: false,
                Msg: `Data not found for meter: ${params.meter_name} and date range: ${params.from} to ${params.to}.`
            });
        }
    } catch (err) {
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error: err.message,
            stack: err.stack,
            location: 'At api call /ems/rawdata/energyData => catch block'
        });
    }
});

module.exports = router;