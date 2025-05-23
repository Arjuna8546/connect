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
import LocationSelector from '../pages/post ride/LocationSelector'
import RouteSelector from '../pages/post ride/RouteSelector'
import AddStopOver from '../pages/post ride/AddStopOver'
import DateTime from '../pages/post ride/DateTime'
import PassangerCount from '../pages/post ride/PassangerCount'
import PricePage from '../pages/post ride/PricePage'
import PublishRidePage from '../pages/post ride/PublishRidePage'
import SelectVehicle from '../pages/post ride/SelectVehicle'
import YourRidePage from '../pages/your ride/YourRidePage'
import RideSearchPage from '../pages/search ride/SearchRidePage'
import BookedRide from '../pages/Booked rides/BookedRide'
import ChatPage from '../pages/chat/ChatPage'
import PaymentPage from '../pages/payment/PaymentPage'
import WalletPage from '../pages/walletpage/WalletPage'
import RedirectPage from '../pages/payment/SuccessPage'
import TransactionsPage from '../pages/transactions/TransactionsPage'



function UserRoute() {
    return (
        
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/signup" element={<SignupPage/>}></Route>
                <Route path="/" element={<LandingPage/>}></Route>
                <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}></Route>
                <Route path="/forgotpassword" element={<ForgetPasswordPage/>}></Route>
                <Route path='/changepassword' element={<ChangePassword/>}></Route>
                <Route path='/postride' element={<ProtectedRoute><PostRide/></ProtectedRoute>}></Route>
                <Route path='/postride/locationselector' element={<ProtectedRoute><LocationSelector/></ProtectedRoute>}></Route>
                <Route path='/postride/routeselector' element={<ProtectedRoute><RouteSelector/></ProtectedRoute>}></Route>
                <Route path='/postride/stopover' element={<ProtectedRoute><AddStopOver/></ProtectedRoute>}></Route>
                <Route path='/postride/datetime' element={<ProtectedRoute><DateTime/></ProtectedRoute>}></Route>
                <Route path='/postride/count' element={<ProtectedRoute><PassangerCount/></ProtectedRoute>}></Route>
                <Route path='/postride/price' element={<ProtectedRoute><PricePage/></ProtectedRoute>}></Route>
                <Route path='/postride/publish' element={<ProtectedRoute><PublishRidePage/></ProtectedRoute>}></Route>
                <Route path='/postride/vehicles' element={<ProtectedRoute><SelectVehicle/></ProtectedRoute>}></Route>

                <Route path='/yourrides' element={<ProtectedRoute><YourRidePage/></ProtectedRoute>}></Route>

                <Route path='/search' element={<ProtectedRoute><RideSearchPage/></ProtectedRoute>}></Route>

                <Route path='/yourbookings' element={<ProtectedRoute><BookedRide/></ProtectedRoute>}></Route>
                <Route path='/chat' element={<ProtectedRoute><ChatPage/></ProtectedRoute>}></Route>

                <Route path='/payment' element={<ProtectedRoute><PaymentPage/></ProtectedRoute>}></Route>
                <Route path='/payment/redirect' element={<ProtectedRoute><RedirectPage/></ProtectedRoute>}></Route>

                <Route path='/wallet' element={<ProtectedRoute><WalletPage/></ProtectedRoute>}></Route>
                <Route path='/transactions' element={<ProtectedRoute><TransactionsPage/></ProtectedRoute>}></Route>
            </Routes>

        
    )
}

export default UserRoute
