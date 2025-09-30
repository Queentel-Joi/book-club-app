const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://book-club-app-ix0p.onrender.com";

// Helper to get token
function getAuthHeaders() {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchBooks() {
  try {
    const res = await fetch(`${API_BASE_URL}/books`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch books: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("fetchBooks error:", err);
    throw err;
  }
}

export async function fetchReviews() {
  try {
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      headers: {
        ...getAuthHeaders(),
      },
    });
    if (!res.ok) throw new Error(`Failed to fetch reviews: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("fetchReviews error:", err);
    throw err;
  }
}

export async function loginUser(values) {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    // ✅ Save token
    localStorage.setItem("access_token", data.access_token);

    return data;
  } catch (err) {
    console.error("loginUser error:", err);
    throw err;
  }
}
