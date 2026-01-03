import { useState, useEffect } from "react";
import { useWorkoutStore } from "../store/workoutStore";
import { fetchExercises } from "../api/wger";

export default function WorkoutLog() {
  const addWorkout = useWorkoutStore((s) => s.addWorkout);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [exerciseOptions, setExerciseOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setErr("");
      try {
        const data = await fetchExercises();
        if (!mounted) return;
        const options = (data.results || [])
          .filter((ex) => ex.name?.trim())
          .map((ex) => ({ id: ex.id, name: ex.name }));
        setExerciseOptions(options);
      } catch {
        setErr("Could not load exercise options.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exercise || !sets || !reps || !weight) return;

    addWorkout({
      id: Date.now(),
      exercise,
      sets: Number(sets),
      reps: Number(reps),
      weight: Number(weight),
      timestamp: new Date().toISOString(),
    });

    setExercise("");
    setSets("");
    setReps("");
    setWeight("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Exercise</label>
          <input
            list="exercise-list"
            type="text"
            placeholder="Start typing (e.g., Bench Press)"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <datalist id="exercise-list">
            {exerciseOptions.map((opt) => (
              <option key={opt.id} value={opt.name} />
            ))}
          </datalist>
          {loading && <p className="text-xs text-gray-500 mt-1">Loading options…</p>}
          {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
        </div>
        <div>
          <label className="text-sm text-gray-600">Sets</label>
          <input
            type="number"
            min="1"
            placeholder="e.g., 4"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Reps</label>
          <input
            type="number"
            min="1"
            placeholder="e.g., 10"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Weight (kg)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            placeholder="e.g., 60"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#286DC7] text-white px-4 py-2 rounded hover:bg-[#253599]"
      >
        Log workout
      </button>
    </form>
  );
}
