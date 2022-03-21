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

router.delete("/:id", async (req, res) => {
  Task.findByIdAndDelete(req.params.id, (err, docs) => {
    if (err) res.send(err);
    res.send(docs);
  });
});

router.patch("/:id", async (req, res) => {
    Task.findByIdAndUpdate(req.params.id, {$set:{
      name: req.body.name,
      description: req.body.description,
      deadline: req.body.deadline,
      status: req.body.status
    }}, (err, docs) => {
      if(err) res.send(err);
      res.send(req.body);
    })

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
