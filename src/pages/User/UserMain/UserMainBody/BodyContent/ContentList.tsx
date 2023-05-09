import { Dialog } from "@mui/material";
import ContentItem from "./ContentItem";
import styles from "./ContentList.module.css";
import ContentAddModal from "./contentAddModal/ContentAddModal";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";

import { totalListActions } from "../../../../../store/todoList";

// useEffect로 데이터 가져와서 redux store에 저장 이후 업데이트 할 때 마다 다시 가져오는 방식.

const ContentList: React.FC<{
  type: string;
}> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const todoList = useAppSelector((state) => state.totalList.todo);
  const doingList = useAppSelector((state) => state.totalList.doing);
  const doneList = useAppSelector((state) => state.totalList.done);

  const dispatch = useAppDispatch();

  let content;

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

  switch (props.type) {
    case "Todo":
      content = todoList.map((item) => {
        const count = item.list.reduce(
          (acc, cur) => (cur.done ? acc + 1 : acc + 0),
          0
        );
        return (
          <li key={item.title}>
            <ContentItem
              _id={item._id}
              title={item.title}
              done={count}
              total={item.list.length}
              startDate={item.start}
              endDate={item.end}
              type="Todo"
            />
          </li>
        );
      });
      break;
    case "Doing":
      content = doingList.map((item) => {
        const count = item.list.reduce(
          (acc, cur) => (cur.done ? acc + 1 : acc + 0),
          0
        );
        return (
          <li key={item.title}>
            <ContentItem
              _id={item._id}
              title={item.title}
              done={count}
              total={item.list.length}
              startDate={item.start}
              endDate={item.end}
              type="Doing"
            />
          </li>
        );
      });
      break;
    case "Done":
      content = doneList.map((item) => {
        const count = item.list.reduce(
          (acc, cur) => (cur.done ? acc + 1 : acc + 0),
          0
        );
        return (
          <li key={item.title}>
            <ContentItem
              _id={item._id}
              title={item.title}
              done={count}
              total={item.list.length}
              startDate={item.start}
              endDate={item.end}
              type="Done"
            />
          </li>
        );
      });
      break;
  }

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  return (
    <>
      <Dialog open={modalOpen}>
        <ContentAddModal
          getList={getList}
          type={props.type}
          onClose={modalCloseHandler}
        />
      </Dialog>
      <div className={styles.bar}>
        <p>항목</p>
        <button onClick={modalOpenHandler}>추가하기</button>
      </div>
      <div className={styles.main}>
        <ul className={styles.list}>{content}</ul>
      </div>
    </>
  );
};

export default ContentList;
