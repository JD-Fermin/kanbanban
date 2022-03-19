import React from "react";
import { Paper } from '@mui/material';
import { format } from 'date-fns';
function Task(props) {
  const { task } = props;
  const deadline = format(new Date(task.deadline), "MM/dd/yyyy 'at' h:mm a");
  return (
    <Paper draggable variant="contained" elevation={4} sx={{bgcolor: '#fee4c3'}} className="task" >
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>{deadline}</p>
    </Paper>
  );
}

export default Task;
