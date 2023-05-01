import styles from "./UserInfo.module.css";
import UserMainProgress from "./UserMainProgress";

const UserInfo = () => {
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
          <p className={styles.name}>홍길동</p>
          <p className={styles.job}>백엔드 개발</p>
        </div>
      </div>
      <UserMainProgress />
    </div>
  );
};

export default UserInfo;
