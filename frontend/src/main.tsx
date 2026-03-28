import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom'
import { AppErrorBoundary } from './components/AppErrorBoundary'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LevelProvider } from './context/LevelContext'
import { StreakProvider } from './context/StreakContext'
import { TopicProgressProvider } from './context/TopicProgressContext'
import { clearAllQuizNestData } from './services/storageReset'
import { LanguageProvider } from './context/LanguageContext'
import './index.css'
import App from './App.tsx'

function ResetOnQuery() {
  const location = useLocation()
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('reset') === '1') {
      clearAllQuizNestData()
      window.location.href = location.pathname
    }
  }, [location.search, location.pathname])
  return null
}

function UserStateProviders({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) return null
  
  const userId = user?.uid || 'guest'
  
  return (
    <LevelProvider key={`level-${userId}`} userId={userId}>
      <StreakProvider key={`streak-${userId}`} userId={userId}>
        <TopicProgressProvider key={`topic-${userId}`} userId={userId}>
          {children}
        </TopicProgressProvider>
      </StreakProvider>
    </LevelProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <BrowserRouter>
        <ResetOnQuery />
        <AuthProvider>
          <LanguageProvider>
            <UserStateProviders>
              <App />
            </UserStateProviders>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  </StrictMode>,
)
