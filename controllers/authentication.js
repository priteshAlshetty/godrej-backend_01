const db = require('../config/db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mytestsecret123';
async function checkUserCred(user, password) {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ? ', [user]);
    let result;
    if (!rows || rows.length === 0) {
        // No user found — send error in login - no user found
        result = {
            STATUS: false,
            MESSAGE: 'no user found',
            DATA: null,
        };
    } else if (rows[0].password !== password) {
        result = {
            STATUS: false,
            MESSAGE: `Invalid password for user: ${user}`,
            DATA: null,
        };
    } else {
        rows[0].password = "*******";
        result = {
            STATUS: true,
            MESSAGE: 'User found',
            DATA: rows,
            TOKEN: jwt.sign({ username: user, password: password }, SECRET_KEY, { expiresIn: '1h' })
        };
    }
    // console.log(result);
    return result;
}

function verifyTokenCookies(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {
    checkUserCred,
    verifyTokenCookies,
};