const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SubtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' 
  }
});

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"]
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subtasks: {
    type: [SubtaskSchema],
    default: []
  },
  comments: {
    type: [CommentSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
