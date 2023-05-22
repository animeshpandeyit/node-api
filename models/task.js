import mongoose, { get } from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    unique: true,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    // select: false,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// export const User = mongoose.model("User", schema, "apidata");
// export const User = mongoose.model("Task", schema);
export const Task = mongoose.model("Task", schema);