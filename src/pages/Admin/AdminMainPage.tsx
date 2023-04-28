import { Link } from "react-router-dom";
import styles from "./AdminMainPage.module.css";
import { useState } from "react";
import AddProjectPage from "./AddProjectPage";
import EditProjectInfo from "./EditProjectInfo";

const AdminMainPage = () => {
  const [showAddPage, setShowAddPage] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);

  function showAddPageHandler() {
    setShowAddPage(true);
  }

  function showEditPageHandler() {
    setShowEditPage(true);
  }

  function hideAddPageHandler() {
    setShowAddPage(false);
  }

  function hideEditPageHandler() {
    setShowEditPage(false);
  }

  return (
    <>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <header>
            <Link to="/">Home</Link>
          </header>
        </nav>
        <main className={styles.menu}>
          {showAddPage && <AddProjectPage onSubmit={hideAddPageHandler} />}
          {showEditPage && <EditProjectInfo onSubmit={hideEditPageHandler} />}
          {!showAddPage && !showEditPage && (
            <div className={styles.list}>
              <h2 className={styles.title}>관리자 페이지</h2>
              <p
                className={styles.item1}
                onClick={showAddPageHandler}
              >
                프로젝트 생성
              </p>
              <p
                className={styles.item2}
                onClick={showEditPageHandler}
              >
                프로젝트 수정
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminMainPage;
