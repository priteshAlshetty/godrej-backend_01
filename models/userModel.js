const db = require('../config/db');

async function findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

async function addUser(userObject) {
    try {
        const [rows] = await db.query('SELECT COUNT(*) as user_count FROM users');
        if (rows && rows[0].user_count < 10) {
            const sql = `INSERT INTO users
            (username, password, auth_level)
            VALUES (?, ?, ?)
            `;
            const values = [userObject.username, userObject.password, userObject.auth_level];

            const [result] = await db.query(sql, values);
            if (result.affectedRows === 1) {
                return {
                    SUCCESS: true,
                    insertedUser: userObject,
                };
            } else {
                return {
                    SUCCESS: false,
                    userObject,
                    errMsg: 'user not inserted in db',
                    result: result,
                };
        }
        } else {
            return {
                SUCCESS: false,
                userObject,
                errMsg: 'User count exceed than set Limit! delete old user to add new one!!',
            };
        }

    } catch (error) {
       // Optional: log or differentiate based on MySQL error codes
        console.error('MySQL Error in addUser():', error);

        // Example: specific handling for duplicate username
        if (error.code === 'ER_DUP_ENTRY') {
            return {
                SUCCESS: false,
                userObject,
                errMsg: 'Username already exists. Duplicate entry.',
                sqlError: {
                    code: error.code,
                    message: error.message,
                },
            };
            }

        // Generic SQL error
        return {
            SUCCESS: false,
            userObject,
            errMsg: 'Database error occurred.',
            sqlError: {
                code: error.code || 'UNKNOWN',
                message: error.message,
            },
            };
        }
    }
    


module.exports = { findAll, findById, addUser };
