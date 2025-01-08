"use client";
import useYearProvider from "@/app/context/yearContext";
import { useState } from "react";

export default function Summary() {
  const [message, setMessage] = useState({
    text: "Todo está correcto",
    error: false,
  });
  const { leavingDays, year } = useYearProvider();
  const leavingDaysYear = leavingDays.filter((dates) => dates.year === year)[0];
  const holidaysLength =
    leavingDaysYear &&
    leavingDaysYear.holidays.map((dates) => dates.days.length).reduce((acc, curr) => acc + curr, 0);
  const personalDaysLength =
    leavingDaysYear &&
    leavingDaysYear.personalDays.map((dates) => dates.days.length).reduce((acc, curr) => acc + curr, 0);
  const paidAbsencesLength =
    leavingDaysYear &&
    leavingDaysYear.paidAbsences.map((dates) => dates.days.length).reduce((acc, curr) => acc + curr, 0);

  const onClick = () => {
    if (holidaysLength > 24) {
      setMessage({ text: "Has excedido el límite de vacaciones", error: true });
      return;
    }
    if (personalDaysLength > 2) {
      setMessage({
        text: "Has excedido el límite de asuntos propios",
        error: true,
      });
      return;
    }
    localStorage.setItem("fechas", JSON.stringify(leavingDays));
    setMessage({ text: "Fechas guardadas", error: false });
    setTimeout(() => {setMessage({ text: "Nice", error: false })}, 2000);
  };
  return (
    <div className="flex items-end m-3">
      <div className="flex flex-wrap justify-around p-2 max-w-56 rounded mr-3 border border-solid border-current">
        <div>
          <h1 className="max-w-24">Festivos</h1>
          <p className="festivity max-w-10 p-1">13</p>
        </div>
        <div>
          <h1 className="max-w-24">Asuntos propios</h1>
          <p className="personalDays max-w-10 p-1">{2 - personalDaysLength}</p>
        </div>
        <div>
          <h1 className="max-w-24">Vacaciones</h1>
          <p className="holiday max-w-10 p-1">{24 - holidaysLength}</p>
        </div>
        <div>
          <h1 className="max-w-24">Ausencias pagadas</h1>
          <p className="paidAbsences max-w-10 p-1">{paidAbsencesLength}</p>
        </div>
      </div>
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
  );
}
