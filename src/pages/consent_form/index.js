import React, { useEffect, useRef, useState } from "react"
import AttestableCard from "./AttestableCard"
import Layout from '../../components/Layout'
import { SecondaryButton } from "../../components/buttons"
import SignaturePad from 'react-signature-canvas'
import { useNavigate } from "react-router-dom"
import { CONSENT_DATA } from "../../utils/consent_data"
import useContacts from "../../hooks/useContacts"

const ConsentForm = () => {
    const navigate = useNavigate()
    const { getContact, updateContact } = useContacts()

    const signaturePadRef = useRef();

    const [tnc, setTnc] = useState(CONSENT_DATA);
    const [uuid, setUUID] = useState(null);
    const [initials, setInitials] = useState('');

    useEffect(() => {
        const validate = async () => {
            const storedUUID = localStorage.getItem('uuid');
            if (!storedUUID) return navigate('/');
            setUUID(storedUUID);
            let lead = await getContact(storedUUID)
            
            if (!lead?.plan_id) return navigate('/plans');
            setInitials(`${lead.details.first_name[0].toUpperCase()}${lead.details.last_name[0].toUpperCase()}`);
        };
        validate();
    }, [navigate]);

    const onSubmit = async () => {
        const signature = signaturePadRef.current.toDataURL();

        await updateContact(uuid, { signature })
        navigate('/thank-you');
    };

    return (
        <Layout title='Cosent Form'>
            <div className="w-11/12 lg:w-3/4 mx-auto space-y-5">
                {tnc.map((term, index) => (
                    <AttestableCard
                        key={index}
                        onSelect={() => setTnc(prevTnc => prevTnc.map((t, i) => i === index ? { ...t, isSelected: !t.isSelected } : t))}
                        isSelected={term.isSelected}
                        initials={initials}
                        title={term.title}
                        text={term.text}
                    />
                ))}
                <h2 className="text-xl text-dark capitalize">Signature</h2>
                <SignaturePad
                    ref={signaturePadRef}
                    canvasProps={{
                        className: 'w-full h-48 bg-white mt-5 shadow-global',
                        height: 200
                    }}
                />
                <div className="flex justify-end">
                    <SecondaryButton
                        text='Clear'
                        invert={true}
                        classNames='mr-5'
                        onClick={() => signaturePadRef.current.clear()}
                    />
                    <SecondaryButton
                        text='Submit'
                        disabled={tnc.some(term => !term.isSelected)}
                        onClick={onSubmit}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default ConsentForm