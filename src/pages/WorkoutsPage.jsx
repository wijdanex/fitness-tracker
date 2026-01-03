import { useWorkoutStore } from "../store/workoutStore";
import WorkoutLog from "../components/WorkoutLog";
import WorkoutHistory from "../components/WorkoutHistory";
import ProgressChart from "../components/ProgressChart";
import WorkoutCard from "../components/WorkoutCard";

export default function WorkoutsPage() {
 
  const workouts = useWorkoutStore((s) => s.workouts);

  return (
    <div className="p-10 min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50 space-y-12">
      <div className="text-center">
        <h1
          className="text-5xl font-extrabold bg-clip-text text-transparent drop-shadow-lg"
          style={{ backgroundImage: "linear-gradient(to right, #286DC7, #4f9be6, #7fc8ff)" }}
        >
          Elevate Your Training!!
        </h1>
        <p className="text-lg text-gray-700 mt-3 italic">
          Log your workouts, track progress, and stay unstoppable!
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <WorkoutLog />
      </div>

      <div className="max-w-4xl mx-auto">
        <WorkoutHistory workouts={workouts} />
      </div>

      <div className="max-w-4xl mx-auto">
        <ProgressChart workouts={workouts} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {workouts.map((w) => (
          <WorkoutCard key={w.id} workout={w} />
        ))}
      </div>
    </div>
  );
}
