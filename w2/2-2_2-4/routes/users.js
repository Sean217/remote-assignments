import { Router } from 'express';
import validator from 'email-validator';
import db from '../db';

const router = Router();

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
}

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
function isEmailValid(email) {
    //console.log('check email');
    if (!email)
        return false;

    if(email.length>254)
        return false;

    var valid = emailRegex.test(email);
    if(!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
        return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
        return false;

    return true;
}

function validatePassword(str) {
    let pwValid = 0; //if pwvalid >= 3, it is valid
    if (/[A-Z]/.test(str)) {
        pwValid += 1;
    }
    if (/[a-z]/.test(str)) {
        pwValid += 1;
    }
    if (/[0-9]/.test(str)) {
        pwValid += 1;
    }
    if (/[|/?.>,<'";:|]}[{=+-_)(*&^%$#@ !`~]/.test(str)) {
        pwValid += 1;
    }

    //console.log(pwValid);
    if (pwValid >= 3) {
        return true;
    } else {
        return false;
    }
}

router.post('/', async (req, res, _next) => {

    console.log("start signup API");
    try {
        const Request_Date = req.headers["request-date"];
        const { name, email, password } = req.body;
        //check for name validation
        let nameValid = onlyLettersAndNumbers(name);
        if (!nameValid) {
            return res.status(400).send({ error: 'Client Error Response' })
        }
        //check for email validation
        let valid = isEmailValid(email)
        if (!valid) {
            return res.status(400).send({ error: 'Client Error Response' })
        }
        //check for email duplication
        let dup = await db.getUserByEmail(email);
        if (dup) {
            return res.status(403).send({ error: 'Email Already Exists' })
        }
        //check for password validation
        let pwValid = await validatePassword(password)
        //console.log(pwValid);
        if (pwValid === false) {
            return res.status(400).send({ error: 'Client Error Response' })
        }
        //insert new uesr to the db
        console.log(name, email, password);
        const userId = await db.insertUser(name, email, password)
        //response to the client
        const newUser = {
            "data": {
                "user": {
                    "id": userId,
                    "name": name,
                    "email": email,
                  },
                "date": Request_Date
              }
        }
        return res.status(200).send(newUser);
    } catch (error) {
        return res.status(503).send("response unsuccessfully");
    }
});

router.get('/', async (req, res, next) => {
    console.log('start get user API');
    try {
        const Request_Date = req.headers["request-date"];
        const id = req.query.id;
        const user = await db.getUser(id)
        if(!user) {
            return res.status(403).send({ error: "User Not Existing" });
        }
        const data = {
            "data": {
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                  },
                "date": Request_Date
              }
        }
        return res.status(200).send(data);
    } catch (error) {
        return res.status(400).send({ error: 'Client Error Response' });
    }
})

export default router;