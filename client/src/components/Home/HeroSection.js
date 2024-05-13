import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HeroImg from '../../assets/images/hero.webp'
import { SecondaryButton } from '../shared/Buttons'
import TextField from '../shared/FormElements/TextField'

const HeroSection = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [zipCode, setZipCode] = useState('')
    const [error, setError] = useState(false)

    const handleNextButtonClick = () => {
        if (zipCode.trim() !== '') {
            localStorage.setItem('zip', zipCode.trim())
            navigate('/form')
        } else {
            setError(true)
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const zipParam = queryParams.get('zip')
        if (zipParam) {
            setZipCode(zipParam)
        }
    }, [location.search])

    useEffect(() => localStorage.removeItem('zip'), [])

    return (
        <section
            id="hero"
            className="flex flex-1 flex-col border-b border-b-light"
        >
            <div className="grow bg-primary sm:grow-0">
                <div className="container mx-auto grid grid-cols-5 items-center gap-x-6 pt-10">
                    <div className="col-span-5 px-4 sm:col-span-3 sm:px-0">
                        <div className="mb-10 bg-black p-10 text-left text-white">
                            <h1 className="mb-6 text-4xl font-semibold md:text-6xl">
                                Insurance made easy for everyone
                            </h1>
                            <p className="text-xl capitalize">
                                call us at
                                <a
                                    className="ml-2 bg-gray-800 p-1 text-sky-400 visited:text-purple-500"
                                    href="tel:8555611045"
                                >
                                    (855) 561-1045
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="hidden sm:col-span-2 sm:block">
                        <img
                            src={HeroImg}
                            alt="hero"
                            width={300}
                            className="mx-auto"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 sm:flex-1">
                <div className="mx-auto flex w-full flex-col justify-center px-4 py-14 sm:w-1/2">
                    <p className="mb-2">
                        Enter your zip code to see if you qualify
                    </p>
                    <div className="flex flex-col items-stretch justify-center sm:flex-row">
                        <TextField
                            placeholder="123456"
                            label={''}
                            onChange={value => {
                                setZipCode(value)
                                setError(false)
                            }}
                            wrapperClasses="flex-1"
                            innerClasses={`py-4 sm:text-xl font-bold ${error ? 'border-error' : 'border-light'}`}
                            required={true}
                            value={zipCode}
                            error={error}
                            type="number"
                        />
                        <SecondaryButton
                            onClick={handleNextButtonClick}
                            text="Next"
                            classNames="font-bold text-xl mb-5 border border-secondary"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
