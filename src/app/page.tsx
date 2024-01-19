"use client";
import React, { useEffect, useState } from "react";
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
  const [dates, setDates] = useState('');
  const [message, setMessage] = useState({text: 'Suuuuuuuuu', error: false});

  const onClick = () => {
    if(dates.split(':h:').length <= 25) { 
      localStorage.setItem('fechas', dates);
      setMessage({text: 'Sigue así máquina', error: false});
    } else {
      setMessage({text: 'Has excedido el límite de vacaciones', error: true});
    };
  }

  useEffect(() => {
    const local = localStorage.getItem('fechas');
    if(local && !dates) {
      setDates(local);
    }
  }, [])

  return (
    <main>
      <Summary holidays={dates.split(':h:').length - 1} />
      <div className="flex flex-wrap justify-start items-baseline">
        <button className="save p-2 rounded ml-3" onClick={onClick}>Guardar</button>
        <p className={message.error ? "error ml-2" : "normal ml-2"}>{message.text}</p>
      </div>
      <div className="flex flex-wrap justify-around p-10">
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
