import React, { useState, useEffect } from "react";
import TaskIndex from "./task_index";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchTasks } from "./task_api_utils";
import { Grid } from "@mui/material";
import { useQuery } from "react-query";

function Board(props) {
  const [tasks, setTasks] = useState([]);
  const { data } = useQuery("tasks", fetchTasks, {refetchOnWindowFocus: false});

  useEffect(() => {
    if (data) setTasks(Object.values(data));
  }, [data]);



  function handleDragEnd(result) {
    console.log("yes");
  }

  function addTask(toAddTask) {
    const index = tasks.findIndex((task) => task._id === toAddTask._id);
    if (index === -1) {
      setTasks([...tasks, toAddTask]);
    } else {
      tasks[index] = toAddTask;
      setTasks([...tasks]);
    }
  }

  function removeTask(toDeleteTask) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task._id !== toDeleteTask._id)
    );
  }

  console.log(data, "data");
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container alignItems={"center"} justifyContent={"space-evenly"}>
        <Grid item md={4} sm={6} xs={12} marginTop={"2.5vh"}>
          <TaskIndex
            tasks={tasks.filter((task) => task.status === "Todo")}
            addTask={addTask}
            category={"Todo"}
            removeTask={removeTask}
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12} marginTop={"2.5vh"}>
          <TaskIndex
            tasks={tasks.filter((task) => task.status === "In Progress")}
            addTask={addTask}
            category={"In Progress"}
            removeTask={removeTask}
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12} marginTop={"2.5vh"}>
          <TaskIndex
            tasks={tasks.filter((task) => task.status === "Completed")}
            addTask={addTask}
            removeTask={removeTask}
            category={"Completed"}
          />
        </Grid>
      </Grid>
    </DragDropContext>
  );
}

export default Board;
