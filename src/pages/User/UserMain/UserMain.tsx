import styles from "./UserMain.module.css";
import UserMainBodyLayout from "./UserMainBody/UserMainBodyLayout";
import TodoInfoList from "./UserMainComponents/TodoInfoList";
import UserInfo from "./UserMainComponents/UserInfo";
import WeekInfo from "./UserMainComponents/WeekInfo";
import SelectUserPage from "./UserMainLogin/SelectUserPage";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { userActions } from "../../../store/user";
import { useEffect } from "react";

type User = {
  name: string;
  job: string;
};

const UserMain = () => {
  const userName = useAppSelector((state) => state.user.name);
  const userJob = useAppSelector((state) => state.user.job);
  const isLoged = useAppSelector((state) => state.user.isLoged);
  const users = useAppSelector((state) => state.userList.userList);

  const user = {
    name: userName,
    job: userJob,
  };

  const dispatch = useAppDispatch();

  const onSelectHandler = (user: User) => {
    dispatch(userActions.login(user));
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userJob", user.job);
  };

  useEffect(() => {
    if (localStorage.getItem("userName") !== null) {
      const savedUser = {
        name: localStorage.getItem("userName")!,
        job: localStorage.getItem("userJob")!,
      };

      dispatch(userActions.login(savedUser));
    }
  }, []);

  const content = isLoged ? (
    <div className={styles.page}>
      <div className={styles.info}>
        <UserInfo
          name={user ? user.name : ""}
          job={user ? user.job : ""}
        />
        <TodoInfoList />
        <WeekInfo />
      </div>
      <div className={styles.todoInfo}>
        <UserMainBodyLayout />
      </div>
    </div>
  ) : (
    <SelectUserPage
      users={users}
      onSelect={onSelectHandler}
    />
  );
  return <>{content}</>;
};

export default UserMain;
