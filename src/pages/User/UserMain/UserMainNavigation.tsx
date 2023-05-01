import { NavLink, useNavigate } from "react-router-dom";
import styles from "./UserMainNavigation.module.css";

const UserMainNavigation = () => {
  const navigate = useNavigate();
  const titleClickHandler = () => {
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
            <li>
              <NavLink
                to="/user/calender"
                className={({ isActive }) => {
                  return isActive ? styles.active : undefined;
                }}
              >
                Calender
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserMainNavigation;
