import { Dialog, DialogTitle } from "@mui/material";
import { useState } from "react";
import styles from "./refDialog.module.scss";

const RefDialog: React.FC<{
  open: boolean;
  close: () => void;
  onSave: (title: string, description: string, url: string) => void;
}> = (props) => {
  const onCloseHandler = () => {
    props.close();
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const titleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const descriptionChangeHandler = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setDescription(event.currentTarget.value);
  };

  const urlChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setUrl(event.currentTarget.value);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSave(title, description, url);
    props.close();
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle
        style={{
          textAlign: "center",
          backgroundColor: "rgba(217, 217, 217, 1)",
        }}
      >
        참고자료 정보를 입력해 주세요
      </DialogTitle>
      <form
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <label>제목</label>
        <input
          type="text"
          value={title}
          onChange={titleChangeHandler}
        />
        <label>설명</label>
        <input
          type="text"
          value={description}
          onChange={descriptionChangeHandler}
        />
        <label>링크</label>
        <input
          type="url"
          value={url}
          onChange={urlChangeHandler}
        />
        <div className={styles.button}>
          <button
            type="button"
            onClick={onCloseHandler}
          >
            취소
          </button>
          <button>완료</button>
        </div>
      </form>
    </Dialog>
  );
};

export default RefDialog;
