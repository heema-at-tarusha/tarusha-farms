/**
 * TarUsha Home Hydroponic Garden Planner & Cost Estimator — Frontend Controller
 * Flow:
 * Step 1: Space & Dimensions
 * Step 2: Crops & Family Size
 * Step 3: Site Conditions & Monkeys
 * Step 4: Contact Details (Name, Phone, Email) -> Submits, Emails Estimate to Customer, Alerts TarUsha, Syncs CRM
 * Step 5: Reveals Full Itemised Breakdown, Bill of Materials, Metrics, and WhatsApp Consultation Link
 */

(function() {
  'use strict';

  // Application State
  const state = {
    currentStep: 1,
    totalSteps: 5,
    spaceType: 'balcony',
    lengthFt: 15,
    widthFt: 10,
    areaSqFt: 150,
    crops: ['lettuce', 'spinach', 'tomatoes', 'chillies'],
    familySize: 4,
    sunlightHours: '3-5',
    surfaceType: 'concrete',
    waterAccess: 'nearby_tap',
    powerAccess: 'yes',
    monkeyPresence: 'none',
    includeMonkeyEnclosure: false,
    includeClimateControl: false,
    lead: {
      name: '',
      phone: '',
      email: '',
      city: 'Gurgaon',
      notes: ''
    },
    lastCalculatedAssessment: null
  };

  function formatINR(val) {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
  }

  document.addEventListener('DOMContentLoaded', initPlanner);

  function initPlanner() {
    bindStep1Events();
    bindStep2Events();
    bindStep3Events();
    bindStep4Events();
    bindStep5Events();
    updateLiveArea();
  }

  // ==========================================
  // STEP 1: Space & Dimensions
  // ==========================================
  function bindStep1Events() {
    const spaceCards = document.querySelectorAll('#step-1-spaces .gp-select-card');
    spaceCards.forEach(card => {
      card.addEventListener('click', () => {
        spaceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.spaceType = card.dataset.value;
      });
    });

    const lengthInput = document.getElementById('gp-input-length');
    const widthInput = document.getElementById('gp-input-width');

    if (lengthInput && widthInput) {
      lengthInput.addEventListener('input', () => {
        state.lengthFt = parseFloat(lengthInput.value) || 0;
        updateLiveArea();
      });
      widthInput.addEventListener('input', () => {
        state.widthFt = parseFloat(widthInput.value) || 0;
        updateLiveArea();
      });
    }

    const nextBtn = document.getElementById('gp-btn-step1-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.lengthFt < 4 || state.widthFt < 3) {
          alert('Please enter a minimum length of 4 ft and width of 3 ft for a viable garden installation.');
          return;
        }
        goToStep(2);
      });
    }
  }

  function updateLiveArea() {
    state.areaSqFt = Math.round(state.lengthFt * state.widthFt * 10) / 10;
    const sqM = Math.round(state.areaSqFt * 0.0929 * 10) / 10;

    const areaValEl = document.getElementById('gp-live-area-val');
    const areaSubEl = document.getElementById('gp-live-area-sub');

    if (areaValEl) areaValEl.textContent = `${state.areaSqFt} sq ft`;
    if (areaSubEl) areaSubEl.textContent = `Approx. ${sqM} m² floor footprint`;
  }

  // ==========================================
  // STEP 2: Vegetables & Greens
  // ==========================================
  function bindStep2Events() {
    const cropChips = document.querySelectorAll('.gp-crop-chip');
    cropChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        const checkbox = chip.querySelector('input[type="checkbox"]');
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
        chip.classList.toggle('selected', checkbox.checked);

        const selected = [];
        document.querySelectorAll('.gp-crop-chip.selected').forEach(c => {
          selected.push(c.dataset.crop);
        });
        state.crops = selected;
      });
    });

    const familyInputs = document.querySelectorAll('input[name="gp_family_size"]');
    familyInputs.forEach(input => {
      input.addEventListener('change', () => {
        state.familySize = parseInt(input.value, 10);
      });
    });

    const prevBtn = document.getElementById('gp-btn-step2-prev');
    const nextBtn = document.getElementById('gp-btn-step2-next');

    if (prevBtn) prevBtn.addEventListener('click', () => goToStep(1));
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.crops.length === 0) {
          alert('Please select at least one vegetable or herb you would like to grow.');
          return;
        }
        goToStep(3);
      });
    }
  }

  // ==========================================
  // STEP 3: Site Conditions & Monkeys
  // ==========================================
  function bindStep3Events() {
    const sunCards = document.querySelectorAll('#step-3-sunlight .gp-select-card');
    sunCards.forEach(card => {
      card.addEventListener('click', () => {
        sunCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.sunlightHours = card.dataset.value;
      });
    });

    const monkeyCards = document.querySelectorAll('#step-3-monkeys .gp-select-card');
    monkeyCards.forEach(card => {
      card.addEventListener('click', () => {
        monkeyCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.monkeyPresence = card.dataset.value;
      });
    });

    const prevBtn = document.getElementById('gp-btn-step3-prev');
    const nextBtn = document.getElementById('gp-btn-step3-next');

    if (prevBtn) prevBtn.addEventListener('click', () => goToStep(2));
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const powerEl = document.querySelector('input[name="gp_power"]:checked');
        if (powerEl) state.powerAccess = powerEl.value;

        const waterEl = document.querySelector('input[name="gp_water"]:checked');
        if (waterEl) state.waterAccess = waterEl.value;

        const surfaceEl = document.querySelector('select[name="gp_surface"]');
        if (surfaceEl) state.surfaceType = surfaceEl.value;

        if (state.monkeyPresence === 'frequent' || state.monkeyPresence === 'occasional') {
          state.includeMonkeyEnclosure = true;
        }

        // Advance to Step 4 to collect contact details and email estimate before reveal
        goToStep(4);
      });
    }
  }

  // ==========================================
  // STEP 4: Email & Lead Capture
  // ==========================================
  function bindStep4Events() {
    const prevBtn = document.getElementById('gp-btn-step4-prev');
    const form = document.getElementById('gp-lead-form');

    if (prevBtn) prevBtn.addEventListener('click', () => goToStep(3));

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('gp-lead-name').value.trim();
        const phone = document.getElementById('gp-lead-phone').value.trim();
        const email = document.getElementById('gp-lead-email').value.trim();
        const city = document.getElementById('gp-lead-city').value.trim();
        const notes = document.getElementById('gp-lead-notes').value.trim();
        const consent = document.getElementById('gp-lead-consent').checked;

        if (!name) {
          alert('Please enter your full name.');
          return;
        }

        const cleanPhone = phone.replace(/[^0-9]/g, '');
        if (cleanPhone.length < 10) {
          alert('Please enter a valid 10-digit Indian mobile number.');
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          alert('Please enter a valid email address so we can send your estimate copy.');
          return;
        }

        if (!consent) {
          alert('Please consent to receiving your estimate and consultation details.');
          return;
        }

        state.lead = { name, phone: cleanPhone, email, city, notes, consent };

        const submitBtn = document.getElementById('gp-btn-submit-lead');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>⏳ Preparing Your Estimate &amp; Unlocking Breakdown...</span>';
        }

        // 1. Calculate assessment locally first — 100% reliable, zero network failure risk
        let assessment = null;
        if (window.TarUshaPlanner && typeof window.TarUshaPlanner.calculateGardenAssessment === 'function') {
          assessment = window.TarUshaPlanner.calculateGardenAssessment({
            spaceType: state.spaceType,
            lengthFt: state.lengthFt,
            widthFt: state.widthFt,
            sunlightHours: state.sunlightHours,
            surfaceType: state.surfaceType,
            waterAccess: state.waterAccess,
            powerAccess: state.powerAccess,
            familySize: state.familySize,
            crops: state.crops,
            monkeyPresence: state.monkeyPresence,
            includeMonkeyEnclosure: state.includeMonkeyEnclosure,
            includeClimateControl: state.includeClimateControl
          });
        }

        // 2. Direct client-side submission to HubSpot CRM (uses same Portal ID & Form GUID as rest of site)
        const HUBSPOT_PORTAL_ID = '246925847';
        const HUBSPOT_FORM_GUID = '10b943f4-b17f-4c25-93df-628a4dc315fe';
        const hsEndpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;
        
        const hsPayload = {
          fields: [
            { name: 'firstname', value: name },
            { name: 'phone', value: cleanPhone },
            { name: 'email', value: email },
            { name: 'city', value: city || 'Gurgaon' },
            {
              name: 'message',
              value: assessment 
                ? `[Home Garden Planner] System: ${assessment.recommendation.systemTitle} | Size: ${assessment.dimensions.areaSqFt} sq ft (${assessment.dimensions.lengthFt}x${assessment.dimensions.widthFt}) | Dutch Buckets: ${assessment.capacity.dutchBuckets} | NFT Sites: ${assessment.capacity.nftPlants} | Est Total: ${formatINR(assessment.grandTotal)} | Monkeys: ${state.monkeyPresence} | Crops: ${(state.crops || []).join(', ')} | Notes: ${notes || ''}`
                : `[Home Garden Planner] Contact: ${name} (${cleanPhone}) | Email: ${email} | Notes: ${notes || ''}`
            },
            { name: 'area_of_interest', value: 'Home Hydroponic Garden Planner' }
          ],
          context: {
            pageUri: window.location.href,
            pageName: document.title || 'Home Hydroponic Garden Planner & Cost Estimator'
          }
        };

        // Fire HubSpot in background without blocking screen progression
        fetch(hsEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hsPayload)
        }).then(r => {
          console.log('✅ Lead synced to HubSpot CRM:', r.status);
        }).catch(err => {
          console.warn('HubSpot dispatch notice:', err);
        });

        // 3. Optional: Attempt background POST to server webhook if active (for Nodemailer emails)
        try {
          fetch('/api/garden-planner/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lead: {
                name,
                phone: cleanPhone,
                email,
                city,
                notes,
                consent,
                crops: state.crops,
                sunlightHours: state.sunlightHours,
                monkeyPresence: state.monkeyPresence
              },
              assessmentInput: {
                spaceType: state.spaceType,
                lengthFt: state.lengthFt,
                widthFt: state.widthFt,
                sunlightHours: state.sunlightHours,
                surfaceType: state.surfaceType,
                waterAccess: state.waterAccess,
                powerAccess: state.powerAccess,
                familySize: state.familySize,
                crops: state.crops,
                monkeyPresence: state.monkeyPresence,
                includeMonkeyEnclosure: state.includeMonkeyEnclosure,
                includeClimateControl: state.includeClimateControl
              }
            })
          }).catch(() => {
            // Harmless on static hosts like Hostinger / GitHub Pages
          });
        } catch(e) {}

        // 4. Render Step 5 with the completed assessment & WhatsApp URL
        state.lastCalculatedAssessment = assessment;
        const notifications = {
          hubspotSynced: true,
          whatsappUrl: `https://wa.me/919220902015?text=${encodeURIComponent(`Hi TarUsha, my name is ${name}. I just generated a garden estimate for my ${assessment.dimensions.areaSqFt} sq ft space (${formatINR(assessment.grandTotal)}). I would like to schedule a site inspection.`)}`
        };

        renderStep5Assessment(assessment, notifications);

        // Reset submit button state
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>✉️ Email My Estimate &amp; Reveal Breakdown &rarr;</span>';
        }

        // 5. Transition to Step 5 immediately
        goToStep(5);
      });
    }
  }

  // ==========================================
  // STEP 5: Final Estimate & Breakdown
  // ==========================================
  function renderStep5Assessment(asm, notifications) {
    // 1. Delivery Confirmation Message
    const confHeader = document.getElementById('gp-confirmed-header');
    const confSub = document.getElementById('gp-confirmed-sub');

    if (confHeader) confHeader.textContent = `Official Estimate Emailed to ${state.lead.email}!`;
    if (confSub) {
      confSub.innerHTML = `
        Hello <strong>${state.lead.name}</strong>, a formal PDF breakdown for your <strong>${asm.dimensions.areaSqFt} sq ft</strong> space has been emailed to <strong>${state.lead.email}</strong>. Review your interactive system specifications below:
      `;
    }

    // 2. Recommendation Hero
    const recBadgeEl = document.getElementById('gp-rec-badge');
    const recTitleEl = document.getElementById('gp-rec-title');
    const recReasonEl = document.getElementById('gp-rec-reason');

    if (recBadgeEl) recBadgeEl.textContent = `Recommended Growing System`;
    if (recTitleEl) recTitleEl.textContent = asm.recommendation.systemTitle;
    if (recReasonEl) recReasonEl.textContent = asm.recommendation.systemReason;

    // 3. Metrics Grid
    const metricBucketsEl = document.getElementById('gp-metric-buckets');
    const metricNftEl = document.getElementById('gp-metric-nft');
    const metricTankEl = document.getElementById('gp-metric-tank');
    const metricYieldEl = document.getElementById('gp-metric-yield');

    if (metricBucketsEl) {
      metricBucketsEl.innerHTML = asm.capacity.dutchBuckets > 0 
        ? `${asm.capacity.dutchBuckets} Buckets <div class="gp-metric-sub">${asm.capacity.dutchBucketLayout}</div>` 
        : `0 Buckets <div class="gp-metric-sub">Pure NFT configuration</div>`;
    }

    if (metricNftEl) {
      metricNftEl.innerHTML = asm.capacity.nftPlants > 0 
        ? `${asm.capacity.nftPlants} Plants <div class="gp-metric-sub">Food-grade UPVC NFT channels</div>` 
        : `0 Sites <div class="gp-metric-sub">Dutch bucket configuration</div>`;
    }

    if (metricTankEl) {
      metricTankEl.innerHTML = `${asm.capacity.reservoirSizeLiters} Liters <div class="gp-metric-sub">100L per 16 buckets standard</div>`;
    }

    if (metricYieldEl) {
      metricYieldEl.innerHTML = `~${asm.capacity.totalMonthlyHarvestKg} kg / mo <div class="gp-metric-sub">Fresh chemical-free yield</div>`;
    }

    // 4. Feasibility Alerts
    const alertsContainer = document.getElementById('gp-alerts-container');
    if (alertsContainer) {
      alertsContainer.innerHTML = '';
      if (asm.feasibilityAlerts && asm.feasibilityAlerts.length > 0) {
        asm.feasibilityAlerts.forEach(alertItem => {
          const alertDiv = document.createElement('div');
          const isMonkey = alertItem.type === 'monkey_alert';
          alertDiv.className = `gp-alert ${isMonkey ? 'gp-alert-monkey' : 'gp-alert-warning'}`;
          alertDiv.innerHTML = `
            <div style="font-size: 20px;">${isMonkey ? '🐒' : '⚠️'}</div>
            <div>
              <span class="gp-alert-title">${alertItem.title}</span>
              ${alertItem.message}
            </div>
          `;
          alertsContainer.appendChild(alertDiv);
        });
      }
    }

    // 5. BOM Table
    const bomBody = document.getElementById('gp-bom-tbody');
    if (bomBody) {
      bomBody.innerHTML = asm.billOfMaterials.map(item => `
        <tr>
          <td>
            <div class="gp-bom-item-title">${item.item}</div>
            <div class="gp-bom-item-desc">${item.description}</div>
          </td>
          <td style="text-align: center; font-weight: 600;">${item.quantity} ${item.unit}</td>
          <td style="text-align: right; font-weight: 700; color: var(--gp-primary);">${formatINR(item.total)}</td>
        </tr>
      `).join('');
    }

    // 6. Optional Upgrades
    const upgradesContainer = document.getElementById('gp-upgrades-list');
    if (upgradesContainer) {
      upgradesContainer.innerHTML = asm.optionalUpgrades.map(upg => `
        <label class="gp-upgrade-row ${upg.selected ? 'active' : ''}">
          <input type="checkbox" class="gp-upgrade-checkbox" data-id="${upg.id}" ${upg.selected ? 'checked' : ''} style="margin-top: 3px; accent-color: var(--gp-primary);">
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 14px; color: var(--gp-primary);">
              ${upg.name} ${upg.recommended ? '<span style="background: #ff7b54; color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">Recommended</span>' : ''}
            </div>
            <div style="font-size: 12px; color: var(--gp-text-muted); margin-top: 2px;">${upg.description}</div>
          </div>
          <div style="font-weight: 700; color: var(--gp-primary); font-size: 14px; white-space: nowrap;">
            +${formatINR(upg.cost)}
          </div>
        </label>
      `).join('');

      // Bind upgrade checkboxes to re-render calculations live
      upgradesContainer.querySelectorAll('.gp-upgrade-checkbox').forEach(cb => {
        cb.addEventListener('change', async (e) => {
          const upgId = e.target.dataset.id;
          if (upgId === 'monkey_protection') {
            state.includeMonkeyEnclosure = e.target.checked;
          } else if (upgId === 'climate_controlled_polyhouse') {
            state.includeClimateControl = e.target.checked;
          }
          await recalculateAndRefreshStep5();
        });
      });
    }

    // 7. Summary Card
    updateSummaryCard(asm);

    // 8. WhatsApp Button
    const waBtn = document.getElementById('gp-final-wa-btn');
    if (waBtn) {
      const waUrl = notifications && notifications.whatsappUrl
        ? notifications.whatsappUrl
        : `https://wa.me/919220902015?text=${encodeURIComponent(`Hi TarUsha, my name is ${state.lead.name}. I received my home garden estimate for ${asm.dimensions.areaSqFt} sq ft (${formatINR(asm.grandTotal)}). I would like to schedule a site inspection.`)}`;
      waBtn.href = waUrl;
    }
  }

  function updateSummaryCard(asm) {
    const baseSubtotalEl = document.getElementById('gp-summary-base');
    const upgradesCostRow = document.getElementById('gp-summary-upgrades-row');
    const upgradesCostEl = document.getElementById('gp-summary-upgrades');
    const gstEl = document.getElementById('gp-summary-gst');
    const totalEl = document.getElementById('gp-summary-total');
    const rangeEl = document.getElementById('gp-summary-range');

    if (baseSubtotalEl) baseSubtotalEl.textContent = formatINR(asm.baseSubtotal);

    if (upgradesCostRow && upgradesCostEl) {
      if (asm.upgradesSelectedCost > 0) {
        upgradesCostRow.style.display = 'flex';
        upgradesCostEl.textContent = `+${formatINR(asm.upgradesSelectedCost)}`;
      } else {
        upgradesCostRow.style.display = 'none';
      }
    }

    if (gstEl) gstEl.textContent = formatINR(asm.gstAmount);
    if (totalEl) totalEl.textContent = formatINR(asm.grandTotal);
    if (rangeEl) rangeEl.textContent = `Indicative Range (±5%): ${formatINR(asm.estimatedRange.min)} – ${formatINR(asm.estimatedRange.max)}`;
  }

  function recalculateAndRefreshStep5() {
    try {
      let assessment = null;
      if (window.TarUshaPlanner && typeof window.TarUshaPlanner.calculateGardenAssessment === 'function') {
        assessment = window.TarUshaPlanner.calculateGardenAssessment({
          spaceType: state.spaceType,
          lengthFt: state.lengthFt,
          widthFt: state.widthFt,
          sunlightHours: state.sunlightHours,
          surfaceType: state.surfaceType,
          waterAccess: state.waterAccess,
          powerAccess: state.powerAccess,
          familySize: state.familySize,
          crops: state.crops,
          monkeyPresence: state.monkeyPresence,
          includeMonkeyEnclosure: state.includeMonkeyEnclosure,
          includeClimateControl: state.includeClimateControl
        });
      }

      if (assessment) {
        state.lastCalculatedAssessment = assessment;
        updateSummaryCard(assessment);

        // Update BOM Table rows
        const bomBody = document.getElementById('gp-bom-tbody');
        if (bomBody) {
          bomBody.innerHTML = assessment.billOfMaterials.map(item => `
            <tr>
              <td>
                <div class="gp-bom-item-title">${item.item}</div>
                <div class="gp-bom-item-desc">${item.description}</div>
              </td>
              <td style="text-align: center; font-weight: 600;">${item.quantity} ${item.unit}</td>
              <td style="text-align: right; font-weight: 700; color: var(--gp-primary);">${formatINR(item.total)}</td>
            </tr>
          `).join('');
        }

        // Update WhatsApp link with newly updated grand total
        const waBtn = document.getElementById('gp-final-wa-btn');
        if (waBtn) {
          waBtn.href = `https://wa.me/919220902015?text=${encodeURIComponent(`Hi TarUsha, my name is ${state.lead.name || 'Valued Customer'}. I received my updated home garden estimate for ${assessment.dimensions.areaSqFt} sq ft (${formatINR(assessment.grandTotal)}). I would like to schedule a site inspection.`)}`;
        }
      }
    } catch (err) {
      console.warn('Local recalculate notice:', err);
    }
  }

  function bindStep5Events() {
    // Step 5 events are handled dynamically in renderStep5Assessment
  }

  // ==========================================
  // STEPPER TRANSITIONS
  // ==========================================
  function goToStep(targetStep) {
    if (targetStep < 1 || targetStep > state.totalSteps) return;

    document.querySelectorAll('.gp-step-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    const targetPane = document.getElementById(`gp-step-${targetStep}`);
    if (targetPane) targetPane.classList.add('active');

    for (let i = 1; i <= state.totalSteps; i++) {
      const item = document.getElementById(`gp-step-indicator-${i}`);
      if (!item) continue;
      item.classList.remove('active', 'completed');
      if (i < targetStep) {
        item.classList.add('completed');
      } else if (i === targetStep) {
        item.classList.add('active');
      }
    }

    state.currentStep = targetStep;

    const wrapper = document.getElementById('garden-planner');
    if (wrapper) {
      wrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

})();
