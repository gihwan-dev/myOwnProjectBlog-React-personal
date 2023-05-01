import { LinearProgress } from "@mui/material";
import styles from "./UserMainProgress.module.css";

const UserMainProgress = () => {
  return (
    <div className={styles.progress}>
      <p>진행률</p>
      <LinearProgress
        variant="determinate"
        value={76}
        className={styles.bar}
      />
      <div className={styles.detail}>
        <p className={styles.current}>76%</p>
        <p className={styles.rest}>24% 남음</p>
      </div>
    </div>
  );
};

export default UserMainProgress;
