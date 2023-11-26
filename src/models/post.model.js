import mongoose from "mongoose"

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    photos: [
      {
        type: String,
      },
    ],
    videos: [
      {
        type: String,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
)

export const Post = mongoose.model("Post", postSchema)
