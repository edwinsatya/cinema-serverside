const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

async function mailer(user, cb) {
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
    text: "Belum bikin html emailnya, entaran aja masih mager", // plain text body
    template: "verificationEmail",
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
