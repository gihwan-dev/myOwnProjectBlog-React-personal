import ContentItem from "./ContentItem";
import styles from "./ContentList.module.css";

const TODO_DUMMY_DATA = [
  {
    title: "UX Design",
    done: 0,
    total: 12,
    startDate: "2021-10-01",
    endDate: "2021-10-31",
  },
  {
    title: "UI Design",
    done: 0,
    total: 19,
    startDate: "2021-09-01",
    endDate: "2021-11-31",
  },
  {
    title: "Frontend",
    done: 0,
    total: 10,
    startDate: "2022-01-01",
    endDate: "2022-02-31",
  },
  {
    title: "Backend",
    done: 0,
    total: 5,
    startDate: "2022-02-01",
    endDate: "2022-03-31",
  },
  {
    title: "Publishing",
    done: 0,
    total: 5,
    startDate: "2021-10-01",
    endDate: "2021-10-31",
  },
  {
    title: "Marketing",
    done: 0,
    total: 5,
    startDate: "2023-3-01",
    endDate: "2023-4-31",
  },
];

const DOING_DUMMY_DATA = [
  {
    title: "밥먹기",
    done: 6,
    total: 12,
    startDate: "2021-10-01",
    endDate: "2021-10-31",
  },
  {
    title: "잠자기",
    done: 12,
    total: 19,
    startDate: "2021-09-01",
    endDate: "2021-11-31",
  },
  {
    title: "씻기",
    done: 2,
    total: 10,
    startDate: "2022-01-01",
    endDate: "2022-02-31",
  },
  {
    title: "운동가기",
    done: 1,
    total: 5,
    startDate: "2022-02-01",
    endDate: "2022-03-31",
  },
];

const DONE_DUMMY_DATA = [
  {
    title: "학교가기",
    done: 6,
    total: 12,
    startDate: "2021-10-01",
    endDate: "2021-10-31",
  },
  {
    title: "안죽기",
    done: 12,
    total: 19,
    startDate: "2021-09-01",
    endDate: "2021-11-31",
  },
  {
    title: "살기",
    done: 2,
    total: 10,
    startDate: "2022-01-01",
    endDate: "2022-02-31",
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
    case "Doing":
      content = DOING_DUMMY_DATA.map((item) => {
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
    case "Done":
      content = DONE_DUMMY_DATA.map((item) => {
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
