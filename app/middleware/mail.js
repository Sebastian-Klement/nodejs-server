const nodemailer = require("nodemailer");

exports.sentSafetyMail = function () {
  const ip = "127.0.0.1";
  const transporter = nodemailer.createTransport({
    host: "mail.gmx.net",
    port: 587,
    secure: false,
    auth: {
      user: "s.klement1@gmx.de",
      pass: "123Gmx12300!",
    },
  });

  const mailData = {
    from: "s.klement1@gmx.de",
    to: "klementse76573@th-nuernberg.de",
    subject: "studentcard safety report",
    text:
      "A device with the ip: " +
      ip +
      "has logged into your OHMcart account using \
      the access data of the CMS of the Th Nuremberg. \
      If this was not you, change your password and \
      inform your admin.",
  };

  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
