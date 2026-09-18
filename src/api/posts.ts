import type { Post } from "../types/Post";

const BASE = `${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/api`;

function authHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts`, { headers: authHeaders() });
  return res.json();
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`, { headers: authHeaders() });
  return res.json();
}

export async function createPost(data: Partial<Post>): Promise<Post> {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePost(
  id: number,
  data: Partial<Post>,
): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id: number): Promise<void> {
  await fetch(`${BASE}/posts/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
