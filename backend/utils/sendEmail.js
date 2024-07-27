const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        secure:false,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })
    const mailOptions = {
        from: process.env.SMPT_MAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
        
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(info.messageId);

}


module.exports = { sendEmail }