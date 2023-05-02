import styles from "./SchduleTime.module.css";

const ScheduleTime: React.FC<{
  year: string;
  month: string;
  day: string;
  time: string;
  content: string;
}> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <p>
          {props.year}년 {props.month}월 {props.day}일
        </p>
      </div>
      <div className={styles.time}>
        <p>시간: {props.time}</p>
      </div>
      <div className={styles.content}>
        <p>내용: {props.content}</p>
      </div>
    </div>
  );
};

export default ScheduleTime;
