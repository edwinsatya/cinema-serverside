const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const cron = require("node-cron");
const { comparePassword } = require("../helpers/bcrypt");
const { mailer } = require("../helpers/mailer");
const { deleteJob } = require("../helpers/cronJob");
const randomOtp = require("../helpers/randomOtp");
class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const findEmail = await User.findOne({ email });
      if (findEmail) {
        if (!findEmail.isActive) {
          await mailer(findEmail, "verifyRegister", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log("email has been resend");
            }
          });
          throw {
            message:
              "Email already exists with status not verified. Please check your email for verification",
            status: 403,
          };
        } else {
          throw {
            message:
              "Email already exists with status verified. Please try with another email",
            status: 403,
          };
        }
      } else {
        const response = await User.create({
          name,
          email,
          password,
        });
        const payload = {
          id: response._id,
          email: response.email,
          name: response.name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        let currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();
        let dateJob = `${minute} ${hour} ${day} ${month} *`;
        // let dummyJob = "7 18 17 7 *";
        // let dummyJob = "* * * * *";
        await mailer(payload, "verifyRegister", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("email has been sent");
          }
        });

        deleteJob(dateJob, payload.id);

        res.status(201).json({
          token,
          data: payload,
          message: "Register Success",
          status: 200,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async sendVerificationEmail(req, res, next) {
    try {
      const { id } = req.decoded;
      const response = await User.findById(id);

      const payload = {
        id: response._id,
        name: response.name,
        email: response.email,
      };
      const resMail = await mailer(payload, "verifyRegister", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email has been resend");
        }
      });
      res.status(200).json({
        message: "email has been send",
      });
    } catch (error) {
      next(error);
    }
  }

  static async findDetailEmail(req, res, next) {
    try {
      const { id } = req.params;
      const response = await User.findById(id);
      console.log(id, "respon getnya");
      if (!response) {
        throw {
          status: 403,
          message: "Email is expired",
        };
      } else {
        const data = {
          id: response._id,
          name: response.name,
          email: response.email,
        };
        res.status(201).json({
          data: data,
          message: "Detail Email",
          status: 200,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async verificationEmail(req, res, next) {
    try {
      const { id } = req.params;
      const update = {
        isActive: true,
      };
      const option = {
        new: true,
      };
      const response = await User.findByIdAndUpdate(id, update, option);
      if (!response) {
        req.io.emit("emailVerified", {
          id,
          isVerify: false,
        });

        throw {
          status: 404,
          message: "Your email is expired, please register again",
        };
      } else {
        req.io.emit("emailVerified", {
          id,
          isVerify: true,
        });

        res.status(200).json({
          message: "Your email is verified",
          status: 200,
        });
      }
    } catch (error) {
      console.log("verifikasi di tolak!!!!!!!!!");
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const response = await User.findOne({ email });
      if (!response) {
        throw {
          status: 403,
          message: "Email or Password is Wrong!",
        };
      } else {
        if (!response.isActive) {
          throw {
            status: 403,
            message: "Your email is not active, please verify your email first",
          };
        } else {
          const hashPass = response.password;
          if (!comparePassword(password, hashPass)) {
            throw {
              status: 403,
              message: "Email or Password is Wrong!",
            };
          } else {
            const payload = {
              id: response._id,
              email: response.email,
              name: response.name,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            const update = {
              codeOtp: randomOtp(),
            };
            const option = {
              new: true,
            };

            const resOtp = await User.findByIdAndUpdate(
              payload.id,
              update,
              option
            );

            if (resOtp) {
              // await mailer(payload, (err, data) => {
              //   if (err) {
              //     console.log(err);
              //   } else {
              //     console.log("email has been sent");
              //   }
              // });
              console.log(resOtp);
              res.status(200).json({
                token,
                data: payload,
                message: "Login Success",
                status: 200,
              });
            } else {
              throw {
                status: 403,
                message: "Email or Password is Wrong!",
              };
            }
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async sendOtpLogin(req, res, next) {
    try {
      const { id } = req.decoded;
      const update = {
        codeOtp: randomOtp(),
      };
      const option = {
        new: true,
      };

      const response = await User.findByIdAndUpdate(id, update, option);

      const payload = {
        id: response._id,
        name: response.name,
        email: response.email,
        codeOtp: response.codeOtp,
      };
      const resMail = await mailer(payload, "verifyLogin", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email has been resend");
        }
      });
      res.status(200).json({
        message: "email has been send",
      });
    } catch (error) {
      next(error);
    }
  }

  static async verificationOtp(req, res, next) {
    try {
      const { id } = req.decoded;
      const { codeOtp } = req.body;
      const response = await User.findById(id);
      if (!response) {
        req.io.emit("emailVerified", {
          id,
          isVerify: false,
        });

        throw {
          status: 404,
          message: "Your email is expired, please register again",
        };
      } else {
        if (codeOtp !== response.codeOtp) {
          throw {
            status: 400,
            message: "Your code otp is not valid",
          };
        } else {
          res.status(200).json({
            message: "Your code otp is valid",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
