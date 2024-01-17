//const db = require('.. /postgre_config')
require('dotenv')
const email = process.env.EVENTPAY_EMAIL_ADDRESS
const pw = process.env.EVENTPAY_EMAIL_PW
const nodemailer = require('nodemailer')
const { check_key } = require('../functions')

const sendRequest = async (req, res) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }

    const head = req.body.head
    const message = req.body.message
    const to = req.body.to
    const sender = req.body.sender

    const html = `
        <h1>Hello Admin!</h1>
        <p>You've got a request from ${sender}:</p> <br>
        <h3>${head}</h3>
        <p>${message}</p><br>
        <p>If you don't know this person you can ignore the email and if you get spam block it</p>
        <p>with regards</p>
        <p>The EventPay Team</p>
    `


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            user: email,
            pass: pw
        }
    })

    try {
        await transporter.sendMail({
            from: email,
            to: to,
            subject: 'EventPay Request',
            html: html
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(JSON.stringify('Something went wrong'))
        return
    }

    res.status(200).json(JSON.stringify(''))
}

const sendInformations = (req, res, next) => {  //post
    const test_key = req.body.test_key

    if (check_key(test_key)) { res.status(500).json(JSON.stringify('Something went wrong. Please try again later')); return }
}

module.exports = {
    sendRequest,
    sendInformations
}