import { createTransport } from "nodemailer";

const createTransporter = ( organization ) => {
	switch( organization ) {
		case process.env.CUATICA_ORGANIZATION:
			return createTransport({
				host: "smtp.hostinger.com",
				secure: true,
				secureConnection: false,
				tls: { ciphers: "SSLv3" },
				requireTLS: true,
				port: 465,
				debug: true,
				connectionTimeout: 10000,
				auth: {
					user: process.env.CUATICA_CONTACT_USER,
					pass: process.env.CUATICA_CONTACT_PASS,
				},
			});
			break;
	}
  
};

const sendEmail = async ({ name, email, subject, message, organization }) => {
  const transporter = createTransporter(organization);

  const mailOptions = {
    from: process.env.HOSTINGER_USER,
    to: process.env.ADDRESS,
    subject: subject,
    text: `${message}\n${name}\nFavor contactarse al correo: ${email}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: `Error sending email: ${error.response}` };
  }
};

export default sendEmail;
