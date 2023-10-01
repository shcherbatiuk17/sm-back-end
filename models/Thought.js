const { Schema, model } = require('mongoose');

// Define the Comment Schema
const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  commentText: {
    type: String,
    required: true,
    maxlength: 280,
  },
  commenterName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toISOString(),
  },
});

// Define the Post Schema
const postSchema = new Schema(
  {
    postContent: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    creationDate: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toISOString(),
    },
    authorName: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Define a virtual property for commentCount
postSchema.virtual('commentCount').get(function () {
  return this.comments.length;
});

// Create the Post model
const Post = model('Post', postSchema);

module.exports = Post;
