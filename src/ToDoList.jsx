import React, { useState } from "react";

function ToDoList() {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function Task (id, text, completed) {
        this.id = id; 
        this.text = text; 
        this.completed = completed; 
    }

    function addTask () {

        if(newTask.trim() !== "") {
            const addTask = new Task(tasks.length+1, newTask, false);
            setTasks(t => [...t,addTask]);
            setNewTask("")
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }

    function deleteTask(index) {

        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if(index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index -1]] =[updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length-1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index],updatedTasks[index +1]] =[updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function completeTask (index) {
        let updatedTasks = tasks.map((task, i) => {
            if (i === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        if(updatedTasks[index].completed){
            const completedTask = updatedTasks.splice(index, 1)[0];
            updatedTasks = [...updatedTasks,completedTask];
        }
        setTasks(updatedTasks);

    }

    return(<div className="to-do-list">

        <h1>To-Do-List</h1>

        <div> 
            <input 
                type = "text"
                placeholder="Enter a task..."
                value = {newTask}
                onChange = {handleInputChange}
                onKeyDown={handleKeyPress}/>

            <button
                className="add-button"
                onClick={addTask}
                
                >
                Add
            </button>
        </div>
        <ol> 
            {tasks.map((task, index) => 
                <li key = {index}>
                    <button 
                    className="complete-button"
                    onClick={() => completeTask(index)}>
                    Complete
                    </button>
                    <span type = "text" style = {{textDecoration: task.completed ? 
                    'line-through':'none'}}>
                    {task.text}
                    </span>
                    <div>
                        <button 
                            className="delete-button"
                            onClick={() => deleteTask(index)}>
                            Delete
                            </button>
                        <button 
                            className="move-button"
                            onClick={() => moveTaskUp(index)}>
                            UP
                            </button> 
                        <button 
                            className="move-button"
                            onClick={() => moveTaskDown(index)}>
                            Down
                            </button>    
                    </div>

                </li>
            )}
        </ol>
    </div>);
}  

export default ToDoList;
