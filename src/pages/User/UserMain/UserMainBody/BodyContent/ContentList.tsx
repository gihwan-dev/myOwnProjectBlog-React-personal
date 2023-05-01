import ContentItem from "./ContentItem";
import styles from "./ContentList.module.css";

const TODO_DUMMY_DATA = [
  {
    title: "UX Design",
    done: 7,
    total: 12,
    startDate: "2021-10-01",
    endDate: "2021-10-31",
  },
  {
    title: "UI Design",
    done: 12,
    total: 19,
    startDate: "2021-09-01",
    endDate: "2021-11-31",
  },
  {
    title: "Frontend",
    done: 2,
    total: 10,
    startDate: "2022-01-01",
    endDate: "2022-02-31",
  },
  {
    title: "Backend",
    done: 1,
    total: 5,
    startDate: "2022-02-01",
    endDate: "2022-03-31",
  },
];

const ContentList: React.FC<{
  type: string;
}> = (props) => {
  let content;

  switch (props.type) {
    case "Todo":
      content = TODO_DUMMY_DATA.map((item) => {
        return (
          <li key={item.title}>
            <ContentItem
              title={item.title}
              done={item.done}
              total={item.total}
              startDate={item.startDate}
              endDate={item.endDate}
            />
          </li>
        );
      });
      break;
  }
  return (
    <div className={styles.main}>
      <ul className={styles.list}>{content}</ul>
    </div>
  );
};

export default ContentList;
