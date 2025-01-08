import { LeavingDaysType } from "../context/yearContext";

export function isLeapYear(year: number): boolean {
  return year % 4 === 0;
}

export function days(year: number): number[] {
  const february = isLeapYear(year) ? 29 : 28;
  return [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
