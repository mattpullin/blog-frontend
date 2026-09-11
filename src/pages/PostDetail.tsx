import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import type { Post } from "../types/Post";
import { Container, Card } from "react-bootstrap";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (id) getPost(Number(id)).then(setPost);
    }, [id]);

    if (!post) return <Container className="mt-4">Loading...</Container>;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{post.category?.name}</Card.Subtitle>
                    <Card.Text>{post.content}</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}