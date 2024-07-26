    // project-root/utils/sendEmail.js

    const nodemailer = require('nodemailer');

    // Create a transporter
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jihedoueslati4@gmail.com',
        pass: 'jihedoueslati28380705'
    }
    });

    // Function to send email
    const sendEmail = async (email, subject, text) => {
    try {
        const mailOptions = {
        from: 'jihedoueslati4@gmail.com',
        to: email,
        subject: subject,
        text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true; // Return true if email sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Return false if there was an error sending email
    }
    };

    module.exports = sendEmail;
