import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import App from './App'
import Welcome from "./pages/welcome/Welcome"
import Login from './pages/login/Login';
import SingUp from './pages/sing up/SingUp';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<SingUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
