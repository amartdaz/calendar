"use client";
import Week from "../week/week";
import useYearProvider from "@/app/context/yearContext";

export default function Month({ index }: { index: number }) {
  const { months } = useYearProvider();
  const month = months[index];
  const allDays = [...Array(month.days).keys()];
  const weeks = Math.ceil((month.days + month.init) / 7);

  return (
    <div className="max-w-96 m-3 text-center">
      <label className="monthName">{month.name}</label>
      <div className="month h-80">
        <div className="weekdays mb-2">
          <label>Lun</label>
          <label>Mar</label>
          <label>Mier</label>
          <label>Jue</label>
          <label>Vier</label>
          <label>Sab</label>
          <label>Dom</label>
        </div>
        {[...Array(weeks).keys()].map((week, index) => {
          const numbers =
            index === 0
              ? allDays.slice(0, 7 - month.init)
              : allDays.slice(
                  7 * index - month.init,
                  7 * (index + 1) - month.init
                );
          return index === 0 ? (
            <Week
              month={month.name}
              init={month.init}
              numbers={numbers}
              key={index}
            />
          ) : (
            <Week month={month.name} init={0} numbers={numbers} key={index} />
          );
        })}
      </div>
    </div>
  );
}
