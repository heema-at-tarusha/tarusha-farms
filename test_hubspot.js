const HUBSPOT_PORTAL_ID = '246925847';
const HUBSPOT_FORM_GUID = '10b943f4-b17f-4c25-93df-628a4dc315fe';

const hsPayload = {
    fields: [
        { name: "firstname", value: "Test Name" },
        { name: "company", value: "Test Company" },
        { name: "email", value: "test@example.com" },
        { name: "phone", value: "1234567890" },
        { name: "city", value: "Test City" },
        { name: "area_of_interest", value: "Hydroponic Kits" },
        { name: "message", value: "Test Message" }
    ]
};

const hsEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

fetch(hsEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(hsPayload)
})
.then(async response => {
    console.log("Status:", response.status);
    const text = await response.text();
    console.log("Response Body:", text);
})
.catch(error => {
    console.error("Fetch Error:", error);
});
