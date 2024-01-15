import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";

export default function Login({ error, setError }) {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  //const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (e) {
      setError(e.code);
      console.log(e.code);
    }

    setLoading(false);
  }

  return (
    <div className="form--container">
      <h2>Log In</h2>

      <Form onSubmit={handleSubmit} className="form--credentials">
        <Form.Group id="email" className="form--group">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password" className="form--group">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} required />
        </Form.Group>
        <Button disabled={loading} type="submit" className="form-button">
          Log In
        </Button>
      </Form>

      <div>
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
