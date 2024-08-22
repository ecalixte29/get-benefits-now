import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({ bufferPages: true, size: "A4" });

doc.pipe(fs.createWriteStream("output.pdf"));

function drawTable(doc, title, rows, options, page = 0) {
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
  const cardHeight = itemHeight * rows.length + 30 + 10;

  doc
    .roundedRect(startX, startY - 30, width, cardHeight, borderRadius)
    .fillAndStroke("#FFFFFF", borderColor);

  doc
    .roundedRect(
      startX,
      startY - 30,
      width,
      30,
      borderRadius,
      borderRadius,
      0,
      0
    )
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

    doc
      .fillColor(textColor)
      .fontSize(10)
      .text(row.value, startX + 210, y + 8, { width: width - 120 });

    if (i < rows.length - 1) {
      doc
        .moveTo(startX + 10, y + itemHeight)
        .lineTo(startX + width - 10, y + itemHeight)
        .stroke(rowSeparatorColor);
    }
  });
}

(async () => {
  doc
    .fontSize(30)
    .text(
      "K&A insurance, LLC",
      doc.page.width / 2 - doc.widthOfString("K&A insurance, LLC"),
      20,
      {
        align: "center",
      }
    );

  const leadRequest = await fetch(
    `http://localhost:5001/contacts/66c760805bbe73fac8e1eba8`
  );
  const lead = await leadRequest.json();
  const req = await fetch(
    `http://localhost:5001/plans/66c760805bbe73fac8e1eba8?offset=0`
  );
  const { plans } = await req.json();
  const filteredPlans = plans
    .map((plan) => ({
      title: plan.name,
      rows: [
        { title: "Name", value: plan.name },
        {
          title: "Copay",
          value: `$${
            plan.benefits[0].cost_sharings.find(
              (cost_sharing) => cost_sharing.network_tier === "In-Network"
            ).copay_amount
          }`,
        },
        { title: "Issuer", value: plan.issuer.name },
        { title: "Monthly Premium", value: `$${plan.premium_w_credit}` },
        { title: "Summary of benefits", value: plan.benefits_url },
      ],
    }))
    .filter((planId) => planId !== lead.plan_id)
    .slice(0, 3);

  console.log(filteredPlans);

  const tableOptions = {
    startX: 50,
    startY: 150,
    width: 500,
    itemHeight: 20,
    borderRadius: 5,
    borderColor: "#D3D3D3",
    headerColor: "blue",
    textColor: "black",
    rowSeparatorColor: "#D3D3D3",
  };

  const tables = [
    {
      title: "Personal Details",
      rows: [
        {
          title: "Name",
          value: `${lead.details.first_name} ${lead.details.last_name}`,
        },
        { title: "DOB", value: lead.details.dob.split("T")[0] },
        { title: "Social Security Number", value: lead.details.ssn },
        { title: "Email", value: lead.details.email },
        { title: "Phone", value: lead.details.phone },
      ],
    },
    ...filteredPlans,
  ];

  tables.forEach((table, index) => {
    if (index === 1) {
      doc
        .fontSize(20)
        .text("Plans", tableOptions.startX, tableOptions.startY - 45, {
          align: "center",
        });
      tableOptions.startY += 10;
    }
    drawTable(doc, table.title, table.rows, {
      ...tableOptions,
    });
    tableOptions.startY += 70 + tableOptions.itemHeight * table.rows.length;
  });
  doc.end();
})();
