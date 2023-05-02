import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./UserCalender.module.css";
import "../../../styles/react-calendar.css";
import ScheduleTime from "./ScheduleTime";
import Modal from "../../../UI/Modal";

type MeetingData = {
  date: Date;
  time: string;
  content: string;
};

const UserCalender = () => {
  const [value, onChange] = useState(new Date());
  const [dateList, setDateList] = useState<MeetingData[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const calendarClickHandler = (value: any) => {
    onChange(value);
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const deleteDateHandler = (index: number) => {
    if (dateList && dateList.length >= 1) {
      setDateList((prev) => {
        return prev?.filter((_, idx) => idx !== index);
      });
    }
  };

  const onSaved = (time: string, content: string) => {
    console.log(value.getDate());
    if (dateList && dateList.length >= 1) {
      setDateList((prev) => {
        return prev?.concat([{ date: value, time: time, content: content }]);
      });
    } else {
      setDateList([{ date: value, time: time, content: content }]);
    }
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <Modal
        open={openModal}
        onClose={closeModalHandler}
        onSaved={onSaved}
      />
      <Calendar
        onChange={calendarClickHandler}
        value={value}
        calendarType="US"
      />
      <ul className={styles.list}>
        {dateList?.map((date, idx) => {
          return (
            <li
              key={idx}
              id={`${idx}`}
              onClick={deleteDateHandler.bind(null, idx)}
            >
              <ScheduleTime
                year={`${date.date.getFullYear()}`}
                month={`${date.date.getMonth() + 1}`}
                day={`${date.date.getDate()}`}
                time={date.time}
                content={date.content}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserCalender;
