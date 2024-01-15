//Imports
const crypto = require('crypto')

// Env File - # API KEY # - # PEPPER # - # HASH ALGORITHM #
const api_key = process.env.API_KEY;
const hash_algorythm = process.env.HASH_ALGORYTHM || 'sha512'
const pepper = process.env.PEPPER

//Method to check the api key
const check_key = (test_key) => {
    console.log(test_key, api_key)
    return api_key !== test_key
}

//Returns the password string: containing hash algorythm, salt, password
const hash_password = (password) => {
    const salt = crypto.randomBytes(16).toString('base64')
    const hash = crypto.createHash(hash_algorythm).update(password).update(salt).update(pepper).digest('base64')
    return `${hash_algorythm}$${salt}$${hash}`
}

//checks if the password is the same || if it's not the same returns the value true
const check_hash = (user_pw, db_pw) => {
    const algorithm = db_pw.split('$')[0]
    const salt = db_pw.split('$')[1]

    const hash = crypto.createHash(algorithm).update(user_pw).update(salt).update(pepper).digest('base64')
    console.log('check_hash', hash, db_pw.split('$')[2]);

    return crypto.createHash(algorithm).update(user_pw).update(salt).update(pepper).digest('base64') !== db_pw.split('$')[2]
}

//exprot the functions
module.exports = {
    check_key,
    hash_password,
    check_hash
}