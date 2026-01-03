import axios from "axios";

const WGER_BASE = "https://wger.de/api/v2";


export async function fetchExercises() {
  const res = await axios.get(`${WGER_BASE}/exercise/?language=2`);
  return res.data; 
}


export async function fetchExercisesByMuscle(muscleId) {
  const res = await axios.get(`${WGER_BASE}/exercise/?language=2&muscle=${muscleId}`);
  return res.data; 
}


export async function fetchExerciseInfo(id) {
  const res = await axios.get(`${WGER_BASE}/exerciseinfo/${id}/`);
  return res.data; 
}


export async function fetchCategories() {
  const res = await axios.get(`${WGER_BASE}/exercisecategory/`);
  return res.data; 
}


export async function fetchMuscles() {
  const res = await axios.get(`${WGER_BASE}/muscle/`);
  return res.data; 
}


export async function fetchEquipment() {
  const res = await axios.get(`${WGER_BASE}/equipment/`);
  return res.data; 
}
