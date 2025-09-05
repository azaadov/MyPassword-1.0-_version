import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner, Alert, InputGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import { API_URL } from "../config";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // show/hide state

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.access_token); // token saqlash
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <Container className="auth-page d-flex justify-content-center align-items-center">
      <Card className="auth-card p-4">
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"} // shartli tip
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button variant="outline-secondary" type="button" onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>

          <Button type="submit" className="w-100" variant="warning" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>

        <p className="mt-3 text-center text-secondary">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </Card>
    </Container>
  );
}

export default LoginPage;
