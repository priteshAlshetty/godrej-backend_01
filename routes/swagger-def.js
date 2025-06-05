//api/test-db-conn:
/**
 * @swagger
 * /api/test-db-conn:
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
 * /api/get-all-user-list:
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
 * /api/signup/add-user:
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
 * /api/upload/end-of-line:
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

// api/upload/add_excel_to_server:
/**
 * @swagger
 * api/upload/add-excel-to-server:
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

// api/upload/json-form
/**
 * @swagger
 * /upload/end-of-line/json-form:
 *   post:
 *     summary: Upload end-of-line battery JSON data
 *     description: Accepts and stores battery-related data from the end-of-line testing station. The input should be a structured JSON object under the key `battery_obj`.
 *     tags:
 *       - Uploads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - battery_obj
 *             properties:
 *               battery_obj:
 *                 type: object
 *                 description: JSON object containing battery data from end-of-line station
 *                 example:
 *                   battery_id: "BAT123456"
 *                   cell_ids: ["CELL1", "CELL2", "CELL3"]
 *                   tested_on: "2025-06-03T12:00:00Z"
 *                   tester_id: "EOL-UNIT-01"
 *                   remarks: "Passed all tests"
 *     responses:
 *       200:
 *         description: JSON processed and stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 msg:
 *                   type: string
 *                   example: "json loaded in database successfully!!"
 *       400:
 *         description: Required `battery_obj` field is missing
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
 *                   example: "missing required field :battery_obj"
 *       500:
 *         description: Server error during JSON processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 STATUS:
 *                   type: boolean
 *                   example: false
 *                 errMsg:
 *                   type: string
 *                   example: "Server error during Json handling"
 *                 error:
 *                   type: string
 *                 errorStack:
 *                   type: string
 *                 location:
 *                   type: string
 *                   example: "Error at api request /api/upload/end-of-line/json-form  ==>try catch block"
 */



// api/trace/battery-id:
/**
 * @swagger
 * /api/trace/battery-id:
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
 * /api/trace/cell-id:
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
 * /api/trace/batch-id:
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
 * /api/trace/electrode-id:
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
 * /api/trace/date:
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

// api/graph/cell-params/by-battery-id:
/**
 * @swagger
 * /graph/cell-params/by-battery-id:
 *   post:
 *     summary: Retrieve cell parameters for a battery by battery ID
 *     description: Fetches cell-level parameter data (OCV, IR, HRD, etc.) mapped to a specific battery ID for use in graph visualizations.
 *     tags:
 *       - Graph Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - battery_id
 *             properties:
 *               battery_id:
 *                 type: string
 *                 description: Unique identifier of the battery
 *                 example: "BATT1234"
 *     responses:
 *       200:
 *         description: Successfully retrieved graph data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graphData:
 *                   type: object
 *                   description: Graph data object returned from the database
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing or invalid battery ID, or graph data not found
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
 *                   example: "Missing required field: Battery_id"
 *                 location:
 *                   type: string
 *                   example: "At api call /graph/cell-params/by-battery-id => if-else block"
 *       500:
 *         description: Internal server error
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
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                 error_stack:
 *                   type: string
 *                 location:
 *                   type: string
 *                   example: "At api call /graph/cell-params/by-battery-id => try-catch block"
 */

// api/graph/cell-params/by-testing-timestamp:
/**
 * @swagger
 * /graph/cell-params/by-testing-timestamp:
 *   post:
 *     summary: Retrieve cell parameter data by testing timestamp range
 *     description: Fetches graph-ready data for all cells tested between the given 'From' and 'To' timestamps.
 *     tags:
 *       - Graph Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - From
 *               - To
 *             properties:
 *               From:
 *                 type: string
 *                 format: date-time
 *                 description: Start timestamp of the testing window
 *                 example: "2025-05-01T00:00:00Z"
 *               To:
 *                 type: string
 *                 format: date-time
 *                 description: End timestamp of the testing window
 *                 example: "2025-05-02T23:59:59Z"
 *     responses:
 *       200:
 *         description: Successfully retrieved graph data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graphData:
 *                   type: object
 *                   description: The data to be used in graphs
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid or missing timestamps, or no data found
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
 *                   example: "Missing required field: From and To"
 *                 location:
 *                   type: string
 *                   example: "At api call /graph/cell-params/by-testing-timestamp => if-else block"
 *       500:
 *         description: Internal server error during data retrieval
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
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                 error_stack:
 *                   type: string
 *                 location:
 *                   type: string
 *                   example: "At api call /graph/cell-params/by-testing-timestamp => try-catch block"
 */

// api/graph/cell-params/by-filling-timestamp:
/**
 * @swagger
 * /graph/cell-params/by-filling-timestamp:
 *   post:
 *     summary: Retrieve cell parameter data by filling timestamp range
 *     description: Fetches cell-level parameter data (OCV, IR, HRD, etc.) for cells filled between the specified 'From' and 'To' timestamps. Useful for generating time-based production graphs.
 *     tags:
 *       - Graph Data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - From
 *               - To
 *             properties:
 *               From:
 *                 type: string
 *                 format: date-time
 *                 description: Start timestamp for the filling operation
 *                 example: "2025-05-01T00:00:00Z"
 *               To:
 *                 type: string
 *                 format: date-time
 *                 description: End timestamp for the filling operation
 *                 example: "2025-05-02T23:59:59Z"
 *     responses:
 *       200:
 *         description: Successfully retrieved graph data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 graphData:
 *                   type: object
 *                   description: The data to be used in graph plotting
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing or invalid timestamp fields, or no data found
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
 *                   example: "Missing required field: From and To"
 *                 location:
 *                   type: string
 *                   example: "At api call /graph/cell-params/by-filling-timestamp => if-else block"
 *       500:
 *         description: Internal server error during data retrieval
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
 *                   example: "Internal server error"
 *                 error:
 *                   type: string
 *                 error_stack:
 *                   type: string
 *                 location:
 *                   type: string
 *                   example: "At api call /graph/cell-params/by-filling-timestamp => try-catch block"
 */



/**
 * @swagger
 * /download/generate-daily-report:
 *   post:
 *     summary: Generate and export daily battery report
 *     tags:
 *       - Reports
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2020-05-19"
 *     responses:
 *       200:
 *         description: Daily report exported successfully
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
 *                 filePath:
 *                   type: string
 *       400:
 *         description: Bad request (missing date or export failed)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 errMsg:
 *                   type: string
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /download/downloadReport:
 *   get:
 *     summary: Download the most recently generated daily report
 *     tags:
 *       - Reports
 *     responses:
 *       200:
 *         description: XLSX report file download
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: File not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errMsg:
 *                   type: string
 *                   example: File not found
 *       500:
 *         description: Internal server error
 */
