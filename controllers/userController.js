const { findAll, findById } = require('../models/userModel');
const { formatToLocal } = require('../utils/formatTimeStamps');

async function getAllUsers(req, res) {
    try {
        const users = await findAll();
        
            users.forEach((item) => {
                item.created_at = formatToLocal(item.created_at);
            });
            return users;
        
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

async function getUserById(req, res) {
    try {
        const user = await findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllUsers, getUserById };
