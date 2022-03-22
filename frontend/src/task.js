import React, { useState } from "react";
import { Paper, Modal } from "@mui/material";
import { format } from "date-fns";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteTask } from "./task_api_utils";
import TaskForm from "./task_form";

function Task(props) {
  const { task, index, removeTask, addTask, formType } = props;
  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(!open);
  }
  const deadline = format(new Date(task.deadline), "MM/dd/yyyy 'at' h:mm a");

  function handleDelete(task) {
    deleteTask(task._id).then((res) => removeTask(res));
  }
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Paper
            variant="contained"
            elevation={4}
            sx={{ bgcolor: "#fee4c3" }}
            className="task"
          >
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>{deadline}</p>
            <span>
              <DeleteIcon
                onClick={() => handleDelete(task)}
                sx={{ cursor: "pointer" }}
              />
              <EditIcon onClick={handleOpen} />
            </span>
          </Paper>
          <Modal open={open} onClose={handleOpen}>
            <div>
              <TaskForm
                addTask={addTask}
                formType={formType}
                handleOpen={handleOpen}
              />
            </div>
          </Modal>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
