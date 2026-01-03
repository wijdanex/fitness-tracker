import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function ProgressChart({ workouts }) {
  if (!workouts.length) {
    return <p className="text-gray-600">No progress data yet.</p>;
  }

  const grouped = workouts.reduce((acc, w) => {
    const date = new Date(w.timestamp).toLocaleDateString();
    const total = w.sets * w.reps * w.weight;
    acc[date] = (acc[date] || 0) + total;
    return acc;
  }, {});

  const data = Object.entries(grouped)
    .map(([date, totalWeight]) => ({ date, totalWeight }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-[#253599] mb-4">Progress Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="totalWeight" stroke="#286DC7" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
