import React, { useEffect, useState } from "react";
import Task from "./task";
import TaskForm from "./task_form";
import { fetchTasks } from "./task_api_utils";
function Board(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(res => {
      let newTasks = Object.keys(res).length === 0 ? [] : Object.values(res);
      setTasks(newTasks);
    })
    
    
  }, [tasks.length]);

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  return (
    <div id="board">
        {
            tasks.length === 0 ? null :
            tasks.map((task) => (
                <Task key={task._id} task={task} />
            ))
        }
        <TaskForm addTask={addTask} />
    </div>
  );
}

export default Board;
