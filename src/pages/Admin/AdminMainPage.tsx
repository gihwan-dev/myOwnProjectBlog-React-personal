import { Link } from "react-router-dom";
import styles from "./AdminMainPage.module.css";

const AdminMainPage = () => {
  return (
    <>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <header>
            <Link to="/">Home</Link>
          </header>
        </nav>
        <main className={styles.menu}>
          <div className={styles.list}>
            <h2 className={styles.title}>관리자 페이지</h2>
            <p className={styles.item1}>프로젝트 생성</p>
            <p className={styles.item2}>프로젝트 수정</p>
            <p className={styles.item3}>프로젝트 제거</p>
            <p className={styles.item4}>프로젝트 확인</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminMainPage;
