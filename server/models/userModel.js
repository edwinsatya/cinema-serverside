const { Schema, model } = require("mongoose");
const { hashPassword } = require("../helpers/bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Input Your Name"],
      maxlength: [30, "Maximum Input Name 30 Characters"],
    },
    email: {
      type: String,
      required: [true, "Please Input Your Email"],
      validate: {
        validator: function (value) {
          return User.findOne({
            email: value,
          }).then((response) => {
            if (response) {
              return false;
            }
          });
        },
        message: "Email Already Exists",
      },
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "email is not valid",
      ],
    },
    password: {
      type: String,
      required: [true, "Please Input Your Password"],
      minlength: [7, "Password Minimum 7 Characters"],
    },
    isActive: {
      type: Boolean,
    },
    isLogin: {
      type: Boolean,
    },
    codeOtp: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const listColor = [
    "#28FFBF",
    "#512D6D",
    "#F8485E",
    "#00C1D4",
    "#FFF338",
    "#716F81",
    "#753422",
    "#B05B3B",
    "#FF3F00",
    "#0F044C",
    "#9B72AA",
    "#185ADB",
    "#A239EA",
    "#5F939A",
  ];
  this.password = hashPassword(this.password);
  this.isActive = false;
  this.isLogin = false;
  this.codeOtp = "";
  this.color = listColor[Math.floor(Math.random() * listColor.length)];
  next();
});

const User = model("User", userSchema);

module.exports = User;
