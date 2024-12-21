import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard/Dashboard'

function App() {
  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <Dashboard />
      </div>
    </>
  )
}

export default App
