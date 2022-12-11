import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const requestBody = { email, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/login`, requestBody)
      .then((response) => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  };


  return (
    <Row className='auth-form'>
      <Col sm={12} md={6} lg={6} gap={5}>
        <Form onSubmit={handleSubmit} method="post">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
            <Form.Text className="text-muted">
              At least 6 characters and 1 special sign
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      </Col>
      <Col sm={12} md={6} lg={6} gap={5}>
        <section>
          <p>No account yet?</p>
          <Button href="/signup" variant="dark">Signup</Button>
        </section>
      </Col>
    </Row>
  )
}

export default Login
