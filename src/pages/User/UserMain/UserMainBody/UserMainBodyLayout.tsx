import ContentList from "./BodyContent/ContentList";
import UserMainBodyNav from "./UserMainBodyNav";
import styles from "./UserMainBodyLayout.module.css";
import UserList from "./BodyContent/UserList/UserList";
import { useState } from "react";

const UserMainBodyLayout = () => {
  const [current, setCurrent] = useState("Todo");

  const navClickHandler = (state: string) => {
    if (state === "Todo") {
      setCurrent("Todo");
    } else if (state === "Doing") {
      setCurrent("Doing");
    } else {
      setCurrent("Done");
    }
  };

  return (
    <div className={styles.total}>
      <UserMainBodyNav navClickHandler={navClickHandler} />
      <div className={styles.body}>
        <div className={styles.scroll}>
          <ContentList type={current} />
        </div>
        <UserList />
      </div>
    </div>
  );
};

export default UserMainBodyLayout;
