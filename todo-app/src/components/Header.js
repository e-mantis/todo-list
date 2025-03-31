import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import buttonStyles from "./Button.module.scss";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className={styles["c-header__container"]}>
      <nav className={styles["c-header"]}>
        <div className={styles["c-header__links"]}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles["c-header__link"]} ${
                isActive ? styles.active : "c-link--active"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${styles["c-header__link"]} ${
                isActive ? styles.active : "c-link--active"
              }`
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles["c-header__link"]} ${
                isActive ? styles.active : "c-link--active"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${styles["c-header__link"]} ${
                isActive ? styles.active : "c-link--active"
              }`
            }
          >
            Tasks
          </NavLink>
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className={buttonStyles["c-button"]}>
            Logout
          </button>
        )}
      </nav>{" "}
    </div>
  );
};

export default Header;
