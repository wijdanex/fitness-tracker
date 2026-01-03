import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchExerciseInfo } from "../api/wger";

export default function ExerciseDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const [info, setInfo] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInfo() {
      setLoading(true);
      setErr("");
      try {
        const data = await fetchExerciseInfo(id);
        setInfo(data);
      } catch {
        setErr("Could not load exercise details.");
      } finally {
        setLoading(false);
      }
    }
    loadInfo();
  }, [id]);

  const exerciseName = location.state?.name || info?.exercise?.name || `Exercise #${id}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50 p-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#253599]">{exerciseName}</h1>
        {loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {err && <p className="mt-4 text-red-600">{err}</p>}

        {info && !loading && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow space-y-4">
            {info.exercise?.description ? (
              <div>
                <h2 className="text-xl font-semibold text-[#253599]">Description</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: info.exercise.description }} />
              </div>
            ) : null}

            {info.muscles?.length ? (
              <div>
                <h2 className="text-xl font-semibold text-[#253599]">Muscles</h2>
                <p className="text-gray-700">{info.muscles.map((m) => m.name).join(", ")}</p>
              </div>
            ) : null}

            {info.images?.length ? (
              <div>
                <h2 className="text-xl font-semibold text-[#253599]">Images</h2>
                <div className="grid grid-cols-2 gap-4">
                  {info.images.map((img) => (
                    <img key={img.id} src={img.image} alt={exerciseName} className="rounded shadow" />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
