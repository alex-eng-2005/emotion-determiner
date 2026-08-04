import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Results from "./Results.tsx"

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route element={<App />} path='/'></Route>
    <Route element={<Results/>}path="/results"></Route>
  </Routes>
  </BrowserRouter>,
)
