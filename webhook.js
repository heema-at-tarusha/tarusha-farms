const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Serve static website files (index.html, microgreens.html, etc.)
app.use(express.static(path.join(__dirname)));

// Environment Variables
const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN || 'tarusha_wa_prod_secret_2026';
const HUBSPOT_PORTAL_ID = '246925847';
const HUBSPOT_FORM_GUID = '10b943f4-b17f-4c25-93df-628a4dc315fe';

// ---------------------------------------------------------------------
// HEALTH CHECK ENDPOINT
// Render calls this to verify the service is running.
// ---------------------------------------------------------------------
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'TarUsha WhatsApp Webhook Engine' });
});

// ---------------------------------------------------------------------
// ENDPOINT 1: Meta Handshake Verification (GET /webhook)
// Meta calls this when you click "Verify and Save" in the developer portal.
// ---------------------------------------------------------------------
app.get(['/webhook', '/webhook/'], (req, res) => {
  console.log('📡 Incoming Meta GET handshake request with params:', req.query);
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const cleanToken = (token || '').trim();
  const expectedToken = (VERIFY_TOKEN || '').trim();

  if (mode && token) {
    if (mode === 'subscribe' && cleanToken === expectedToken) {
      console.log('✅ Webhook handshake verified successfully by Meta! Challenge returned:', challenge);
      return res.status(200).send(String(challenge));
    } else {
      console.warn(`❌ Handshake failed: Token mismatch! Received: "${cleanToken}", Expected: "${expectedToken}"`);
      return res.status(403).send('Verification token mismatch');
    }
  }
  
  console.warn('❌ Handshake failed: Missing hub.mode or hub.verify_token in request');
  res.status(400).send('Missing hub parameters');
});

// ---------------------------------------------------------------------
// ENDPOINT 2: Event Listener (POST /webhook)
// Meta fires this whenever a customer replies or taps a button.
// ---------------------------------------------------------------------
app.post(['/webhook', '/webhook/'], (req, res) => {
  // Acknowledge Meta immediately (< 3 seconds) with HTTP 200 OK
  res.sendStatus(200);

  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const messageData = body.entry[0].changes[0].value.messages[0];
      const contactInfo = body.entry[0].changes[0].value.contacts?.[0];

      const senderPhone = messageData.from; // e.g. "919901063238"
      const senderName = contactInfo?.profile?.name || 'WhatsApp Contact';
      const messageType = messageData.type;

      let userResponseText = '';
      let isPositiveReply = false;

      // Case A: Customer tapped a Quick Reply button
      if (messageType === 'button') {
        userResponseText = messageData.button.text;
        const buttonPayload = messageData.button.payload;
        if (buttonPayload === 'YES_SHARE_DETAILS' || userResponseText.toLowerCase().includes('yes')) {
          isPositiveReply = true;
        }
      } 
      // Case B: Customer typed freeform text
      else if (messageType === 'text') {
        userResponseText = messageData.text.body.trim();
        const lower = userResponseText.toLowerCase();
        
        // Positive intent matching
        const positiveKeywords = ['interested', 'yes', 'ha', 'bhejo', 'details', 'call', 'quote', 'cost', 'price', 'tell me'];
        if (positiveKeywords.some(keyword => lower.includes(keyword))) {
          isPositiveReply = true;
        }
      }

      console.log(`📩 Incoming message from ${senderName} (${senderPhone}): "${userResponseText}"`);

      // If customer is interested, trigger the HubSpot Form submission asynchronously
      if (isPositiveReply) {
        console.log(`🎯 Lead Qualified! Pushing ${senderPhone} to HubSpot CRM...`);
        pushLeadToHubSpot({
          name: senderName,
          phone: `+${senderPhone}`,
          message: userResponseText
        }).catch(err => console.error('Failed to sync to HubSpot:', err.message));
      }
    }
  }
});

// ---------------------------------------------------------------------
// HELPER: Push Lead to TarUsha's HubSpot Form Submission API
// ---------------------------------------------------------------------
async function pushLeadToHubSpot({ name, phone, message }) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
  
  const payload = {
    fields: [
      { name: 'firstname', value: name },
      { name: 'phone', value: phone },
      { name: 'message', value: `WhatsApp Campaign Reply: "${message}"` },
      { name: 'area_of_interest', value: 'Cold WhatsApp Outreach Lead' }
    ],
    context: {
      pageUri: 'https://tarushafarms.com/whatsapp-campaign',
      pageName: 'WhatsApp Cold Outreach Broadcast'
    }
  };

  const response = await axios.post(url, payload);
  console.log(`✅ HubSpot synced successfully for ${phone}! Status: ${response.status}`);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 TarUsha Webhook & Web Server running on port ${PORT}`);
});
