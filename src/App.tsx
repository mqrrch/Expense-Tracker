import { BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import Dashboard from "./comps/dashboard/Dashboard";
import './App.css'

export default function App() {

  return (
    <BrowserRouter>
      <div className="fixed top-0 left-0 w-full h-screen bg-[#111] z-[-2]"></div>
      <Menu />
      <div className="p-4 pt-12">
        <Dashboard />
      </div>
    </BrowserRouter>
  )
}
