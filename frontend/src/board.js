import React, { useEffect, useState } from "react";
import TaskIndex from "./task_index";
import { fetchTasks } from "./task_api_utils";
import { Container } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./board.css";
function Board(props) {
  const [tasks, setTasks] = useState([]);

  function filterTasks(tasks, status) {
    return tasks.filter((task) => task.status === status);
  }

  let todos = filterTasks(tasks, "Todo");
  let inProgress = filterTasks(tasks, "In Progress");
  let completed = filterTasks(tasks, "Completed");

  useEffect(() => {
    fetchTasks().then((res) => {
      let newTasks = Object.keys(res).length === 0 ? [] : Object.values(res);
      setTasks(newTasks);
    });
  }, [tasks.length]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  return (
    <Container id="board">
      <DragDropContext>
        <TaskIndex addTask={addTask} tasks={todos} category={"Todo"} />
        <TaskIndex
          addTask={addTask}
          tasks={inProgress}
          category={"In Progress"}
        />
        <TaskIndex addTask={addTask} tasks={completed} category={"Completed"} />
      </DragDropContext>
    </Container>
  );
}

export default Board;
