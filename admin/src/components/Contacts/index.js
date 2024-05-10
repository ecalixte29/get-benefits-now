import React, { useEffect, useState } from 'react'
import Layout from '../shared/Layout'
import useContacts from '../../hooks/useContacts'
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
    const navigate = useNavigate();
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
                    <li key={contact._id} className="flex justify-between items-center gap-x-6 p-4 rounded-lg hover:bg-primary-50">
                        <div className="min-w-0 flex gap-x-4 items-center">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100">
                                <span className="text-xs font-medium leading-none text-primary-400 uppercase">{contact.details.first_name[0]}{contact.details.last_name[0]}</span>
                            </span>
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
                            <button
                                onClick={() => navigate(`/contacts/${contact._id}`)}
                                className="rounded bg-primary-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm ring-0 hover:bg-primary-600"
                            >
                                View
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </Layout>
    )
}

export default Contacts
