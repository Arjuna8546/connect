import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const id = localStorage.getItem("user_id")
  return (
    id ? children:<Navigate to='/login'/>
  )
}

export default ProtectedRoute
