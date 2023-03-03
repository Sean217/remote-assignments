import express from 'express'
import cors from 'cors'
import healthRouter from './routes/healthcheck'
import usersRouter from  './routes/users'
import mysql from 'mysql2'

let DB_HOST = 'database-1.c98vcolprmbe.ap-northeast-1.rds.amazonaws.com'
let DB_USER = 'admin'
let DB_PASS = 's02170217'
let MYSQL_DB = 'assignment'

let connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: MYSQL_DB
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

var app = express();
const port = 3000

app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
})

app.use('/healthcheck', healthRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  	console.log(`Server is up on port ${port}.`)
})
