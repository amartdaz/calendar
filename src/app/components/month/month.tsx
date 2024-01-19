"use client";
import { useState } from "react";
import Week from "../week/week";

export default function Month({
  name,
  days,
  init,
  setHolidays,
}: {
  name: string;
  days: number;
  init: number;
  setHolidays: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [allDays, setAllDays] = useState([...Array(days).keys()]);
  const weeks = Math.ceil((days + init) / 7);
  console.log("weeks: ", weeks);
  return (
    <div className="max-w-64 mb-5">
      <label>{name}</label>
      <div>
        {[...Array(weeks).keys()].map((week, index) => {
          const numbers =
            index === 0
              ? allDays.slice(0, 7 - init)
              : allDays.slice(7 * index - init, 7 * (index + 1) - init);
          return index === 0 ? (
            <Week
              month={name}
              init={init}
              numbers={numbers}
              setHolidays={setHolidays}
              key={index}
            />
          ) : (
            <Week
              month={name}
              init={0}
              numbers={numbers}
              setHolidays={setHolidays}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
