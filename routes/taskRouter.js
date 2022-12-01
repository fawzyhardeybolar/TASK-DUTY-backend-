const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskControllers");

// router.get("/tasks", getTasks);
// router.post("/tasks", createTask);
// router.get("/tasks/:taskId", getTask);
// router.patch("/tasks/:taskId", updateTask);
// router.delete("/tasks/:taskId", deleteTask);

router.route("/").get(getTasks).post(createTask);
router.route("/:taskId").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
