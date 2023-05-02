import { Dialog, DialogTitle } from "@mui/material";
import { FormEvent, useState } from "react";
import styles from "./Modal.module.css";

const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSaved: (time: string, content: string) => void;
}> = (props) => {
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");

  const timeChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTime(event.currentTarget.value);
  };

  const contentChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSaved(time, content);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      className={styles.modal}
    >
      <DialogTitle>일정 세부 내용을 설정해 주세요.</DialogTitle>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="time">시간</label>
        <input
          type="text"
          onChange={timeChangeHandler}
          value={time}
        />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          onChange={contentChangeHandler}
          value={content}
        />
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={props.onClose}
          >
            취소
          </button>
          <button type="submit">저장</button>
        </div>
      </form>
    </Dialog>
  );
};

export default Modal;
