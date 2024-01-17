const db = require('../postgre_config')
const { check_key, hash_password, check_hash } = require('../functions');
const { json } = require('express');

const id = []

//adds the admin
const addAdmin = (req, res) => {
    //test the api key
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    //take out the informations of the request
    const email = req.body.email
    const pw = req.body.pw
    const user_name = req.body.user_name

    //insert the admin into the database
    const query = 'INSERT INTO "admin" (id, pw, username, email) VALUES ($1, $2, $3, $4);'
    db.postgre.query(query, [crypto.randomUUID(), hash_password(pw), user_name, email], (error, result) => {
        if (error) {
            res.status(500).json(JSON.stringify('User already exists'))
            return
        }
        res.status(200).json(JSON.stringify(''))
    })
}

//get the admin
const getAdmin = (req, res) => {
    //test the api key
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('one')); return }

    //take out the informations of the requestF
    const email = req.body.email
    const pw = req.body.pw

    //get the admin out of the database
    const query = 'Select * FROM "admin" WHERE email = $1'
    db.postgre.query(query, [email], (error, result) => {
        if (error) {
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        if (result.rows.length === 0) { res.status(500).json(JSON.stringify(`User doesn't exists`)); return }
        if (check_hash(pw, result.rows[0].pw)) { res.status(500).json(JSON.stringify('Wrong password')); return }
        id.push({email: result.rows[0].email ,id: result.rows[0].id})
        res.status(200).json(result.rows)
    })
}

const getAdminId = (req, res, next) => {
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const email = req.body.email
    
    //todo maybe field logged in -> boolean db at table admin    
    //get the admin_id out of the database
    const query = 'select a.id FROM "admin" a where a.email = $1'
    db.postgre.query(query, [email], (error, result) => {
        if (error) {
            res.status(500).json(JSON.stringify('Something went wrong. Please try again later'))
            return
        }
        if (result.rowCount === 0) { res.status(500).json(JSON.stringify(`Data doesn't exists`)); return }
        if (result.rowCount > 1) {res.status(405).json(JSON.stringify('Data-response rejected! - Something went wrong. Please try again later')); return }
        //console.log("db id", result.rows[0])
        if (undefined === `${id.find(item => `${item.id}` === `${result.rows[0].id}`)}`) { res.status(500).json(JSON.stringify('Internal Error - Something went wrong. Please try again later')); return }
        
        //ok handling
        //console.log("script id", id)
        res.status((id.length === 0) ? 404 : 200).json((id.length === 0) ? JSON.stringify(`Not found - Please try again later`) : JSON.stringify(`${result.rows[0].id}`))
    })   
}

const logOut = (req, res, next) => {
    //! is not secured
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('one')); return }

    const email = req.body.email

    const loggedIn = id.filter(items => items.email != email)
    if( loggedIn.length + 1 !== id.length ) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return}
    res.status(200).json(JSON.stringify('Logged out successful'))   
}

module.exports = {
    addAdmin,
    getAdmin,
    getAdminId,
    logOut,
}