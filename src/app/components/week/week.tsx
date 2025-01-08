"use client";
import useYearProvider, { LeavingDaysType } from "@/app/context/yearContext";
import styles from "./week.module.css";

export default function Week({
  month,
  init,
  numbers,
}: {
  month: string;
  init: number;
  numbers: number[];
}) {
  const { year, months, leavingDays, addDate } = useYearProvider();
  const onClick = (event: any, number: number) => {
    if(event.target.className.includes('daily')) {addDate('daily', number, month); return;};
    if (event.target.className.includes("holiday")) addDate('holidays', number, month);
    if (event.target.className.includes("personalDays")) addDate('personalDays', number, month);
    if (event.target.className.includes("paidAbsences")) addDate('paidAbsences', number, month);
  };

  const getClassName = (value: number, number: number) => {
    const leavingDaysYear = leavingDays.filter((date) => date.year === year)[0];
    //Comprobamos si está guardado como vacaciones
    if(leavingDaysYear.holidays.filter((dates) => dates.month === month && dates.days.includes(number)).length > 0) {
      return 'holiday';}
    // //Comprobamos si está guardado como asuntos propios
    if(leavingDaysYear.personalDays.filter((dates) => dates.month === month && dates.days.includes(number)).length > 0) {
      return 'personalDays';}
    // //Comprobamos si está guardado como ausencias pagadas
    if(leavingDaysYear.paidAbsences.filter((dates) => dates.month === month && dates.days.includes(number)).length > 0) {
      return 'paidAbsences';}
    //Comprobamos si es fin de semana
    if (value > 4) return styles.weekend;
    //Comprobamos si es festivo
    if (
      months
        .filter((festivity) => festivity.name === month)[0]
        .freeDays.includes(number)
    )
      return "festivity";

    return styles.daily;
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
            className={getClassName(index + init, number + 1)}
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
