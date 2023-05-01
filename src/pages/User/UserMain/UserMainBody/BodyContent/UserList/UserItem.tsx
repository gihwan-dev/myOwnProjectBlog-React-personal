import styles from "./UserItem.module.css";

const UserItem: React.FC<{
  name: string;
  position: string;
  id: number;
  isOn: boolean;
}> = (props) => {
  return (
    <div className={styles.total}>
      <div className={styles.container}>
        <img
          src={`assets/images/profile${props.id}.jpg`}
          alt={`user profile id: ${props.id}`}
          height={50}
          width={50}
        />
        <div className={styles.detail}>
          <p className={styles.name}>{props.name}</p>
          <p className={styles.position}>{props.position}</p>
        </div>
      </div>
      <span
        className={props.isOn ? styles["state-on"] : styles["state-off"]}
      ></span>
    </div>
  );
};

export default UserItem;
