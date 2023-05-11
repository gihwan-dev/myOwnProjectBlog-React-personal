import { NavLink } from "react-router-dom";
import styles from "./UserMainNavigation.module.css";

import { useAppDispatch } from "../../app/hook";
import { userActions } from "../../../store/user";

const UserMainNavigation = () => {
  const dispatch = useAppDispatch();

  const onLogoutHandler = async () => {
    dispatch(userActions.logout());

    const res = await fetch("http://localhost:8080/project/userList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_id: localStorage.getItem("projectId"),
        name: localStorage.getItem("userName"),
        isLoged: false,
      }),
    });
    if (res.status !== 200) {
      window.alert("실패했습니다. 다시 시도해주세요.");
    }
    localStorage.removeItem("userName");
    localStorage.removeItem("userJob");
    localStorage.removeItem("projectId");
  };

  return (
    <header className={styles.header}>
      <h1>Gihwan-dev</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/user"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
              end
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/calender"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              Meeting
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/user/ref"
              className={({ isActive }) => {
                return isActive ? styles.active : undefined;
              }}
            >
              References
            </NavLink>
          </li>
          <li className={styles.logout}>
            <NavLink
              to="/"
              onClick={onLogoutHandler}
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserMainNavigation;
