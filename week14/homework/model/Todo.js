const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: false,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: false,
  },
  completed: {
    type: Boolean,
    required: true,
    unique: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
