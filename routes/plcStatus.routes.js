const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/plcstatus', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT srNo, name, ip, port, status,  DATE_FORMAT(logged_at, \'%Y-%m-%d %H:%i:%s\') AS timestamp FROM plc_status');
        res.status(200).json({ "plcData": rows });
    } catch (error) {
        console.error('Error fetching PLC status:', error);
        res.status(500).json({ error: 'Failed to fetch PLC status' });
    }
});

module.exports = router;