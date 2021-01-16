const nodemailer = require("nodemailer");

console.log(process.env.MAILER_USER_PASS);
function createTransport() {
  return nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0a4f766fb5db4b",
      pass: process.env.MAILER_USER_PASS,
    },
  });
}

module.exports = { createTransport };
