import { useState } from "react";
import ReferencesItem from "../ReferencesItem/ReferencesItem";
import RefDialog from "../refDialog/refDialog";
import styles from "./ReferencesList.module.scss";

interface ListItem {
  title: string;
  description: string;
  url: string;
}

const ReferencesList: React.FC<{
  open: boolean;
  onClose: () => void;
}> = (props) => {
  const [listData, setListData] = useState<ListItem[]>([]);

  const onSaved = (title: string, description: string, url: string) => {
    setListData((prevListData) => {
      return prevListData.concat([{ title, description, url }]);
    });
  };

  const deleteHandler = (index: number) => {
    setListData((prevListData) => {
      return prevListData.filter((_, i) => i !== index);
    });
  };

  return (
    <div className={styles.container}>
      <RefDialog
        open={props.open}
        close={props.onClose}
        onSave={onSaved}
      />
      <ReferencesItem
        listData={listData}
        delete={deleteHandler}
      />
    </div>
  );
};

export default ReferencesList;
