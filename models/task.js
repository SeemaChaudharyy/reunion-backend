const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  status: {
    type: String,
    enum: ["Pending", "Finished"],
    default: "Pending",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
});

module.exports = mongoose.model("Task", taskSchema);
