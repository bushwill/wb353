/*
    TODO -> When inserting a username that's already taken, should return an error and prevent insertion
*/

const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const port = 5050;
let dbinit = false;

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

var connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'admin',
    database: 'wb370database'
});

app.get('/init', (req, res) => {
    if (!dbinit) {
        connection.connect();
        connection.query('CREATE DATABASE IF NOT EXISTS wb370database', (createDbErr) => {
            if (createDbErr) {
                console.error('Error creating the database:', createDbErr);
                res.status(500).send('Error creating the database');
            } else {
                console.log('Database "wb370database" created');

                connection.query(`CREATE TABLE IF NOT EXISTS users
          ( id int unsigned NOT NULL auto_increment, 
            username varchar(100) NOT NULL,
            password varchar(100) NOT NULL,
            PRIMARY KEY (id)
          )`, (error, result) => {
                    if (error) {
                        console.error('Error creating the table:', error);
                        res.status(500).send('Error creating the table');
                    } else {
                        console.log('Table "users" created');
                        connection.query(`INSERT INTO users (username, password) VALUES ('bushwill', 'guest')`,
                            (error, result) => {
                                if (error) {
                                    console.error('Error creating admin user:', error);
                                    res.status(500).send('Error creating admin user.');
                                } else {
                                    res.status(200).send('Database and table initialization successful');
                                    dbinit = true;
                                }
                            });
                    }
                });
            }
        });
    } else {
        console.log("Database already initialized!");
        res.status(200).send('Database is already initialized!');
    }
});


app.post('/createUser', (req, res) => {
    const { username, password } = req.body;
    const insertQuery = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    connection.query(insertQuery, function (error, result) {
        if (error) {
            console.error("Error inserting user into table:", error);
            res.status(500).json({ success: false, message: "Error creating user." });
        } else {
            console.log("Successfully inserted user into table!");
            res.status(200).json({ success: true, message: "Successfully created user!" });
        }
    });
});


app.get('/getUsers', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching posts' });
        } else {
            res.status(200).json(results);
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile('server.html', { root: __dirname });
});
