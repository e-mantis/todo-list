import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import buttonStyles from "./Button.module.scss";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // ✅ Clear login state
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
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
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
