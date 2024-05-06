import { database } from "../configs/firebase"
import {
    collection,
    addDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "@firebase/firestore";

const COLLECTION = 'contacts'

const useContacts = () => {

    const contactsRef = collection(database, COLLECTION);
    const contactRef = (id) => doc(database, COLLECTION, id)

    const createContact = async (payload) => {
        try {
            const response = await addDoc(contactsRef, payload);
            return response;
        } catch (error) {
            console.error("Error creating contact:", error);
            throw error;
        }
    }

    const updateContact = async (id, payload) => {
        try {
            const contactRef = doc(database, COLLECTION, id)
            await updateDoc(contactRef, payload);
        } catch (error) {
            console.error("Error updating contact:", error);
            throw error;
        }
    }

    const getContact = async (id) => {
        try {
            const reponse = await getDoc(contactRef(id));
            if (reponse.exists()) {
                return reponse.data();
            } else {
                let errMessage = "No such record!"
                console.log(errMessage);
                throw new Error(errMessage);
            }
        } catch (error) {
            console.error("Error fetching contact:", error);
            throw error;
        }
    }

    const deleteContact = async (id) => {
        try {
            await deleteDoc(contactRef(id));
        } catch (error) {
            console.error("Error deleting contact:", error);
            throw error;
        }
    };

    const sendContactToGHL = () => {

    }

    return {
        createContact,
        updateContact,
        getContact,
        deleteContact,
        sendContactToGHL
    }
}

export default useContacts;