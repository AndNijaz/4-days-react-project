import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { updateEmail, updatePassword } from "firebase/auth";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    console.log(currentUser);

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(currentUser, emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(currentUser, passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);

        setError(e.code);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="form--container">
      <h2>Update Profile</h2>
      <Form onSubmit={handleSubmit} className="form--credentials">
        <Form.Group id="email" className="form--group">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            required
            defaultValue={currentUser.email}
          />
        </Form.Group>
        <Form.Group id="password" className="form--group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="Leave blank to keep the same"
          />
        </Form.Group>
        <Form.Group id="password-confirm" className="form--group">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            ref={passwordConfirmRef}
            placeholder="Leave blank to keep the same"
          />
        </Form.Group>
        <Button disabled={loading} type="submit" className="form-button">
          Update
        </Button>
      </Form>

      <div>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}
