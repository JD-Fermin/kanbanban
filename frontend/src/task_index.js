import React, { useState } from "react";
import Task from "./task";
import TaskForm from "./task_form";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal } from "@mui/material";
import "./task_index.css";
function TaskIndex(props) {
  const { tasks, addTask, category } = props;
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(!open);
  }
  return (
    <div className="category">
      <div className="category-header">
        <h2>{category}</h2>
        <span>
          <Button variant="contained" onClick={handleOpen}>
            <AddIcon />
          </Button>
        </span>
      </div>

      {tasks.length === 0
        ? null
        : tasks.map((task) => <Task key={task._id} task={task} />)}

      <Modal open={open} onClose={handleOpen}>
        <div>
          <TaskForm addTask={addTask} category={category} />
        </div>
      </Modal>
    </div>
  );
}

export default TaskIndex;
