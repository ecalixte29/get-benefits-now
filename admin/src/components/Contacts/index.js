import React, { useEffect, useState } from 'react'
import Layout from '../shared/Layout'
import useContacts from '../../hooks/useContacts'
import classNames from 'classnames'
import { UserIcon } from '@heroicons/react/24/outline'
// const people = [
//     {
//         name: 'Leslie Alexander',
//         email: 'leslie.alexander@example.com',
//         role: 'Co-Founder / CEO',
//         imageUrl:
//             'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Michael Foster',
//         email: 'michael.foster@example.com',
//         role: 'Co-Founder / CTO',
//         imageUrl:
//             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Dries Vincent',
//         email: 'dries.vincent@example.com',
//         role: 'Business Relations',
//         imageUrl:
//             'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: null,
//     },
//     {
//         name: 'Lindsay Walton',
//         email: 'lindsay.walton@example.com',
//         role: 'Front-end Developer',
//         imageUrl:
//             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Courtney Henry',
//         email: 'courtney.henry@example.com',
//         role: 'Designer',
//         imageUrl:
//             'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Tom Cook',
//         email: 'tom.cook@example.com',
//         role: 'Director of Product',
//         imageUrl:
//             'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         lastSeen: null,
//     },
// ]

const statuses = []

const Contacts = () => {
    const { getContacts } = useContacts()

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const fetchedContacts = await getContacts();
                setContacts(fetchedContacts);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <Layout title='Contacts'>
            <ul role="list" className="divide-y divide-gray-100">
                {contacts.map((contact) => (
                    <li key={contact.id} className="flex justify-between items-center gap-x-6 p-4 rounded-lg hover:bg-primary-50">
                        <div className="min-w-0 flex gap-x-4 items-center">
                            <UserIcon className='h-5 w-5' />
                            <div>
                                <div className="flex items-start gap-x-3">
                                    <p className="text-sm font-semibold text-gray-900 capitalize">{contact.details.first_name} {contact.details.last_name}</p>
                                    {/* <p
                                    className={classNames(
                                        statuses[contact.status],
                                        'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                                    )}
                                >
                                    {contact.status}
                                </p> */}
                                </div>
                                <div className="flex items-center gap-x-2 text-xs text-gray-500">
                                    <p className="whitespace-nowrap">
                                        {contact.details.email}
                                    </p>
                                    {
                                        contact.created_at && (
                                            <>
                                                <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                                                    <circle cx={1} cy={1} r={1} />
                                                </svg>
                                                <p className="truncate">{contact.created_at}</p>
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <a
                                href={contacts.href}
                                className="rounded bg-primary-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-0 hover:bg-primary-600"
                            >
                                View
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default Contacts
