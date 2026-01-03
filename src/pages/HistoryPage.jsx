import { useWorkoutStore } from "../store/workoutStore";
import WorkoutHistory from "../components/WorkoutHistory";

export default function HistoryPage() {
  const workouts = useWorkoutStore((s) => s.workouts);
  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <WorkoutHistory workouts={workouts} />
      </div>
    </div>
  );
}
