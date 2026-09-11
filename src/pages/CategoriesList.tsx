import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "../api/categories";
import type { Category } from "../types/Category";
import { Table, Button } from "react-bootstrap";

export default function CategoriesList() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories().then(setCategories);
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Delete this category?")) return;
        await deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Categories</h2>
                <Button as={Link as any} to="/category/create" variant="primary">+ Create New Category</Button>
            </div>

            <Table bordered striped className="align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Content</th>
                        <th>Posts</th>
                        <th>Created At</th>
                        <th style={{ width: 160 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
    <td>{category.id}</td>
    <td>{category.name}</td>
    <td>{category.content.length > 60 ? category.content.slice(0, 60) + "..." : category.content}</td>
    <td>{category.posts_count ?? 0}</td>
    <td>
        {new Date(category.created_at).toLocaleDateString("en-AU", {
            day: "2-digit", month: "short", year: "numeric",
        })}
    </td>
    <td className="text-nowrap">
        <Button as={Link as any} to={`/category/edit/${category.id}`} size="sm" variant="warning" className="me-1">Edit</Button>
        <Button size="sm" variant="danger" onClick={() => handleDelete(category.id)}>Delete</Button>
    </td>
</tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}