// "use client";
// import { useState } from "react";
import styles from "./week.module.css";

const festivities = [
  { month: "Enero", days: [1] },
  { month: "Febrero", days: [] },
  { month: "Marzo", days: [19, 28, 29] },
  { month: "Abril", days: [2] },
  { month: "Mayo", days: [1] },
  { month: "Junio", days: [] },
  { month: "Julio", days: [] },
  { month: "Agosto", days: [15] },
  { month: "Septiembre", days: [17] },
  { month: "Octubre", days: [12] },
  { month: "Noviembre", days: [1] },
  { month: "Diciembre", days: [6, 9, 24, 25, 31] },
];

export default function Week({
  month,
  init,
  numbers,
  setHolidays,
}: {
  month: string;
  init: number;
  numbers: number[];
  setHolidays: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const [isHoliday, setIsHoliday] = useState(false);

  const onClick = (event: any) => {
    if (event.target.className.includes("daily")) {
      event.target.className = "holiday";
      setHolidays((prev) => prev + 1);
      return;
    }
    if (event.target.className.includes("holiday")) {
      event.target.className = styles.daily;
      setHolidays((prev) => prev - 1);
      return;
    }
  };

  return (
    <div className={styles.week}>
      {init > 0 &&
        [...Array(init).keys()].map((day) => {
          return (
            <button
              className={day > 4 ? styles.weekend : styles.noDay}
              key={day}
            ></button>
          );
        })}
      {numbers.map((number, index) => {
        return (
          <button
            className={
              index + init > 4
                ? styles.weekend
                : festivities
                    .filter((festivity) => festivity.month === month)[0]
                    .days.includes(number + 1)
                ? "festivity"
                : styles.daily
            }
            key={index}
            onClick={onClick}
          >
            {number + 1}
          </button>
        );
      })}
    </div>
  );
}
