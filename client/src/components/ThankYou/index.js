import { FaFlagCheckered } from 'react-icons/fa'
import HappyFamilyImg from '../../assets/images/happy-family.webp'
import Logo from '../shared/Logo'

const ThankYou = () => {
    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-transparent to-gray-200">
            <img
                src={HappyFamilyImg}
                alt="Happy Family"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="z-10 flex w-4/5 flex-col items-center justify-center gap-y-3 sm:w-1/2 lg:w-1/4">
                <FaFlagCheckered className="h-20 w-20 text-dark" />
                <h1 className="text-3xl font-semibold text-dark sm:text-5xl">
                    Thank You!
                </h1>
                <p className="text-center text-xl font-light text-dark">
                    You're all ready to receive your card shortly. An email
                    confirming your form registration will be sent to you
                    shortly.
                </p>
                <Logo />
            </div>
        </div>
    )
}

export default ThankYou
