import { ReactNode, createContext, useContext, useState } from "react";
import { isLeapYear } from "../utils/functions";

type dayType = {
  day: number;
  month: number;
};

type savedDatesType = {
  holidays: dayType[];
  ownBussines: dayType[];
  paidAbsence: dayType[];
};

export type MonthContextType = {
  year: number;
  month: number;
  init: number;
  isLeapYear: boolean;
  savedDates: savedDatesType | null;
  setSavedDates: React.Dispatch<React.SetStateAction<savedDatesType | null>>;
};

const MonthContext = createContext<MonthContextType>({
  year: 0,
  month: 0,
  init: 0,
  isLeapYear: false,
  savedDates: { holidays: [], ownBussines: [], paidAbsence: [] },
  setSavedDates: () => {},
});

export const MonthProvider = ({
  children,
  year,
  month,
}: {
  children: ReactNode;
  year: number;
  month: number;
}) => {
  const [savedDates, setSavedDates] = useState<savedDatesType | null>({
    holidays: [],
    ownBussines: [],
    paidAbsence: [],
  });
  const saved = window.localStorage.getItem("saved");
  if (saved && !savedDates) {
    setSavedDates(JSON.parse(saved));
  }

  const init = new Date(year, month, 1).getDay();
  console.log(`${month}:`, init);
  return (
    <MonthContext.Provider
      value={{
        year,
        month: month,
        init,
        isLeapYear: isLeapYear(year),
        savedDates,
        setSavedDates,
      }}
    >
      {children}
    </MonthContext.Provider>
  );
};

export default function useMonthProvider() {
  const context = useContext(MonthContext);
  if (!context) {
    throw new Error("useMonthContext must be used within a MonthProvider");
  }
  return context;
}
