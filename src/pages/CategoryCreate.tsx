import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createCategory } from "../api/categories";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

export default function CategoryCreate() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCategory({ name, content });
    navigate("/categories");
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Header>Create Category</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Save
              </Button>
              <Button
                as={Link as any}
                to="/categories"
                variant="secondary"
                className="ms-2"
              >
                Cancel
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
