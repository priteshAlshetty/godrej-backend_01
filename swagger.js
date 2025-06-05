const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Swagger options
const options = {
    definition: {
        openapi: '3.0.0', // OpenAPI version
        info: {
            title: 'My Express API', // API title
            version: '1.0.0', // API version
            description: `
    # API documentation for my Express app
            
## 💻 Godrej Traceability Dashboard – Backend

        # This is the backend service for the **Godrej Traceability Dashboard**, developed using **Node.js**, **Express**, and **MySQL**.

## 🔍 Objective

To enable full traceability of a product's lifecycle by mapping component relationships through unique identifiers. The trace flow is as follows:

Battery ID ➝ Cell ID ➝ Electrode ID ➝ Batch ID (Anode/Cathode)


This ensures detailed traceability from finished product to raw material sources.

---

## ⚙️ Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web server and routing
- **MySQL** – Relational database for storing traceability data

---

## 🛜 API Endpoints :
            `,
        },
    },
    // Path to the API docs (where you write JSDoc comments)
    apis: ['./routes/swagger-def.js'], // adjust path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec,
};
