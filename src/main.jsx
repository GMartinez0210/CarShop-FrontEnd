// * Modules
import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// * Cursor Image
import "./main.css"

// * Pages
import App from './App'
import Welcome from "./pages/welcome/Welcome"
import Login from './pages/login/Login';
import SingUp from './pages/sing up/SingUp';

const root = document.getElementById('root')

createRoot(root).render(
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
