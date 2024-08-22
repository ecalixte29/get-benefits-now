import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'
import useContacts from '../../hooks/useContacts'
import Layout from '../Layout'
import ActivityIndicator from '../shared/ActivityIndicator'
import PlanCard from './PlanCard'

const Plans = () => {
    const navigate = useNavigate()
    const [ref, isInView] = useInView()
    const [uuid, setUUID] = useState()

    const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['plans'],
        queryFn: async ({ pageParam = 0 }) => {
            const req = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/plans/${uuid}?offset=${pageParam}`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
            const response = await req.json()
            return response
        },
        enabled: !!uuid,
        getNextPageParam: (_lastPage, allPages) => {
            const plansLength = allPages.flatMap(page => page.plans).length
            return allPages[0].total > plansLength ? plansLength : undefined
        },
    })

    useEffect(() => {
        const uuid = localStorage.getItem('uuid')
        if (!uuid) return navigate('/')
        setUUID(uuid)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (isLoading || !uuid || !isInView) return
        fetchNextPage()
    }, [isInView, isLoading, uuid]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <Layout>
            {uuid && data?.pages.length > 0 && (
                <div className="mx-auto w-11/12 space-y-8 lg:w-3/4">
                    {data.pages[0].plans ? (
                        <>
                            <h4 className="text-base font-extralight text-dark">
                                We have found{' '}
                                <span className="mx-1 bg-blue-800 px-1 text-base font-normal text-white">
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
            {(hasNextPage || uuid || isLoading) && (
                <div className="pt-4">
                    <ActivityIndicator
                        ref={ref}
                        width={24}
                        height={24}
                        spinnerClass="text-blue-600"
                        backgroundClass="text-gray-300 animate-spin"
                    />
                </div>
            )}
        </Layout>
    )
}

export default Plans
