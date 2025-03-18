import Header from "./components/Header.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login.js";
import Dashboard from "./routes/Dashboard.js";

const API_URL = "http://localhost:5002/tasks"; 

function App() {
  const [tasks, setTasks] = useState([]);

 
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const removeTask = async (taskId) => {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = async (taskId, updatedFields) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    // ✅ If `text` exists, ensure it's a string
    if (updatedFields.text && typeof updatedFields.text !== "string") {
      console.error("🚨 ERROR: text must be a string!", updatedFields.text);
      return;
    }

    const updatedTask = { ...taskToUpdate, ...updatedFields };

    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    if (!response.ok) {
      console.error("Error updating task:", response.statusText);
      return;
    }

    setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
  };



  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <div className={styles["c-container"]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard
                  tasks={tasks}
                  addTask={handleAddTask}
                  removeTask={removeTask}
                  updateTask={updateTask}
               
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
