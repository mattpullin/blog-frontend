import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPost, updatePost } from "../api/posts";
import { getCategories } from "../api/categories";
import type { Category } from "../types/Category";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

export default function PostEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [isActive, setIsActive] = useState("Yes");
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (id) {
      getPost(Number(id)).then((post) => {
        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.category_id);
        setIsActive(post.is_active);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await updatePost(Number(id), {
        title,
        content,
        category_id: categoryId,
        is_active: isActive,
      });
      navigate("/");
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Header>Edit Post</Card.Header>
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
                Update
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
