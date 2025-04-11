import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../pages/admin/AdminLoginPage'
import DashboardLayout from '../pages/admin/DashboardLayout'

function AdminRoute() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AdminLoginPage />}></Route>
            <Route path="/dashboard" element={<DashboardLayout />}></Route>
        </Routes>
    </div>
  )
}

export default AdminRoute
