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
                isActive ? styles["c-header__link--active"] : ""
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${styles["c-header__link"]} ${
                isActive ? styles["c-header__link--active"] : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${styles["c-header__link"]} ${
                isActive ? styles["c-header__link--active"] : ""
              }`
            }
          >
            Tasks
          </NavLink>
        </div>
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className={`${buttonStyles["c-button"]} ${buttonStyles["c-button--login"]}`}
            >
              <i className="bi bi-person-x c-icon"></i>
            </button>
          ) : (
            <NavLink
              to="/login"
              className={`${buttonStyles["c-button"]} ${buttonStyles["c-button--login"]}`}
            >
              <i className="bi bi-person c-header__icon"></i>
            </NavLink>
          )}
        </div>
      </nav>{" "}
    </div>
  );
};

export default Header;
