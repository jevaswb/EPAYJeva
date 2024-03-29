require('dotenv').config(); // for .env file

const Postgres = require('pg')

const key = process.env.DB_ROOT_KEY
const user = process.env.DB_ROOT_USER
const database = process.env.DB_DATABASE
const port = process.env.DB_PORT


const postgre = new Postgres.Pool({
    user: `${user}`,
    host: 'localhost',
    database: `${database}`,
    password: `${key}`,
    port: `${port}`,
})
postgre.connect();

module.exports = {
    postgre
} 