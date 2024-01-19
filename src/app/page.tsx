"use client";
import React, { useState } from "react";
import Month from "./components/month/month";
import Summary from "./components/summary/summary";

const months = [
  { name: "Enero", days: 31, init: 0 },
  { name: "Febrero", days: 29, init: 3 },
  { name: "Marzo", days: 31, init: 4 },
  { name: "Abril", days: 30, init: 0 },
  { name: "Mayo", days: 31, init: 2 },
  { name: "Junio", days: 30, init: 5 },
  { name: "Julio", days: 31, init: 0 },
  { name: "Agosto", days: 31, init: 3 },
  { name: "Septiembre", days: 30, init: 6 },
  { name: "Octubre", days: 31, init: 1 },
  { name: "Noviembre", days: 30, init: 4 },
  { name: "Diciembre", days: 31, init: 6 },
];
export default function Home() {
  const [holidays, setHolidays] = useState(0);
  return (
    <main>
      <Summary holidays={holidays} />
      <div className="flex flex-wrap justify-between p-10">
        {months.map((month, index) => {
          return (
            <Month
              name={month.name}
              days={month.days}
              init={month.init}
              setHolidays={setHolidays}
              key={index}
            />
          );
        })}
      </div>
    </main>
  );
}
