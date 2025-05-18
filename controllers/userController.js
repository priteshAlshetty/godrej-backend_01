const userModel = require('../models/userModel');

async function getAllUsers(req, res) {
    try {
        const users = await userModel.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getUserById(req, res) {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllUsers, getUserById };
