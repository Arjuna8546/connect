import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../pages/admin/AdminLoginPage'
import VerifyRequest from '../pages/admin/VerifyRequestPage'
import AdminProtectedRoute from '../protectedroutes/admin/AdminProtectedRoute'
import AllPostedRide from '../pages/admin/AllPostedRide'
import AllBookingsPage from '../pages/admin/AllBookingsPage'
import AllPaymentPage from '../pages/admin/AllPaymentPage'
import AllUsers from '../pages/admin/AllUsers'
import Dashboard from '../pages/admin/Dashboard'

function AdminRoute() {
  return (
    <div>
        <Routes>
            <Route path="/login" element={<AdminLoginPage />}></Route>
            <Route path="/dashboard" element={<AdminProtectedRoute><Dashboard/></AdminProtectedRoute>}></Route>
            <Route path="/users" element={<AdminProtectedRoute><AllUsers/></AdminProtectedRoute>}></Route>
            <Route path="/verifyrequest" element={<AdminProtectedRoute><VerifyRequest/></AdminProtectedRoute>}></Route>
            <Route path="/rides" element={<AdminProtectedRoute><AllPostedRide/></AdminProtectedRoute>}></Route>
            <Route path="/bookings" element={<AdminProtectedRoute><AllBookingsPage/></AdminProtectedRoute>}></Route>
            <Route path="/payments" element={<AdminProtectedRoute><AllPaymentPage/></AdminProtectedRoute>}></Route>
        </Routes>
    </div>
  )
}

export default AdminRoute
