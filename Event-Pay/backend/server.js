require('dotenv').config(); // for .env file // is not used yet
const express = require('express')
const cors = require('cors') // is not used yet

const app = express()
const port = 4000

const admin_router = require('./router/admin_router')
const participant_router = require('./router/participant_router')
const allocation_router = require('./router/allocation_router')
const event_router = require('./router/event_router')
const email_router = require('./router/email_router')

/*const corsOptions = { //!DO NOT WORK YET
    "origin": ['http:127.0.0.1:3000', /\.127.0.0.1:3000$/],
    "methods" : "GET, HEAD, PUT, PATCH, POST, DELETE"
}
app.use(cors(corsOptions))*/

app.use(cors())
app.use(express.json())

app.use('/admin', admin_router)
app.use('/participant', participant_router)
app.use('/allocation', allocation_router)
app.use('/event', event_router)
app.use('/email',email_router)

app.listen(port, () => console.log(`server listens at port ${port}`))