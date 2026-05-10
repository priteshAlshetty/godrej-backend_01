

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const responseTime = require('response-time');
const { swaggerUi, swaggerSpec } = require('./swagger');
const port = 5000;
const app = express();

// const corsOptions = {
//     origin: ['http://192.168.1.32:5173', 'http://192.168.1.48:5173', 'http://localhost:5173'], // must exactly match frontend origin
//     credentials: true, // allow cookies/auth headers
// };
// app.use(cors(corsOptions));
app.use(cors());

// Swagger page route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



const userRoutes = require('./routes/userRoutes');
const uploadXLSX = require('./routes/uploadXLSX');
const getTrace = require('./routes/getTraceRoute');
const getGraphs = require('./routes/getGraphRoutes');
const getDailyReports = require('./routes/excelReports');
const getMachineData = require('./routes/getMachineDataRoute');
const batteryCellIDs = require('./routes/batteryCell.route');
const mfmRoutes = require('./routes/mfmRoutes');
const homescreen = require('./routes/homeScreen.route');



const logger = require('./middleware/logger');
const db = require('./config/db');

// // Middleware
app.use(express.json());
app.use(logger);
app.use(cookieParser());
app.use(responseTime()); // for debugging response time

// Routes
app.use('/api', userRoutes);
app.use('/api', uploadXLSX);
app.use('/api', getTrace);
app.use('/api', getGraphs);
app.use('/api', getDailyReports);
app.use('/api', getMachineData);
app.use('/api', batteryCellIDs)
app.use('/api/mfm', mfmRoutes);
app.use('/api', homescreen);

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
