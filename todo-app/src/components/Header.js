import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles["c-header"]}>
      <h1>✍️ To-do List</h1>
    </header>
  );
};

export default Header;
