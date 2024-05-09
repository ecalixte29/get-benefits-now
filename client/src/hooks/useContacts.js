import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
} from '@firebase/firestore'
import { database } from '../configs/firebase'
import GHL_CUSTOM_FIELDS from '../utils/ghl_custom_fields'

const COLLECTION = 'contacts'

const useContacts = () => {
    const contactsRef = collection(database, COLLECTION)
    const contactRef = id => doc(database, COLLECTION, id)

    const createContact = async payload => {
        try {
            const response = await addDoc(contactsRef, payload)
            return response
        } catch (error) {
            console.error('Error creating contact:', error)
            throw error
        }
    }

    const updateContact = async (id, payload) => {
        try {
            const contactRef = doc(database, COLLECTION, id)
            await updateDoc(contactRef, payload)
        } catch (error) {
            console.error('Error updating contact:', error)
            throw error
        }
    }

    const getContact = async id => {
        try {
            const reponse = await getDoc(contactRef(id))
            if (reponse.exists()) {
                return reponse.data()
            } else {
                let errMessage = 'No such record!'
                console.log(errMessage)
                throw new Error(errMessage)
            }
        } catch (error) {
            console.error('Error fetching contact:', error)
            throw error
        }
    }

    const deleteContact = async id => {
        try {
            await deleteDoc(contactRef(id))
        } catch (error) {
            console.error('Error deleting contact:', error)
            throw error
        }
    }

    const sendContactToGHL = async id => {
        try {
            const contactDoc = await getContact(id)
            const dependentsDetails = {}

            if (contactDoc.dependents) {
                contactDoc.dependents.forEach((dependent, index) => {
                    const keyPrefix = `contact.dependent_${index + 1}`
                    dependentsDetails[
                        GHL_CUSTOM_FIELDS[`${keyPrefix}_full_name`]
                    ] = `${dependent.first_name} ${dependent.last_name}`
                    dependentsDetails[GHL_CUSTOM_FIELDS[`${keyPrefix}_dob`]] =
                        formatDate(dependent.dob)
                    dependentsDetails[GHL_CUSTOM_FIELDS[`${keyPrefix}_ssn`]] =
                        dependent.social_security_number
                    if (index >= 1 && index <= 2) {
                        dependentsDetails[
                            GHL_CUSTOM_FIELDS[
                                `contact.do_you_have_a_${index + 1}nd_dependent`
                            ]
                        ] = 'Yes'
                    }
                })
            }

            const contact = {
                email: contactDoc.details.email,
                phone: contactDoc.details.phone,
                firstName: contactDoc.details.first_name,
                lastName: contactDoc.details.last_name,
                name: `${contactDoc.details.first_name} ${contactDoc.details.last_name}`,
                dateOfBirth: formatDate(contactDoc.details.dob),
                address1: contactDoc.details.street,
                city: contactDoc.details.city,
                state: contactDoc.details.state,
                country: 'US',
                postalCode: contactDoc.details.zip,
                source: 'benefitsritenow.com',
                tags: ['benefitsritenow.com', process.env.NODE_ENV],
                customField: {
                    [GHL_CUSTOM_FIELDS['contact.primary_ssn']]: contactDoc.ssn,
                    [GHL_CUSTOM_FIELDS['contact.county']]:
                        contactDoc.details.county,
                    [GHL_CUSTOM_FIELDS['contact.current_insurance']]:
                        contactDoc.details.current_insurance,
                    [GHL_CUSTOM_FIELDS[
                        'contact.estimated_household_annual_income'
                    ]]: contactDoc.details.estimated_income,
                    [GHL_CUSTOM_FIELDS['contact.recent_employer']]:
                        contactDoc.details.recent_employer,
                    [GHL_CUSTOM_FIELDS['contact.are_you_a_us_national_']]:
                        contactDoc.details.us_national === 'true'
                            ? 'Yes'
                            : 'No',
                    [GHL_CUSTOM_FIELDS['contact.are_you_a_tobacco_user_']]:
                        contactDoc.details.uses_tobacco === 'true'
                            ? 'Yes'
                            : 'No',
                    [GHL_CUSTOM_FIELDS[
                        'contact.are_you_on_medicaid_or_medicare'
                    ]]:
                        contactDoc.details.current_insurance === 'true'
                            ? 'Yes'
                            : 'No',
                    ...dependentsDetails,
                },
            }

            if (contactDoc.spouse_details) {
                const spouseCustomFields = {
                    [GHL_CUSTOM_FIELDS['contact.do_you_have_a_spouse_']]: 'Yes',
                    [GHL_CUSTOM_FIELDS[
                        'contact.do_you_want_to_enroll_your_spouse_'
                    ]]: 'Yes',
                    [GHL_CUSTOM_FIELDS['contact.do_you_wish_to_enroll_spouse']]:
                        'Yes',
                    [GHL_CUSTOM_FIELDS['contact.spouse_full_name']]:
                        `${contactDoc.spouse_details.first_name} ${contactDoc.spouse_details.last_name}`,
                    [GHL_CUSTOM_FIELDS['contact.spouse_date_of_birth']]:
                        formatDate(contactDoc.spouse_details.dob),
                    [GHL_CUSTOM_FIELDS['contact.spouse_email']]:
                        contactDoc.spouse_details.email,
                    [GHL_CUSTOM_FIELDS['contact.spouse_ssn']]:
                        contactDoc.spouse_details.social_security_number,
                    [GHL_CUSTOM_FIELDS['contact.spouse_phone']]:
                        contactDoc.spouse_details.phone,
                    [GHL_CUSTOM_FIELDS['contact.do_your_partner_uses_tobacco']]:
                        contactDoc.spouse_details.uses_tobacco === 'true'
                            ? 'Yes'
                            : 'No',
                }
                contact.customField = {
                    ...contact.customField,
                    ...spouseCustomFields,
                }
            }

            const res = await fetch(process.env.REACT_APP_GHL_URL, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: process.env.REACT_APP_TOKEN,
                    Version: process.env.REACT_APP_VERSION,
                },
                method: 'POST',
                body: JSON.stringify(contact),
            })

            if (res.status === 200)
                console.log('Contact published on GHL successfully 🎉')
            else console.error('Failed to publish contact on GHL')
        } catch (error) {
            console.error('Error sending contact to GHL:', error)
            throw error
        }
    }

    const formatDate = timestamp => {
        const date = new Date(timestamp.seconds * 1000)

        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const day = date.getDate().toString().padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    return {
        createContact,
        updateContact,
        getContact,
        deleteContact,
        sendContactToGHL,
    }
}

export default useContacts
