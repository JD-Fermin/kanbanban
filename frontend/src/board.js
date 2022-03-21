import React, { useEffect, useState } from "react";
import TaskIndex from "./task_index";
import { Container } from "@mui/material";
import "./board.css";

function Board(props) {
  
// Needs modification for multiple array division
//updat tasks to split to three arrays
// make itdynamic
  return (
    <Container id="board">
        <TaskIndex  category={"Todo"} />
        {/* <TaskIndex
          addTask={addTask}
          tasks={inProgress}
          category={"In Progress"}
        />
        <TaskIndex addTask={addTask} tasks={completed} category={"Completed"} /> */}
    </Container>
  );
}

export default Board;
