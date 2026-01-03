import WorkoutsPage from "./WorkoutsPage";
import ExerciseLibraryPage from "./ExerciseLibraryPage";
import ProgressPage from "./ProgressPage";
import ProfilePage from "./ProfilePage";
import AuthPage from "./AuthPage"; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-blue-50 p-12 flex flex-col">
      
      <div className="flex items-center gap-6 mb-12">
        <h1
          className="font-changa font-extrabold leading-tight bg-clip-text text-transparent drop-shadow-md"
          style={{
            fontSize: "64px",
            backgroundImage:
              "linear-gradient(to right, #286DC7, #4f9be6, #7fc8ff)",
          }}
        >
          STUCK TO YOUR PLAN, NOT YOUR MOOD
        </h1>
      </div>

      
      <div className="snap-y snap-mandatory flex-1">
     
        <section id="workouts" className="snap-start min-h-screen">
          <WorkoutsPage />
        </section>

        <section id="exercises" className="snap-start min-h-screen">
          <ExerciseLibraryPage />
        </section>

       
        <section id="progress" className="snap-start min-h-screen">
          <ProgressPage />
        </section>

       
        <section id="auth" className="snap-start min-h-screen">
          <AuthPage />
        </section>

   
        <section id="profile" className="snap-start min-h-screen">
          <ProfilePage />
        </section>
      </div>

      <footer className="mt-12 text-center text-gray-700">
        <div className="border-t border-gray-300 pt-6">
          <p className="text-sm text-gray-600 mt-2">
            © {new Date().getFullYear()} Fitness Tracker. Built to keep you on track.
          </p>
        </div>
      </footer>
    </div>
  );
}
