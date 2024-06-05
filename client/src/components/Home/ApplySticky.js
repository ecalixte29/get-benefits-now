import { IoIosArrowDropright } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const ApplySticky = () => {
    const navigate = useNavigate()
    return (
        <div
            onClick={() => navigate('/form')}
            className="fixed bottom-0 z-10 flex w-full items-center justify-center gap-x-2 bg-blue-800 py-3 text-xl font-bold text-white md:hidden"
        >
            <h1>Apply Now</h1>
            <IoIosArrowDropright size={25} />
        </div>
    )
}

export default ApplySticky
