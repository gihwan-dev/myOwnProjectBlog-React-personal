import styles from "./UserMain.module.css";
import UserMainBodyLayout from "./UserMainBody/UserMainBodyLayout";
import TodoInfoList from "./UserMainComponents/TodoInfoList";
import UserInfo from "./UserMainComponents/UserInfo";
import WeekInfo from "./UserMainComponents/WeekInfo";

const UserMain = () => {
  return (
    <div className={styles.page}>
      <div className={styles.info}>
        <UserInfo />
        <TodoInfoList />
        <WeekInfo />
      </div>
      <div className={styles.todoInfo}>
        <UserMainBodyLayout />
      </div>
    </div>
  );
};

export default UserMain;
