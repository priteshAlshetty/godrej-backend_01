const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const ExcelJS = require('exceljs');
const { checkUserCred, verifyTokenCookies } = require('../controllers/authentication');
const { addDataToServer } = require('../controllers/addEOLdataToServer');

const router = express.Router();

//path to save files
const upload = multer({ dest: 'uploads/' });
const targetPath = path.join(__dirname, '../uploads/end_of_line.xlsx'); //
const folderPath = path.join(__dirname, '../uploads'); // replace with your folder path
// Adjust as needed

// router.use(verifyTokenCookies);

router.post('/upload/end-of-line', upload.single('end_of_line'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'no file found to upload!!', STATUS: false });
        } else if (path.extname(req.file.originalname) !== '.xlsx') {
            console.error('Failed to upload !! not a excel file ::' + req.file.originalname);
            return res.status(400).json({ error: 'not a excel file!!', STATUS: false });
        } else {
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(req.file.path);
            //delete old file and garbage cache
            // fs.readdir(folderPath, async (err, files) => {
            //     if (err) {
            //         return console.error('Failed to read directory at /api/uplod callback:', err);
            //     }

            //     files.forEach((file) => {
            //         const filePath = path.join(folderPath, file);

            //         fs.unlink(filePath, (err) => {
            //             if (err) {
            //                 console.error(`Failed to delete ${file}:`, err);
            //             } else {
            //                 console.log(`Deleted: ${file}`);
            //             }
            //         });
            //     });
            //     await workbook.xlsx.writeFile('uploads/end_of_line.xlsx');
            // });

            try {
                const files = await fs.readdir(folderPath);

                for (const file of files) {
                    const filePath = path.join(folderPath, file);
                    await fs.unlink(filePath);
                    console.log(`Deleted: ${file}`);
                }

                await workbook.xlsx.writeFile(path.join(folderPath, 'end_of_line.xlsx'));
                console.log('✅ New end_of_line.xlsx uploaded successfully.');

                return res
                    .status(200)
                    .json({ message: 'File uploaded successfully!', STATUS: true });
            } catch (err) {
                console.error('❌ Error while deleting files or writing Excel:', err);
                return res
                    .status(500)
                    .json({ error: 'Server error during file handling', STATUS: false });
            }
        }
    } catch (error) {
        console.log('error at /upload/end-of-line ::', error.message);
        res.status(500).json({
            errMsg: 'Server error during file handling',
            STATUS: false,
            error: error.message,
            errorStack: error.stack,
            location: 'Error at api request /api/upload/end-of-line  ==>try catch block  ',
        });
    }
});

router.post('/upload/add-excel-to-server', async (req, res) => {
    if (req.body.authKEY === 'AUTH1123') {
        const result = await addDataToServer();
        console.log('here-->' + result);
        if (result) {
            res.status(200).json({
                STATUS: true,
                message: 'Data added successfully to server',
            });
        } else {
            res.status(400).json({
                STATUS: false,
                message: 'Data NOT added successfully to server, Reupload file and try again!!',
            });
        }
    } else {
        res.status(500).json({
            STATUS: false,
            message: 'Wrong Authkey',
        });
    }
});

router.post('/upload/end-of-line/json-form', async (req, res) => {
    try {
        const obj = req.body.battery_obj || null;
        
        if (!obj) {
            return res.status(400).json({
                success: false,
                errMsg: 'missing required field :battery_obj ',
            });
        } else {
            console.log('------------------End Of line Json Form------------------------');
            console.log(obj);
            console.log('------------------End Of line Json Form------------------------');
            //TODO : write controller function call
            return res.status(200).json({
                success: true,
                msg: 'json loaded in database successfully!!',
            });
        }
    } catch (error) {
        console.log('error at /upload/end-of-line/json-form::', error.message);
        res.status(500).json({
            errMsg: 'Server error during Json handling',
            success: false,
            error: error.message,
            errorStack: error.stack,
            location:
                'Error at api request /api/upload/end-of-line/json-form  ==>try catch block  ',
        });
    }
});
module.exports = router;
