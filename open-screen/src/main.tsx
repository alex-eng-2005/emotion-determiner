import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App/App.tsx'
import Results from "./Results/Results.tsx"
import GrammerResults from './GrammerResults/GrammerResults.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <Routes>
    <Route element={<App />} path='/'></Route>
    <Route element={<Results/>} path="/emotionResults"></Route>
    <Route element={<GrammerResults/>} path="/grammerResults"></Route>
  </Routes>
  </BrowserRouter>,
)
