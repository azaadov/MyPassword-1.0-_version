import React from "react";
import { Container, Navbar, Nav, Button, Card, Col, Row } from "react-bootstrap";
import logo from "../assets/logo.png"; 
import "./Homepage.css";

function HomePage() {
  return (
    <>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-5">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center fw-bold fs-3 text-white">
            <img
              src={logo}
              alt="MyPassword Logo"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            MyPassword
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link href="/" className="text-white">Home</Nav.Link>
              <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
              <Nav.Link href="/login">
                <Button variant="outline-warning" className="ms-3">Login</Button>
              </Nav.Link>
              <Nav.Link href="/register">
                <Button variant="warning" className="ms-2">Register</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero section */}
      <Container className="hero-section mb-5 text-center">
        <h1 className="display-3 mb-3 fw-bold">Secure Your Passwords</h1>
        <p className="lead mb-4">
          Keep all your passwords safe, organized, and accessible anywhere.
        </p>
        <Button href="/register" className="hero-btn">Get Started</Button>
      </Container>

      {/* Features section */}
      <Container className="mb-5">
        <h2 className="text-center mb-4 fw-bold">Features</h2>
        <Row className="g-4 justify-content-center">
          <Col md={4}>
            <Card className="feature-card h-100 text-center">
              <Card.Body>
                <Card.Title>Secure Storage</Card.Title>
                <Card.Text>All your passwords are encrypted and protected.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card h-100 text-center">
              <Card.Body>
                <Card.Title>Easy Access</Card.Title>
                <Card.Text>Access your passwords anytime, anywhere, on any device.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card h-100 text-center">
              <Card.Body>
                <Card.Title>Auto Fill</Card.Title>
                <Card.Text>Quickly fill in your passwords using browser extensions.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
