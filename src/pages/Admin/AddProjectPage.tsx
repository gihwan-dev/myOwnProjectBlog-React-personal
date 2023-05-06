import { FormEvent, useState } from "react";
import Card from "../../UI/Card";
import styles from "./AddProjectPage.module.css";

interface User {
  name: string;
  job: string;
}

const AddProjectPage: React.FC<{
  onSubmit: () => void;
}> = (props) => {
  const [users, setUsers] = useState<User[]>([{ name: "", job: "" }]);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  async function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    props.onSubmit();
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: users,
          code: code,
          title: title,
        }),
      });

      if (res.status === 200) {
        window.alert("프로젝트가 성공적으로 추가되었습니다.");
      } else if (res.status === 401) {
        throw new Error("이미 존재하는 프로젝트 코드입니다.");
      } else {
        throw new Error("프로젝트 추가에 실패했습니다.");
      }
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  const codeChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setCode(event.currentTarget.value);
  };

  const titleChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  function onCancelHandler() {
    props.onSubmit();
  }

  const userAddHandler = () => {
    setUsers((prevUsers) => {
      return [...prevUsers, { name: "", job: "" }];
    });
  };

  const userRemoveHandler = (index: number) => {
    setUsers((prevUsers) => {
      return prevUsers.filter((user, i) => i !== index);
    });
  };

  const userNameHandler = (
    event: FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const name = event.currentTarget.value;
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index].name = name;
      return updatedUsers;
    });
  };

  const userJobHandler = (
    event: FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const job = event.currentTarget.value;

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[index].job = job;
      return updatedUsers;
    });
  };

  return (
    <Card>
      <h1 className={styles.title}>프로젝트 생성</h1>
      <form
        className={styles["total-form"]}
        onSubmit={onSubmitHandler}
      >
        <div className={styles.form}>
          <label htmlFor="project-code">프로젝트 초대 코드</label>
          <input
            value={code}
            onChange={codeChangeHandler}
            type="text"
            maxLength={6}
          />
        </div>
        <div className={styles.form}>
          <label htmlFor="project-title">프로젝트 명</label>
          <input
            value={title}
            type="text"
            onChange={titleChangeHandler}
          />
        </div>

        <div>
          <div className={styles.form}>
            <label htmlFor="add-user">프로젝트 멤버 추가</label>
          </div>
          {users.map((user, index) => {
            return (
              <div
                key={index}
                className={styles["add-member"]}
              >
                <div className={styles["add-member-input"]}>
                  <input
                    value={user.name}
                    placeholder="이름"
                    onChange={(event) => userNameHandler(event, index)}
                  />
                  <input
                    value={user.job}
                    placeholder="직업"
                    onChange={(event) => userJobHandler(event, index)}
                  />
                </div>
                <button
                  type="button"
                  onClick={userRemoveHandler.bind(null, index)}
                >
                  -
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={userAddHandler}
            className={styles["add-btn"]}
          >
            +
          </button>
        </div>
        <div className={styles.button}>
          <button
            type="button"
            onClick={onCancelHandler}
          >
            취소
          </button>
          <button>완료</button>
        </div>
      </form>
    </Card>
  );
};

export default AddProjectPage;
