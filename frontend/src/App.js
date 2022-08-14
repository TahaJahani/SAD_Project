import * as React from 'react'
import './App.css';
import {
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App;
