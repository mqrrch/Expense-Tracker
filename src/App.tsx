import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./comps/dashboard/Dashboard";
import './App.css'

export default function App() {

  return (
    <BrowserRouter>
      <div className="fixed top-0 left-0 w-full h-screen bg-[#111] z-[-2]"></div>
      <Navbar />
      <div className="p-4 pt-12 overflow-hidden">
        <Dashboard />
      </div>
    </BrowserRouter>
  )
}
