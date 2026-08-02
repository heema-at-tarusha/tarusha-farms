const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');

const calculatorStyles = `
/* Subsidy Calculator Specific Styles */
.subsidy-panel {
    background: var(--white);
    border: 1px solid rgba(30, 63, 32, 0.1);
    border-radius: var(--radius-lg);
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: var(--shadow-sm);
}
.subsidy-panel h2 {
    font-size: 1.2rem;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 12px;
}
.subsidy-panel h2 .num {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--text-muted);
    background: var(--accent-glow);
    padding: 2px 8px;
    border-radius: 4px;
}
.subsidy-panel .sub {
    font-size: 0.95rem;
    color: var(--text-muted);
    margin-bottom: 20px;
}

.subsidy-field label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-dark);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.subsidy-field input, .subsidy-field select {
    width: 100%;
    background: var(--bg-light);
    border: 1px solid rgba(30, 63, 32, 0.15);
    color: var(--text-dark);
    padding: 12px 16px;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-family: var(--font-body);
    transition: border-color 0.2s;
}
.subsidy-field input:focus, .subsidy-field select:focus {
    outline: none;
    border-color: var(--brand-blue);
}
.subsidy-field .hint {
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-top: 6px;
}

.subsidy-toggle-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    background: var(--bg-light);
    border: 1px solid rgba(30, 63, 32, 0.1);
    border-radius: var(--radius-md);
    cursor: pointer;
}
.subsidy-toggle-row input[type=checkbox] {
    width: 20px;
    height: 20px;
    accent-color: var(--brand-blue);
    margin-top: 2px;
}
.subsidy-toggle-row .tlabel {
    font-size: 1rem;
    font-weight: 500;
}
.subsidy-toggle-row .tlabel small {
    display: block;
    color: var(--text-muted);
    font-size: 0.85rem;
    margin-top: 4px;
    font-weight: 400;
}

.subsidy-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

.subsidy-addon-list { display: flex; flex-direction: column; gap: 12px; }
.subsidy-addon {
    background: var(--white);
    border: 1px solid rgba(30, 63, 32, 0.1);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: all 0.2s;
}
.subsidy-addon:hover {
    border-color: var(--brand-blue);
}
.subsidy-addon-head {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    cursor: pointer;
}
.subsidy-addon-head input[type=checkbox] {
    width: 18px;
    height: 18px;
    accent-color: var(--brand-blue);
}
.subsidy-addon-head .name {
    font-size: 0.95rem;
    font-weight: 500;
    flex: 1;
}
.subsidy-addon-head .rate {
    font-size: 0.8rem;
    color: var(--text-muted);
    background: var(--bg-light);
    padding: 4px 8px;
    border-radius: 4px;
}
.subsidy-addon-body {
    display: none;
    padding: 0 16px 16px 46px;
    gap: 16px;
}
.subsidy-addon.open .subsidy-addon-body {
    display: grid;
    grid-template-columns: 1fr;
}
.subsidy-addon-body .subsidy-field input { padding: 10px 14px; font-size: 0.95rem; }
.subsidy-addon-note { font-size: 0.8rem; color: var(--terracotta); margin-top: 4px; line-height: 1.4; }

.subsidy-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; margin-top: 12px; }
.subsidy-table thead th {
    text-align: left;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    padding: 12px 12px;
    font-weight: 600;
    border-bottom: 2px solid rgba(30, 63, 32, 0.1);
}
.subsidy-table tbody td { padding: 14px 12px; border-bottom: 1px solid rgba(30, 63, 32, 0.05); }
.subsidy-table td.num, .subsidy-table th.num { text-align: right; }
.subsidy-cap-note { font-size: 0.75rem; color: #D3714C; display: block; margin-top: 4px; font-weight: 500; }

.subsidy-certificate {
    margin-top: 32px;
    border: 2px dashed var(--accent);
    border-radius: var(--radius-lg);
    padding: 32px;
    text-align: center;
    background: linear-gradient(180deg, var(--accent-glow) 0%, transparent 100%);
}
.subsidy-certificate .stamp {
    width: 64px; height: 64px;
    border-radius: 50%;
    border: 2px solid var(--primary);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--primary);
    background: var(--white);
}
.subsidy-certificate .amount {
    font-family: var(--font-headings);
    font-size: clamp(36px, 5vw, 54px);
    font-weight: 800;
    color: var(--primary);
    line-height: 1;
}
.subsidy-certificate .amount-label {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}
.subsidy-certificate .breakdown {
    display: flex; justify-content: center; gap: 40px; margin-top: 32px;
    flex-wrap: wrap;
    border-top: 1px solid rgba(30, 63, 32, 0.1);
    padding-top: 24px;
}
.subsidy-certificate .breakdown div { font-size: 0.9rem; color: var(--text-muted); }
.subsidy-certificate .breakdown div b { display: block; color: var(--text-dark); font-size: 1.2rem; margin-top: 6px; font-weight: 700; }

.subsidy-disclaimer {
    margin-top: 24px;
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.6;
    border-left: 3px solid var(--accent);
    padding-left: 16px;
    background: var(--bg-light);
    padding: 16px;
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

@media (max-width: 768px) {
    .subsidy-grid2 { grid-template-columns: 1fr; }
    .subsidy-certificate .breakdown { gap: 24px; flex-direction: column; }
    .subsidy-table-wrapper { overflow-x: auto; }
}
`;

if (!styles.includes('Subsidy Calculator Specific Styles')) {
    styles += '\n' + calculatorStyles;
    fs.writeFileSync(stylesPath, styles);
    console.log("Added calculator styles to styles.css");
} else {
    console.log("Styles already exist.");
}
