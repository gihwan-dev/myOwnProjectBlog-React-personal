import { useCallback, useEffect, useState } from "react";
import Card from "../../UI/Card";
import styles from "./EditProjectInfo.module.css";
import { Dialog } from "@mui/material";
import EditForm from "./EditModal/EditModal";

interface Project {
  _id: string;
  title: string;
  code: string;
}

const EditProjectInfo: React.FC<{
  onSubmit: () => void;
}> = (props) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);

  const getAllProject = useCallback(async () => {
    const res = await fetch("http://localhost:8080/project");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setProjects(data.projects);
    } else {
      window.alert("프로젝트 정보를 불러오는데 실패했습니다.");
    }
  }, []);

  useEffect(() => {
    getAllProject();
  }, [getAllProject]);

  const openDialogHandler = () => {
    setOpen(true);
  };

  const onEditHandler = async (title: string, code: string, index: number) => {
    const res = await fetch("http://localhost:8080/project", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        code: code,
        _id: projects[index]._id,
      }),
    });

    try {
      const data = (await res.json()) as { message: string };
      window.alert(data.message);
    } catch (err) {
      window.alert("프로젝트 수정에 실패했습니다.");
    }
    getAllProject();
    setOpen(false);
  };

  const onRemoveHandler = async (index: number) => {
    const res = await fetch("http://localhost:8080/project", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: projects[index]._id,
      }),
    });

    if (res.status === 200) {
      try {
        const data = await res.json();
        window.alert(data.message);
      } catch (error) {
        window.alert("프로젝트 삭제에 실패했습니다.");
      }
    } else {
      window.alert("프로젝트 삭제에 실패했습니다.");
    }
    getAllProject();
  };

  const onCancelHandler = () => {
    setOpen(false);
  };

  return (
    <Card>
      <h1 className={styles.title}>프로젝트 수정</h1>
      <ul className={styles.list}>
        {projects.map((project, index) => (
          <>
            <Dialog open={open}>
              <EditForm
                onClosed={onCancelHandler}
                index={index}
                code={project.code}
                title={project.title}
                onSubmitted={onEditHandler}
              ></EditForm>
            </Dialog>
            <li key={project._id}>
              <span>id: {project._id}</span>
              <span>프로젝트 명: {project.title}</span>
              <span>프로젝트 코드: {project.code}</span>
              <span className={styles.editButton}>
                <button onClick={openDialogHandler}>수정</button>
                <button onClick={onRemoveHandler.bind(null, index)}>
                  삭제
                </button>
              </span>
            </li>
          </>
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
