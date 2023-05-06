import { useState } from "react";
import { DialogTitle } from "@mui/material";
import styles from "./EditModal.module.scss";

const EditForm: React.FC<{
  title: string;
  code: string;
  index: number;
  onSubmitted: (title: string, code: string, index: number) => void;
  onClosed: () => void;
}> = (props) => {
  const [title, setTitle] = useState(props.title);
  const [code, setCode] = useState(props.code);

  const titleChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const codeChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setCode(event.currentTarget.value);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onSubmitted(title, code, props.index);
  };

  const onCancelHandler = () => {
    props.onClosed();
  };

  return (
    <>
      <DialogTitle>프로젝트 수정</DialogTitle>
      <form
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <label>프로젝트 명</label>
        <input
          value={title}
          onChange={titleChangeHandler}
        ></input>
        <label>프로젝트 코드</label>
        <input
          value={code}
          onChange={codeChangeHandler}
        ></input>
        <div className={styles.buttons}>
          <button
            type="button"
            onClick={onCancelHandler}
          >
            취소
          </button>
          <button>완료</button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
