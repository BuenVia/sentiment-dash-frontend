import Dashboard from "./pages/Dashboard";
import RecentFeedbackPage from "./pages/FeedbackPage";
import "./App.css"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from "./components/About";


export default function App() {
  return (
    <BrowserRouter>
    <div className="min-h-screen">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Customer Sentiment Analyser</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <a class="nav-link" aria-current="page" href="/">Home</a>
                <a class="nav-link" href="/feedback">Feedback</a>
                <a class="nav-link" href="/about">About</a>
            </ul>
          </div>
        </div>
      </nav>

      <div className="main-body">

        
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/feedback" element={<RecentFeedbackPage />} />
        <Route path="/about" element={<About />} />

      </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}