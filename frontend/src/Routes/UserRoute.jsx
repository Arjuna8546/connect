import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import React from 'react'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import LandingPage from '../pages/LandingPage'
import ProfilePage from '../pages/ProfilePage'
import ForgetPasswordPage from '../pages/ForgetPasswordPage'
import ChangePassword from '../pages/ChangePassword'
import ProtectedRoute from '../protectedroutes/user/ProtectedRoute'
import PostRide from '../pages/post ride/PostRide'
import PickUpDropOff from '../pages/post ride/PickUpDropOff'
import LocationSelector from '../pages/post ride/LocationSelector'



function UserRoute() {
    return (
        
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignupPage/>}></Route>
                <Route path="/" element={<LandingPage/>}></Route>
                <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>
                <Route path="/forgotpassword" element={<ForgetPasswordPage/>}></Route>
                <Route path='/changepassword' element={<ChangePassword/>}></Route>
                <Route path='/postride' element={<PostRide/>}></Route>
                <Route path='/pickupdropoff' element={<PickUpDropOff/>}></Route>
                <Route path='/locationselector' element={<LocationSelector/>}></Route>

            </Routes>

        
    )
}

export default UserRoute
