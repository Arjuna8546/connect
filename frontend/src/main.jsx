import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID
createRoot(document.getElementById('root')).render(
  <>
    <GoogleOAuthProvider clientId={client_id} >
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </GoogleOAuthProvider>
  </>
)
