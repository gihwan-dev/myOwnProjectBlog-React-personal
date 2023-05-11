import { useCallback, useEffect, useState } from "react";
import TodoInfoItem from "./TodoInfoItem";
import styles from "./TodoInfoList.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hook";

import { totalListActions } from "../../../../store/todoList";

const TodoInfoList = () => {
  const [added, setAdded] = useState(0);

  const dispatch = useAppDispatch();

  const getList = useCallback(async () => {
    const _id = localStorage.getItem("projectId");
    const response = await fetch(
      `http://localhost:8080/project/totalList/${_id}`
    );
    const data = await response.json();

    dispatch(
      totalListActions.setTotalList({
        todo: data.todo,
        doing: data.doing,
        done: data.done,
      })
    );
  }, []);

  useEffect(() => {
    getList();
  }, []);

  const totalList = useAppSelector((state) => state.totalList);

  const getAdded = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/project/${localStorage.getItem(
          "projectId"
        )}/added`
      );
      if (res.status === 200) {
        const data = (await res.json()) as { added: number };
        setAdded(data.added);
      } else {
        throw new Error("fail");
      }
    } catch (error) {
      window.alert(error);
    }
  };

  useEffect(() => {
    getAdded();
  }, []);

  return (
    <div className={styles.todoInfoList}>
      <div className={styles.item1}>
        <TodoInfoItem
          id="done"
          amount={totalList.done.length}
        />
      </div>
      <div className={styles.item2}>
        <TodoInfoItem
          id="doing"
          amount={totalList.doing.length}
        />
      </div>
      <div className={styles.item3}>
        <TodoInfoItem
          id="remain"
          amount={totalList.todo.length}
        />
      </div>
      <div className={styles.item4}>
        <TodoInfoItem
          id="added"
          amount={added}
        />
      </div>
    </div>
  );
};

export default TodoInfoList;
