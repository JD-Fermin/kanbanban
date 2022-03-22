const express = require("express");
const router = express.Router();
const Column = require("../../models/Column");

router.get("/", (req, res) => {
    Column.find({}, (err, columns) => {
        let columnMap = {};

        columns.forEach((column) => columnMap[column.status] = column);
    
        res.send(columnMap);
    });
});

router.post("/", (req, res) => {
    const newColumn = new Column(req.body);
    newColumn.save()
    .then((column) => {
        res.send(column);
    })
    .catch((err) => res.status(400).json(err))
});

router.patch("/:id", (req, res) => {
    Column.findByIdAndUpdate(req.params.id, {$set:{
        order: req.body.order
      }}, (err, docs) => {
        if(err) {
          res.send(err)
          return;
        }
        
        res.send({
            ...docs, order: req.body.order
        });
      })
});


module.exports = router;