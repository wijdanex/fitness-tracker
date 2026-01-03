import { useEffect, useState } from "react";
import { useWorkoutStore } from "../store/workoutStore";
import ProgressChart from "../components/ProgressChart";
import { fetchExercises, fetchMuscles } from "../api/wger";

export default function ProgressPage() {
  const workouts = useWorkoutStore((s) => s.workouts);
  const [muscles, setMuscles] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

 
  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");


  useEffect(() => {
    async function loadMuscles() {
      try {
        const musData = await fetchMuscles();
        const musMap = {};
        (musData.results || []).forEach((m) => {
          musMap[m.id] = m.name;
        });
        setMuscles(musMap);
      } catch {
        setErr("Could not load muscles.");
      }
    }
    loadMuscles();
  }, []);

  useEffect(() => {
    async function loadRecommendations() {
      if (!workouts.length) return;
      setLoading(true);
      setErr("");
      try {
        const muscleCount = {};
        workouts.forEach((w) => {
          const name = w.exercise.toLowerCase();
          Object.entries(muscles).forEach(([id, mName]) => {
            if (name.includes(mName.toLowerCase())) {
              muscleCount[id] = (muscleCount[id] || 0) + 1;
            }
          });
        });

        const sorted = Object.entries(muscleCount).sort((a, b) => a[1] - b[1]);
        const undertrainedIds = sorted.slice(0, 2).map(([id]) => id);

        const recs = [];
        for (const mId of undertrainedIds) {
          const data = await fetchExercises();
          const matches = (data.results || [])
            .filter((ex) => ex.exercise?.muscles?.includes(Number(mId)))
            .slice(0, 3);
          recs.push(...matches);
        }
        setRecommendations(recs);
      } catch {
        setErr("Could not load recommendations.");
      } finally {
        setLoading(false);
      }
    }
    loadRecommendations();
  }, [workouts, muscles]);

 
  const handleShare = () => {
    const message = ` My fitness progress: ${workouts.length} workouts logged! 
Here are some exercise recommendations: ${recommendations
      .map((r) => r.exercise?.name)
      .filter(Boolean)
      .join(", ")}
 Nutrition: ${meals.length} meals logged, total ${totalCalories()} kcal.`;

    if (navigator.share) {
      navigator
        .share({
          title: "My Fitness Progress",
          text: message,
          url: window.location.href,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      navigator.clipboard.writeText(message);
      alert("Progress copied to clipboard! You can paste it anywhere to share.");
    }
  };

  
  const addMeal = (e) => {
    e.preventDefault();
    if (!mealName || !calories) return;
    setMeals([...meals, { name: mealName, calories: Number(calories) }]);
    setMealName("");
    setCalories("");
  };

  const totalCalories = () =>
    meals.reduce((sum, m) => sum + (m.calories || 0), 0);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50">
      <div className="max-w-4xl mx-auto space-y-10">
        <ProgressChart workouts={workouts} />

    
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#253599] mb-4">
            Diet & Nutrition Tracking
          </h2>
          <form onSubmit={addMeal} className="flex gap-4 mb-4">
            <input
              type="text"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              placeholder="Meal name"
              className="flex-1 border rounded px-3 py-2"
            />
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-32 border rounded px-3 py-2"
            />
            <button
              type="submit"
              className="bg-[#286DC7] text-white px-4 py-2 rounded hover:bg-[#253599] transition"
            >
              Add Meal
            </button>
          </form>
          <ul className="space-y-2">
            {meals.map((m, i) => (
              <li
                key={i}
                className="flex justify-between border-b pb-1 text-gray-700"
              >
                <span>{m.name}</span>
                <span>{m.calories} kcal</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold text-[#253599]">
            Total Calories: {totalCalories()} kcal
          </p>
        </div>

       
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-[#253599] mb-4">
            Exercise Recommendations
          </h2>
          {loading && <p className="text-gray-600">Loading recommendations...</p>}
          {err && <p className="text-red-600">{err}</p>}
          {!loading && !err && recommendations.length === 0 && (
            <p className="text-gray-600">Log some workouts to see recommendations.</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.exercise?.id}
                className="p-4 border rounded-lg hover:shadow-md transition"
              >
                <h3 className="font-semibold text-[#253599]">
                  {rec.exercise?.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Muscles:{" "}
                  {rec.muscles?.map((m) => muscles[m.id]).filter(Boolean).join(", ") ||
                    "Not specified"}
                </p>
              </div>
            ))}
          </div>

          
          <div className="mt-6 text-center">
            <button
              onClick={handleShare}
              className="bg-[#286DC7] text-white px-6 py-2 rounded hover:bg-[#253599] transition"
            >
              Share My Progress & Nutrition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
