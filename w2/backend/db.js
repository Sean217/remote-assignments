import mysql from 'mysql2';
import dotenv from "dotenv-defaults";
dotenv.config();

let DB_HOST = 'database-1.c98vcolprmbe.ap-northeast-1.rds.amazonaws.com'
let DB_USER = 'admin'
let DB_PASS = 's02170217'
let MYSQL_DB = 'assignment'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: MYSQL_DB
})

let db = {};

db.insertUser = (name, email, password) => {
    console.log('start insert user.');
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?);', [name, email, password], (error, result) => {
            if(error) {
                console.log(error);
                return reject(error);
            }
            pool.query('SELECT LAST_INSERT_ID();', function (err, data) {
                if (err) {
                    return reject(error);
                }
                //console.log('result: ', result.insertId, 'last insert id: ', data);
                //return result.insertId or data[0]['LAST_INSERT_ID()'] is the same.
                return resolve(data[0]['LAST_INSERT_ID()']);
            })
        })
    })
}

db.getUserByEmail = (email) => {
    console.log('start check email dup');
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM user WHERE email = ?', [email], (error, users) => {
            if(error) {
                console.log(error);
                return reject(error);
            }
            return resolve(users[0]);
        })
    })
}

db.getUser = (id) => {
    console.log('start get user by id.');
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM user Where id = ?', [id], (error, user) => {
            if (error){
                return reject(error);
            } 
            return resolve(user[0]);
        });
    })
}

export default db