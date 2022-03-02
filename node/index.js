const express = require('express');
const app = express();
const port = 3000;

const configMySQL = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

const mysql = require('mysql');
const mySqlConnection = mysql.createConnection(configMySQL);
const insertUserQuery = `INSERT INTO people(name) values("Jonas")`;

mySqlConnection.query(insertUserQuery);
mySqlConnection.end();

app.get('/', (request, response) => {
  response.send('<h1>Full Cycle Rocks!</h1>')
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})