const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

const userRoutes = require ('./routes/userRoutes');
// const userController = require('./controllers/userController')
// const {checkUserCred, verifyTokenCookies} = require('./controllers/authentication');
// const testDBConnection = require('./controllers/checkDBconn');
const logger = require('./middleware/logger');
const db = require('./config/db');




// Middleware
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);


// // using cookie
// app.post('/login', async (req, res) => {
//     let { username, password } = req.body;
//     // validate credentials (simplified)
//     const result = await checkUserCred(user = username, password = password);
//     if (!result.STATUS){
//         res.status(401).json({ success: result.STATUS, result: result });
//     }else{
//         const token = result.TOKEN;
//          // Set cookie - httpOnly means JS cannot access it (more secure)
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: false, // true in production (requires HTTPS)
//             sameSite: 'lax', // prevents CSRF in some cases
//             maxAge: 3600000, // 1 hour
//         });
//         res.cookie('username', username, {
//             httpOnly: true,
//             secure: false, // true in production (requires HTTPS)
//             sameSite: 'lax', // prevents CSRF in some cases
//             maxAge: 3600000, // 1 hour
//         });
//         res.status(200).json({ success: result.STATUS, result: result , message: 'Logged in, cookie set!'});
//         }
//     });



// // Test route
// app.get('/', (req, res) => {
//     res.send('Welcome to the Express MVC backend!');
// });


// app.use(verifyTokenCookies);
// //protected routes
// app.get('/profile', (req, res) => {
//     res.json({ message: 'Protected route', userId: req.user.userId });
// });

// app.get('/settings', (req, res) => {
//     res.json({ message: 'Settings data for user', userId: req.user.userId });
// });
// // check DB connection
// app.get('/api/test-db-conn', async (req, res) => {
//     const result = await testDBConnection();
//     if (result.STATUS){
//         res.status(200).json(result);
//     }else{
//         res.status(500).json(result);
//     }
// });

// authenticate user function
// app.get('/auth', async (req, res) => {

//     const result = await checkUserCred(user = "john", password = "mypasnnsword");
//     if (!result.STATUS){
//         res.status(401).json({ success: result.STATUS, result: result });
//     }else{
//         res.status(200).json({ success: result.STATUS, result: result });
//     }
// })
// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
