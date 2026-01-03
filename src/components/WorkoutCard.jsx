export default function WorkoutCard({ workout }) {
  const date = new Date(workout.timestamp).toLocaleString();
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-lg font-semibold text-[#253599]">{workout.exercise}</h3>
      <p className="text-gray-700 mt-2">
        {workout.sets} sets × {workout.reps} reps @ {workout.weight}kg
      </p>
      <p className="text-gray-500 text-sm mt-2">{date}</p>
    </div>
  );
}
