import React from 'react'
import { SecondaryButton } from '../shared/Buttons';
import { FaStar, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Bronze from '../../assets/images/bronze.webp';
import Gold from '../../assets/images/gold.webp';
import Silver from '../../assets/images/silver.png';
import useContacts from '../../hooks/useContacts';
import toast from 'react-hot-toast';

const PlanCard = ({ plan }) => {
    const navigate = useNavigate();
    const { updateContact } = useContacts();

    const metalLevelIndex = {
        Bronze: { index: 1, color: '#CD7F32' },
        Silver: { index: 2, color: 'silver' },
        Gold: { index: 3, color: 'gold' },
        Catastrophic: { index: 4, color: 'silver' }
    };

    const onPlanEnroll = async () => {
        try {
            await updateContact(localStorage.getItem('uuid'), {
                plan_id: plan.id
            })
            navigate('/identity-verification');
        } catch (error) {
            return toast.error(String(error), { duration: 3000 });
        }
    };

    return (
        <div>
            <span className='bg-primary text-dark px-3 py-1 text-sm'>Lowest premium plan</span>
            <div className='flex flex-col w-full border border-gray-300 shadow'>
                <div className="bg-white border-b border-gray-200 px-4 py-2">
                    <div className='text-xs text-gray-400'>{plan.name}</div>
                    <div className='text-md font-semibold text-dark'>{plan.issuer.name}</div>
                </div>
                <div className="bg-white shadow p-4 grid grid-cols-10 gap-x-4 gap-y-4">
                    <div className='col-span-5 md:col-span-2 flex flex-col items-center justify-center bg-gray-100'>
                        <h1 className='text-gray-600 text-xs capitalize'>Monthly premium</h1>
                        <div className='text-3xl text-blue-500'>${plan.premium_w_credit}</div>
                        <div className='text-xs font-light text-red-600 line-through'>was ${plan.premium}</div>
                    </div>
                    {plan.benefits[0].cost_sharings.find(cost_sharing => cost_sharing.network_tier === "In-Network") && (
                        <div className='p-5 col-span-5 md:col-span-2 flex flex-col items-center text-center justify-center bg-gray-100'>
                            <h1 className='text-gray-600 text-xs capitalize'>Primary Care Visit Copay</h1>
                            <div className='text-3xl text-blue-500'>${plan.benefits[0].cost_sharings.find(cost_sharing => cost_sharing.network_tier === "In-Network").copay_amount}</div>
                        </div>
                    )}
                    <div className='md:col-span-6 col-span-10'>
                        {plan.benefits.filter(benefit => benefit.covered).slice(0, 6).map((benefit, index) => (
                            <div key={index} className="flex justify-between mb-1">
                                <h3 className="text-xs text-gray-500">{benefit.name}</h3>
                                <FaCheck className='text-green-600 text-sm' />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-gray-100 flex flex-col sm:flex-row justify-between">
                    <div className='flex gap-x-2 items-center py-2 pl-4'>
                        <img className='w-5 h-5' alt='' src={plan.metal_level === "Bronze" ? Bronze : plan.metal_level === "Gold" ? Gold : Silver} />
                        <p className={`${plan.metal_level === "Bronze" ? 'text-bronze' : plan.metal_level === "Gold" ? 'text-gold' : 'text-gray-400'}`}>{plan.metal_level}</p>
                        <div className='flex'>
                            {Array.from({ length: 5 }, (_, index) => {
                                const { index: levelIndex, color } = metalLevelIndex[plan.metal_level];
                                return (
                                    <div key={index}>
                                        {index < levelIndex ?
                                            <FaStar style={{ color: color }} /> :
                                            <FaStar style={{ color: 'gray' }} />
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <SecondaryButton classNames={'text-sm px-3 py-1'} onClick={onPlanEnroll} text="enroll now" />
                </div>
            </div>
        </div>
    );
};

export default PlanCard;
