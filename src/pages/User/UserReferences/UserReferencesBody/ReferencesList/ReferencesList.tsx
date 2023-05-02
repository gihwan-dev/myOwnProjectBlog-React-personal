import ReferencesItem from "../ReferencesItem/ReferencesItem";
import styles from "./ReferencesList.module.scss";

interface ListItem {
  title: string;
  description: string;
  url: string;
}

const listData: ListItem[] = [
  {
    title: "Title 1",
    description: "Description 1",
    url: "#",
  },
  {
    title: "Title 2",
    description: "Description 2",
    url: "#",
  },
  {
    title: "Title 3",
    description: "Description 3",
    url: "#",
  },
];

const ReferencesList = () => {
  return (
    <div className={styles.container}>
      <ReferencesItem listData={listData} />
    </div>
  );
};

export default ReferencesList;
