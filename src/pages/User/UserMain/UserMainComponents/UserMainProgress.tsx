import { LinearProgress } from "@mui/material";
import styles from "./UserMainProgress.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { useEffect, useState } from "react";

const UserMainProgress = () => {
  const dispatch = useAppDispatch();

  const totalList = useAppSelector((state) => state.totalList);

  const [totalAmount, setTotalAmount] = useState(0);
  const [doneAmount, setDoneAmount] = useState(0);

  useEffect(() => {
    const todoAmount = totalList.todo.reduce(
      (acc, cur) => acc + cur.list.length,
      0
    );
    const todoDoneAmount = totalList.todo.reduce(
      (acc, cur) => acc + cur.list.filter((item) => item.done).length,
      0
    );

    const doingAmount = totalList.doing.reduce(
      (acc, cur) => acc + cur.list.length,
      0
    );
    const doingDoneAmount = totalList.doing.reduce(
      (acc, cur) => acc + cur.list.filter((item) => item.done).length,
      0
    );

    const doneAmount = totalList.done.reduce(
      (acc, cur) => acc + cur.list.length,
      0
    );
    const doneDoneAmount = totalList.done.reduce(
      (acc, cur) => acc + cur.list.filter((item) => item.done).length,
      0
    );

    setTotalAmount(todoAmount + doingAmount + doneAmount);
    setDoneAmount(todoDoneAmount + doingDoneAmount + doneDoneAmount);
  });

  return (
    <div className={styles.progress}>
      <p>진행률</p>
      <LinearProgress
        variant="determinate"
        value={
          isNaN(doneAmount / totalAmount)
            ? 100
            : (doneAmount / totalAmount) * 100
        }
        className={styles.bar}
      />
      <div className={styles.detail}>
        <p className={styles.current}>
          {isNaN(doneAmount / totalAmount)
            ? 100
            : ((doneAmount / totalAmount) * 100).toFixed(1)}
          %
        </p>
        <p className={styles.rest}>
          {isNaN(doneAmount / totalAmount)
            ? 0
            : (100 - (doneAmount / totalAmount) * 100).toFixed(1)}
          % 남음
        </p>
      </div>
    </div>
  );
};

export default UserMainProgress;
