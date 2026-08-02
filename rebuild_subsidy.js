const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const subsidyHtmlPath = path.join(__dirname, 'Subsidy.html');

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract header and footer from index.html
const headerEndIndex = indexContent.indexOf('</header>') + '</header>'.length;
let headerContent = indexContent.substring(0, headerEndIndex);

// Change title in header
headerContent = headerContent.replace(
    '<title>TarUsha | Hydroponics Gurgaon & Vertical Gardens</title>',
    '<title>TarUsha | MIDH Protected Cultivation Subsidy Calculator</title>'
);

const footerStartIndex = indexContent.indexOf('<!-- Contact & Footer Section -->');
const footerContent = indexContent.substring(footerStartIndex);

// Read old subsidy
const oldSubsidyContent = fs.readFileSync(subsidyHtmlPath, 'utf8');

// Extract script
const scriptRegex = /<script>([\s\S]*?)<\/script>/;
const match = oldSubsidyContent.match(scriptRegex);
const scriptContent = match ? match[1] : '';

// The new body structure
const calculatorBody = `
    <!-- Main Dynamic Container -->
    <div id="landing-page-view">
        <main>
            <section class="section" id="subsidy-calc" style="padding-top: 60px;">
                <div class="container" style="max-width: 900px;">
                    
                    <div style="text-align: center; margin-bottom: 40px;">
                        <span class="badge">MIDH · Annexure V · Protected Cultivation</span>
                        <h2>What subsidy can your client actually avail?</h2>
                        <p class="text-muted" style="max-width: 700px; margin: 0 auto;">Covers poly house / shade net / net house structures and their common add-ons under MIDH Operational Guidelines 2025. Enter the structure and area, tick any add-ons that apply, and the eligible cost, area caps, and subsidy amount are calculated per the exact cost norms in the guideline.</p>
                        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 16px;">Source: MIDH Operational Guidelines 2025, Annexure V (B.5 Protected Cultivation), dated 31.12.2024</p>
                    </div>

                    <div class="subsidy-panel">
                        <h2><span class="num">01</span> Beneficiary category</h2>
                        <p class="sub">This affects the cost norm rate applied across every component below.</p>
                        <label class="subsidy-toggle-row">
                        <input type="checkbox" id="specialArea">
                        <span class="tlabel">Special area beneficiary
                            <small>NE & Himalayan States, Scheduled Areas, vibrant villages, Andaman & Nicobar, or Lakshadweep — cost norms are 15% higher</small>
                        </span>
                        </label>
                    </div>

                    <div class="subsidy-panel">
                        <h2><span class="num">02</span> Structure</h2>
                        <p class="sub">The core poly house / net house structure. Rates are tiered by area for some types.</p>
                        <div class="subsidy-grid2">
                        <div class="subsidy-field">
                            <label for="structureType">Structure type</label>
                            <select id="structureType"></select>
                        </div>
                        <div class="subsidy-field">
                            <label for="structureArea">Area (sq. m)</label>
                            <input type="number" id="structureArea" value="1000" min="0">
                            <div class="hint" id="structureHint"></div>
                        </div>
                        </div>
                    </div>

                    <div class="subsidy-panel">
                        <h2><span class="num">03</span> Add-on components <span style="color:var(--text-muted);font-weight:400;">(optional)</span></h2>
                        <p class="sub">Tick anything your client is also including in the project.</p>
                        <div class="subsidy-addon-list" id="addonList"></div>
                    </div>

                    <div class="subsidy-panel">
                        <h2><span class="num">04</span> Itemised eligible cost & subsidy</h2>
                        <button class="btn btn-outline btn-sm" id="resetBtn" style="float: right; margin-top: -40px;">RESET</button>
                        
                        <div class="subsidy-table-wrapper">
                            <table class="subsidy-table">
                            <thead>
                                <tr>
                                <th>Component</th>
                                <th class="num">Input</th>
                                <th class="num">Eligible area/qty</th>
                                <th class="num">Eligible cost</th>
                                <th class="num">Assistance</th>
                                <th class="num">Subsidy</th>
                                </tr>
                            </thead>
                            <tbody id="resultsBody"></tbody>
                            </table>
                        </div>

                        <div class="subsidy-certificate">
                        <div class="stamp">MIDH<br>EST.</div>
                        <div class="amount" id="totalSubsidy">₹0</div>
                        <div class="amount-label">TOTAL SUBSIDY YOUR CLIENT CAN AVAIL</div>
                        <div class="breakdown">
                            <div>Total eligible cost<b id="totalCost">₹0</b></div>
                            <div>Overall assistance rate<b id="overallPct">0%</b></div>
                            <div>Client's own contribution<b id="clientShare">₹0</b></div>
                        </div>
                        </div>

                        <div class="subsidy-disclaimer" id="disclaimerNotes"></div>
                    </div>

                </div>
            </section>
        </main>
    </div>
`;

// Add JS
const finalJS = `
<script src="app.js"></script>
<script>
${scriptContent.replace(/addon/g, 'subsidy-addon').replace(/field/g, 'subsidy-field')}
</script>
`;

const finalHtml = headerContent + '\n' + calculatorBody + '\n' + finalJS + '\n' + footerContent;

fs.writeFileSync(subsidyHtmlPath, finalHtml);
console.log("Rebuilt Subsidy.html successfully!");
