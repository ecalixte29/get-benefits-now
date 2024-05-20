// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                const userData = await response.json()
                setUser(userData)
                setIsAuthenticated(true)
            } else {
                localStorage.removeItem('token')
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error('Failed to fetch user data', error)
            localStorage.removeItem('token')
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
            setToken(token)
        }
    }

    useEffect(() => {
        const initialize = async () => {
            const token = localStorage.getItem('token')
            console.log(token)
            if (token) {
                fetchUserData(token);
            } else {
                setLoading(false)
            }
        }
        initialize()
    }, [])

    const login = async (username, password) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            if(response.status !== 200){
                const { message } = await response.json()
                toast(message, { type: 'error' })
                return false
            }
            const { token } = await response.json()
            localStorage.setItem('token', token)
            await fetchUserData(token)
            return true
        }catch(err){
            console.log(err)
            toast('Internal server error')
            return false
        }
    }
    
    const register = async (username, password, accessKey) => {
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ username, password, access_key: accessKey })
            })
            if(response.status !== 200){
                const { message } = await response.json()
                toast(message, { type: 'error' })
                return false
            }
            const { token } = await response.json()
            localStorage.setItem('token', token)
            await fetchUserData(token)
            return true
        }catch(err){
            console.log(err)
            toast('Internal server error')
            return false
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setUser(null)
    }
    
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, loading, login, logout, register, token }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
