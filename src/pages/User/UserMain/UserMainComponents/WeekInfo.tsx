import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import styles from "./WeekInfo.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

const labels = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

const WeekInfo = () => {
  const [weekCount, setWeekCount] = useState({
    Mon: 0,
    Tue: 0,
    Wen: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  });

  type weekAmountType = {
    weekAmount: {
      Mon: number;
      Tue: number;
      Wen: number;
      Thu: number;
      Fri: number;
      Sat: number;
      Sun: number;
    };
  };

  const getWeekAmount = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/project/${localStorage.getItem(
          "projectId"
        )}/weekAmount`
      );
      if (res.status === 200) {
        const data = (await res.json()) as weekAmountType;
        setWeekCount(data.weekAmount);
      } else {
        throw new Error("fail");
      }
    } catch (error) {
      window.alert("error");
    }
  };

  useEffect(() => {
    getWeekAmount();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "날짜별 Todo 진행",
        data: weekCount,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  return (
    <div className={styles.chart}>
      <Line
        data={data}
        options={options}
      />
    </div>
  );
};

export default WeekInfo;
