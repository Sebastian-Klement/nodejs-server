const nodemailer = require("nodemailer");

exports.sentSafetyMail = function () {
  const ip = "127.0.0.1";
  let date = new Date();
  const transporter = nodemailer.createTransport({
    host: "mail.gmx.net",
    port: 587,
    secure: false,
    auth: {
      user: "Your email",
      pass: "Your pw",
    },
  });

  const mailData = {
    from: "Your email",
    to: "Your secound email",
    subject: "studentcard safety report",
    text:
      "A new device with the ip-adress: " +
      ip + " at: "+ date +
      " has logged into your OHMcart account using the access data of the CMS of the TH Nuremberg. If this was not you, please change your password and inform your admin. \n\n This message was created automatically.",
  };

  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
