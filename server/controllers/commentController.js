const Comment = require("../models/commentModel");
const Discussion = require("../models/discussionModel");

class CommentController {
  static async create(req, res, next) {
    try {
      const userId = req.decoded.id;
      const discusId = req.params.discusId;
      const { comment } = req.body;
      const responseComment = await Comment.create({
        userId,
        comment,
      });
      const option = {
        new: true,
      };
      const update = {
        $push: {
          comments: responseComment._id,
        },
      };
      const responseDiscussion = await Discussion.findByIdAndUpdate(
        discusId,
        update,
        option
      );
      res.status(201).json({
        data: responseDiscussion,
        message: "Comment has been created to your discussion",
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  }

  static async find(req, res, next) {
    try {
      let response;
      if (req.query.commentId) {
        let commentId = req.query.commentId;
        response = await Comment.findById(commentId).populate("userId");
      } else {
        response = await Comment.find().populate("userId");
      }
      res.status(200).json({
        data: response,
        message: "Successful get all comment",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { comment } = req.body;
      const id = req.params.commentId;
      const update = {
        comment,
      };
      const option = {
        new: true,
      };
      const response = await Comment.findByIdAndUpdate(id, update, option);
      res.status(200).json({
        data: response,
        message: "Comment has been updated",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.commentId;
      const response = await Comment.findByIdAndDelete(id);
      res.status(202).json({
        data: response,
        message: "Discussion has been deleted",
        status: 202,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
