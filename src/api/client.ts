const BASE = "http://localhost:8000/api";

function authHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    return {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
    };
}

export async function login(email: string, password: string): Promise<string> {
    const res = await fetch(`${BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    localStorage.setItem("token", data.token);
    return data.token;
}

export async function logout(): Promise<void> {
    await fetch(`${BASE}/logout`, {
        method: "POST",
        headers: authHeaders(),
    });
    localStorage.removeItem("token");
}