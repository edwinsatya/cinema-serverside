const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const commentSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: [true, "Cant be Empty"],
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
