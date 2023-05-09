import { useState } from "react";
import styles from "./ContentAddModal.module.scss";

const ContentAddModal: React.FC<{
  onClose: () => void;
  type: string;
  getList: () => void;
}> = (props) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const startDateChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  const endDateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const onSubmitHandler = async (event: React.FormEvent) => {
    const _id = localStorage.getItem("projectId");
    event.preventDefault();
    if (props.type === "Todo") {
      try {
        const res = await fetch("http://localhost:8080/project/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            title,
            start: startDate,
            end: endDate,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          window.alert(data.message);
          props.onClose();
        } else {
          throw new Error("추가에 실패했습니다.");
        }
      } catch (error) {
        window.alert(error);
      }
    } else if (props.type === "Doing") {
      try {
        const res = await fetch("http://localhost:8080/project/doing", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            title,
            start: startDate,
            end: endDate,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          window.alert(data.message);
          props.onClose();
        } else {
          throw new Error("추가에 실패했습니다.");
        }
      } catch (error) {
        window.alert(error);
      }
    } else if (props.type === "Done") {
      try {
        const res = await fetch("http://localhost:8080/project/done", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
            title,
            start: startDate,
            end: endDate,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          window.alert(data.message);
          props.onClose();
        } else {
          throw new Error("추가에 실패했습니다.");
        }
      } catch (error) {
        window.alert(error);
      }
    }
    props.getList();
  };

  return (
    <form
      className={styles.form}
      onSubmit={onSubmitHandler}
    >
      <div>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={titleChangeHandler}
        ></input>
      </div>
      <div>
        <label>시작일자: </label>
        <input
          value={startDate}
          onChange={startDateChangeHandler}
          type="text"
          placeholder="2020/12/01 형식으로 입력"
        ></input>
      </div>
      <div>
        <label>종료 일자: </label>
        <input
          value={endDate}
          onChange={endDateChangeHandler}
          type="text"
          placeholder="2020/12/01 형식으로 입력"
        ></input>
      </div>
      <div className={styles.button}>
        <button
          type="button"
          onClick={props.onClose}
        >
          Close
        </button>
        <button>Save</button>
      </div>
    </form>
  );
};

export default ContentAddModal;
