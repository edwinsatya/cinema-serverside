const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/bcrypt");
const { mailer } = require("../helpers/mailer");
class UserController {
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const findEmail = await User.findOne({ email });
      if (findEmail) {
        if (!findEmail.isActive) {
          throw {
            message:
              "Email already exists with status not verified. Please check your email for verification",
            status: 403,
          };
        } else {
          throw {
            message: "Email already exists with status verified",
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

        await mailer(payload);

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

  static async verificationEmail(req, res, next) {
    try {
      const { id } = req.params;
      const update = {
        isActive: true,
      };
      const option = {
        new: true,
      };
      await User.findByIdAndUpdate(id, update, option);
      res.status(200).json({
        message: "Your email is verified",
        status: 200,
      });
    } catch (error) {
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

          res.status(200).json({
            token,
            data: payload,
            message: "Login Success",
            status: 200,
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
