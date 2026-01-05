//include the requrired packages
const express = require('express');
const mysql = require('mysql2/promise');
require ('dotenv').config();
const port = 3000;

//database config info
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
};

//initialize the express app
const app = express();

//middleware to parse JSON requests
app.use(express.json());

//start the server
app.listen(port, () => {
    console.log('Server is running on port', port);
}); 

//example route: Get All Cards
app.get('/allcards', async (req, res) => {
    try {
        let connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execution('SELECT * FROM defaultdb.cards');
        res.json(rows);
    }   catch (err) { 
        console.error(err);
        res.status(500).json({ error: 'Server Error for allcards' });
    }
});