import mysql from 'mysql2';
import dotenv from "dotenv-defaults";
dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB
})

let db = {};

db.insertUser = (name, email, password) => {
    console.log('start insert user.');
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO USER (name, email, password) VALUES (?, ?, ?);', [name, email, password], (error, result) => {
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
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM User WHERE email = ?', [email], (error, users) => {
            if(error) {
                return reject(error);
            }
            return resolve(users[0]);
        })
    })
}

db.getUser = (id) => {
    console.log('start get user by id.');
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM User Where id = ?', [id], (error, user) => {
            if (error){
                return reject(error);
            } 
            return resolve(user[0]);
        });
    })
}

export default db