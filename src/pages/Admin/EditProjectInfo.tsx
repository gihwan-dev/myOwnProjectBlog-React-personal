import Card from "../../UI/Card";
import styles from "./EditProjectInfo.module.css";

const DUMMY_DATA = [
  {
    id: 1,
    name: "Project 1",
    code: "123456",
  },
  {
    id: 2,
    name: "Project 2",
    code: "987654",
  },
];

const EditProjectInfo: React.FC<{
  onSubmit: () => void;
}> = (props) => {
  return (
    <Card>
      <h1 className={styles.title}>프로젝트 수정</h1>
      <ul className={styles.list}>
        {DUMMY_DATA.map((project) => (
          <li key={project.id}>
            <span>id: {project.id}</span>
            <span>프로젝트 명: {project.name}</span>
            <span>프로젝트 코드: {project.code}</span>
            <span className={styles.editButton}>
              <button>수정</button>
              <button>삭제</button>
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <button
          className={styles.completeButton}
          type="button"
          onClick={props.onSubmit}
        >
          완료
        </button>
      </div>
    </Card>
  );
};

export default EditProjectInfo;
