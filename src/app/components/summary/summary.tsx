export default function Summary({ holidays, ownBusiness, paidAbsence }: { holidays: number, ownBusiness: number, paidAbsence: number }) {
  return (
    <div className="flex flex-wrap justify-around p-2 max-w-56 rounded mr-3 border border-solid border-current">
      <div>
        <h1 className="max-w-24">Festivos</h1>
        <p className="festivity max-w-10 p-1">13</p>
      </div>
      <div>
        <h1 className="max-w-24">Ausencias pagadas</h1>
        <p className="paidAbsence max-w-10 p-1">{paidAbsence}</p>
      </div>
      <div>
        <h1 className="max-w-24">Vacaciones</h1>
        <p className="holiday max-w-10 p-1">{24 - holidays}</p>
      </div>
      <div>
        <h1 className="max-w-24">Asuntos propios</h1>
        <p className="ownBusiness max-w-10 p-1">{2 - ownBusiness}</p>
      </div>
    </div>
  );
}
