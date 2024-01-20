const nodemailer = require("nodemailer");

// let testAccount = await nodemailer.createTestAccount();

var smtpTransport = nodemailer.createTransport({
  //  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  // ssl:     true,
  secure: false,
  //  requireTLS: true,
  auth: {
    user: "qmuhammad144@gmail.com",
    pass: "crbfzkyrzjddvuks",
  },
});

const sendmail = async (email, name, code) => {
  console.log("code", code);
  mailOptions = {
    from: `"Verify Your Accout by Token" <qmuhammad144@gmail.com>`,
    to: `${email}`,
    subject: "Please Vrifiy your Email account",
    html: `
     <h3 style="font-family: cursive">Hy ${name} Chat App wansts to Verify your Email by Code. </h3>
     <h3>${code}</h3>`,
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log(response);
      return response;
    }
  });
};
module.exports = sendmail;
