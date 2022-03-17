const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

router.get("/", (req, res) => {
    Task.find({}, (err, tasks) => {
        let taskMap = {};

        tasks.forEach((task) => taskMap[task._id] = task);

        res.send(taskMap);
    });
});

// router.get("/:id");

router.post("/", (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    description: req.body.description,
    deadline: req.body.deadline,
    status: req.body.status,
  });

  newTask.save()
    .then((task) => {
        res.send(task);
    })
    .catch((err) => res.status(400).json(err))
});

module.exports = router;
