const express = require('express');
const router = express.Router();
const { checkUserCred, verifyTokenCookies } = require('../controllers/authentication');
const { testDBConnection } = require('../controllers/checkDBconn'); // if used
const { getAllUsers, getUserById } = require('../controllers/userController');
const { addUser } = require('../models/userModel');
const AUTH_KEY = 1232;

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

router.post('/get-all-user-list', async (req, res) => {
    const authKey = req.body.auth_key;
    try {
        if (authKey && authKey === AUTH_KEY) {
            const userList = await getAllUsers();
            if (userList) {
                res.status(201).json({
                    success: true,
                    userList,
                });
            } else {
                throw new Error('User list is empty!!');
            }
        } else {
            throw new Error('Wrong auth key!');
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            errMsg: error.message,
        });
    }
});

router.post('/signup/add-user', async (req, res) => {
    const authKey = req.body.auth_key;
    const userObject = req.body.userObject;

    try {
        if (authKey && authKey === AUTH_KEY) {
            if (
                userObject &&
                userObject !== null &&
                userObject.username &&
                userObject.username !== null &&
                userObject.password &&
                userObject.password !== null &&
                userObject.auth_level &&
                userObject.auth_level !== null
            ) {
                const result = await addUser(userObject);
                // const result = { SUCCESS : true}
                if (result && result.SUCCESS) {
                    res.status(200).json({
                        success: true,
                        result,
                    });
                } else {
                    res.status(400).json({
                        // or 409 if duplicate
                        success: false,
                        errMsg: result.errMsg || "UNKNOWN" ,
                        sqlError: result.sqlError || null,
                    });
                }
            } else {
                throw new Error('missing required prameters :' + JSON.stringify(userObject));
            }
        } else {
            throw new Error('Wrong auth key: ' + authKey);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            errMsg: 'internal server error',
            errorMessage: error.message, // ✅ this is the part that reaches Postman
            errorStack: error.stack, // ✅ optional for debugging
            location: 'Error at api request /api/signup/add-user  ==>y catch block',
        });
    }
});

module.exports = router;
