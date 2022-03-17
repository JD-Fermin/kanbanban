import React, { useState } from "react";
import { DateTimePicker } from "@mui/lab";
import { Button, TextField, Select, InputLabel, MenuItem } from "@mui/material";
import { createTask } from "./task_api_utils"
function TaskForm(props) {
  const { addTask } = props;
  const [task, setTask] = useState({
    name: "",
    description: "",
    deadline: new Date(),
    status: "Todo",
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

  function handleStatusChange(e) {
    setTask({ ...task, status: e.target.value });
  }

  function handleSubmit(task) {
    createTask(task)
      .then((res) => addTask(res));
    setTask({
      name: "",
      description: "",
      deadline: new Date(),
      status: "Todo",
    });
  }

  return (
    <div>
      <form>
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
          label="Date and Time"
          value={task.deadline}
          onChange={handleDateTimeChange}
        />

        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Status
        </InputLabel>
        <Select
          value={task.status ? task.status : " "}
          inputProps={{
            name: "status",
            id: "uncontrolled-native",
          }}
          onChange={handleStatusChange}
        >
          <MenuItem value={"Todo"}>Todo</MenuItem>
          <MenuItem value={"In Progress"}>In progress</MenuItem>
          <MenuItem value={"Done"}>Done</MenuItem>
        </Select>

        <Button variant="contained" onClick={() => handleSubmit(task)}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;
