const express = require("express");
const { mongoose } = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const app = express();
require("./db/database");
const port = process.env.PORT || 4000;

app.use(bodyparser.json());
app.use(cors());

const taskSchema = mongoose.Schema({
  taskTitle: String,
  taskDate: String,
  isCompleted: Boolean,
});

const model = mongoose.model("tasks", taskSchema);

app.post("/task", async (req, res) => {
  try {
    const data = new model({
      taskTitle: req.body.taskTitle,
      taskDate: req.body.taskDate,
      isCompleted: req.body.isCompleted,
    });

    await data.save();
    return res.json(data);
  } catch (error) {
    return res.json(error);
  }
});

app.get("/getAllTasks", async (req, res) => {
  try {
    const data = await model.find();
    return res.json(data);
  } catch (error) {
    return res.status(500);
  }
});

app.post("/taskCompleted", async (req, res) => {
  try {
    const task = await model.findByIdAndUpdate(
      req.body.id,
      {
        isCompleted: req.body.isCompleted,
      },
      { new: true }
    );
    await task.save();
    return res.status(201);
  } catch (error) {
    return res.status(500);
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    await model.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Task Deleted Successfully!" });
  } catch (error) {
    return res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
