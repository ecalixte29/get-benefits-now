import Contact from "../schemas/Contact.js";

const dataToPeople = ({ dob, relationship, uses_tobacco }) => ({
  dob: dob.toISOString().split("T")[0],
  relationship,
  aptc_eligible: true,
  uses_tobacco,
});

export const getPlansByContact = async (req, res) => {
  const uuid = req.params.contactId;
  const offset = parseInt(req.query.offset || 0);
  if (!uuid) return res.status(500).send();
  let lead = await Contact.findById(uuid);
  if (!lead) return res.status(500).send();
  lead = lead.toJSON();
  let countyfips;
  let state;
  try {
    const response = await fetch(
      `https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/${lead.details.zip}?apikey=${process.env.MARKETPLACE_API_KEY}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("Error fetching countyfips:", data.error);
      return;
    }

    if (data.counties.length === 0) {
      console.error("No counties found for the provided ZIP code");
      return;
    }

    countyfips = data.counties[0].fips;
    state = data.counties[0].state;
  } catch (error) {
    res.status(500).send();
  }
  const hasMarriedCouple = ["family", "couple"].includes(lead.type);
  const parsedData = {
    household: {
      income: lead.details.gross_income,
      has_married_couple: hasMarriedCouple,
      people: [
        dataToPeople({ ...lead.details, relationship: "Self" }),
        ...(hasMarriedCouple
          ? [
              dataToPeople({
                ...lead.spouse_details,
                relationship: "Spouse",
              }),
            ]
          : []),
        ...(lead?.dependents
          ? lead?.dependents.map((dependent) => dataToPeople(dependent))
          : []),
      ].filter(Boolean),
    },
    market: "Individual",
    place: {
      countyfips: countyfips,
      state: state,
      zipcode: lead.details.zip.toString(),
    },
  };

  const request = await fetch(
    `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${process.env.MARKETPLACE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsedData, offset }),
    }
  );

  return res.status(200).json(await request.json());
};
