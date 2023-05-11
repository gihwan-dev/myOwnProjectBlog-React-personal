import styles from "./UserMain.module.css";
import UserMainBodyLayout from "./UserMainBody/UserMainBodyLayout";
import TodoInfoList from "./UserMainComponents/TodoInfoList";
import UserInfo from "./UserMainComponents/UserInfo";
import WeekInfo from "./UserMainComponents/WeekInfo";
import SelectUserPage from "./UserMainLogin/SelectUserPage";
import { useAppSelector, useAppDispatch } from "../../app/hook";
import { userActions } from "../../../store/user";
import { useEffect } from "react";
import { userListActions } from "../../../store/users";

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

  const onSelectHandler = async (user: User) => {
    dispatch(userActions.login(user));
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userJob", user.job);
    const res = await fetch("http://localhost:8080/project/userList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: localStorage.getItem("projectId"),
        name: user.name,
        isLoged: true,
      }),
    });
    if (res.status !== 200) {
      window.alert("실패했습니다. 다시 시도해주세요.");
    }
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
