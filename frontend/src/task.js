import React from "react";

function Task(props) {
  const { task } = props;
  
  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <p>{task.deadline.toDateString()}</p>
      <p>{task.status}</p>
    </div>
  );
}

export default Task;
