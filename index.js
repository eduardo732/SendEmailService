const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smpt.hostinger.com",
  secure: true,
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  connectionTimeout: 10000,
  auth: {
    user: process.env.HOSTINGER_USER,
    pass: process.env.HOSTINGER_PASS,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, subject, message } = req.body;

	// Create email content
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: email,
    subject: subject,
    text: `${message}`,
  };

	

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });

});

app.get("/", (req, res) => {
	console.log("Bienvenido!!");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
