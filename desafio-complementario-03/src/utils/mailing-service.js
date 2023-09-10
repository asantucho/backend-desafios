import { createTransport } from 'nodemailer';
import config from '../config/config.js';

const transporter = createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD,
  },
});

export const sendEmail = async (user) => {
  try {
    const { firstName, email } = user;
    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: `Welcome to our site ${firstName}!`,
      html: `Thank you for choosing us ${firstName}`,
    };
    await transporter.sendMail(gmailOptions);
    console.log('Email sent!');
  } catch (error) {
    console.log(error.message);
  }
};
