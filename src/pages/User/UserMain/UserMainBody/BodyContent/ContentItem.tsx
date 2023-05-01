import { LinearProgress } from "@mui/material";
import styles from "./ContenItem.module.css";

const ContentItem: React.FC<{
  title: string;
  done: number;
  total: number;
  startDate: string;
  endDate: string;
}> = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.text}>
        <p>{props.title}</p>
        <p>
          {props.done}/{props.total}
        </p>
      </div>
      <LinearProgress
        variant="determinate"
        value={(props.done / props.total) * 100}
        className={styles.progressBar}
      />
      <div className={styles.date}>
        <p>{props.startDate}</p>
        <p>{props.endDate}</p>
      </div>
    </div>
  );
};

export default ContentItem;
