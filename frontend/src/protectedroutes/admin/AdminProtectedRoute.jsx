import React from 'react'
import { Navigate } from 'react-router-dom'

function AdminProtectedRoute({children}) {
    const id = localStorage.getItem("admin_id")
  return (
    id ? children:<Navigate to='/admin/login'/>
  )
}

export default AdminProtectedRoute