const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail', host: 'smtp.gmail.com', port: 587, secure: false, auth: {
        user: process.env.GMAIL_USERNAME, pass: process.env.GMAIL_PASSWORD
    }
})


const sendMail = (details) => {
    return new Promise(async (resolve, reject) => {
        try {
            const email = await transporter.sendMail(details)
            resolve(`Email sent:  ${email.response}`)
        } catch (e) {
            reject(e.message);
        }
    })
}

module.exports = {sendMail}