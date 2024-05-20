import Contact from "../schemas/Contact.js";
import PDFDocument from "pdfkit";

const createContact = async (req, res) => {
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

const getAllContacts = async (req, res) => {
  const allContacts = await Contact.find();
  return res.json(allContacts);
};

const fetchContact = async (req, res) => {
  const id = req.params.id || 0;
  const contact = await Contact.findById(id);
  if (!contact) return res.status(401).json({ message: "No contact found" });
  res.json(contact);
};

const modifyContact = async (req, res) => {
  const id = req.params.id || 0;
  const payload = req.body.payload;
  let contact = await Contact.findById(id);
  if (!contact) return res.status(401).json({ message: "No contact found" });
  if (payload.ssn) contact.details = { ...contact.details, ...payload };
  else if (payload.plan_id) contact.plan_id = payload.plan_id;
  else if (payload.consent) {
    const { terms, signature } = payload.consent;
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(
      path.join(path.dirname(__dirname), `/server/pdfs/${contact._id}.pdf`)
    );

    doc.pipe(stream);

    doc.font("Times-Bold");
    // Write strings as a list
    doc.fontSize(12).text("Consent:");
    terms.forEach((term, index) => {
      doc.font("Times-Bold");
      doc.text(`${index + 1}. ${term.title}`);
      doc.font("Times-Roman");
      doc.text(`${term.text}\n\n`);
    });

    doc.font("Times-Bold");
    // Add signature image
    doc.text(`Signature:`);
    const imgBuffer = Buffer.from(signature.split(",")[1], "base64");
    doc.image(imgBuffer, { width: 500 });

    // Finalize PDF
    doc.end();

    console.log(`PDF generated successfully at /pdfs/${contact._id}.pdf`);
    contact.consent = `/pdfs/${contact._id}.pdf`;
  }
  await contact.save();
  return res.status(200).send();
};

export { createContact, getAllContacts, fetchContact, modifyContact };
