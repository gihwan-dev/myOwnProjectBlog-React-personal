import TodoInfoItem from "./TodoInfoItem";
import styles from "./TodoInfoList.module.css";

const TodoInfoList = () => {
  return (
    <div className={styles.todoInfoList}>
      <div className={styles.item1}>
        <TodoInfoItem
          id="done"
          amount={26}
        />
      </div>
      <div className={styles.item2}>
        <TodoInfoItem
          id="doing"
          amount={13}
        />
      </div>
      <div className={styles.item3}>
        <TodoInfoItem
          id="remain"
          amount={76}
        />
      </div>
      <div className={styles.item4}>
        <TodoInfoItem
          id="added"
          amount={3}
        />
      </div>
    </div>
  );
};

export default TodoInfoList;
