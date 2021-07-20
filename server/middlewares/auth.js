const jwt = require("jsonwebtoken");
const Discussion = require("../models/discussionModel");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

function authentication(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    next(error);
  }
}

async function authorizationDiscussion(req, res, next) {
  try {
    const userId = req.decoded.id;
    const discussionId = req.params.discusId;
    const response = await Discussion.findById(discussionId);
    if (!response) {
      throw {
        status: 404,
        message: "Discussion not found",
      };
    } else {
      if (response.userId != userId) {
        throw {
          status: 401,
          message: "Unauthorized",
        };
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
}

async function authorizationComment(req, res, next) {
  try {
    const userId = req.decoded.id;
    const commentId = req.params.commentId;
    const response = await Comment.findById(commentId);
    if (response.userId != userId) {
      throw {
        status: 401,
        message: "Unauthorized",
      };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function authorizationVerifiedEmail(req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    const registerId = decoded.id;
    const response = await User.findById(registerId);
    if (!response) {
      req.io.emit("emailVerified", {
        id: registerId,
        isVerify: false,
      });
      throw {
        status: 403,
        message: "Your email is expired, please register your email again",
      };
    } else if (response._id != registerId) {
      req.io.emit("emailVerified", {
        id: registerId,
        isVerify: false,
      });
      throw {
        status: 401,
        message: "Unauthorized",
      };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authentication,
  authorizationDiscussion,
  authorizationComment,
  authorizationVerifiedEmail,
};
