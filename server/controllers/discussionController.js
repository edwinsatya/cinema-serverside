const Discussion = require("../models/discussionModel");
const filterDirtyWord = require("../helpers/filterDirtyWord");

class DiscussionController {
  static async create(req, res, next) {
    try {
      const { discussion, replied } = req.body;
      let response;
      if (!replied) {
        response = await Discussion.create({
          userId: req.decoded.id,
          discussion: filterDirtyWord(discussion),
        });
      } else {
        response = await Discussion.create({
          userId: req.decoded.id,
          discussion: filterDirtyWord(discussion),
          replied,
        });
      }

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
      let response;
      if (req.query.discusId) {
        const discusId = req.query.discusId;
        response = await Discussion.findById(discusId)
          .populate({ path: "userId", select: "email name color" })
          .populate({
            path: "replied",
            populate: {
              path: "userId",
              select: "email name color",
            },
          });
      } else {
        response = await Discussion.find()
          .populate({ path: "userId", select: "email name color" })
          .populate({
            path: "replied",
            populate: {
              path: "userId",
              select: "email name color",
            },
          });
      }
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
      req.io.emit("newDiscussion");
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
      req.io.emit("newDiscussion");
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
