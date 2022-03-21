import React, { useState, useEffect } from "react";
import TaskIndex from "./task_index";
import "./board.css";
import { DragDropContext } from "react-beautiful-dnd";
import { fetchTasks } from "./task_api_utils";
function Board(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((res) => {
      let newTasks = Object.keys(res).length === 0 ? [] : Object.values(res);
      setTasks(newTasks);
    });
  }, [tasks.length]);

  function filterCategory(arr, category) {
    return arr.filter((ele) => ele.status === category);
  }
  
  function handleDragEnd(result) {
    
    console.log(result.source);
    console.log(result.destination);
    
  }

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div id="board">
        <TaskIndex tasks={filterCategory(tasks, "Todo")} addTask={addTask} category={"Todo"} />
        <TaskIndex tasks={filterCategory(tasks, "In Progress")} addTask={addTask} category={"In Progress"} />
        <TaskIndex tasks={filterCategory(tasks, "Completed")} addTask={addTask} category={"Completed"} />
      </div>
    </DragDropContext>
  );
}

export default Board;
