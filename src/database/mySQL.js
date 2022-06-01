const mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dummy'
});

connection.connect((err) => {
    if (err) {
        return console.error('error: ' + err);
    }

    console.log('mySQL connected');
});


module.exports = connection;