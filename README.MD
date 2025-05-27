# Godrej Traceability Dashboard – Backend

This is the backend service for the **Godrej Traceability Dashboard**, developed using **Node.js**, **Express**, and **MySQL**.

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

## 📁 Project Structure
``` bash
backend/
├── routes/ # Express routes (API endpoints)
├── middleware/
├── static/ # For static resources
├── controllers/ # Business logic
├── models/
├── config/
│       └── db.js # Database connection setup
├── utils/ # Utility functions (date time conversion etc.)
├── .env # Environment variables
├── package.json # Environment required modules info
└── index.js # Main entry point
```
---

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/godrej-traceability-dashboard.git
   cd godrej-traceability-dashboard/backend ```

2. **install dependencies**
    ```bash 
    npm install```

3. **Configure environment variables**

4. Create a .env file in the root of the backend directory.

  - **Example:-**

    . env
    ```bash
    Copy
    Edit
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=traceability_db
    DB_NAME=traceability_db
    AUTH_KEY=your_auth_key
    PORT=5000 ```

5. Start the server

    ```bash
    Copy
    Edit
    npm start
    ```

## 🧪 API Endpoints
User Management
POST /api/signup/add-user – Add new users with auth key validation

More routes for traceability (querying by Battery ID, Cell ID, etc.) coming soon...

## 🚀 Features
Secure user registration with access control

Structured database insertions

Error handling with detailed MySQL error responses

Designed to trace component relationships efficiently

## 📌 To-Do
Add authentication middleware

Create full traceability routes (Battery → Batch)

Build a REST API to expose the entire chain

Add testing and logging

## 🛠️ Author
Developed by the team at MICIPL , Pritesh Alshetty for internal traceability operations.