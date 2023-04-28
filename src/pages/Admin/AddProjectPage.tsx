import Card from "../../UI/Card";
import styles from "./AddProjectPage.module.css";

const AddProjectPage: React.FC<{
  onSubmit: () => void;
}> = (props) => {
  function onSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    props.onSubmit();
    event.preventDefault();
  }

  function onCancelHandler() {
    props.onSubmit();
  }

  return (
    <Card>
      <h1 className={styles.title}>프로젝트 생성</h1>
      <form
        className={styles["total-form"]}
        onSubmit={onSubmitHandler}
      >
        <div className={styles.form}>
          <label htmlFor="project-name">프로젝트명</label>
          <input type="text" />
        </div>
        <div className={styles.form}>
          <label htmlFor="project-code">프로젝트 초대 코드</label>
          <input
            type="text"
            maxLength={6}
          />
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
