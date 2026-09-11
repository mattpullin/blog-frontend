import { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import { updatePost } from "../api/posts";
import { Form, Button, Container } from "react-bootstrap";

export default function PostEdit() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState(1);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getPost(Number(id)).then((post) => {
                setTitle(post.title);
                setContent(post.content);
                setCategoryId(post.category_id);
            });
        }
    }, [id]);

    const handleSubmit = async () => {
        if (id) {
            await updatePost(Number(id), { title, content, category_id: categoryId });
            navigate("/");
        }
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