import axios from "axios";

const API_BASE = "https://your-fitness-app.com/api";


export async function fetchUser(token) {
  try {
    const res = await axios.get(`${API_BASE}/user`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    if (err.response?.status === 404) {
      throw new Error("User profile not found.");
    }
    throw new Error("Error fetching user profile.");
  }
}


export async function saveUser(user, token) {
  try {
    const res = await axios.put(`${API_BASE}/user`, user, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200 || res.status === 201) {
      return { success: true, data: res.data };
    }
  } catch {
    return { success: false, message: "Error saving user profile." };
  }
}
