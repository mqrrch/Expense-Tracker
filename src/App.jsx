import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage'
import TransactionsPage from './Components/Transactions/TransactionsPage'

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <div className='flex justify-center'>
          <Routes>
            <Route path='/Expense-Tracker/' element={<Homepage />}></Route>
            <Route path='/Expense-Tracker/dashboard' element={<Dashboard />}></Route>
            <Route path='/Expense-Tracker/transactions' element={<TransactionsPage />}></Route>
          </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
