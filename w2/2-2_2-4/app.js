import dotenv from "dotenv-defaults";
dotenv.config();
import express from 'express'
import cors from 'cors'
import healthRouter from './routes/healthcheck'
import usersRouter from  './routes/users'
import mysql from 'mysql2'

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

var app = express();
const port = process.env.APP_PORT || 3000

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
