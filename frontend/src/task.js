import React from "react";
import  {format } from 'date-fns'
function Task(props) {
  const { task } = props;
  const deadline = format(new Date(task.deadline), "MM/dd/yyyy 'at' h:mm a");
  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>{deadline}</p>
      <p>{task.status}</p>
    </div>
  );
}

export default Task;
