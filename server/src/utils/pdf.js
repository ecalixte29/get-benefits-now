import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDF = async (contact, terms, signature) => {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 40, bottom: 40, left: 40, right: 40 },
  });
  const filePath = path.join(
    __dirname,
    `../../pdfs/${contact._id.toString()}.pdf`
  );
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.font("Times-Bold").fontSize(20).text("Cornerstone Insurance Agency", {
    align: "center",
  });

  doc.font("Helvetica");

  const tableOptions = {
    startX: 30,
    startY: 120,
    width: 540,
    itemHeight: 20,
    borderRadius: 5,
    borderColor: "#D3D3D3",
    headerColor: "gray",
    textColor: "black",
    rowSeparatorColor: "#D3D3D3",
  };

  console.log("contact", contact._id.toString());
  const plansResponse = await fetch(
    `http://localhost:5001/plans/lead/${contact._id}?offset=0`
  );
  const { plans } = await plansResponse.json();

  const selectedPlanResponse = await fetch(
    `http://localhost:5001/plans/${contact.plan.id}`
  );

  const { plan: selectedPlan } = await selectedPlanResponse.json();

  const filteredPlans = [selectedPlan, ...plans]
  .map((plan) => {
    const inNetworkCostSharing = plan.benefits[0].cost_sharings.find(
      (cost_sharing) => cost_sharing.network_tier === "In-Network"
    );

    const rows = [
      { title: "Name", value: plan.name },
      { title: "Issuer", value: plan.issuer.name },
      { title: "Monthly Premium", value: `$${plan.premium_w_credit}` },
      { title: "Summary of benefits", value: plan.benefits_url },
    ];

    if (inNetworkCostSharing && inNetworkCostSharing.copay_amount) {
      rows.splice(1, 0, {
        title: "Copay",
        value: `$${inNetworkCostSharing.copay_amount}`,
      });
    }

    return {
      title: plan.name,
      rows,
    };
  })
  .slice(0, 3);


  const tables = [
    {
      title: "Personal Details",
      rows: [
        {
          title: "Name",
          value: `${contact.details.first_name} ${contact.details.last_name}`,
        },
        { title: "Date of Birthday", value: formatDate(contact.details.dob) },
        { title: "SSN", value: contact.details.ssn },
        { title: "Email", value: contact.details.email },
        { title: "Phone", value: contact.details.phone },
      ],
    },
    ...filteredPlans,
  ];

  tables.forEach((table, index) => {
    if (index === 1) {
      doc
        .fontSize(18)
        .font("Times-Bold")
        .text("Plans", tableOptions.startX, tableOptions.startY - 45, {
          align: "center",
        }).font("Helvetica");
      tableOptions.startY += 10;
      drawTable(doc, table.title, table.rows, {
        ...{...tableOptions, borderColor: 'blue', headerColor: 'blue'},
      });
    } else {
      drawTable(doc, table.title, table.rows, {
        ...tableOptions,
      });
    }
    
    tableOptions.startY += 70 + tableOptions.itemHeight * table.rows.length;
  });

  doc.addPage();

  doc
    .font("Times-Bold")
    .fontSize(18)
    .text("Consent", { align: "center" })
    .moveDown(2);

  terms.forEach((term, index) => {
    doc
      .font("Helvetica-Bold")
      .fontSize(14)
      .text(`${index + 1}. ${term.title}`)
      .moveDown(0.5);
    doc
      .font("Helvetica")
      .fillColor("black")
      .fontSize(11)
      .text(`${term.text}\n\n`);
  });

  doc.moveDown(1)

  const imgBuffer = Buffer.from(signature.split(",")[1], "base64");
  doc.image(imgBuffer, { width: 200 });
  doc.moveDown(4)
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("Your Signature")
    .fontSize(11);

  doc
    .fillColor('green')
    .font("Helvetica")
    .text(formatDate(new Date()))

  doc.end();

  return `/pdfs/${contact._id.toString()}.pdf`
};

const formatDate = (date) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const drawTable = (doc, title, rows, options, page = 0) => {
  const {
    startX,
    startY,
    width,
    itemHeight,
    borderRadius,
    borderColor,
    headerColor,
    textColor,
    rowSeparatorColor,
  } = options;

  doc.switchToPage(page);
  const cardHeight = itemHeight * rows.length + 34;

  doc
    .roundedRect(startX, startY - 30, width, cardHeight, borderRadius)
    .fillAndStroke("#FFFFFF", borderColor);

  doc
    .roundedRect(startX, startY - 30, width, 24, borderRadius)
    .fillAndStroke(headerColor, borderColor);

  doc
    .fontSize(12)
    .fillColor("white")
    .text(title, startX + 10, startY - 22, {
      width: width - 20,
      align: "center",
    });

  rows.forEach((row, i) => {
    const y = startY + i * itemHeight;

    doc
      .fillColor(textColor)
      .fontSize(10)
      .text(row.title, startX + 10, y + 8, { width: 200 });

    if (validURL(row.value)) {
      doc
        .fillColor("blue")
        .fontSize(10)
        .text(row.value.slice(0, 50), startX + 210, y + 8, {
          link: row.value,
          width: width - 120,
        });
    } else {
      doc
        .fillColor(textColor)
        .fontSize(10)
        .text(row.value, startX + 210, y + 8, { width: width - 120 });
    }

    if (i < rows.length - 1) {
      doc
        .moveTo(startX + 10, y + itemHeight)
        .lineTo(startX + width - 10, y + itemHeight)
        .stroke(rowSeparatorColor);
    }
  });
};

const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};
