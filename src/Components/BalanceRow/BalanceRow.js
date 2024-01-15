function BalanceRow({ movements }) {
  const totalBalance = movements.reduce((acc, mov) => acc + +mov.value, 0);

  return (
    <div className="balance">
      <div>
        <p className="balance__label">Current balance</p>
        <p className="balance__date">
          As of{" "}
          <span className="date">
            {Intl.DateTimeFormat("BA").format(new Date())}
          </span>
        </p>
      </div>
      <p className="balance__value">{totalBalance}€</p>
    </div>
  );
}

export default BalanceRow;
