import axios from "axios";


const API_BASE = import.meta.env.VITE_API_BASE;


export async function fetchWorkouts(token) {
  try {
    const res = await axios.get(`${API_BASE}/workouts`, {
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
      throw new Error("No workouts found.");
    }
    throw new Error("Error fetching workouts.");
  }
}


export async function saveWorkout(workout, token) {
  try {
    const res = await axios.post(`${API_BASE}/workouts`, workout, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 201) {
      return { success: true, data: res.data };
    }
  } catch {
    return { success: false, message: "Error saving workout." };
  }
}


export async function updateWorkout(id, workout, token) {
  try {
    const res = await axios.put(`${API_BASE}/workouts/${id}`, workout, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      return { success: true, data: res.data };
    }
  } catch {
    return { success: false, message: "Error updating workout." };
  }
}


export async function deleteWorkout(id, token) {
  try {
    const res = await axios.delete(`${API_BASE}/workouts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      return { success: true };
    }
  } catch {
    return { success: false, message: "Error deleting workout." };
  }
}
