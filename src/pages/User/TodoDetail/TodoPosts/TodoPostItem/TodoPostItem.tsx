import styles from "./TodoPostItem.module.scss";

const TodoPostItem: React.FC<{
  title: string;
  description: string;
}> = (props) => {
  return (
    <div className={styles.item}>
      <p>{props.title}</p>
      <p>{props.description}</p>
    </div>
  );
};

export default TodoPostItem;
