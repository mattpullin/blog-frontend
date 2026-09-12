import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/client";
import { Form, Button, Container } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await login(email, password);
    navigate("/");
  };

  return (
    <Container className="mt-4" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      <Form.Control
        className="mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Form.Control
        className="mb-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>Log in</Button>
    </Container>
  );
}
