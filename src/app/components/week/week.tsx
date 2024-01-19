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
  dates,
  setDates,
}: {
  month: string;
  init: number;
  numbers: number[];
  dates: string;
  setDates: React.Dispatch<React.SetStateAction<string>>;
}) {

  const onClick = (event: any, number: number) => {
    if (event.target.className.includes("daily")) {
      setDates((prev) => prev + month + ':h:' + number + ';');
      return;
    }
    if (event.target.className.includes("holiday")) {
      setDates((prev) => prev.replace(month + ':h:' + number + ';', month + ':ob:' + number + ';'));
      return;
    }
    if (event.target.className.includes("ownBusiness")) {
      setDates((prev) => prev.replace(month + ':ob:' + number + ';', month + ':pa:' + number + ';'));
      return;
    }
    if (event.target.className.includes("paidAbsence")) {
      setDates((prev) => prev.replace(month + ':pa:' + number + ';', ''));
      return;
    }
  };

  const getClassName = (value: number, number: number) => {
    //Comprobamos si está guardado como vacaciones
    if(dates.includes(month + ':h:' + number + ';')){
      return 'holiday';
    }
    //Comprobamos si está guardado como asuntos propios
    if(dates.includes(month + ':ob:' + number + ';')){
      return 'ownBusiness';
    }
    //Comprobamos si está guardado como ausencias pagadas
    if(dates.includes(month + ':pa:' + number + ';')){
      return 'paidAbsence';
    }
    //Comprobamos si es fin de semana
    if(value > 4) return styles.weekend;
    //Comprobamos si es festivo
    if(festivities
      .filter((festivity) => festivity.month === month)[0]
      .days.includes(number)) return 'festivity';
    
    return styles.daily;
  }

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
              getClassName(index + init, number + 1)
            }
            key={index}
            onClick={(event) => onClick(event, number + 1)}
          >
            {number + 1}
          </button>
        );
      })}
    </div>
  );
}
