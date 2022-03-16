import React, { useState } from "react";
import { DateTimePicker } from "@mui/lab";
import { Button, TextField, Select, InputLabel, MenuItem } from "@mui/material";
function TaskForm(props) {
  const { addTask } = props;
  const [task, setTask] = useState({
    id: Date.now(),
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
    addTask(task);
    setTask({
      id: Date.now(),
      name: "",
      description: "",
      deadline: new Date(),
      status: "",
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
          label="DateTimePicker"
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
