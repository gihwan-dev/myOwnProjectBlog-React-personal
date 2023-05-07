import { useCallback, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./UserCalender.module.css";
import "../../../styles/react-calendar.css";
import ScheduleTime from "./ScheduleTime";
import Modal from "../../../UI/Modal";

type MeetingData = {
  _id: string;
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

  const getMeetings = useCallback(async () => {
    const _id = localStorage.getItem("projectId");
    try {
      const res = await fetch(`http://localhost:8080/project/meeting/${_id}`);
      if (res.status === 200) {
        const data = (await res.json()) as {
          meetings: {
            _id: string;
            date: string;
            time: string;
            content: string;
          }[];
        };
        const updatedMeetings = data.meetings.map((meeting) => {
          return {
            date: new Date(meeting.date),
            time: meeting.time,
            content: meeting.content,
            _id: meeting._id,
          };
        });

        updatedMeetings.sort((a, b) => {
          return a.date.getTime() - b.date.getTime();
        });

        setDateList(updatedMeetings);
      }
    } catch (error) {}
  }, []);

  const deleteDateHandler = async (index: number) => {
    if (dateList && dateList.length >= 1) {
      const _id = localStorage.getItem("projectId");
      const res = await fetch(
        `http://localhost:8080/project/meeting/${dateList[index]._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id,
          }),
        }
      );
      if (res.status === 200) {
        window.alert("삭제되었습니다.");
      } else {
        window.alert("삭제에 실패했습니다.");
      }
    }
    getMeetings();
  };

  useEffect(() => {
    getMeetings();
  }, []);

  const onSaved = async (time: string, content: string) => {
    const _id = localStorage.getItem("projectId");
    const date = value.toISOString();
    try {
      const res = await fetch("http://localhost:8080/project/meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          date,
          time,
          content,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        window.alert(data.message);
        getMeetings();
      }
    } catch (error) {
      window.alert("저장에 실패했습니다.");
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
