import { useCallback, useState } from "react";
import { useAppDispatch } from "../../../../../../app/hook";

import { totalListActions } from "../../../../../../../store/todoList";

import styles from "./AddContentDetailModal.module.scss";

const AddContentDetailModal: React.FC<{
  onClose: () => void;
  _id: string;
  type: string;
}> = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  const onTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
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

  const onDescriptionChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const target = props.type.toLowerCase();
    const projectId = localStorage.getItem("projectId");

    try {
      const res = await fetch(`http://localhost:8080/project/${target}/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: props._id,
          projectId,
          title,
          description,
        }),
      });
      if (res.status === 200) {
        window.alert("성공적으로 추가되었습니다.");
      } else {
        throw new Error("추가에 실패했습니다.");
      }
      getList();
      props.onClose();
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className={styles.form}
    >
      <label>Title: </label>
      <input
        type="text"
        value={title}
        onChange={onTitleChangeHandler}
      />
      <label>Description: </label>
      <input
        type="text"
        value={description}
        onChange={onDescriptionChangeHandler}
      />

      <div className={styles.button}>
        <button
          type="button"
          onClick={props.onClose}
        >
          취소
        </button>
        <button>저장</button>
      </div>
    </form>
  );
};

export default AddContentDetailModal;
