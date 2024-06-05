import React from 'react'
import { IoIosArrowDropright } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import AgentMeeting from '../../assets/images/agent-meeting.jpg'
import Rank from '../../svgs/rank'

const Afford = () => {
    const navigate = useNavigate()
    return (
        <section
            id="afford"
            className="relative z-0 flex flex-col gap-y-10 bg-gray-100 px-5 py-10 text-gray-700"
        >
            <h1 className="text-center text-3xl font-semibold text-gray-900 md:text-5xl">
                You CAN Afford Health Insurance
            </h1>
            <div className="m-auto grid max-w-[1300px] grid-cols-1 gap-y-8 py-8 text-center md:grid-cols-2 md:gap-x-10 md:gap-y-0 md:text-start">
                <p>
                    Most people don't know that they qualify for a $0 premium
                    health insurance plan, but <em>Benefits Rite Now</em> has
                    helped thousands of people to lower their premiums since
                    2014. Many households do not need to pay a monthly premium
                    to access healthcare.
                    <br />
                    <br />
                    If you pay taxes, you will likely be entitled to subsidized
                    health insurance through The Affordable Care Act. Once we
                    have your information, we’ll use our sector expertise and
                    extensive network to find the policy that is right for you
                    and your family.
                    <br />
                    <br />
                    There’s no need to feel insecure about your healthcare
                    situation. It takes an average of just 4 minutes to complete
                    the online form, with no phone calls needed. Our team of
                    dedicated insurance agents will ensure that you get the best
                    value. 80% of applicants pay $10 or less for their monthly
                    premium.
                    <br />
                    <br />
                    How much would it cost you if you didn't take advantage of a
                    $0 premium health insurance plan?
                </p>
                <img
                    src={AgentMeeting}
                    alt="Agent Meeting"
                    className="h-auto min-w-full object-cover md:h-96 md:w-auto"
                />
            </div>
            <div className="flex flex-col items-center gap-y-2">
                <button
                    onClick={() => navigate('/form')}
                    className="flex items-center justify-center gap-x-2 rounded-full bg-blue-600 px-20 py-5 text-xl font-bold text-white hover:bg-blue-700"
                >
                    Check Now
                    <IoIosArrowDropright size={25} />
                </button>
                <div className="flex gap-x-2">
                    <Rank />
                    <p>
                        Rated 4.9 out of 5. Over <b>1,000</b> Reviews
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Afford
