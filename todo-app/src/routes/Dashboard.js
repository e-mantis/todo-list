import { useEffect, useState } from "react";
import ToDoList from "../components/ToDoList.js";
import AddTask from "../components/AddTask.js";
import { isTaskValid } from "../helpers";

const API_URL = "http://localhost:5002/tasks";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async (taskObject) => {
    if (!isTaskValid(taskObject)) {
      console.log("Invalid task:", taskObject);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskObject),
      });

      if (!res.ok) {
        throw new Error(`Failed to add task: ${res.statusText}`);
      }

      const addedTask = await res.json();
      setTasks([...tasks, addedTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const removeTask = async (taskId) => {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = async (taskId, updatedFields) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    if (updatedFields.text && typeof updatedFields.text !== "string") {
      console.error("🚨 Text must be a string!", updatedFields.text);
      return;
    }

    const updatedTask = { ...taskToUpdate, ...updatedFields };

    const res = await fetch(`${API_URL}/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    if (!res.ok) {
      console.error("Error updating task:", res.statusText);
      return;
    }

    setTasks(tasks.map((t) => (t.id === taskId ? updatedTask : t)));
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    updateTask(taskId, { completed: !task.completed });
  };

  return (
    <div>
      <h1>✍️ Task Dashboard</h1>
      <AddTask add={addTask} />
      <ToDoList
        tasks={tasks}
        updateTask={updateTask}
        removeTask={removeTask}
        toggleTaskCompletion={toggleTaskCompletion}
      />
    </div>
  );
}
