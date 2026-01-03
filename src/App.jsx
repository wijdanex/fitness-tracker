import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import WorkoutsPage from "./pages/WorkoutsPage";
import ExerciseLibraryPage from "./pages/ExerciseLibraryPage";
import ExerciseDetailPage from "./pages/ExerciseDetailPage";
import ProgressPage from "./pages/ProgressPage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage"; 

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/exercises" element={<ExerciseLibraryPage />} />
        <Route path="/exercise/:id" element={<ExerciseDetailPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/auth" element={<AuthPage />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
