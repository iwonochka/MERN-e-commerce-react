import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const requestBody = { email, password, name };
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((res) => {
        setMessage(res.data.message)
        setEmail("");
        setPassword("");
      })
      .catch((error) => console.log(error));
  };

  function redirectMessage(message) {
    setTimeout(function() {

    }, 3000);
  }


  return (
    <main>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Control type="text" placeholder='Username' onChange={(e) => {setName(e.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e) => {setEmail(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
        </Form.Group>
        <Form.Text className="text-muted">
          At least 6 characters and 1 special sign
        </Form.Text>
        <Button variant="primary" type="submit">
          Create account
        </Button>
      </Form>
        {message &&
        <div>
          <p>{message}</p>
          <p>You'll be redirected to login page in ... s</p>
        </div>}
    </main>
  )
}

export default Signup
