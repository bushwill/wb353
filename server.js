/*
    TODO -> When inserting a username that's already taken, should return an error and prevent insertion
    TODO -> Channel_id in posts table should be NOT NULL when channels are working
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
            }

            connection.query(`CREATE TABLE IF NOT EXISTS users
                                ( id int unsigned NOT NULL auto_increment, 
                                username varchar(100) NOT NULL,
                                password varchar(100) NOT NULL,
                                PRIMARY KEY (id)
                                )`,
                (error, result) => {
                    if (error) {
                        console.error('Error creating the users table:', error);
                        res.status(500).send('Error creating the users table');
                    } else {
                        console.log('Table "users" created');
                        connection.query(`INSERT INTO users (username, password) VALUES ('bushwill', 'guest')`,
                            (error, result) => {
                                if (error) {
                                    console.error('Error creating admin user:', error);
                                    res.status(500).send('Error creating admin user.');
                                }
                            });
                    }
                });
            connection.query(`CREATE TABLE IF NOT EXISTS channels
                                ( id int unsigned NOT NULL auto_increment, 
                                name varchar(255) NOT NULL,
                                user_id int unsigned NOT NULL,
                                PRIMARY KEY (id)
                                )`,
                (error, result) => {
                    if (error) {
                        console.error('Error creating the channels table:', error);
                        res.status(500).send('Error creating the channels table');
                    } else {
                        console.log('Table "channels" created');
                    }
                });
            connection.query(`CREATE TABLE IF NOT EXISTS posts
                                ( id int unsigned NOT NULL auto_increment, 
                                question varchar(255) NOT NULL,
                                description varchar(500),
                                user_id int unsigned NOT NULL,
                                channel_id int unsigned,
                                likes int unsigned NOT NULL,
                                dislikes int unsigned NOT NULL,
                                PRIMARY KEY (id)
                                )`,
                (error, result) => {
                    if (error) {
                        console.error('Error creating the posts table:', error);
                        res.status(500).send('Error creating the posts table');
                    } else {
                        console.log('Table "posts" created');
                        dbinit = true;
                        console.log('Database and table initialization successful');
                        res.status(200).send('Database and table initialization successful');
                    }
                });
        });
    } else {
        console.log("Database is already initialized!");
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
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/createPost', (req, res) => {
    const { question, description, user_id, channel_id } = req.body;
    const insertQuery = `INSERT INTO posts (question, description, user_id, channel_id, likes, dislikes) VALUES ('${question}', '${description}', '${user_id}', '${channel_id}', '0', '0')`;
    connection.query(insertQuery, function (error, result) {
        if (error) {
            console.error("Error inserting post into table:", error);
            res.status(500).json({ success: false, message: "Error creating post." });
        } else {
            console.log("Successfully inserted post into table!");
            res.status(200).json({ success: true, message: "Successfully created post!" });
        }
    });
});


app.get('/getPosts', (req, res) => {
    const query = 'SELECT * FROM posts';
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching posts' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/createChannel', (req, res) => {
    const { name, user_id } = req.body;
    const insertQuery = `INSERT INTO channels (name, user_id ) VALUES ('${name}', '${user_id}')`;
    connection.query(insertQuery, function (error, result) {
        if (error) {
            console.error("Error inserting channel into table:", error);
            res.status(500).json({ success: false, message: "Error creating channel." });
        } else {
            console.log("Successfully inserted channel into table!");
            res.status(200).json({ success: true, message: "Successfully created channel!" });
        }
    });
});


app.get('/getChannels', (req, res) => {
    const query = 'SELECT * FROM channels';
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching channels' });
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
