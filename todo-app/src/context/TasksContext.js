import { createContext, useState, useEffect, useContext } from "react";

const TasksContext = createContext();
const API_URL = "http://localhost:5002/tasks";

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // load tasks
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = async (task) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    setTasks((prev) => [...prev, newTask]);
  };

  const removeTask = async (taskId) => {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const updateTask = async (taskId, updatedFields) => {
    const res = await fetch(`${API_URL}/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    if (!res.ok) return console.error("Failed to update task");

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    );
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    updateTask(taskId, { completed: !task.completed });
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, removeTask, updateTask, toggleTaskCompletion }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
