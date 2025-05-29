//api/test-db-conn:
/**
 * @swagger
 * /test-db-conn:
 *   get:
 *     summary: Test database connection
 *     tags:  [Check Health]
 *     description: Checks if the database connection is alive and returns status.
 *     responses:
 *       200:
 *         description: Connection successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 STATUS:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Connection failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 STATUS:
 *                   type: boolean
 *                   example: false
 */

// api/get-all-user-list:
/**
 * @swagger
 * /get-all-user-list:
 *   post:
 *     summary: Get list of all users
 *     tags : [Users]
 *     description: Returns the list of all users if valid auth_key is provided.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auth_key:
 *                 type: string
 *                 example: your_auth_key_here
 *     responses:
 *       201:
 *         description: User list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userList:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: User object
 *       500:
 *         description: Error or invalid auth key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errMsg:
 *                   type: string
 *                   example: Wrong auth key!
 */

// api/signup/add-user:
/**
 * @swagger
 * /signup/add-user:
 *   post:
 *     summary: Add a new user (sign up)
 *     tags : [Users]
 *     description: Creates a new user with username, password and auth_level if auth_key is valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auth_key:
 *                 type: string
 *                 example: your_auth_key_here
 *               userObject:
 *                 type: object
 *                 required:
 *                   - username
 *                   - password
 *                   - auth_level
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: johndoe
 *                   password:
 *                     type: string
 *                     example: mysecurepassword
 *                   auth_level:
 *                     type: integer
 *                     example: 1
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 result:
 *                   type: object
 *                   description: Result object from DB insertion
 *       400:
 *         description: Bad request or duplicate user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errMsg:
 *                   type: string
 *                   example: "User already exists"
 *                 sqlError:
 *                   type: string
 *                   nullable: true
 *       500:
 *         description: Internal server error or invalid auth key
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errMsg:
 *                   type: string
 *                   example: internal server error
 *                 errorMessage:
 *                   type: string
 *                   example:" Wrong auth key: abc123"
 *                 errorStack:
 *                   type: string
 *                   nullable: true
 *                 location:
 *                   type: string
 *                   example: Error at api request /api/signup/add-user  ==>y catch block
 */

// api/upload/end-of-line:
/**
 * @swagger
 * /upload/end-of-line:
 *   post:
 *     summary: Upload an Excel file for end-of-line processing
 *     tags : [Uploads]
 *     description: Uploads a single `.xlsx` Excel file, deletes old files in the folder, and saves the new file.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               end_of_line:
 *                 type: string
 *                 format: binary
 *                 description: The Excel file to upload (.xlsx only)
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully!
 *                 STATUS:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (no file or wrong file type)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: no file found to upload!!
 *                 STATUS:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Server error during file handling
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error during file handling
 *                 STATUS:
 *                   type: boolean
 *                   example: false
 */

// api/add_excel_to_server:
/**
 * @swagger
 * /add-excel-to-server:
 *   post:
 *     summary: Process and add uploaded Excel data to the server
 *     tags : [Uploads]
 *     description: Runs a server-side function to add data if the correct auth key is provided.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authKEY:
 *                 type: string
 *                 example: AUTH1123
 *     responses:
 *       200:
 *         description: Data added successfully to the server
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 STATUS:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Data added successfully to server
 *       400:
 *         description: Data not added, e.g., failed process
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 STATUS:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Data NOT added successfully to server, Reupload file and try again!!
 *       500:
 *         description: Wrong auth key or server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 STATUS:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Wrong Authkey
 */

