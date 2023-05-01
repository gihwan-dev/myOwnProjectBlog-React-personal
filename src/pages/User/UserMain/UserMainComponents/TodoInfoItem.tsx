import { Add, ListAlt } from "@mui/icons-material";
import { Schedule } from "@mui/icons-material";
import { PlaylistRemove } from "@mui/icons-material";
import styles from "./TodoInfoItem.module.css";

const TodoInfoItem: React.FC<{
  id: "done" | "doing" | "remain" | "added";
  amount: number;
}> = (props) => {
  const item = {
    done: {
      icon: (
        <ListAlt
          style={{
            color: "rgba(255, 183, 116, 1)",
            height: "3rem",
            width: "3rem",
          }}
        />
      ),
      title: "현재까지 완료된 TodoList",
      amount: props.amount,
    },
    doing: {
      icon: (
        <Schedule
          style={{
            color: "rgba(125, 236, 107, 1)",
            height: "3rem",
            width: "3rem",
          }}
        />
      ),
      title: "진행중",
      amount: props.amount,
    },
    remain: {
      icon: (
        <PlaylistRemove
          style={{
            color: "rgba(214, 93, 93, 1)",
            height: "3rem",
            width: "3rem",
          }}
        />
      ),
      title: "총 남은 TodoList",
      amount: props.amount,
    },
    added: {
      icon: (
        <Add
          style={{
            color: "rgba(101, 98, 222, 1)",
            height: "3rem",
            width: "3rem",
          }}
        />
      ),
      title: "추가된 TodoList",
      amount: props.amount,
    },
  };

  const content = item[props.id];

  return (
    <div className={styles.item}>
      {content.icon}
      <div className={styles.text}>
        <p className={styles.amount}>{content.amount}</p>
        <p className={styles.title}>{content.title}</p>
      </div>
    </div>
  );
};
export default TodoInfoItem;
