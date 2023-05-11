import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../app/hook";
import UserItem from "./UserItem";
import styles from "./UserList.module.css";
import { userState } from "../../../../../../store/user";

import { userListActions, userListState } from "../../../../../../store/users";

const UserList = () => {
  const user_list = useAppSelector((state) => state.userList.userList);

  const dispatch = useAppDispatch();

  const getUserList = async () => {
    const res = await fetch(
      `http://localhost:8080/project/userList/${localStorage.getItem(
        "projectId"
      )}`
    );
    if (res.status !== 200) {
      window.alert("실패했습니다. 다시 시도해주세요.");
    }
    const data = (await res.json()) as userListState;
    const updatedList = data.userList.map((user) => {
      return {
        name: user.name,
        job: user.job,
        isLoged: user.isLoged,
      };
    });
    dispatch(userListActions.setUserList({ userList: updatedList }));
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Team</p>
      </div>
      <ul>
        {user_list.map((item, index) => {
          return (
            <li key={item.name}>
              <UserItem
                isOn={item.isLoged}
                id={index + 1}
                name={item.name}
                position={item.job}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
