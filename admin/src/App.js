import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'

function App() {
    return (
        <Router>
            <div className="max-h-screen min-h-screen overflow-y-auto bg-white">
                <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
