import TodoPostItem from "./TodoPostItem/TodoPostItem";
import styles from "./TodoPosts.module.scss";

type TodoPost = {
  title: string;
  description: string;
};

const TodoPosts: React.FC<{
  dummyData: TodoPost[];
}> = (props) => {
  return (
    <div className={styles.container}>
      <ul>
        {props.dummyData.map((data) => {
          return (
            <li>
              <TodoPostItem
                title={data.title}
                description={data.description}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoPosts;
