const jwt = require("jsonwebtoken");
const Discussion = require("../models/discussionModel");
const Comment = require("../models/commentModel");

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

module.exports = {
  authentication,
  authorizationDiscussion,
  authorizationComment,
};
