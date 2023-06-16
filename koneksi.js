var mysql = require('mysql');

//koneksi database

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sarigading',
    port: 15411

});

conn.connect((err) => {
    if (err) throw err;
    console.log('mysql terkoneksi');
});

module.exports = conn;
