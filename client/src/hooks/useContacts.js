import axios from 'axios'
import GHL_CUSTOM_FIELDS from '../utils/ghl_custom_fields'

const useContacts = () => {
    const createContact = async payload => {
        let config = {
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/contacts`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(payload),
        }
        return (await axios.request(config)).data
    }

    const updateContact = async (id, payload) => {
        try {
            return (
                await axios.put(
                    `${process.env.REACT_APP_BACKEND_URL}/contacts/${id}`,
                    { payload }
                )
            ).data
        } catch (error) {
            console.error('Error updating contact:', error)
            throw error
        }
    }

    const getContact = async id => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/contacts/${id}`
            )
            return response.data
        } catch (error) {
            console.error('Error fetching contact:', error)
            throw error
        }
    }

    const sendContactToGHL = async id => {
        try {
            const contactDoc = await getContact(id)
            const planDetails = (
                await axios.get(
                    `https://marketplace.api.healthcare.gov/api/v1/plans/${contactDoc.plan_id}?apikey=${process.env.REACT_APP_API_KEY}`
                )
            )?.data?.plan
            const state = localStorage.getItem('state')
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
                state: state,
                country: 'US',
                postalCode: contactDoc.details.zip,
                tags: ['benefitsritenow.com', process.env.NODE_ENV],
                customField: {
                    [GHL_CUSTOM_FIELDS['contact.primary_ssn']]:
                        contactDoc.details.ssn,
                    [GHL_CUSTOM_FIELDS['contact.county']]:
                        contactDoc.details.county,
                    [GHL_CUSTOM_FIELDS['contact.primary_dob']]: formatDate(
                        contactDoc.details.dob
                    ),
                    [GHL_CUSTOM_FIELDS[
                        'contact.are_you_on_medicaid_or_medicare'
                    ]]: contactDoc.details.current_insurance,
                    [GHL_CUSTOM_FIELDS[
                        'contact.estimated_household_annual_income'
                    ]]: contactDoc.details.gross_income,
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
                    ...dependentsDetails,
                    [GHL_CUSTOM_FIELDS['contact.carrier_selected']]:
                        planDetails?.issuer?.name || '',
                    [GHL_CUSTOM_FIELDS['contact.carrierplan_selected']]:
                        planDetails?.name || '',
                    [GHL_CUSTOM_FIELDS['contact.consent']]:
                        `${process.env.REACT_APP_BACKEND_URL}${contactDoc.consent}`,
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
                    [GHL_CUSTOM_FIELDS['contact.spouse_dob']]: formatDate(
                        contactDoc.spouse_details.dob
                    ),
                    [GHL_CUSTOM_FIELDS['contact.spouse_ssn']]:
                        contactDoc.spouse_details.social_security_number,
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

    const formatDate = dateString => {
        const date = new Date(dateString)

        const monthAbbreviations = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ]

        // Extract day, month, and year components from the date object
        const day = date.getDate()
        const monthIndex = date.getMonth()
        const year = date.getFullYear()

        // Format the date string as "DD Month YYYY"
        const formattedDate = `${day < 10 ? '0' + day : day} ${monthAbbreviations[monthIndex]} ${year}`
        return formattedDate
    }

    return {
        createContact,
        updateContact,
        getContact,
        sendContactToGHL,
    }
}

export default useContacts
