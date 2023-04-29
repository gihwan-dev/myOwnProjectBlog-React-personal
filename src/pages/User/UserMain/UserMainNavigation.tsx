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
              end
            >
              Overview
            </NavLink>
            <li>
              <NavLink to="/user">Calender</NavLink>
            </li>
            <li>
              <NavLink to="/user">References</NavLink>
            </li>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UserMainNavigation;
