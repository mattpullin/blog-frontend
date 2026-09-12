import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createPost } from "../api/posts";
import { getCategories } from "../api/categories";
import type { Category } from "../types/Category";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Yes");

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      if (data.length > 0) setCategoryId(data[0].id);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPost({
      title,
      content,
      category_id: categoryId,
      is_active: isActive,
    });
    navigate("/");
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Header>Create Post</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
              <Form.Group className="mb-3" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option value="Yes">Active</option>
                  <option value="No">Inactive</option>
                </Form.Select>
              </Form.Group>

              <Button type="submit" variant="primary">
                Save
              </Button>

              <Button
                as={Link as any}
                to="/"
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
