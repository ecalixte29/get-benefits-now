// import PDFDocument from "pdfkit";
import {jsPDF} from "jspdf";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDF = (contact, terms) => {
  const doc = new jsPDF();

  // Example variables
  const { firstName, lastName } = contact.details;
  const contactPlan = contact.plan.name;

  // Dynamically create the content
  const content = `
    <h1>Consent Form</h1>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Plan:</strong> ${contactPlan}</p>
    <h2>Terms and Conditions</h2>
    <ul>
      ${terms.map(term => `<li>${term.title}: ${term.text}</li>`).join('')}
    </ul>
  `;

  doc.html(content, {
    callback: (doc) => {
      doc.save(path.join(__dirname, `../../pdfs/example.pdf`));
      console.log('PDF generated successfully');
    },
    x: 10,
    y: 10
  });

  // doc.text(content, 10, 10);
  // doc.save(path.join(__dirname, '../../pdfs/example.pdf'));
  console.log('PDF generated successfully');
};

// export const generatePDF = (contact, terms) => {
//   const doc = new PDFDocument({ size: "A4" });
//   const filePath = path.join(__dirname, `../../pdfs/${contact._id}.pdf`);
//   const stream = fs.createWriteStream(filePath);

//   doc.pipe(stream);

//   doc.font("Times-Bold")
//     .fontSize(16)
//     .text("Cornerstone Insurance Agency", { align: 'center' })
//     .font("Helvetica")
//     .fontSize(14)
//     .text("Consent", { align: 'center' })
//     .moveDown(2);

//   terms.forEach((term, index) => {
//     doc.font("Helvetica-Bold").fontSize(14).text(`${index + 1}. ${term.title}`).moveDown(0.5);
//     doc.font("Helvetica").fontSize(11).text(`${term.text}\n\n`);
//   });

//   doc.font("Helvetica-Bold")
//     .fontSize(14)
//     .text("Plan Details")
//     .moveDown(0.5)
//     .font("Helvetica")
//     .fontSize(11)
//     .text(contact.plan.name)
//     .text(contact.plan.issuer)
//     .moveDown(0.5);

//   doc.font("Helvetica-Bold")
//     .fontSize(14)
//     .text("Personal Details")
//     .font("Helvetica")
//     .fontSize(11)
//     .text(`${contact.details.first_name} ${contact.details.last_name}`)
//     .text(formatDate(contact.details.dob))
//     .moveDown(0.5);

//   doc.font("Helvetica-Bold")
//     .fontSize(14)
//     .text("Signature")
//     .moveDown(0.5)
//     .fontSize(11);

//   doc.end();
//   return filePath;
// };

// const formatDate = (date) => {
//   const options = { year: "numeric", month: "short", day: "numeric" };
//   return date.toLocaleDateString("en-US", options);
// };
