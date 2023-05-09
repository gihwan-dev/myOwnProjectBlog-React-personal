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
import { useState } from "react";
import AddContentDetailModal from "./AddContentDetailModal/AddContentDetailModal";
import { useAppSelector } from "../../../../../app/hook";

import styles from "./ContentDetailModal.module.scss";
import { Check, Delete } from "@mui/icons-material";

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

  const onOpenHandler = () => {
    setOpenModal(true);
  };

  const onCloseHandler = () => {
    setOpenModal(false);
  };

  let listContent: any;

  if (props.type === "Todo") {
    const todoData = projectData.todo.find((item) => item._id === props._id);
    console.log(todoData);
    listContent = todoData?.list;
  }

  if (props.type === "Doint") {
    const todoData = projectData.doing.find((item) => item._id === props._id);
    console.log(todoData);
    listContent = todoData?.list;
  }

  if (props.type === "Done") {
    const todoData = projectData.done.find((item) => item._id === props._id);
    console.log(todoData);
    listContent = todoData?.list;
  }

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
      <List>
        {listContent?.map((item: any) => (
          <ListItem
            style={{ width: "400px" }}
            key={item.title}
            secondaryAction={
              <>
                <IconButton aria-lable="about list action">
                  <Delete color="error" />
                </IconButton>
                <ToggleButton
                  value="check"
                  selected={item.done}
                  onChange={() => {}}
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
