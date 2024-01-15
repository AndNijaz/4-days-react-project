function Button({ type, className, style, children, onClick }) {
  return (
    <button type={type} style={style} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
