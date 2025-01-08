import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { months24, months25 } from "../data/months";

export type LeavingDaysType = {
  year: number;
  holidays: { month: string; days: number[] }[];
  personalDays: { month: string; days: number[] }[];
  paidAbsences: { month: string; days: number[] }[];
};

export type YearContextType = {
  year: number;
  months: { name: string; days: number; init: number; freeDays: number[] }[];
  leavingDays: LeavingDaysType[];
  setLeavingDays: React.Dispatch<React.SetStateAction<LeavingDaysType[]>>;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  addDate: (holidayType: string, day: number, month: string) => void;
};

const YearContext = createContext<YearContextType>({
  year: 2024,
  months: months24,
  leavingDays: [],
  setLeavingDays: () => {},
  setYear: () => {},
  addDate: (holidayType: string, day: number, month: string) => {return},
});

export const YearProvider = ({ children }: { children: ReactNode }) => {
  const [year, setYear] = useState<number>(2025);
  const [months, setMonths] =
    useState<
      { name: string; days: number; init: number; freeDays: number[] }[]
    >(months24);
  const [leavingDays, setLeavingDays] = useState<LeavingDaysType[]>([
    { year: 2024, holidays: [], personalDays: [], paidAbsences: [] },
    { year: 2025, holidays: [], personalDays: [], paidAbsences: [] },
  ]);

  function addDate(holidayType: string, day: number, month: string) {
    const leavingDaysYear = leavingDays.filter(date => date.year === year)[0];
    const restLeavingDays = leavingDays.filter(date => date.year !== year);

    if(holidayType === 'paidAbsences') {
      setLeavingDays([...restLeavingDays, {...leavingDaysYear, paidAbsences: leavingDaysYear.paidAbsences.map((days) => {
        if(month === days.month) {
          return {month: month, days: days.days.slice(0,-1)}
        }
        return days;
      })}]);
      return;
    }

    let newHolidays: {month: string, days: number[]}[] = [];
    if(holidayType === 'holidays') {
      newHolidays = leavingDaysYear.holidays.map((days) => {
        if(month === days.month) {
          return {month: month, days: days.days.filter(oldDay => oldDay !== day)}
        }
        return days;
      });
    }

    let newPersonalDays: {month: string, days: number[]}[] = [];
    if(holidayType === 'personalDays') {
      newPersonalDays = leavingDaysYear.personalDays.map((days) => {
        if(month === days.month) {
          return {month: month, days: days.days.filter(oldDay => oldDay !== day)}
        }
        return days;
      });
    }

    const leavingDaysAndTypes: { [key:string]: {list: {month: string, days: number[]}[], type: 'holidays' | 'personalDays' | 'paidAbsences', updated: {month: string, days: number[]}[]}} = {
      'daily': {list: leavingDaysYear.holidays, type: 'holidays', updated: []},
      'holidays': {list: leavingDaysYear.personalDays, type: 'personalDays', updated: newHolidays},
      'personalDays': {list: leavingDaysYear.paidAbsences, type: 'paidAbsences', updated: newPersonalDays},
    }

    if(holidayType !== 'daily') {
      if(leavingDaysAndTypes[holidayType].list.length === 0){
        const newDays = [{ month: month, days: [day] }];
        setLeavingDays([...restLeavingDays, {
            ...leavingDaysYear, [holidayType]: leavingDaysAndTypes[holidayType].updated,
            [leavingDaysAndTypes[holidayType].type]: newDays,
          }]);
          return;
      }
      const matchedMonth = leavingDaysAndTypes[holidayType].list.filter((date) => date.month === month);
      if(matchedMonth.length === 0){
        setLeavingDays([...restLeavingDays, {
          ...leavingDaysYear, [holidayType]: leavingDaysAndTypes[holidayType].updated,
          [leavingDaysAndTypes[holidayType].type]: [...leavingDaysAndTypes[holidayType].list, { month: month, days: [day]}]
        }]);
        return;
      }
      const newDays = leavingDaysAndTypes[holidayType].list.map((date) => {
        if(date.month === month && !date.days.includes(day)){
          return { month: month, days: [...date.days, day]};
        }
        return date;
      })
      setLeavingDays([...restLeavingDays, { ...leavingDaysYear, [holidayType]: leavingDaysAndTypes[holidayType].updated, [leavingDaysAndTypes[holidayType].type]: newDays }]);;
      return;
    }

    if(leavingDaysAndTypes[holidayType].list.length === 0){
      const newDays = [{ month: month, days: [day] }];
      setLeavingDays([...restLeavingDays, {
          ...leavingDaysYear,
          [leavingDaysAndTypes[holidayType].type]: newDays,
        }])
        return;
    }
    const matchedMonth = leavingDaysAndTypes[holidayType].list.filter((date) => date.month === month);
    if(matchedMonth.length === 0){
      setLeavingDays([...restLeavingDays, {
        ...leavingDaysYear,
        [leavingDaysAndTypes[holidayType].type]: [...leavingDaysAndTypes[holidayType].list, { month: month, days: [day]}]
      }])
      return;
    }
    const newDays = leavingDaysAndTypes[holidayType].list.map((date) => {
      if(date.month === month && !date.days.includes(day)){
        return { month: month, days: [...date.days, day]};
      }
      return date;
    })
    setLeavingDays([...restLeavingDays, { ...leavingDaysYear, [leavingDaysAndTypes[holidayType].type]: newDays }]);
  }

  useEffect(() => {
    switch (year) {
      case 2025:
        setMonths(months25);
        break;
      default:
        setMonths(months24);
        break;
    }
  }, [year]);

  useEffect(() => {
    const localDates = localStorage.getItem("fechas");
    if (localDates) {
      setLeavingDays(JSON.parse(localDates));
    }
  }, []);

  return (
    <YearContext.Provider
      value={{
        year,
        months,
        leavingDays,
        setLeavingDays,
        setYear,
        addDate,
      }}
    >
      {children}
    </YearContext.Provider>
  );
};

export default function useYearProvider() {
  const context = useContext(YearContext);
  if (!context) {
    throw new Error("useYearContext must be used within a YearProvider");
  }
  return context;
}
