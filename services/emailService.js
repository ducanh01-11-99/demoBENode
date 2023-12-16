const nodemailer = require('nodemailer');
const emailConfig = require('../config');

const sendMail = (address, subject, text) => {
    const transporter = nodemailer.createTransport( {
        // 
        host: 'smtp.gmail.com',
        // port: 465,
        // secure: true,
        // secureConnection: true,
        // logger: true,
        // debug: true,
        // tls: {
        //     rejectUnauthorized: true,
        //   },
        auth: {
          user: 'ducanh20176919@gmail.com',
          pass: 'zxlu nfxm sxef snic',
        },
      });
    const mailOptions = {
        from: 'ducanh20176919@gmail.com',
        to: '19020217@vnu.edu.vn',
        subject: subject,
        text: text,
      };

      console.log('created');

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(1);
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
      });
};

module.exports = {
    sendMail
}
