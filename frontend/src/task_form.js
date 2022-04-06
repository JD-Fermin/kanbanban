import React, { useState } from "react";
import { DateTimePicker } from "@mui/lab";
import { Button, TextField, Box } from "@mui/material";
import { createTask, updateTask } from "./task_api_utils";

function TaskForm(props) {
  const { addTask, category, handleOpen, formType, editTask } = props;
  const [task, setTask] = useState({
    name:  editTask ? editTask.name : "" ,
    description: editTask ? editTask.description : "",
    deadline: editTask ? new Date(editTask.deadline) : new Date(),
    status: category,
  });

  function handleDateTimeChange(newDateTime) {
    setTask({ ...task, deadline: newDateTime });
  }

  function handleNameChange(e) {
    setTask({ ...task, name: e.target.value });
  }

  function handleDescriptionChange(e) {
    setTask({ ...task, description: e.target.value });
  }

  function handleSubmit(task) {
    console.log(task)
    if (formType === "Create") {
      createTask(task).then((res) => addTask(res));
      
    }

    if (formType === "Edit") {
      const taskWithId = {...task, _id: editTask._id}
      updateTask(taskWithId).then((res) => addTask(res));
    }
    setTask({
      name: "",
      description: "",
      deadline: new Date(),
      status: category,
    });

    handleOpen();
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "white",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <h3>{formType}</h3>
      <form className="task-form">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={task.name}
          onChange={handleNameChange}
        />
        <TextField
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={task.description}
          onChange={handleDescriptionChange}
        />

        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Deadline"
          value={task.deadline}
          onChange={handleDateTimeChange}
        />

        <Button variant="contained" onClick={() => handleSubmit(task)}>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default TaskForm;
