import Dashboard from "./pages/Dashboard";
import "./App.css"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="head text-3x1 font-bold text-center py-4">
        <h1>Customer Feedback Dashboard</h1>
      </div>
      <div className="main-body">
        <Dashboard />
      </div>
    </div>
  )
}