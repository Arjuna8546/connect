import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../pages/admin/AdminLoginPage'
import DashboardLayout from '../pages/admin/DashboardLayout'
import VerifyRequest from '../pages/admin/VerifyRequestPage'

function AdminRoute() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AdminLoginPage />}></Route>
            <Route path="/dashboard" element={<DashboardLayout />}></Route>
            <Route path="/verifyrequest" element={<VerifyRequest/>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRoute
