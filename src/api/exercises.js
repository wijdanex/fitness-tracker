import axios from "axios";


const API_BASE = "https://your-fitness-app.com/api";


export async function fetchExercises(token) {
  try {
    const res = await axios.get(`${API_BASE}/exercises`, {
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
      throw new Error("No exercises found.");
    }
    throw new Error("Error fetching exercises.");
  }
}

export async function saveExercise(exercise, token) {
  try {
    const res = await axios.post(`${API_BASE}/exercises`, exercise, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 201) {
      return res.data;
    }
  } catch {
    throw new Error("Error saving exercise.");
  }
}
