import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../shared/Button'
import TextField from '../shared/TextField'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [accessKey, setAcessKey] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { register } = useAuth()

    const clickHandler = async () => {
        setLoading(true)
        const success = await register(username, password, accessKey)
        setLoading(false)
        if(success) navigate('/')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center bg-primary-950">
            <div className="bg-primary-1000 flex w-[90%] flex-col items-center rounded-3xl px-10 py-10 md:w-1/2 lg:w-1/4">
                <h1 className="mb-10 text-center font-bold text-white">
                    Register your admin account
                </h1>
                <div className="w-full">
                    <TextField
                        label={'Username'}
                        value={username}
                        onChange={value => setUsername(value)}
                        placeholder={'Username'}
                    />
                    <TextField
                        label={'Password'}
                        value={password}
                        onChange={value => setPassword(value)}
                        placeholder={'Password'}
                    />
                    <TextField
                        label={'Access key'}
                        value={accessKey}
                        onChange={value => setAcessKey(value)}
                        placeholder={'Access key'}
                    />
                </div>
                <div className="flex h-full w-full flex-col justify-end">
                    <Button
                        text={'Register'}
                        fullWidth={true}
                        classNames="my-5"
                        onClick={clickHandler}
                        loading={loading}
                    />
                    <Button
                        text={'Login'}
                        fullWidth={true}
                        type="SECONDARY"
                        onClick={() => navigate('/signup')}
                    />
                </div>
            </div>
        </div>
    )
}

export default Signup
