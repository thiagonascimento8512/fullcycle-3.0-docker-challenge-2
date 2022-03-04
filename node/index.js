const express = require('express');
const app = express();
const port = 3000;

const configMySQL = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

let people;

const mysql = require('mysql');
const mySqlConnection = mysql.createConnection(configMySQL);
const createTableIfNotExists = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255) not null, primary key(id))`;
const insertUserQuery = `INSERT INTO people(name) values("Jonas"), ("Thiago"), ("Marina"), ("Lucas"), ("Pedro")`;

mySqlConnection.query(createTableIfNotExists);
mySqlConnection.query(`DELETE FROM people`);
mySqlConnection.query(insertUserQuery);

mySqlConnection.query(`SELECT * FROM people`, (err, result, field) => {
  if (err) people = null;
  people = result;
});

mySqlConnection.end();

app.get('/', (request, response) => {
  var titleAndNames = '<h1>Full Cycle Rocks!</h1><ul>';

  for (var person in people) {
    titleAndNames += `<li>${people[person].name}</li>`;
  }

  titleAndNames += '</ul>';


  response.send(titleAndNames);
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})