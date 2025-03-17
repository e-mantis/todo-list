import { useState } from "react";
import Header from "./components/Header.js";
import ToDoList from "./components/ToDoList.js";
import AddTask from "./components/AddTask.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { isTaskValid } from "./helpers";
import styles from "./App.module.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const handleAddTask = (newTask) => {
    console.log("handleAddTask called with:", newTask); // ✅ Check if function is running
  
    if (!isTaskValid(newTask)) {
      console.log("Task is invalid"); // ✅ Check if validation is blocking it
      return;
    }
  
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];

      return updatedTasks;
    });
  };

  const updateTask = (index, newTaskText) => {
    if (!isTaskValid({ text: newTaskText })) return; 
  
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? { ...task, text: newTaskText } : task
      );
  
      setCompletedTasks((prev) => {
        const newCompleted = new Set(prev);
        newCompleted.delete(prevTasks[index].text);
        return newCompleted;
      });
  
      return updatedTasks;
    });
  };

  const removeTask = (index) => {
    setTasks((prevTasks) => {
      const taskToRemove = prevTasks[index].text;  // Get the correct task before updating

      setCompletedTasks((prev) => {
        const newCompleted = new Set(prev); //copy of completedTasks bc we should never modify a state directly
        newCompleted.delete(taskToRemove); // Use the correct reference, removes task from the completed list
        return newCompleted;
      });

      return prevTasks.filter((_, i) => i !== index); // Removes the task, (_, i) = bv. (task, i)
    });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <div className={styles["c-container"]}>
        <Header />
        <AddTask add={handleAddTask} />
        <ToDoList
          tasks={tasks}
          updateTask={updateTask}
          removeTask={removeTask}
          completedTasks={completedTasks}
        
          toggleTaskCompletion={toggleTaskCompletion}
        />
      </div>
    </>
  );
}
export default App;
