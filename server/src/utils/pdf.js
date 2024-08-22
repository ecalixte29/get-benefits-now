import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDF = (contact, terms) => {
  const doc = new PDFDocument({ size: "A4" });
  const filePath = path.join(__dirname, `../../pdfs/${contact._id}.pdf`);
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.font("Times-Bold")
    .fontSize(16)
    .text("Cornerstone Insurance Agency", { align: 'center' })
    .font("Helvetica")
    .fontSize(14)
    .text("Consent", { align: 'center' })
    .moveDown(2);

  terms.forEach((term, index) => {
    doc.font("Helvetica-Bold").fontSize(14).text(`${index + 1}. ${term.title}`).moveDown(0.5);
    doc.font("Helvetica").fontSize(11).text(`${term.text}\n\n`);
  });

  doc.font("Helvetica-Bold")
    .fontSize(14)
    .text("Plan Details")
    .moveDown(0.5)
    .font("Helvetica")
    .fontSize(11)
    .text(contact.plan.name)
    .text(contact.plan.issuer)
    .moveDown(0.5);

  doc.font("Helvetica-Bold")
    .fontSize(14)
    .text("Personal Details")
    .font("Helvetica")
    .fontSize(11)
    .text(`${contact.details.first_name} ${contact.details.last_name}`)
    .text(formatDate(contact.details.dob))
    .moveDown(0.5);

  doc.font("Helvetica-Bold")
    .fontSize(14)
    .text("Signature")
    .moveDown(0.5)
    .fontSize(11);

  doc.end();
  return filePath;
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
