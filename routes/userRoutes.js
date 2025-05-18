const express = require('express');
const router = express.Router();
const { checkUserCred, verifyTokenCookies } = require('../controllers/authentication');
const { testDBConnection } = require('../controllers/checkDBconn'); // if used


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await checkUserCred(username, password);
    
    if (!result.STATUS) {
        return res.status(401).json({ success: result.STATUS, result });
    }
    
    const token = result.TOKEN;
    
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600000,
    });
    
    res.cookie('username', username, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600000,
    });
    
    res.status(200).json({ success: result.STATUS, result, message: 'Logged in, cookie set!' });
});


// Public Routes
router.get('/', (req, res) => {
    res.send('Welcome to the Express MVC backend!');
});


// Protected Routes  
router.use(verifyTokenCookies);
router.get('/profile', (req, res) => {
    res.json({ message: 'Protected route', userId: req.user.userId });
});

router.get('/settings', (req, res) => {
    res.json({ message: 'Settings data for user', userId: req.user.userId });
});

// Test DB connection
router.get('/test-db-conn', async (req, res) => {
    const result = await testDBConnection();
    if (result.STATUS) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
});



module.exports = router;
