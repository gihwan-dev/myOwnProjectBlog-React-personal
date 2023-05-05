import TodoPosts from "./TodoPosts/TodoPosts";
import TodoTotal from "./TodoTotal/TodoTotal";
import styles from "./ToDoDetailLayout.module.scss";

const DUMMY_DATA = [
  {
    title: "title1",
    description: "description1",
  },
  {
    title: "title2",
    description: "description2",
  },
  {
    title: "title3",
    description: "description3",
  },
  {
    title: "title4",
    description: "description4",
  },
];

const ToDoDetailLayout = () => {
  return (
    <div className={styles.container}>
      <TodoTotal />
      <TodoPosts dummyData={DUMMY_DATA} />
    </div>
  );
};

export default ToDoDetailLayout;
