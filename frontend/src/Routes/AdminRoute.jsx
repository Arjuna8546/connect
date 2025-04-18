import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../pages/admin/AdminLoginPage'
import DashboardLayout from '../pages/admin/DashboardLayout'
import VerifyRequest from '../pages/admin/VerifyRequestPage'
import AdminProtectedRoute from '../protectedroutes/admin/AdminProtectedRoute'

function AdminRoute() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AdminLoginPage />}></Route>
            <Route path="/dashboard" element={<AdminProtectedRoute><DashboardLayout /></AdminProtectedRoute>}></Route>
            <Route path="/verifyrequest" element={<AdminProtectedRoute><VerifyRequest/></AdminProtectedRoute>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRoute
