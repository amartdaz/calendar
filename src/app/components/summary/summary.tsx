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
    <div className="flex flex-col items-center m-3">
      <div className="flex flex-wrap place-content-around gap-3 max-w-72 md:max-w-full p-2 rounded-[20px] mr-3">
        <div className="flex flex-col items-center">
          <label>Festivos</label>
          <p className="festivity w-10 p-1 text-center rounded-[5px]">13</p>
        </div>
        <div className="flex flex-col items-center">
          <label>Asuntos propios</label>
          <p className="personalDays w-10 p-1 text-center rounded-[5px]">{2 - personalDaysLength}</p>
        </div>
        <div className="flex flex-col items-center">
          <label>Vacaciones</label>
          <p className="holiday w-10 p-1 text-center rounded-[5px]">{24 - holidaysLength}</p>
        </div>
        <div className="flex flex-col items-center">
          <label>Ausencias pagadas</label>
          <p className="paidAbsences w-10 p-1 text-center rounded-[5px]">{paidAbsencesLength}</p>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <p
          className={
            message.error
              ? "error border border-solid border-yellow-500 rounded-[5px] p-2 min-w-96"
              : "border border-solid border-yellow-500 rounded-[5px] p-2 min-w-96"
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
