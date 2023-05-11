import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import AddContentDetailModal from "./AddContentDetailModal/AddContentDetailModal";
import { useAppDispatch, useAppSelector } from "../../../../../app/hook";

import styles from "./ContentDetailModal.module.scss";
import { Check, Delete } from "@mui/icons-material";
import { totalListActions } from "../../../../../../store/todoList";

const ContentDetailModal: React.FC<{
  title: string;
  done: number;
  total: number;
  startDate: string;
  endDate: string;
  _id: string;
  type: string;
}> = (props) => {
  const [openModal, setOpenModal] = useState(false);

  const projectData = useAppSelector((state) => state.totalList);

  const dispatch = useAppDispatch();

  const onOpenHandler = () => {
    setOpenModal(true);
  };

  const onCloseHandler = () => {
    setOpenModal(false);
  };

  let listContent: any;

  if (props.type === "Todo") {
    const todoData = projectData.todo.find((item) => item._id === props._id);
    listContent = todoData?.list;
  }

  if (props.type === "Doing") {
    const todoData = projectData.doing.find((item) => item._id === props._id);
    listContent = todoData?.list;
  }

  if (props.type === "Done") {
    const todoData = projectData.done.find((item) => item._id === props._id);
    listContent = todoData?.list;
  }

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

  const onToggleHandler = async (_id: string, done: boolean) => {
    try {
      const res = await fetch(
        `http://localhost:8080/project/${props.type.toLowerCase()}/list/detail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: localStorage.getItem("projectId"),
            todo_id: props._id,
            list_id: _id,
            done: !done,
          }),
        }
      );
      if (res.status !== 200) {
        throw new Error("실패했습니다.");
      }
    } catch (error) {
      window.alert("실패했습니다. 다시 시도해주세요.");
    }
    getList();
  };

  const onDeleteHandler = async (_id: string) => {
    try {
      const res = await fetch(
        `http://localhost:8080/project/${props.type.toLowerCase()}/list/detail`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            project_id: localStorage.getItem("projectId"),
            todo_id: props._id,
            list_id: _id,
          }),
        }
      );
      if (res.status !== 200) {
        throw new Error("실패했습니다.");
      }
    } catch (error) {
      window.alert("실패했습니다. 다시 시도해주세요.");
    }
    getList();
  };

  return (
    <div className={styles.container}>
      <Dialog open={openModal}>
        <AddContentDetailModal
          type={props.type}
          onClose={onCloseHandler}
          _id={props._id}
        />
      </Dialog>
      <DialogTitle variant="h3">
        {props.type}: {props.title}
      </DialogTitle>
      <Typography variant="h5">
        {props.total} 개 중 {props.done} 개 완료
      </Typography>
      <Typography variant="h5">
        {props.startDate} ~ {props.endDate}
      </Typography>
      <List
        style={{
          marginTop: "1rem",
        }}
      >
        {listContent?.map((item: any) => (
          <ListItem
            style={{
              width: "400px",
              border: "1px solid #ccc",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}
            key={item.title}
            secondaryAction={
              <>
                <IconButton
                  aria-label="about list action"
                  onClick={() => onDeleteHandler(item._id)}
                >
                  <Delete color="error" />
                </IconButton>
                <ToggleButton
                  value="check"
                  selected={item.done}
                  onChange={() => onToggleHandler(item._id, item.done)}
                >
                  <Check />
                </ToggleButton>
              </>
            }
          >
            <ListItemText primary={`${item.title} / ${item.description}`} />
          </ListItem>
        ))}
      </List>
      <Button
        style={{
          marginTop: "2rem",
        }}
        variant="contained"
        onClick={onOpenHandler}
      >
        추가하기
      </Button>
    </div>
  );
};

export default ContentDetailModal;
