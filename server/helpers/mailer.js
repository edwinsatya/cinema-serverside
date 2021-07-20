const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

async function mailer(user, type, cb) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  transporter.use(
    "compile",
    hbs({
      viewEngine: {
        extName: ".handlebars",
        // partialsDir: path.join(__dirname, "/template/email/"),
        defaultLayout: false,
      },
      viewPath: path.join(__dirname, "/template/email/"),
    })
  );

  let mailOptions = {
    from: '"Cinema21 👻" <cinema21@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Welcome to cinema21", // Subject line
    text: "Verification", // plain text body
    template: "verificationEmail",
    context: {
      name: `${user.name}`,
      email: `${process.env.SMTP_EMAIL}`,
      id: `${process.env.URL_CLIENT}/verify-email/${user.id}`,
    },
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
}

module.exports = {
  mailer,
};
