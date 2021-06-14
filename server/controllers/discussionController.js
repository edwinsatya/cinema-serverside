const Discussion = require("../models/discussionModel");

class DiscussionController {
  static async create(req, res, next) {
    try {
      const { discussion } = req.body;
      const response = await Discussion.create({
        userId: req.decoded.id,
        discussion,
      });

      req.io.emit("newDiscussion");
      res.status(201).json({
        data: response,
        message: "Discussion has been created",
        status: 201,
      });
    } catch (error) {
      next(error);
    }
  }

  static async find(req, res, next) {
    try {
      const response = await Discussion.find()
        .populate("userId")
        .populate({
          path: "comments",
          populate: {
            path: "userId",
          },
        });
      res.status(200).json({
        data: response,
        message: "Successful get all data discussion",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const { discussion } = req.body;
      const id = req.params.discusId;
      const update = {
        discussion,
      };
      const option = {
        new: true,
      };
      const response = await Discussion.findByIdAndUpdate(id, update, option);
      res.status(200).json({
        data: response,
        message: "Discussion has been updated",
        status: 200,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params.discusId;
      const response = await Discussion.findByIdAndDelete(id);
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

module.exports = DiscussionController;
