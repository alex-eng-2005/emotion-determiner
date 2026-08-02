import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {

  return (
    <>
      <h1 className="title">STOP!, before you send!</h1>
      <h2 className="message">Type under here before you send any message</h2>
      <div className="inputArea">
          <textarea className='message'></textarea>
          <br/>
          <button className='enter'>Enter</button>
      </div>
    </>
  )
}

export default App
