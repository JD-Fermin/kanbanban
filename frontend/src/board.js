
import React, { useState } from 'react';
import Task from "./task";
function Board(props) {
    const [ tasks, setTasks ] = useState([]);

    return (
        <div id="board">
            <Task />
        </div>
    )
}

export default Board;
