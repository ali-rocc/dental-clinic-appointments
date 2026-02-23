import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Book from './pages/Book'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Services from './pages/Services'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <h1>Bright Smile Dental Clinic</h1>
          <p>Manage patient appointments quickly and easily.</p>
          <nav style={{marginTop:10}}>
            <Link to="/" style={{marginRight:12}}>Home</Link>
            <Link to="/book" style={{marginRight:12}}>Book</Link>
            <Link to="/services" style={{marginRight:12}}>Services</Link>
            <Link to="/patients" style={{marginRight:12}}>Patients</Link>
            <Link to="/dashboard">Admin</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/book" element={<Book/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/patients" element={<Patients/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </main>

        <footer>
          <small>Built for demo — data stored in Supabase (optional) or localStorage.</small>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
