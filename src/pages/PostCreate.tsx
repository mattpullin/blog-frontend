import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/posts";
import { Form, Button, Container } from "react-bootstrap";

export default function PostCreate() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState(1);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        await createPost({ title, content, category_id: categoryId });
        navigate("/");
    };

    return (
        <Container className="mt-4" style={{ maxWidth: 600 }}>
            <h2>Create Post</h2>
            <Form.Control className="mb-2" placeholder="Title"
                value={title} onChange={(e) => setTitle(e.target.value)} />
            <Form.Control className="mb-2" as="textarea" rows={5} placeholder="Content"
                value={content} onChange={(e) => setContent(e.target.value)} />
            <Form.Control className="mb-2" type="number" placeholder="Category ID"
                value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} />
            <Button onClick={handleSubmit}>Save</Button>
        </Container>
    );
}