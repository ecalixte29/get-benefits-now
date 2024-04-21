import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PlanCard from '../plans/PlanCard';
import { useNavigate } from 'react-router-dom';
import states from 'states-us'
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer'
import ActivityIndicator from '../../components/shared/ActivityIndicator';

const Plans = () => {
    const navigate = useNavigate()
    const [leadData, setLeadData] = useState(null)
    const [ref, isInView] = useInView()

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['plans'],
        queryFn: async ({ pageParam = 0 }) => {
            const req = await fetch("https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=" + process.env.REACT_APP_API_KEY, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...leadData,
                    offset: pageParam
                })
            })
            return (await req.json())
        },
        enabled: (leadData !== null),
        getNextPageParam: (_lastPage, allPages) => (allPages[0].total) > (allPages.flatMap(page => page.plans).length) ? allPages.flatMap(page => page.plans).length : undefined
    })


    useEffect(() => {
        const fetchData = async () => {

            const dataToPeople = (data) => {
                const { dob, gender, relationship } = data
                return {
                    dob: new Date(dob._seconds * 1000).toISOString().split('T')[0],
                    gender: gender.charAt(0).toUpperCase() + gender.slice(1),
                    relationship,
                    aptc_eligible: true,
                    uses_tobacco: data.uses_tobacco
                }
            }

            const uuid = localStorage.getItem('uuid')
            if (!uuid) return navigate('/')

            let lead = await fetch(`${process.env.REACT_APP_BACKEND_URL}/leads/${uuid}`)
            lead = (await lead.json()).data

            const has_married_couple = ['family', 'couple'].includes(lead.type)
            let parsedData = {
                household: {
                    income: lead.details.gross_income * 12,
                    has_married_couple,
                    people: [
                        dataToPeople({ ...lead.details, relationship: 'Self' }),
                        (has_married_couple ? dataToPeople({ ...lead.spouse_details, relationship: 'Spouse' }) : undefined),
                        ...(lead.dependents ? lead.dependents.map(dependent => dataToPeople(dependent)) : [])
                    ].filter(Boolean),
                },
                market: 'Individual', //TODO: determine if its dynamic or constant
                place: {
                    countyfips: lead.details.countyfips,
                    state: states.find(s => s.name === lead.details.state).abbreviation,
                    zipcode: lead.details.zip,
                }
            }

            return setLeadData(parsedData)
        }
        fetchData()
    }, [navigate]);

    useEffect(() => {
        if (isLoading || leadData === null || !isInView) return
        fetchNextPage()
    }, [fetchNextPage, isInView, isLoading, leadData])

    return (
        <Layout>
            {(leadData !== null && data?.pages.length > 0) && (
                <div className='w-11/12 lg:w-3/4 mx-auto space-y-8'>
                    {data.pages[0].plans ? (
                        <>
                            <h4 className="text-base font-thin text-dark">
                                We have found
                                <span className='bg-secondary px-1 text-base text-white font-normal mx-1'>{data.pages[0]?.total}</span>
                                plans matching your profile!
                            </h4>
                            {data.pages.map((page, pageIndex) => (
                                <React.Fragment key={pageIndex}>
                                    {page.plans?.map((plan, itemIndex) => (
                                        <PlanCard key={itemIndex} plan={plan} />
                                    ))}
                                </React.Fragment>
                            ))}
                        </>
                    ) : (
                        <div>No Plans found</div>
                    )}
                </div>
            )}
            {(hasNextPage || leadData === null || isLoading) && (
                <div className='pt-4'>
                    <ActivityIndicator
                        ref={ref}
                        width={24}
                        height={24}
                        spinnerClass={'text-secondary'}
                        backgroundClass={'text-gray-300 animate-spin'}
                    />
                </div>
            )}
        </Layout>
    );
}

export default Plans;