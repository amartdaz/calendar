"use client";
import React, { useEffect, useState } from "react";
import Month from "./components/month/month";
import Summary from "./components/summary/summary";
import Header from "./components/header/header";

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
  const [dates, setDates] = useState("");
  const [message, setMessage] = useState({ text: "Suuuuuuuuu", error: false });

  const onClick = () => {
    if (dates.split(":h:").length > 25) {
      setMessage({ text: "Has excedido el límite de vacaciones", error: true });
      return;
    }
    if (dates.split(":ob:").length > 3) {
      setMessage({
        text: "No creo que tengas tantos asuntos propios, revísatelo",
        error: true,
      });
      return;
    }
    localStorage.setItem("fechas", dates);
    setMessage({ text: "Sigue así máquina", error: false });
  };

  useEffect(() => {
    const local = localStorage.getItem("fechas");
    if (local && !dates) {
      setDates(local);
    }
  }, []);

  return (
    <main>
      <Header />
      <div className="flex items-end m-3">
        <Summary
          holidays={dates.split(":h:").length - 1}
          ownBusiness={dates.split(":ob:").length - 1}
          paidAbsence={dates.split(":pa:").length - 1}
        />
        <div className="ml-3">
          <p
            className={
              message.error
                ? "error border-b border-solid border-current p-2 mb-3 min-w-96"
                : "normal border-b border-solid border-current p-2 mb-3 min-w-96"
            }
          >
            {message.text}
          </p>
          <button className="save p-2 rounded" onClick={onClick}>
            Guardar
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-around px-5">
        {months.map((month, index) => {
          return (
            <Month
              name={month.name}
              days={month.days}
              init={month.init}
              dates={dates}
              setDates={setDates}
              key={index}
            />
          );
        })}
      </div>
    </main>
  );
}
