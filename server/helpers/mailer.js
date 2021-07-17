const nodemailer = require("nodemailer");

async function mailer(user) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  let mailOptions = {
    from: '"Cinema21 👻" <cinema21@gmail.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Welcome to cinema21", // Subject line
    text: "Belum bikin html emailnya, entaran aja masih mager", // plain text body
    html: `<b>html nya belum ada ya</b>
                  <button  style="background-color:red;">
                     <a href="https://www.w3schools.com">Verification</a>
                  </button>
          `, // html body
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log("err mailer:", err);
    } else {
      console.log("Email has been sent");
    }
  });
}

module.exports = {
  mailer,
};
