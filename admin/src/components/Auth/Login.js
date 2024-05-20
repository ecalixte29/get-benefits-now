import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../shared/Button'
import TextField from '../shared/TextField'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { login } = useAuth()

    const clickHandler = async () => {
        setLoading(true)
        const success = await login(username, password)
        setLoading(false)
        if(success) navigate('/')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-primary-950">
            <div className="bg-primary-1000 flex h-1/2 w-[90%] flex-col items-center rounded-3xl px-10 py-10 md:w-1/2 lg:w-1/4">
                <h1 className="mb-10 text-center font-bold text-white">
                    Login to your admin account
                </h1>
                <div className="w-full">
                    <TextField
                        label={'Username'}
                        value={username}
                        onChange={value => setUsername(value)}
                        placeholder={'Username'}
                        wrapperClasses="mb-10"
                    />
                    <TextField
                        label={'Password'}
                        value={password}
                        onChange={value => setPassword(value)}
                        placeholder={'Password'}
                    />
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                    <Button
                        text={'Login'}
                        fullWidth={true}
                        classNames="mb-5"
                        onClick={clickHandler}
                        loading={loading}
                    />
                    <Button
                        text={'Register'}
                        fullWidth={true}
                        type="SECONDARY"
                        onClick={() => navigate('/signup')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
