// const { Router } = require("express");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7000;
const mongoose = require("mongoose");
require("dotenv").config();
const taskRouter = require("./routes/taskRouter");
// const Tasks = require("./models/Tasks");
const routeNotFound = require("./middleware/404");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//for re-factoring our router link '/tasks'
app.use("/tasks", taskRouter);
app.use(routeNotFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT} and DB connected`);
    });
  })
  .catch((err) => console.log(err));
