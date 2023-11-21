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
    host: 'mysql1',
    user: 'root',
    password: 'admin',
    database: 'postdb'
});

app.get('/init', (req, res) => {
    if (!dbinit) {
        connection.connect();
        connection.query('CREATE DATABASE IF NOT EXISTS postdb', (createDbErr) => {
            if (createDbErr) {
                console.error('Error creating the database:', createDbErr);
                res.status(500).send('Error creating the database');
            } else {
                console.log('Database "postdb" created');

                connection.query(`CREATE TABLE IF NOT EXISTS posts
          ( id int unsigned NOT NULL auto_increment, 
            topic varchar(50) NOT NULL,
            data varchar(100),
            PRIMARY KEY (id)
          )`, (error, result) => {
                    if (error) {
                        console.error('Error creating the table:', error);
                        res.status(500).send('Error creating the table');
                    } else {
                        console.log('Table "posts" created');
                        res.status(200).send('Database and table initialization successful');
                        dbinit = true;
                    }
                });
            }
        });
    } else {
        console.log("Database already initialized!");
        res.status(200).send('Database is already initialized!');
    }
});


app.post('/addPost', (req, res) => {
    const { topic, data } = req.body;

    const timestamp = new Date().toLocaleString();

    const query = `INSERT INTO posts (topic, data) VALUES ('${topic}', '${data}')`;

    connection.query(query, function (error, result) {
        if (error) {
            console.error("Error inserting into table:", error);
            res.status(500).json({ success: false, message: "Error inserting into table." });
        } else {
            console.log("Successfully inserted into table!");
            res.status(200).json({ success: true, message: "Successfully inserted into table!" });
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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile('posting.html', { root: __dirname });
});
