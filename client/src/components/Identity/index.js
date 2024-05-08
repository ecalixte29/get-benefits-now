import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import employerImg from '../../assets/images/employer.webp'
import useContacts from '../../hooks/useContacts'
import Layout from '../Layout'
import { SecondaryButton } from '../shared/Buttons'
import TextField from '../shared/FormElements/TextField'

const STEP = {
    name: 'details',
    title: 'Add your details',
    subtitle: 'Let us know more about yourself',
    icon: employerImg,
    fields: [
        {
            name: 'social_security_number',
            type: 'number',
            required: true,
            label: 'social security number',
        },
        {
            name: 'recent_employer',
            type: 'text',
            placeholder: 'Google Inc.',
            required: true,
            label: 'most recent employer',
        },
    ],
}

const Identity = () => {
    const navigate = useNavigate()
    const { updateContact } = useContacts()

    const [socialSecurityNumber, setSocialSecurityNumber] = useState()
    const [recentEmployer, setRecentEmployer] = useState()

    const setField = (field_name, value) => {
        if (field_name === 'social_security_number')
            setSocialSecurityNumber(value)
        if (field_name === 'recent_employer') setRecentEmployer(value)
    }

    const submit = async setLoading => {
        const uuid = localStorage.getItem('uuid')
        if (!uuid) return navigate('/')
        try {
            await updateContact(uuid, {
                ssn: socialSecurityNumber,
                employer: recentEmployer,
            })
            navigate('/consent')
        } catch (error) {
            return toast.error(String(error), { duration: 3000 })
        }
    }

    return (
        <Layout>
            <div className="mx-auto w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/3">
                <form onSubmit={e => e.preventDefault()} className="mt-8">
                    <div className="mb-8 flex flex-col items-center">
                        {STEP.icon && (
                            <img className="size-20" src={STEP.icon} alt="" />
                        )}
                        <h1 className="my-1 text-center text-2xl font-semibold text-dark">
                            {STEP.title}
                        </h1>
                        <p className="text-center text-base text-gray-400">
                            {STEP.subtitle}
                        </p>
                    </div>
                    <div className="mb-8 border border-light bg-gray-50 p-6 shadow">
                        {STEP.fields.map((field, index) => {
                            const commonProps = {
                                label: field.label,
                                id: `${STEP.name.replaceAll(' ', '_')}[${field.name}]`,
                                placeholder: field.placeholder,
                                type: field.type,
                                onChange: input => setField(field.name, input),
                                required: field.required,
                            }
                            return <TextField key={index} {...commonProps} />
                        })}
                    </div>
                    <SecondaryButton
                        text="Continue"
                        classNames="ml-auto"
                        onClick={submit}
                    />
                </form>
            </div>
            <Toaster />
        </Layout>
    )
}

export default Identity
