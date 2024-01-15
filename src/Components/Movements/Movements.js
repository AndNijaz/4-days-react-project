function Movements({ movements, sorted }) {
  const movementsLength = movements.length;

  let movs = [...movements].reverse();

  if (sorted === "ASCENDING") {
    movs = movs.sort((a, b) => a.value - b.value);
  } else if (sorted === "DESCENDING") {
    movs = movs.sort((a, b) => b.value - a.value);
  }

  return (
    <div className="movements">
      {movs.slice().map((mov, i) => (
        <Movement
          movement={mov}
          movNum={movementsLength - i}
          key={movementsLength - i}
        />
      ))}
    </div>
  );
}

function Movement({ movement, movNum }) {
  const { value, date } = movement;

  const movementDate = new Date(date);

  const daysPassed = Math.floor(
    (new Date() - movementDate) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="movements__row">
      <div
        className={`movements__type movements__type--${
          value > 0 ? "deposit" : "withdrawal"
        }`}
      >{`${movNum} ${value > 0 ? "DEPOSIT" : "WITHDRAWAL"}`}</div>
      <div className="movements__date">
        {daysPassed === 0
          ? "Today"
          : daysPassed === 1
          ? "Yesterday"
          : daysPassed <= 7
          ? `${daysPassed} days ago`
          : Intl.DateTimeFormat("BA").format(date)}
      </div>
      <div className="movements__value">{value}€</div>
    </div>
  );
}

export default Movements;
