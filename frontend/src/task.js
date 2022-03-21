import React from "react";
import { Paper } from "@mui/material";
import { format } from "date-fns";
import { Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Task(props) {
  const { task, index } = props;
  const deadline = format(new Date(task.deadline), "MM/dd/yyyy 'at' h:mm a");

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
            <span><DeleteIcon/><EditIcon/></span>
          </Paper>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
