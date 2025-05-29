

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const responseTime = require('response-time');
const { swaggerUi, swaggerSpec } = require('./swagger');
const port = 5000;
const app = express();



const corsOptions = {
    origin: ['http://192.168.1.32:5173', 'http://192.168.1.48:5173', 'http://localhost:5173'], // must exactly match frontend origin
    credentials: true, // allow cookies/auth headers
};

app.use(cors(corsOptions));


// Swagger page route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const userRoutes = require('./routes/userRoutes');
const uploadXLSX = require('./routes/uploadXLSX');
const getTrace = require('./routes/getTraceRoute');

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

// Public Routes
// app.get('/', (req, res) => {
//     res.send('Welcome to the Express MVC backend!');
// });

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
