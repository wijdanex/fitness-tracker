
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [workouts, setWorkouts] = useState([]);
  const [progressData, setProgressData] = useState([]);


  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(savedWorkouts);

    const totalWeight = savedWorkouts.reduce(
      (sum, w) => sum + w.exercises.reduce((s, e) => s + e.weight * e.reps, 0),
      0
    );
    const totalWorkouts = savedWorkouts.length;
    setProgressData({ totalWeight, totalWorkouts });
  }, []);

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-200 via-indigo-300 to-blue-100">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 transition-transform hover:scale-[1.01]">
       
        <section className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-[#253599] tracking-wide">
             My Profile
          </h1>
          <p className="text-gray-700 mt-2">
            Track your workouts and celebrate your progress!
          </p>
        </section>

      
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-[#253599] mb-4">
             Workout History
          </h2>
          {workouts.length === 0 ? (
            <p className="text-gray-500 italic">No workouts logged yet. Time to get moving!</p>
          ) : (
            <ul className="space-y-4">
              {workouts.map((w, i) => (
                <li
                  key={i}
                  className="bg-gradient-to-r from-blue-50 to-indigo-100 p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <p className="font-bold text-gray-800">
                    {new Date(w.date).toLocaleString()}
                  </p>
                  <ul className="ml-4 list-disc text-gray-600">
                    {w.exercises.map((ex, j) => (
                      <li key={j}>
                        {ex.name} — {ex.sets} sets × {ex.reps} reps @ {ex.weight}kg
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>

        
        <section>
          <h2 className="text-2xl font-semibold text-[#253599] mb-4">
             Progress
          </h2>
          <div className="bg-gradient-to-r from-indigo-50 to-blue-100 p-4 rounded-lg shadow flex flex-col gap-2">
            <p className="text-gray-700">
              Total Workouts:{" "}
              <span className="font-bold text-indigo-700">
                {progressData.totalWorkouts}
              </span>
            </p>
            <p className="text-gray-700">
              Total Weight Lifted:{" "}
              <span className="font-bold text-indigo-700">
                {progressData.totalWeight} kg
              </span>
            </p>
            <p className="text-sm text-gray-500 italic">
              Keep pushing — every rep counts!
            </p>
          </div>
          
        </section>
      </div>
    </div>
  );
}
