import React, { useState } from "react";
import Task from "./task";
import TaskForm from "./task_form";
import AddIcon from "@mui/icons-material/Add";
import { Button, Modal } from "@mui/material";
import "./task_index.css";
import { Droppable } from "react-beautiful-dnd";

function TaskIndex(props) {
  const { tasks, addTask, removeTask, category } = props;
  
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

      <Droppable droppableId={category}>
        {(provided) => (
          <ul
            className="tasks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.length === 0
              ? null
              : tasks.map((task, index) => {
                  return <Task task={task} index={index} key={task._id} removeTask={removeTask} addTask={addTask}
                  formType={"Edit"} />;
                })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>

      <Modal open={open} onClose={handleOpen}>
        <div>
          <TaskForm
            addTask={addTask}
            formType={"Create"}
            handleOpen={handleOpen}
          />
        </div>
      </Modal>
    </div>
  );
}

export default TaskIndex;
