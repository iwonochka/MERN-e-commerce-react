import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { useState, useContext } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
const REACT_APP_API_URL="http://localhost:5005"
const REACT_APP_API_URL2="https://vellox.cyclic.app"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const requestBody = { email, password };
    axios
      .post(`${REACT_APP_API_URL}/auth/login`, requestBody)
      .then((res) => {
        setEmail("");
        setPassword("");
        storeToken(res.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setMessage(errorDescription);
      });
  }

  return (
    <Row className="auth-container main-container">
      <div className="login-container">
        <Col sm={12} md={6} lg={6} gap={5}>
          <Form onSubmit={handleSubmit} method="post">
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
              <Form.Text className="text-muted">
                At least 6 characters and 1 special sign
              </Form.Text>
            </Form.Group>
            <Button variant="dark" type="submit">
              Log in
            </Button>
          </Form>
          {message && (
            <div>
              <p>{message}</p>
              <p>You'll be redirected to login page in ... s</p>
            </div>
          )}
        </Col>
        <Col sm={12} md={6} lg={6} gap={5}>
          <section>
            <p>No account yet?</p>
            <Button href="/signup" variant="dark">
              Signup
            </Button>
          </section>
        </Col>
      </div>
    </Row>
  );
};

export default Login;
