var config = require('./config');
var express = require('express');
var mysql = require('mysql');
var app = express();
var apiRouter = express.Router();
var path = require('path');

var connection = mysql.createConnection({
    host: "mysql-prototype.cupoqzdssjt8.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "prototype_db"
});



app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use((req, res, next) => {
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');

    /* Allo access for any of the following HTTP request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

    /* Set the HTTP request header */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    next();
})

connection.connect((err) => {
    if(err) throw err;
    console.log("Connected to MySQL database");
})

/** HTTP REQUESTS */
apiRouter.get('/users', (req, res) => {
    connection.query("SELECT * FROM users", (error, result, fields) => {
        if(error) throw error;
        console.log(result);
        //return a json file with the information from the database
        res.json({users: result});
    });
});

apiRouter.post('/users', (req, res) => {
    connection.query(`INERT INTO users (idusers, name, email) VALUES (${req.body.idusers}, ${req.body.name || null}, ${req.body.email || null})`, (error, result) => {
        if(error) throw error;
        console.log(result);
    });
});

apiRouter.put('/users/:id', (req, res) => {
    connection.query(`UPDATE users SET name = ${req.body.name}, email = ${req.body.email} WHERE id = ${req.params.id}`, (error, result) => {
        if(error) throw error;
        console.log(result.affectedRows + "record(s) updated");
    });
});

apiRouter.delete('/users/:id', (req, res) => {
    connection.query(`DELETE FROM users WHERE id = ${req.params.id}`, (error, result) => {
        if(error) throw error;
        console.log(result.affectedRows + " records deleted");
    });
});


app.use('/api', apiRouter);

app.listen(config.port, () => {
    console.log("Server is running on port 8080");
});