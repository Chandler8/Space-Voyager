
// Connect to MySQL
const mysql = require('mysql');

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
var connection = mysql.createConnection({
    host: 'localhost',
    // port: 3306,
    user: 'root',
    password: 'root',
    database: 'space_db'
  });
}

connection.connect((err) => {
  if (err) {
    console.log(`Error connecting: ${err.stack}`);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
