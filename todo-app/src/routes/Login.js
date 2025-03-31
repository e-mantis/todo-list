import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../components/AddTask.module.scss";
import buttonStyles from "../components/Button.module.scss";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin" && password === "admin") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Invalid login. Try again!");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <p> You're logged in </p>
          <div>
            <Link to="/dashboard" className={buttonStyles["c-button"]}>
              Go to Dashboard
            </Link>
          </div>
        </>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin} className={styles["c-add-task"]}>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${styles["c-add-task__input"]}`}
              required
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${styles["c-add-task__input"]}`}
              required
            />
            <button
              type="submit"
              className={`btn btn-theme-primary ${buttonStyles["c-button"]}`}
            >
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
