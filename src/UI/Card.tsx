import { PropsWithChildren } from "react";
import styles from "./Card.module.css";

function Card(props: PropsWithChildren) {
  return (
    <>
      <div className={styles.modal}>{props.children}</div>
    </>
  );
}

export default Card;
