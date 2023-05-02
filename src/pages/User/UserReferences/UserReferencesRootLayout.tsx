import ReferencesList from "./UserReferencesBody/ReferencesList/ReferencesList";
import styles from "./UserReferencesRootLayout.module.scss";
const UserReferencesRootLayout = () => {
  return (
    <div className={styles.container}>
      <h1>References</h1>
      <p>프로젝트 참고 자료</p>
      <ReferencesList />
      <button className={styles.button}>추가하기</button>
    </div>
  );
};

export default UserReferencesRootLayout;
