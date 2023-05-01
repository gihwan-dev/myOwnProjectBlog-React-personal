import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./UserCalender.module.css";
import "../../../styles/react-calendar.css";
import ScheduleTime from "./ScheduleTime";

const UserCalender = () => {
  const [value, onChange] = useState(new Date());
  const [dateList, setDateList] = useState<Date[]>([new Date()]);

  const calendarClickHandler = (value: any) => {
    onChange(value);
    setDateList((prev) => prev.concat(value));
    console.log(dateList);
  };

  const deleteDateHandler = (index: number) => {
    setDateList((prev) => {
      return prev.filter((_, idx) => idx !== index);
    });
  };

  return (
    <div className={styles.container}>
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
                year={date.getFullYear().toString()}
                month={date.getMonth().toString()}
                day={date.getDay().toString()}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserCalender;
