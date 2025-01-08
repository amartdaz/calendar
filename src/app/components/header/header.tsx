import useYearProvider from "@/app/context/yearContext";
import styles from "./header.module.css";

export default function Header() {
  const { setYear, year } = useYearProvider();
  return (
    <div className={styles.header}>
      <button className={year === 2024 ? styles.selected : ''} onClick={() => setYear(2024)}>2024</button>
      <button className={year === 2025 ? styles.selected : ''} onClick={() => setYear(2025)}>2025</button>
    </div>
  );
}
