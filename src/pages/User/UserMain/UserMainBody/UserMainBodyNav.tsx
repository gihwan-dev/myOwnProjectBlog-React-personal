import { useState } from "react";
import styles from "./UserMainBodyNav.module.css";

const UserMainBodyNav: React.FC<{
  navClickHandler: (state: string) => void;
}> = (props) => {
  const [contentType, setContentType] = useState("Todo");

  const todoClickHandler = () => {
    setContentType("Todo");
    props.navClickHandler("Todo");
  };

  const doingClickHandler = () => {
    setContentType("Doing");
    props.navClickHandler("Doing");
  };

  const doneClickHandler = () => {
    setContentType("Done");
    props.navClickHandler("Done");
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul>
          <li
            className={contentType === "Todo" ? styles.active : undefined}
            onClick={todoClickHandler}
          >
            Todo
          </li>
          <li
            className={contentType === "Doing" ? styles.active : undefined}
            onClick={doingClickHandler}
          >
            Doing
          </li>
          <li
            className={contentType === "Done" ? styles.active : undefined}
            onClick={doneClickHandler}
          >
            Done
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserMainBodyNav;
