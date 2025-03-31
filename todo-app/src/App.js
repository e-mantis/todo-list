import Header from "./components/Header.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./App.module.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login.js";
import Dashboard from "./routes/Dashboard.js";
import Tasks from "./routes/Tasks";
import { TasksProvider } from "./context/TasksContext";
import ProtectedLayout from "./routes/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <Router>
          <Header />
          <div className={styles["c-container"]}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
