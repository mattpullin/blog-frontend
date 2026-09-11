import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, deletePost } from "../api/posts";
import type { Post } from "../types/Post";
import { Table, Button, Container , Badge } from "react-bootstrap";

export default function PostsList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    const handleDelete = async (id: number) => {
        await deletePost(id);
        setPosts((prev) => prev.filter((p) => p.id !== id)); // brief's local-state update
    };

    return (
        <Container className="mt-4">
            <h2>Posts</h2>
            <Link to="/post/create"><Button className="mb-3">+ Create New Post</Button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr><th>#</th><th>Title</th><th>Content</th><th>Category</th><th>Status</th><th>Created At</th><th>Actions</th></tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{post.category?.name}</td>

                            <td>
                            <Badge bg={post.is_active === "Yes" ? "success" : "secondary"}>{post.is_active}</Badge>
                            </td>
                            <td>{new Date(post.created_at).toLocaleString()}</td>
                            <td className="text-nowrap">
 
  <Button as={Link as any} to={`/post/edit/${post.id}`} size="sm" variant="warning" className="me-1">Edit</Button>
  <Button size="sm" variant="danger" onClick={() => handleDelete(post.id)}>Delete</Button>
</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}