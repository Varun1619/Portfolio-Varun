const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or use another SMTP provider
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-app-password' // Use an app password for security
        }
    });

    const mailOptions = {
        from: email,
        to: 'singh.varun3@northeastern.edu',
        subject: `New Message from ${name}`,
        text: `
You have received a new message from your portfolio site.

Name: ${name}
Email: ${email}
Message:
${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Email failed to send.');
        } else {
            res.status(200).send('Email sent successfully!');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
