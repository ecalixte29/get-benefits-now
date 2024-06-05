import { IoIosArrowDropright } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import FamilyOne from '../../assets/images/family_1.jpg'
import FamilyTwo from '../../assets/images/family_2.jpg'
import Rank from '../../svgs/rank'

const WaitingFor = () => {
    const navigate = useNavigate()
    return (
        <section className="relative z-0 min-h-[500px] gap-y-10 bg-gray-100 py-10 py-16 text-gray-700 lg:px-5">
            <div className="m-auto flex max-w-[1000px] flex-col items-center justify-center gap-x-10 md:flex-row">
                <div className="m-4 flex flex-col items-center justify-center gap-y-5 text-center md:w-1/2">
                    <h1 className="m-auto max-w-[400px] text-center text-4xl font-semibold text-gray-900 md:text-5xl">
                        What are you waiting for?
                    </h1>
                    <div className="relative mb-10 flex items-center justify-start md:hidden">
                        <img
                            className="h-[80%] w-[80%] rounded border border-gray-300 p-2"
                            src={FamilyOne}
                            alt="family 1"
                        />
                        <img
                            className="border-blue-600 absolute -bottom-[10%] left-[50%] w-1/2 rounded border p-2"
                            src={FamilyTwo}
                            alt="family 2"
                        />
                    </div>
                    <p className="m-auto max-w-[300px]">
                        The affordable health insurance you deserve is just 4
                        minutes away.
                    </p>
                    <button
                        onClick={() => navigate('/form')}
                        className="flex w-full max-w-[350px] items-center justify-center gap-x-2 rounded-full bg-blue-600 py-4 text-xl font-bold text-white hover:bg-blue-700"
                    >
                        Check Now
                        <IoIosArrowDropright size={25} />
                    </button>
                    <div className="flex items-center gap-x-1">
                        <Rank />
                        <p className="md:text-md text-sm">
                            Rated 4.9 out of 5. Over <b>1,000</b> Reviews
                        </p>
                    </div>
                </div>
                <div className="relative mr-10 hidden w-1/2 items-center justify-center md:flex">
                    <img
                        className="h-[80%] w-[80%] rounded border border-gray-300 p-2"
                        src={FamilyOne}
                        alt="family 1"
                    />
                    <img
                        className="border-blue-600 absolute -bottom-[10%] left-[60%] w-1/2 rounded border p-2"
                        src={FamilyTwo}
                        alt="family 2"
                    />
                </div>
            </div>
        </section>
    )
}

export default WaitingFor
