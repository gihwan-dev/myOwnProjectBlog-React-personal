import ContentList from "./BodyContent/ContentList";
import UserMainBodyNav from "./UserMainBodyNav";
import styles from "./UserMainBodyLayout.module.css";

const UserMainBodyLayout = () => {
  return (
    <div className={styles.total}>
      <UserMainBodyNav />
      <div className={styles.scroll}>
        <ContentList type="Todo" />
      </div>
    </div>
  );
};

export default UserMainBodyLayout;
