import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Contacts from './components/Contacts'

function App() {
    return (
        <Router>
            <div className="max-h-screen min-h-screen overflow-y-auto bg-gray-100">
                <Routes>
                    <Route exact path="/" element={<Dashboard />} />
                    <Route path="/contacts" element={<Contacts />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
