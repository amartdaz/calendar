"use client";
import { useState } from "react";
import Week from "../week/week";

export default function Month({
  name,
  days,
  init,
  dates,
  setDates,
}: {
  name: string;
  days: number;
  init: number;
  dates: string;
  setDates: React.Dispatch<React.SetStateAction<string>>;
}) {
  const allDays = [...Array(days).keys()];
  const weeks = Math.ceil((days + init) / 7);

  return (
    <div className="max-w-64 m-3">
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
              dates={dates}
              setDates={setDates}
              key={index}
            />
          ) : (
            <Week
              month={name}
              init={0}
              numbers={numbers}
              dates={dates}
              setDates={setDates}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
