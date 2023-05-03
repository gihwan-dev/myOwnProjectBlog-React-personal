import React, { useState } from "react";
import ReferencesList from "./UserReferencesBody/ReferencesList/ReferencesList";
import styles from "./UserReferencesRootLayout.module.scss";

const UserReferencesRootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const addHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>References</h1>
      <p>프로젝트 참고 자료</p>
      <ReferencesList
        open={isOpen}
        onClose={closeHandler}
      />
      <button
        className={styles.button}
        onClick={addHandler}
      >
        추가하기
      </button>
    </div>
  );
};

export default UserReferencesRootLayout;
