const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

const userRoutes = require ('./routes/userRoutes');
const uploadXLSX = require ('./routes/uploadXLSX');
const getTrace = require ('./routes/getTraceRoute');

const logger = require('./middleware/logger');
const db = require('./config/db');




// Middleware
app.use(express.json());
app.use(logger);
app.use(cookieParser());

// Routes
app.use('/api', userRoutes);
app.use('/api', uploadXLSX);
app.use('/api', getTrace);




// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
