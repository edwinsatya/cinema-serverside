const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const discussionSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    discussion: {
      type: String,
      required: [true, "Cant be Empty"],
    },
    date: {
      type: Date,
      default: new Date(),
    },
    comments: {
      type: [{ type: ObjectId, ref: "Comment" }],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Discussion = model("Discussion", discussionSchema);

module.exports = Discussion;
