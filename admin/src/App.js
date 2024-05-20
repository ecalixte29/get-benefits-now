import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Contacts from './components/Contacts'
import Contact from './components/Contacts/Contact'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/shared/ProtectedRoute'
import { AuthProvider } from './hooks/useAuth'
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <ToastContainer position='top-center'/>
                <div className="max-h-screen min-h-screen overflow-y-auto bg-gray-100">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/contacts"
                            element={
                                <ProtectedRoute>
                                    <Contacts />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/contacts/:id"
                            element={
                                <ProtectedRoute>
                                    <Contact />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
