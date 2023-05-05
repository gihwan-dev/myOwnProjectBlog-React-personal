import styles from "./UserInfo.module.css";
import UserMainProgress from "./UserMainProgress";

const UserInfo: React.FC<{
  name: string;
  job: string;
}> = (props) => {
  return (
    <div className={styles["total-info"]}>
      <div className={styles["user-info"]}>
        <img
          className={styles.image}
          src="assets/images/profile1.jpg"
          width="80"
          height="80"
          alt="profile"
        />
        <div className={styles.detail}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.job}>{props.job}</p>
        </div>
      </div>
      <UserMainProgress />
    </div>
  );
};

export default UserInfo;
