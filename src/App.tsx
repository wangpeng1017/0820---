import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <MainLayout />
      </div>
    </Router>
  )
}

export default App
