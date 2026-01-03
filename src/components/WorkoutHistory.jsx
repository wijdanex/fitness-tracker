export default function WorkoutHistory({ workouts }) {
  if (!workouts.length) {
    return <p className="text-gray-600">No workouts logged yet.</p>;
  }

  const grouped = workouts.reduce((acc, w) => {
    const date = new Date(w.timestamp).toLocaleDateString();
    acc[date] = acc[date] || [];
    acc[date].push(w);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-[#253599] mb-4">{date}</h2>
          <ul className="space-y-2">
            {grouped[date].map((w) => (
              <li key={w.id} className="border-b pb-2 text-sm md:text-base">
                <span className="font-semibold">{w.exercise}</span> — {w.sets} sets × {w.reps} reps @ {w.weight}kg
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
