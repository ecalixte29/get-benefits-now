import Contact from "../schemas/Contact.js";
import { generatePDF } from "../utils/pdf.js";

export const createContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);

    const validationError = contact.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find();
  return res.json(allContacts);
};

export const getContactById = async (req, res) => {
  const id = req.params.id || 0;
  const contact = await Contact.findById(id);
  if (!contact) return res.status(401).json({ message: "No contact found" });
  res.json(contact);
};

export const updateContactById = async (req, res) => {
  const id = req.params.id || 0;
  const payload = req.body.payload;
  let contact = await Contact.findById(id);
  if (!contact) return res.status(401).json({ message: "No contact found" });

  if (payload.ssn) contact.details = { ...contact.details, ...payload };
  else if (payload.plan) contact.plan = payload.plan;
  else if (payload.consent) {
    const { terms, signature } = payload.consent;
    const pdfPath = await generatePDF(contact, terms, signature);
    contact.consent = pdfPath;
  }

  await contact.save();
  return res.status(200).send();
};
