import "../../index.css";
import logo from "../../Assets/logo.png";

function NavBar({ children }) {
  return <nav>{children}</nav>;
}

function LoginForm() {
  return (
    <form className="login">
      <input
        type="text"
        placeholder="user"
        className="login__input login__input--user"
      />
      <input
        type="text"
        placeholder="PIN"
        maxLength="4"
        className="login__input login__input--pin"
      />
      <button className="login__btn">&rarr;</button>
    </form>
  );
}

export { LoginForm };

function GreetingLabel() {
  return <p className="welcome">Log in to get started</p>;
}

function Logo() {
  return <img src={logo} alt="Logo" className="logo" />;
}

export { Logo };

export { GreetingLabel };

export default NavBar;
