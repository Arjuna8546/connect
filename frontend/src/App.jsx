import { Button } from "@/components/ui/button"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRoute from "./Routes/UserRoute"
import { Provider } from "react-redux"
import { store, persistor } from "./store/store"
import { PersistGate } from "redux-persist/integration/react";
import AdminRoute from "./Routes/AdminRoute"

function App() {


  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/*" element={<UserRoute />}></Route>
              <Route path="/admin/*" element={<AdminRoute />}></Route>
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App
