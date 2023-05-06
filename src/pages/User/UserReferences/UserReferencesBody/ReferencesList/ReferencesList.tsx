import { useCallback, useEffect, useState } from "react";
import ReferencesItem from "../ReferencesItem/ReferencesItem";
import RefDialog from "../refDialog/refDialog";
import styles from "./ReferencesList.module.scss";
import { useAppSelector } from "../../../../app/hook";

interface ListItem {
  title: string;
  description: string;
  url: string;
  _id: string;
}

const ReferencesList: React.FC<{
  open: boolean;
  onClose: () => void;
}> = (props) => {
  const [listData, setListData] = useState<ListItem[]>([]);
  let _id: string | null = useAppSelector((state) => state.project._id);

  if (localStorage.getItem("projectId") !== null) {
    _id = localStorage.getItem("projectId");
  }

  const getRefList = useCallback(async () => {
    console.log(_id);
    try {
      const res = await fetch(`http://localhost:8080/project/ref/${_id}`);
      if (res.status === 200) {
        const data = await res.json();
        const refList = data.refs;
        setListData(refList);
      }
    } catch (error) {}
  }, [_id]);

  useEffect(() => {
    getRefList();
  }, [getRefList]);

  const onSaved = async (title: string, description: string, url: string) => {
    try {
      const res = await fetch("http://localhost:8080/project/ref", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          title,
          description,
          url,
        }),
      });

      if (res.status !== 200) {
        window.alert("저장에 실패했습니다.");
      }
    } catch {
      window.alert("저장에 실패했습니다.");
    }
    getRefList();
  };

  const deleteHandler = async (index: number) => {
    const targetData = listData[index];
    try {
      const res = await fetch("http://localhost:8080/project/ref", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ref_id: targetData._id,
          _id,
        }),
      });

      if (res.status === 200) {
        const data = (await res.json()) as { message: string };
        window.alert(data.message);
      } else {
        window.alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      window.alert(error);
    }
    getRefList();
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
