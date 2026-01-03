import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchExercises, fetchExercisesByMuscle, fetchCategories, fetchMuscles } from "../api/wger";

export default function ExerciseLibraryPage() {
  const [exercises, setExercises] = useState([]);
  const [categories, setCategories] = useState({});
  const [muscles, setMuscles] = useState({});
  const [query, setQuery] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadMeta() {
      try {
        const [catData, musData] = await Promise.all([fetchCategories(), fetchMuscles()]);
        const catMap = {};
        (catData.results || []).forEach((c) => { catMap[c.id] = c.name; });
        const musMap = {};
        (musData.results || []).forEach((m) => { musMap[m.id] = m.name; });
        setCategories(catMap);
        setMuscles(musMap);
      } catch {
        setErr("Could not load categories or muscles.");
      }
    }
    loadMeta();
  }, []);

  useEffect(() => {
    async function loadExercises() {
      setLoading(true);
      setErr("");
      try {
        const data = muscleFilter
          ? await fetchExercisesByMuscle(muscleFilter)
          : await fetchExercises();
        setExercises(data.results || []);
      } catch {
        setErr("Could not load exercises.");
      } finally {
        setLoading(false);
      }
    }
    loadExercises();
  }, [muscleFilter]);

  const filtered = exercises.filter((ex) =>
    (ex.name || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50 p-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-[#253599] tracking-wide drop-shadow-md">
          Explore the Exercise Library
        </h1>
        <p className="text-lg text-gray-700 mt-2 italic">Exercises fetched live from WGER API</p>
      </div>

      <div className="max-w-3xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search exercises..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-2 border-indigo-200 rounded-lg px-4 py-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-[#286DC7]"
        />
        <select
          value={muscleFilter}
          onChange={(e) => setMuscleFilter(e.target.value)}
          className="border-2 border-indigo-200 rounded-lg px-4 py-3 w-full shadow focus:outline-none focus:ring-2 focus:ring-[#286DC7]"
        >
          <option value="">All muscles</option>
          {Object.entries(muscles).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
        <div className="flex items-center justify-center text-sm text-gray-600">
          {filtered.length} results
        </div>
      </div>

      {loading && <p className="text-center text-gray-600">Loading exercises...</p>}
      {err && <p className="text-center text-red-600">{err}</p>}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-600">No exercises match your search.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((exercise) => (
          <Link
            key={exercise.id}
            to={`/exercise/${exercise.id}`}
            state={exercise}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer border-t-4 border-[#286DC7]"
          >
            <h2 className="text-xl font-semibold text-[#253599]">{exercise.name}</h2>
            <p className="text-gray-600 mt-2">
              {categories[exercise.category] || "No category"} •{" "}
              {exercise.muscles?.map((mId) => muscles[mId]).join(", ") || "No muscles"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
