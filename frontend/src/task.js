import React from "react";
import { Paper } from "@mui/material";
import { format } from "date-fns";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { deleteTask } from "./task_api_utils";

function Task(props) {
  const { task, index, removeTask } = props;
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
              <EditIcon />
            </span>
          </Paper>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
