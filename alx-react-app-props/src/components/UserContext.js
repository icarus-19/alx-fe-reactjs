import React, { createContext, useState, useContext } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const login = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    setUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext