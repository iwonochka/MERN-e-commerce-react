import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(undefined);
  const navigate = useNavigate();
  // const REACT_APP_API_URL="http://localhost:5005"
  const REACT_APP_API_URL="https://vellox.cyclic.app"

  function handleSubmit(e) {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post(`${REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((res) => {
        setEmail("");
        setPassword("");
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setMessage(errorDescription);
      });
  }


  return (
    <main className="main-container auth-container">
      <div className="signup-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Text className="text-muted">
            At least 6 characters and 1 special sign
          </Form.Text>
          <Button variant="dark" type="submit" className="signup-btn">
            Create account
          </Button>
        </Form>
        {message && (
          <div>
            <p>{message}</p>
          </div>
        )}
        <Button href="/login" variant="dark" className="signup-btn">
          Back to Login
        </Button>

      </div>
    </main>
  );
};

export default Signup;
