import { Dialog, LinearProgress } from "@mui/material";
import styles from "./ContenItem.module.css";
import ContentDetailModal from "./ContentDetailModal/ContentDetailModal";
import { useState } from "react";

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

  const onCloseHandler = () => {
    setOpenModal(false);
  };

  const onOpenHandler = () => {
    setOpenModal(true);
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
    </div>
  );
};

export default ContentItem;
