import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Loader from './Loader'

const ProtectedRoute = (props) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return <Loader />
    }

    return isAuthenticated ? props.children : <Navigate to="/login" />
}

export default ProtectedRoute
