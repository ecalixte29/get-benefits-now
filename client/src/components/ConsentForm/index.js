import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignaturePad from 'react-signature-canvas'
import useContacts from '../../hooks/useContacts'
import { CONSENT_DATA } from '../../utils/consent_data'
import Layout from '../Layout'
import { SecondaryButton } from '../shared/Buttons'
import AttestableCard from './AttestableCard'

const ConsentForm = () => {
    const navigate = useNavigate()
    const { getContact, updateContact, sendContactToGHL } = useContacts()

    const signaturePadRef = useRef()

    const [tnc, setTnc] = useState(CONSENT_DATA)
    const [uuid, setUUID] = useState(null)
    const [initials, setInitials] = useState('')

    useEffect(() => {
        const validate = async () => {
            const storedUUID = localStorage.getItem('uuid')
            if (!storedUUID) return navigate('/')
            setUUID(storedUUID)
            let lead = await getContact(storedUUID)

            if (!lead?.plan_id) return navigate('/plans')
            setInitials(
                `${lead.details.first_name[0].toUpperCase()}${lead.details.last_name[0].toUpperCase()}`
            )
        }
        validate()
    }, [])

    const onSubmit = async () => {
        const signature = signaturePadRef.current.toDataURL()

        await updateContact(uuid, { signature })
        sendContactToGHL(uuid)
        localStorage.removeItem("uuid");
        navigate('/thank-you')
    }

    return (
        <Layout title="Cosent Form">
            <div className="mx-auto w-11/12 space-y-5 lg:w-3/4">
                {tnc.map((term, index) => (
                    <AttestableCard
                        key={index}
                        onSelect={() =>
                            setTnc(prevTnc =>
                                prevTnc.map((t, i) =>
                                    i === index
                                        ? { ...t, isSelected: !t.isSelected }
                                        : t
                                )
                            )
                        }
                        isSelected={term.isSelected}
                        initials={initials}
                        title={term.title}
                        text={term.text}
                    />
                ))}
                <h2 className="text-xl capitalize text-dark">Signature</h2>
                <SignaturePad
                    ref={signaturePadRef}
                    canvasProps={{
                        className: 'w-full h-48 bg-white mt-5 shadow-global',
                        height: 200,
                    }}
                />
                <div className="flex justify-end">
                    <SecondaryButton
                        text="Clear"
                        invert={true}
                        classNames="mr-5"
                        onClick={() => signaturePadRef.current.clear()}
                    />
                    <SecondaryButton
                        text="Submit"
                        disabled={tnc.some(term => !term.isSelected)}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default ConsentForm
