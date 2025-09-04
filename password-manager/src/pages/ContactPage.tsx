import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import TelegramLogo from "../assets/telegram.png";
import LinkedinLogo from "../assets/linkedinn.png";
import GithubLogo from "../assets/github.png";
import InstagramLogo from "../assets/instagram.png";
import "./ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-page">
      <Container className="text-center py-5">
        <h1 className="mb-5 text-white">Contact & Socials</h1>
        <Row className="g-4 justify-content-center">
          {[ 
            {logo: TelegramLogo, title: "Telegram", link: "https://t.me/azadovfx"},
            {logo: LinkedinLogo, title: "LinkedIn", link: "https://www.linkedin.com/in/kamron-azodov-8148a234b/"},
            {logo: GithubLogo, title: "GitHub", link: "https://github.com/azaadov"},
            {logo: InstagramLogo, title: "Instagram", link: "https://www.instagram.com/_axi.y_/"}
          ].map((item, idx) => (
            <Col md={3} key={idx}>
              <Card className="p-4 contact-card bg-dark text-center">
                <a href={item.link} target="_blank" rel="noreferrer">
                  <img src={item.logo} alt={item.title} width={50} />
                </a>
                <Card.Body>
                  <Card.Title className="text-white">{item.title}</Card.Title>
                  <Card.Text className="text-secondary">Reach me on {item.title}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default ContactPage;
