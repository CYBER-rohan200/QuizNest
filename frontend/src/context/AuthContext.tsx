import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'
import { loginUser, logoutUser, registerUser } from '../services/authService'

export type UserData = {
  name: string
  email: string
  level: number
  xp: number
  streak: number
  lastActiveDate: string | null
  createdAt?: any
}

type AuthContextValue = {
  user: FirebaseUser | null
  userData: UserData | null
  isAuthenticated: boolean
  isLoading: boolean
  login: typeof loginUser
  register: typeof registerUser
  logout: typeof logoutUser
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        try {
          // Fetch custom user data from Firestore using UID
          const docRef = doc(db, 'users', firebaseUser.uid)
          const docSnap = await getDoc(docRef)
          
          if (docSnap.exists()) {
            setUserData(docSnap.data() as UserData)
          } else {
            console.warn("User authenticated but no Firestore document found.")
            setUserData(null)
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore:", error)
          setUserData(null)
        }
      } else {
        setUser(null)
        setUserData(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe() // Cleanup listener on unmount
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        isAuthenticated: !!user,
        isLoading,
        login: loginUser,
        register: registerUser,
        logout: logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
