import { NavLink, useNavigate } from "react-router-dom";
import styles from "./UserMainNavigation.module.css";

import { useAppDispatch } from "../../app/hook";
import { userActions } from "../../../store/user";

const UserMainNavigation = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const titleClickHandler = () => {
    dispatch(userActions.logout());
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <h1 onClick={titleClickHandler}>Gihwan-dev</h1>
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
        </ul>
      </nav>
    </header>
  );
};

export default UserMainNavigation;
