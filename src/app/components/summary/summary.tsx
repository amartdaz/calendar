export default function Summary({ holidays }: { holidays: number }) {
  return (
    <div className="flex flex-wrap justify-around p-2 max-w-96 m-auto">
      <div>
        <label>Festivos</label>
        <p className="festivity max-w-10 p-1 m-auto">13</p>
      </div>
      <div>
        <label>Vacaciones</label>
        <p className="holiday max-w-10 p-1 m-auto">{24 - holidays}</p>
      </div>
    </div>
  );
}
