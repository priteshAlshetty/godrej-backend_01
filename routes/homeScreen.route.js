const router = require("express").Router();
const homescreenController = require("../controllers/homescreen.controller.js");

router.get("/homescreen", async (req, res) => {
    try {
        const data = await homescreenController.getHomescreenData();
        if (data) {
            res.status(200).json({
                success: true,
                data: data
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No data found"
            });
        }
    } catch (error) {
        console.error("Error fetching overview data:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

module.exports = router;