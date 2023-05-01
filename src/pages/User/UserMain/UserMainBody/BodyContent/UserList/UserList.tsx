import UserItem from "./UserItem";
import styles from "./UserList.module.css";

const USER_DUMMY = [
  {
    id: 1,
    name: "김길동",
    position: "디자이너",
    isOn: false,
  },
  {
    id: 2,
    name: "박길동",
    position: "프론트엔드",
    isOn: true,
  },
  { id: 3, name: "최기환", position: "백엔드", isOn: true },
  { id: 4, name: "이길동", position: "기획자", isOn: true },
];

const UserList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>Team</p>
        <button>view all</button>
      </div>
      <ul>
        {USER_DUMMY.map((item) => {
          return (
            <li key={item.id}>
              <UserItem
                isOn={item.isOn}
                id={item.id}
                name={item.name}
                position={item.position}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
