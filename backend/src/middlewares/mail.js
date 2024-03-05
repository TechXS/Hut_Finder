const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
})


const sendResetLink = (details) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(details, (error, info) => {
            if (error) {
                reject(error.message);
            } else {
                resolve(`Email sent:  ${info.response}`)
            }
        });
    })
}

module.exports = {sendResetLink}