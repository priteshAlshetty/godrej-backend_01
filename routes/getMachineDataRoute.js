const express = require('express');
const { getMachineData } = require('../controllers/getmachinewisedata.js');

const router = express.Router();

router.post('/machinewisedata', async (req, res) => {

    let machineName = req.body.machineName;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    
    if(!machineName){
        res.status(400).json({
            errMsg: 'Required missing field: machineName'
        })
    }
    if(!startDate){
        res.status(400).json({
            errMsg: 'Required missing field: startDate'
        })
    }
    if(!endDate){
        res.status(400).json({
            errMsg: 'Required missing field: endDate'
        })
    }

    try{
        const result = await getMachineData(machineName, startDate, endDate);

        if(result.status){
            res.status(200).json({
                result,
                sccess: true

            })
        } else{
            res.status(400).json({
                success: false,
                errMsg: 'Data not found the the give data range or invalid input arguments.',
                errLocation: 'At api call /machinewisedata => if-else block'
            })
        }

    } catch(err){
        
        res.status(500).json({
            errMsg: 'Internal server error',
            success: false,
            error:  err.message,
            stack: err.stack,
            location: 'At api call /machinewisedata => if-else block'
        })
    }
})

module.exports = router;