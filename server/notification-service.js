const nodemailer = require('nodemailer');
const axios = require('axios');

const HUBSPOT_PORTAL_ID = '246925847';
const HUBSPOT_FORM_GUID = '10b943f4-b17f-4c25-93df-628a4dc315fe';
const TARUSHA_SUPPORT_EMAIL = process.env.NOTIFICATION_EMAIL || 'tarushafarms@gmail.com';
const TARUSHA_WA_PHONE = '919220902015';

/**
 * Creates nodemailer transporter from environment variables or returns null if not configured
 */
function getEmailTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return null;
}

/**
 * Format Indian Rupees with commas
 */
function formatINR(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

/**
 * Generate Customer HTML Email Template
 */
function generateCustomerEmailHtml(lead, assessment) {
  const { name } = lead;
  const { recommendation, capacity, dimensions, billOfMaterials, baseSubtotal, optionalUpgrades, gstAmount, grandTotal, estimatedRange } = assessment;

  const bomRows = billOfMaterials.map((item, idx) => `
    <tr style="border-bottom: 1px solid #e0dfdb;">
      <td style="padding: 10px 8px; font-size: 14px; color: #1e3b22;">
        <strong>${item.item}</strong><br/>
        <span style="font-size: 12px; color: #555;">${item.description}</span>
      </td>
      <td style="padding: 10px 8px; font-size: 14px; text-align: center; color: #333;">${item.quantity} ${item.unit}</td>
      <td style="padding: 10px 8px; font-size: 14px; text-align: right; color: #1e3b22; font-weight: 600;">${formatINR(item.total)}</td>
    </tr>
  `).join('');

  const upgradesRows = optionalUpgrades.filter(u => u.selected).map(u => `
    <tr style="border-bottom: 1px solid #e0dfdb; background-color: #faf8f5;">
      <td style="padding: 10px 8px; font-size: 14px; color: #1e3b22;">
        <strong>${u.name}</strong> (Selected Upgrade)<br/>
        <span style="font-size: 12px; color: #555;">${u.description}</span>
      </td>
      <td style="padding: 10px 8px; font-size: 14px; text-align: center; color: #333;">1 set</td>
      <td style="padding: 10px 8px; font-size: 14px; text-align: right; color: #1e3b22; font-weight: 600;">${formatINR(u.cost)}</td>
    </tr>
  `).join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f1ea; margin: 0; padding: 20px; color: #222; }
      .email-container { max-width: 650px; background: #ffffff; margin: 0 auto; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.06); }
      .email-header { background-color: #1e3b22; color: #ffffff; padding: 30px 25px; text-align: center; }
      .email-header h1 { margin: 10px 0 5px; font-size: 24px; font-weight: 700; }
      .email-header p { margin: 0; color: #a8c6a1; font-size: 14px; }
      .email-body { padding: 30px 25px; }
      .greeting { font-size: 18px; font-weight: 600; color: #1e3b22; margin-bottom: 15px; }
      .spec-card { background-color: #f7f9f6; border-left: 4px solid #1e3b22; padding: 15px; border-radius: 4px; margin-bottom: 25px; }
      .spec-grid { display: table; width: 100%; margin-top: 10px; }
      .spec-col { display: table-cell; width: 50%; vertical-align: top; padding-right: 10px; }
      .bom-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
      .bom-table th { background-color: #1e3b22; color: #ffffff; text-align: left; padding: 10px 8px; font-size: 13px; font-weight: 600; }
      .summary-box { background-color: #f4f1ea; padding: 15px; border-radius: 6px; margin-top: 20px; }
      .summary-line { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; }
      .total-line { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; color: #1e3b22; border-top: 2px solid #1e3b22; padding-top: 10px; margin-top: 10px; }
      .cta-btn { display: inline-block; background-color: #25D366; color: #ffffff !important; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 700; font-size: 15px; margin-top: 20px; text-align: center; }
      .email-footer { background-color: #2d312e; color: #999; padding: 20px; text-align: center; font-size: 12px; }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="email-header">
        <h1 style="color: #ffffff;">TarUsha Farms</h1>
        <p>Your Home Hydroponic Garden Feasibility & Indicative Estimate</p>
      </div>

      <div class="email-body">
        <div class="greeting">Hello ${name || 'Garden Enthusiast'},</div>
        <p>Thank you for using the TarUsha Home Garden Planner. Based on your space of <strong>${dimensions.lengthFt} ft &times; ${dimensions.widthFt} ft (${dimensions.areaSqFt} sq ft)</strong>, our agronomy engineering team has prepared this itemised preliminary assessment.</p>

        <div class="spec-card">
          <h3 style="margin: 0 0 10px; color: #1e3b22; font-size: 16px;">🌱 Recommended Growing System</h3>
          <div style="font-size: 15px; font-weight: 700; color: #2a4d30; margin-bottom: 5px;">${recommendation.systemTitle}</div>
          <div style="font-size: 13px; color: #444; margin-bottom: 10px;">${recommendation.systemReason}</div>
          <div style="font-size: 13px; color: #1e3b22;">
            ${capacity.dutchBuckets > 0 ? `• <strong>${capacity.dutchBuckets} Dutch Buckets</strong> (${capacity.dutchBucketLayout}) with buffered cocopeat<br/>` : ''}
            ${capacity.nftPlants > 0 ? `• <strong>${capacity.nftPlants} NFT Plant Sites</strong> (${capacity.nftLayout})<br/>` : ''}
            • <strong>${capacity.reservoirSizeLiters}L Food-Grade Reservoir</strong> (100L per 16 buckets standard)<br/>
            • <strong>Estimated Monthly Yield:</strong> ~${capacity.totalMonthlyHarvestKg} kg of fresh pesticide-free produce
          </div>
        </div>

        <h3 style="color: #1e3b22; font-size: 16px; margin: 25px 0 10px;">📋 Itemised Cost Breakdown</h3>
        <table class="bom-table">
          <thead>
            <tr>
              <th>Component & Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            ${bomRows}
            ${upgradesRows}
          </tbody>
        </table>

        <div class="summary-box">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 0; font-size: 14px; color: #555;">Base System Subtotal:</td>
              <td style="padding: 4px 0; font-size: 14px; text-align: right; font-weight: 600;">${formatINR(baseSubtotal)}</td>
            </tr>
            ${assessment.upgradesSelectedCost > 0 ? `
            <tr>
              <td style="padding: 4px 0; font-size: 14px; color: #555;">Selected Upgrades:</td>
              <td style="padding: 4px 0; font-size: 14px; text-align: right; font-weight: 600;">${formatINR(assessment.upgradesSelectedCost)}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 4px 0; font-size: 14px; color: #555;">GST (18%):</td>
              <td style="padding: 4px 0; font-size: 14px; text-align: right; font-weight: 600;">${formatINR(gstAmount)}</td>
            </tr>
            <tr style="border-top: 2px solid #1e3b22;">
              <td style="padding: 8px 0; font-size: 16px; font-weight: 700; color: #1e3b22;">Indicative Total:</td>
              <td style="padding: 8px 0; font-size: 18px; font-weight: 700; text-align: right; color: #1e3b22;">${formatINR(grandTotal)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding-top: 5px; font-size: 12px; color: #666; text-align: right;">
                Indicative Range (&plusmn;5%): ${formatINR(estimatedRange.min)} &ndash; ${formatINR(estimatedRange.max)}
              </td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 25px; padding: 15px; background: #eaf1e8; border-radius: 6px; font-size: 13px; color: #1e3b22;">
          <strong>What's Next?</strong><br/>
          A TarUsha agronomy specialist will review your space details and contact you within 24 hours to schedule a complimentary site evaluation or answer any questions you have about growing vegetables at home.
        </div>

        <div style="text-align: center; margin-top: 25px;">
          <a href="https://wa.me/${TARUSHA_WA_PHONE}?text=${encodeURIComponent(`Hi TarUsha, I received my home garden estimate for ${dimensions.areaSqFt} sq ft (${formatINR(grandTotal)}). I would like to schedule a site visit.`)}" class="cta-btn">
            Chat With Us On WhatsApp &rarr;
          </a>
        </div>
      </div>

      <div class="email-footer">
        <strong>TarUsha Farms &amp; Technologies</strong><br/>
        2nd Floor, Khatana Palace, Sector 64, Gurgaon, Haryana 122101<br/>
        Phone / WhatsApp: +91 92209 02015 | Web: tarushafarms.com
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Generate Internal TarUsha Lead Email
 */
function generateTarUshaLeadEmailHtml(lead, assessment) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; color: #333; line-height: 1.5; }
      table { border-collapse: collapse; width: 100%; margin-top: 10px; }
      th, td { border: 1px solid #ddd; padding: 8px; font-size: 13px; }
      th { background-color: #1e3b22; color: #fff; text-align: left; }
      .lead-card { background: #fdfaf3; padding: 15px; border-left: 4px solid #1e3b22; margin-bottom: 20px; }
    </style>
  </head>
  <body>
    <div style="background-color: #1e3b22; color: #fff; padding: 15px 20px;">
      <h2 style="margin: 0;">🚀 New Qualified Home Garden Planner Lead!</h2>
    </div>

    <div style="padding: 20px;">
      <div class="lead-card">
        <h3 style="margin: 0 0 10px; color: #1e3b22;">Customer Contact Details</h3>
        <strong>Name:</strong> ${lead.name || 'Not provided'}<br/>
        <strong>Phone:</strong> <a href="tel:${lead.phone}">${lead.phone}</a> | <a href="https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}">Open WhatsApp</a><br/>
        <strong>Email:</strong> ${lead.email || 'Not provided'}<br/>
        <strong>City / Location:</strong> ${lead.city || 'Delhi NCR / Gurgaon'}<br/>
        <strong>Customer Notes / Questions:</strong> ${lead.notes || 'None'}
      </div>

      <h3 style="color: #1e3b22;">Garden Site Assessment</h3>
      <table>
        <tr><th style="width: 35%;">Parameter</th><th>Customer Input</th></tr>
        <tr><td>Space Type</td><td>${assessment.dimensions.spaceType}</td></tr>
        <tr><td>Dimensions</td><td>${assessment.dimensions.lengthFt} ft &times; ${assessment.dimensions.widthFt} ft (${assessment.dimensions.areaSqFt} sq ft)</td></tr>
        <tr><td>Recommended System</td><td><strong>${assessment.recommendation.systemTitle}</strong></td></tr>
        <tr><td>Dutch Buckets</td><td>${assessment.capacity.dutchBuckets} buckets (${assessment.capacity.dutchBucketLayout})</td></tr>
        <tr><td>NFT Plant Capacity</td><td>${assessment.capacity.nftPlants} plant sites</td></tr>
        <tr><td>Reservoir Tank</td><td>${assessment.capacity.reservoirSizeLiters} Liters</td></tr>
        <tr><td>Selected Crops</td><td>${(lead.crops || []).join(', ')}</td></tr>
        <tr><td>Sunlight</td><td>${lead.sunlightHours || 'Not specified'}</td></tr>
        <tr><td>Monkey Presence</td><td><strong>${lead.monkeyPresence || 'none'}</strong></td></tr>
        <tr><td>Estimated Total Cost</td><td><strong>${formatINR(assessment.grandTotal)}</strong> (Range: ${formatINR(assessment.estimatedRange.min)} - ${formatINR(assessment.estimatedRange.max)})</td></tr>
      </table>

      ${assessment.feasibilityAlerts.length > 0 ? `
        <h4 style="color: #c0392b; margin-top: 15px;">Site Alerts & Warnings</h4>
        <ul>
          ${assessment.feasibilityAlerts.map(a => `<li><strong>${a.title}:</strong> ${a.message}</li>`).join('')}
        </ul>
      ` : ''}

      <div style="margin-top: 25px;">
        <a href="https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, this is TarUsha Farms regarding your home hydroponic garden estimate for ${assessment.dimensions.areaSqFt} sq ft. When would be a good time for a brief site discussion?`)}" style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Reply to Customer on WhatsApp
        </a>
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Sync lead to HubSpot Form API
 */
async function pushLeadToHubSpot(lead, assessment) {
  try {
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
    const payload = {
      fields: [
        { name: 'firstname', value: lead.name || 'Website Visitor' },
        { name: 'phone', value: lead.phone || '' },
        { name: 'email', value: lead.email || '' },
        { name: 'city', value: lead.city || 'Gurgaon' },
        {
          name: 'message',
          value: `[Home Garden Planner] System: ${assessment.recommendation.systemTitle} | Size: ${assessment.dimensions.areaSqFt} sq ft (${assessment.dimensions.lengthFt}x${assessment.dimensions.widthFt}) | Dutch Buckets: ${assessment.capacity.dutchBuckets} | NFT Sites: ${assessment.capacity.nftPlants} | Est Total: ${formatINR(assessment.grandTotal)} | Monkeys: ${lead.monkeyPresence || 'none'} | Crops: ${(lead.crops || []).join(', ')} | Notes: ${lead.notes || ''}`
        },
        { name: 'area_of_interest', value: 'Home Hydroponic Garden Planner' }
      ],
      context: {
        pageUri: 'https://tarushafarms.com/home-garden-planner.html',
        pageName: 'Home Hydroponic Garden Planner & Cost Estimator'
      }
    };

    const res = await axios.post(url, payload);
    console.log(`✅ [HubSpot] Successfully submitted planner lead for ${lead.phone} (${res.status})`);
    return { success: true };
  } catch (err) {
    console.warn(`⚠️ [HubSpot] Submission warning: ${err.message}`);
    return { success: false, error: err.message };
  }
}

/**
 * Dispatch Notifications (Customer Email, TarUsha Email, WhatsApp trigger, HubSpot CRM)
 */
async function dispatchNotifications(lead, assessment) {
  const results = {
    emailSentToCustomer: false,
    emailSentToTarUsha: false,
    hubspotSynced: false,
    whatsappUrl: `https://wa.me/${TARUSHA_WA_PHONE}?text=${encodeURIComponent(`Hi TarUsha, my name is ${lead.name}. I just generated an estimate for my ${assessment.dimensions.areaSqFt} sq ft ${assessment.recommendation.systemTitle} (${formatINR(assessment.grandTotal)}). I would like to schedule a consultation.`)}`
  };

  // 1. HubSpot Sync (Non-blocking)
  try {
    const hsRes = await pushLeadToHubSpot(lead, assessment);
    results.hubspotSynced = hsRes.success;
  } catch (err) {
    console.error('HubSpot sync error:', err.message);
  }

  // 2. Email Delivery via Nodemailer
  const transporter = getEmailTransporter();
  if (transporter) {
    // Send to Customer (if valid email provided)
    if (lead.email && lead.email.includes('@')) {
      try {
        await transporter.sendMail({
          from: `"TarUsha Farms" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: lead.email,
          subject: `🌱 Your Hydroponic Garden Estimate & Feasibility Assessment | TarUsha`,
          html: generateCustomerEmailHtml(lead, assessment)
        });
        results.emailSentToCustomer = true;
        console.log(`📧 Estimate email sent to customer: ${lead.email}`);
      } catch (err) {
        console.error(`❌ Failed to send customer email: ${err.message}`);
      }
    }

    // Send to TarUsha Internal Team
    try {
      await transporter.sendMail({
        from: `"TarUsha Website Lead" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: TARUSHA_SUPPORT_EMAIL,
        subject: `🎯 New Garden Planner Lead: ${lead.name} (${assessment.dimensions.areaSqFt} sqft - ${formatINR(assessment.grandTotal)})`,
        html: generateTarUshaLeadEmailHtml(lead, assessment)
      });
      results.emailSentToTarUsha = true;
      console.log(`📧 Lead alert sent to TarUsha team: ${TARUSHA_SUPPORT_EMAIL}`);
    } catch (err) {
      console.error(`❌ Failed to send team lead email: ${err.message}`);
    }
  } else {
    console.log('ℹ️ [Nodemailer] SMTP credentials not set in environment. Skipping email dispatch gracefully.');
  }

  return results;
}

module.exports = {
  dispatchNotifications,
  formatINR,
  pushLeadToHubSpot
};
