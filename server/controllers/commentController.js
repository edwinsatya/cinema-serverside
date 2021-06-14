const Comment = require("../models/commentModel");
const Discussion = require("../models/discussionModel");

class CommentController {
  static async create(req, res, next) {
    try {
      const userId = req.decoded.id;
      const discusId = req.params.discusId;
      console.log(discusId, "discusId");
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
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
