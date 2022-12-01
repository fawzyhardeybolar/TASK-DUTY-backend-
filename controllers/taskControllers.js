const Tasks = require("../models/Tasks");
const asyncWrapper = require("../middleware/asyncWrapper");

// authentication
// integrating with react
// building Apis

// get all tasks
const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find();
  res.status(200).json({ noOfTasks: tasks.length, data: tasks });
});

// create a task --> req.body
const createTask = asyncWrapper(async (req, res) => {
  console.log(req.body);
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(401).json({ msg: "pls provide the necessary values" });
  }

  const taskExist = await Tasks.findOne({ title });
  if (taskExist) {
    return res.status(401).json({ success: false, msg: "Title already exist" });
  }

  const task = await Tasks.create(req.body);
  // const task = await Tasks.create({title, description})
  res.status(200).json({ data: task });
});

// get a single task
const getTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await Tasks.findById({ _id: taskId });
  if (!task) {
    return res
      .status(401)
      .json({ msg: `The task with the id ${taskId} cannot be found` });
  }
  res.status(200).json({ data: task });
});

// updating a task --> req.body
const updateTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;
  const userBody = req.body;
  console.log(userBody);

  const updatedTask = await Tasks.findByIdAndUpdate({ _id: taskId }, userBody, {
    new: true,
    runValidators: true,
  });
  
  if (!updatedTask) {
    return res
      .status(404)
      .json({ msg: `The task with the id: ${taskId} cannot be found` });
  }
  res.status(200).json({ msg: "Task Updated", data: updatedTask });
});

// deleting a task
const deleteTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const delTask = await Tasks.findByIdAndDelete({ _id: taskId });
  if (!delTask) {
    return res
      .status(401)
      .json({ msg: `Pls provide a valid Id to delete task` });
  }
  res.status(200).json({ msg: "Task deleted", deletedTask: delTask });
});

module.exports = { getTasks, createTask, getTask, deleteTask, updateTask };
