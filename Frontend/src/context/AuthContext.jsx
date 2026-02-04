import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const getStoredToken = () => localStorage.getItem('tm_token') || ''

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getStoredToken)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      localStorage.setItem('tm_token', token)
    } else {
      localStorage.removeItem('tm_token')
    }
  }, [token])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login: (newToken, newUser) => {
        setToken(newToken)
        if (newUser) setUser(newUser)
      },
      setUser,
      logout: () => {
        setToken('')
        setUser(null)
      },
    }),
    [token, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
