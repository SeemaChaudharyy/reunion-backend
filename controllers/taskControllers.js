const Task = require("../models/task");

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const tasks = await Task.find({ userId: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);
    const count = await Task.countDocuments({ userId: req.user.id });

    res.status(200).json({ tasks, totalPages: Math.ceil(count / limit) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, userId: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
