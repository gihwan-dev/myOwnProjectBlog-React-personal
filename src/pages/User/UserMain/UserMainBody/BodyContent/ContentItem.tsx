import { Dialog, IconButton, LinearProgress } from "@mui/material";
import styles from "./ContenItem.module.css";
import ContentDetailModal from "./ContentDetailModal/ContentDetailModal";
import { useCallback, useState } from "react";
import { Delete } from "@mui/icons-material";
import { totalListActions } from "../../../../../store/todoList";
import { useAppDispatch } from "../../../../app/hook";

const ContentItem: React.FC<{
  title: string;
  done: number;
  total: number;
  startDate: string;
  endDate: string;
  _id: string;
  type: string;
}> = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    setOpenModal(false);
  };

  const onOpenHandler = () => {
    setOpenModal(true);
  };

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

  const onDeleteHandler = async () => {
    console.log("clicked");
    const res = await fetch(
      `http://localhost:8080/project/${props.type.toLowerCase()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: localStorage.getItem("projectId"),
          todo_id: props._id,
        }),
      }
    );
    if (res.status !== 200) {
      window.alert("삭제에 실패했습니다.");
    }
    getList();
  };

  return (
    <div className={styles.item}>
      <Dialog
        open={openModal}
        fullWidth={true}
      >
        <ContentDetailModal
          title={props.title}
          done={props.done}
          total={props.total}
          startDate={props.startDate}
          endDate={props.endDate}
          _id={props._id}
          type={props.type}
        />
        <button
          className={styles.close}
          onClick={onCloseHandler}
        >
          닫기
        </button>
      </Dialog>
      <div onClick={onOpenHandler}>
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

      <IconButton
        onClick={onDeleteHandler}
        color="secondary"
        style={{
          position: "absolute",
          left: "calc(100% - 16px)",
          top: "-30%",
        }}
      >
        <Delete fontSize="large"></Delete>
      </IconButton>
    </div>
  );
};

export default ContentItem;
