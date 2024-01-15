function Summary({ movements }) {
  const deposits = movements.reduce(
    (acc, mov) => (mov.value >= 0 ? acc + +mov.value : acc),
    0
  );
  const withdrawals = movements.reduce(
    (acc, mov) => (mov.value < 0 ? acc + +mov.value : acc),
    0
  );

  const interest = movements
    .filter((mov) => mov.value >= 0)
    .map((deposit) => (deposit.value * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0)
    .toFixed(2);

  //console.log(movements);

  return (
    <div className="summary">
      <p className="summary__label">In</p>
      <p className="summary__value summary__value--in">{deposits}€</p>
      <p className="summary__label">Out</p>
      <p className="summary__value summary__value--out">{withdrawals}€</p>
      <p className="summary__label">Interest</p>
      <p className="summary__value summary__value--interest">{interest}€</p>
    </div>
  );
}

export default Summary;
