const nodemailer = require('nodemailer');

const EmailSend= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.amaderstore.com',
        port: 587,
        secure: false,
        auth: {
            user: "otp@amaderstore.com",
            pass: 'Ue{Ebi2YZpK?'
        },tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: 'Ecommerce OTP<otp@amaderstore.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions)
}
module.exports=EmailSend