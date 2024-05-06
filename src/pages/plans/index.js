import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import PlanCard from '../plans/PlanCard';
import { useNavigate } from 'react-router-dom';
import states from 'states-us';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import ActivityIndicator from '../../components/shared/ActivityIndicator';
import useContacts from '../../hooks/useContacts';

const Plans = () => {
    const navigate = useNavigate();
    const { getContact } = useContacts();
    const [leadData, setLeadData] = useState(null);
    const [ref, isInView] = useInView();

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['plans'],
        queryFn: async ({ pageParam = 0 }) => {
            const req = await fetch(`https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${process.env.REACT_APP_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...leadData, offset: pageParam })
            });
            return await req.json();
        },
        enabled: leadData !== null,
        getNextPageParam: (_lastPage, allPages) => {
            const plansLength = allPages.flatMap(page => page.plans).length;
            return allPages[0].total > plansLength ? plansLength : undefined;
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            const uuid = localStorage.getItem('uuid');
            if (!uuid) return navigate('/');
            let lead = await getContact(uuid);
            let countyfips;
            try {
                const response = await fetch(`https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/${lead.details.zip}?apikey=${process.env.REACT_APP_API_KEY}`);
                const data = await response.json();
                
                if (data.error) {
                    console.error('Error fetching countyfips:', data.error);
                    // Handle error
                    return;
                }

                if (data.counties.length === 0) {
                    console.error('No counties found for the provided ZIP code');
                    // Handle error
                    return;
                }

                countyfips = data.counties[0].fips
            } catch (error) {
                console.error('Error fetching countyfips:', error);
            }
            console.log('countyfips', countyfips)
            const hasMarriedCouple = ['family', 'couple'].includes(lead.type);
            const parsedData = {
                household: {
                    income: lead.details.gross_income * 12,
                    has_married_couple: hasMarriedCouple,
                    people: [
                        dataToPeople({ ...lead.details, relationship: 'Self' }),
                        ...(hasMarriedCouple ? [dataToPeople({ ...lead.spouse_details, relationship: 'Spouse' })] : []),
                        ...(lead.dependents ? lead.dependents.map(dependent => dataToPeople(dependent)) : [])
                    ].filter(Boolean)
                },
                market: 'Individual',
                place: {
                    countyfips: countyfips,
                    state: states.find(s => s.name === lead.details.state)?.abbreviation,
                    zipcode: lead.details.zip
                }
            };
            setLeadData(parsedData);
        };
        fetchData();
    }, [navigate, getContact]);

    useEffect(() => {
        if (isLoading || leadData === null || !isInView) return;
        fetchNextPage();
    }, [fetchNextPage, isInView, isLoading, leadData]);

    const dataToPeople = ({ dob, gender, relationship, uses_tobacco }) => ({
        dob: new Date(dob.seconds * 1000).toISOString().split('T')[0],
        gender: gender.charAt(0).toUpperCase() + gender.slice(1),
        relationship,
        aptc_eligible: true,
        uses_tobacco: uses_tobacco.toLowerCase() === 'true'
    });

    return (
        <Layout>
            {(leadData !== null && data?.pages.length > 0) && (
                <div className='w-11/12 lg:w-3/4 mx-auto space-y-8'>
                    {data.pages[0].plans ? (
                        <>
                            <h4 className="text-base font-thin text-dark">
                                We have found{' '}
                                <span className='bg-secondary px-1 text-base text-white font-normal mx-1'>
                                    {data.pages[0]?.total}
                                </span>
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
};

export default Plans;
