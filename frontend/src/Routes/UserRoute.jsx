import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import React from 'react'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import LandingPage from '../pages/LandingPage'
import ProfilePage from '../pages/ProfilePage'


function UserRoute() {
    return (
        
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignupPage/>}></Route>
                <Route path="/" element={<LandingPage/>}></Route>
                <Route path="/profile" element={<ProfilePage/>}></Route>
            </Routes>

        
    )
}

export default UserRoute