// api/trace/battery-id:
/**
 * @swagger
 * /trace/battery-id:
 *   post:
 *     summary: Get trace data by battery ID
 *     tags : [Trace]
 *     description: Retrieves trace information for a specific battery ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               battery_id:
 *                 type: string
 *                 example: BAT1233
 *             required:
 *               - battery_id
 *     responses:
 *       200:
 *         description: Trace retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trace retrieved successfully
 *                 trace:
 *                   type: object
 *                   description: Trace data object
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing battery_id or trace not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trace not found
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 result:
 *                   oneOf:
 *                     - type: object
 *                     - type: string
 *                       example:" Trace not found for battery_id: BAT1233"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error on /api/trace/battery-id
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errMsg:
 *                   type: string
 *                 errStack:
 *                   type: string
 *                   nullable: true
 *                 errLocation:
 *                   type: string
 */

// api/trace/cell-id:
/**
 * @swagger
 * /trace/cell-id:
 *   post:
 *     summary: Get trace data by cell ID
 *     tags : [Trace]
 *     description: Retrieves trace information for a specific cell ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cell_id:
 *                 type: string
 *                 example: ACELL0103
 *             required:
 *               - cell_id
 *     responses:
 *       200:
 *         description: Trace retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Trace retrieved successfully
 *                 trace:
 *                   type: object
 *                   description: Trace data object
 *       400:
 *         description: Missing cell_id or trace not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trace not found
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 result:
 *                   oneOf:
 *                     - type: object
 *                     - type: string
 *                       example: "Trace not found for cell_id: ACELL0103"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error on /api/trace/cell-id
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errMsg:
 *                   type: string
 *                 errStack:
 *                   type: string
 *                   nullable: true
 *                 errLocation:
 *                   type: string
 */

// api/trace/batch-id:
/**
 * @swagger
 * /trace/batch-id:
 *   post:
 *     summary: Get data by batch ID
 *     tags : [Trace]
 *     description: Retrieves batch data trace information for a specific batch ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               batch_id:
 *                 type: string
 *                 example: BATCH2024
 *             required:
 *               - batch_id
 *     responses:
 *       200:
 *         description: Batch trace retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: BATCH2024
 *                 result:
 *                   type: object
 *                   description: Batch trace result object
 *       400:
 *         description: Missing batch_id or trace not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: batch_id"
 *       500:
 *         description: Internal server error or trace not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error on /api/trace/batch-id
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errMsg:
 *                   type: string
 *                 errStack:
 *                   type: string
 *                   nullable: true
 *                 errLocation:
 *                   type: string
 */

// api/trace/electrode-id:
/**
 * @swagger
 * /trace/electrode-id:
 *   post:
 *     summary: Get trace data by electrode ID
 *     tags : [Trace]
 *     description: Retrieves trace information for a specific electrode ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               electrode_id:
 *                 type: string
 *                 example: ELEC-5678
 *             required:
 *               - electrode_id
 *     responses:
 *       200:
 *         description: Trace retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Trace retrieved successfully
 *                 trace:
 *                   type: object
 *       400:
 *         description: Missing electrode_id or trace not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Trace not found
 *                 result:
 *                   oneOf:
 *                     - type: object
 *                     - type: string
 *                       example: "Trace not found for electrode_id: ELEC-5678"
 */

// api/trace/date:
/**
 * @swagger
 * /trace/date:
 *   post:
 *     summary: Get trace list by date
 *     tags : [Trace]
 *     description: Retrieves a list of trace entries for a specific date.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2024-05-28
 *             required:
 *               - date
 *     responses:
 *       200:
 *         description: Trace list retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 date:
 *                   type: string
 *                   example: 2024-05-28
 *                 trace:
 *                   type: array
 *                   items:
 *                     type: object
 *                   description: Array of trace records
 *       404:
 *         description: Trace not found or list is empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 date:
 *                   type: string
 *                   example: 2024-05-28
 *                 trace:
 *                   type: object
 *                 errMsg:
 *                   type: string
 *                   example: empty or wrong list returned by controller getTraceByDate()
 *       500:
 *         description: Internal server error during date trace fetch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errMsg:
 *                   type: string
 *                   example: Internal server error
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                 error_stack:
 *                   type: string
 *                 location:
 *                   type: string
 *                   example: At api call /trace/date => try-catch block
 */
