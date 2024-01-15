import { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { colRef } from "../../firebase";

function Signup({ error, setError }) {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      addDoc(colRef, {
        email: emailRef.current.value,
        name: nameRef.current.value,
        movements: [],
      }).then(() => {});
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      setError(e.code);
    }

    setLoading(false);
  }

  return (
    <div className="form--container">
      <h2 className="">Sing Up</h2>
      {currentUser && currentUser.email}
      <form onSubmit={handleSubmit} className="form--credentials">
        <Form.Group id="name" className="form--group">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" ref={nameRef} required />
        </Form.Group>
        <Form.Group id="email" className="form--group">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password" className="form--group">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" ref={passwordRef} required />
        </Form.Group>
        <Form.Group id="password-confirm" className="form--group">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="text" ref={passwordConfirmRef} required />
        </Form.Group>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="form-button"
        >
          Submit
        </Button>
      </form>

      <div>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

export default Signup;
