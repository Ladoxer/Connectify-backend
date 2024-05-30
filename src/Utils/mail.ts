import nodemailer from 'nodemailer';

export const sendMail = async (email: string, name: string, userId: number) => {
  try {
    const otp = generateOTP();
    console.log(otp);

    // save otp in db

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    
    const mailOptions = {
      from: 'UserNexus',
      to: email,
      subject: 'UserNexus - For email verification',
      html: `<p>Hi ${name}, Your otp for verification is <b>${otp}</b>. Enter the otp and verify your account.</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.response);
  } catch (error) {
    throw error;
  }
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
}