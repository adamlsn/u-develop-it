// GLOBALS
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'election'
    },
    console.log('conneceted to the election database.')
)

// EXPRESS MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ACCESSING db.query
db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

// GET A SINGLE CANDIDATE
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, rows) => {
    if(err) console.log(err);
    console.log(rows);
});

// DELETE A CANDIDATE
db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
    if(err) console.log(err);
    console.log(result);
})

// CREATE A CANDIDATE
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
              VALUES (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
  if (err) console.log(err);
  console.log(result);
});


// DEFAULT RESPONSE FOR ANY OTHER REQUEST (Not Found)
app.use((req, res) => {
    res.status(404).end();
})

// STARTING SERVER
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});