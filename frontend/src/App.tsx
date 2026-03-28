import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import SubjectsPage from './pages/SubjectsPage'
import QuizPage from './pages/QuizPage'
import ChallengePage from './pages/ChallengePage'
import LeaderboardPage from './pages/LeaderboardPage'
import MiniGamesPage from './pages/MiniGamesPage'
import StudyPlannerPage from './pages/StudyPlannerPage'

import { useEffect } from 'react'

function App() {
  useEffect(() => {
    // Backend migration logic has been securely relocated to the node backend
  }, [])

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="subjects" element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
        <Route path="study-planner" element={<ProtectedRoute><StudyPlannerPage /></ProtectedRoute>} />
        <Route path="mini-games" element={<MiniGamesPage />} />
        <Route path="quiz/:topicId" element={<QuizPage />} />
        <Route path="challenge/:topicId" element={<ChallengePage />} />
        <Route path="leaderboard" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  )
}

export default App
