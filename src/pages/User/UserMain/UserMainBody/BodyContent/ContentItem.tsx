import { LinearProgress } from "@mui/material";
import styles from "./ContenItem.module.css";
import { createSearchParams, useNavigate } from "react-router-dom";

const ContentItem: React.FC<{
  title: string;
  done: number;
  total: number;
  startDate: string;
  endDate: string;
}> = (props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate({
      pathname: "/user/detail",
      search: createSearchParams({
        title: props.title,
        done: props.done.toString(),
        total: props.total.toString(),
        startDate: props.startDate,
        endDate: props.endDate,
      }).toString(),
    });
  };

  return (
    <div
      className={styles.item}
      onClick={onClickHandler}
    >
      <div className={styles.text}>
        <p className={styles.title}>{props.title}</p>
        <p className={styles.amount}>
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
