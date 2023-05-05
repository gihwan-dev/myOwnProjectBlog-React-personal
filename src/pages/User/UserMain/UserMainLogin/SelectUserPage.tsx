import styles from "./SelectUserPage.module.scss";

type User = {
  name: string;
  job: string;
};

const SelectUserPage: React.FC<{
  users: User[] | null;
  onSelect: (user: User) => void;
}> = (props) => {
  const onSelect = (user: User) => {
    props.onSelect(user);
  };

  return (
    <div className={styles.container}>
      <h1>어느 유저로 접속하시겠습니까?</h1>
      <ul>
        {props.users?.map((user) => {
          return (
            <li
              key={user.name}
              onClick={onSelect.bind(null, user)}
            >
              <p className={styles.name}>{user.name}</p>
              <br />
              <p className={styles.job}>{user.job}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectUserPage;
