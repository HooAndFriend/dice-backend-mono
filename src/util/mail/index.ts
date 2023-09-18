import * as nodeMailer from 'nodemailer';

export const sendMail = async (
  to: string[],
  subject: string,
  html: string,
  attachments: any,
) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    secure: true,
    auth: {
      user: process.env.MAIL_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${process.env.MAIL_USERNAME} ${process.env.MAIL_EMAIL}`,
    to,
    subject,
    html,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};
