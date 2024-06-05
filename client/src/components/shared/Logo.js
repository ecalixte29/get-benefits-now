import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import LogoImg from '../../assets/images/logo.png'

const Logo = ({ className }) => {
    const navigate = useNavigate()

    return (
        <div
            className={classNames(
                `flex cursor-pointer items-center justify-center gap-x-2 text-center text-blue-800 sm:justify-start`,
                className
            )}
        >
            <img src={LogoImg} alt="" width={30} />
            <h1
                onClick={() => navigate('/')}
                className="cursor-pointer text-xl font-semibold sm:text-2xl"
            >
                Benefits Rite Now
            </h1>
        </div>
    )
}

export default Logo
