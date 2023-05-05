import { useSearchParams } from "react-router-dom";
import styles from "./TodoTotal.module.scss";

const TodoTotal = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className={styles.container}>
      <p className={styles.title}>Title: {searchParams.get("title")}</p>
      <div className={styles.todo}>
        <p>Done: {searchParams.get("done")}</p>
        <p>Total: {searchParams.get("total")}</p>
      </div>
      <div className={styles.date}>
        <p>Start Date: {searchParams.get("startDate")}</p>
        <p>End Date: {searchParams.get("endDate")}</p>
      </div>
    </div>
  );
};

export default TodoTotal;
