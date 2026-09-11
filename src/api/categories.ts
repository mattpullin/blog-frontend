import type { Category } from "../types/Category";

const BASE = "http://localhost:8000/api";

function authHeaders(): HeadersInit {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    };
}

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE}/categories`, { headers: authHeaders() });
    return res.json();
}

export async function getCategory(id: number): Promise<Category> {
    const res = await fetch(`${BASE}/categories/${id}`, { headers: authHeaders() });
    return res.json();
}

export async function createCategory(data: Partial<Category>): Promise<Category> {
    const res = await fetch(`${BASE}/categories`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    const res = await fetch(`${BASE}/categories/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
    await fetch(`${BASE}/categories/${id}`, { method: "DELETE", headers: authHeaders() });
}

