const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Subsidy.html');
let content = fs.readFileSync(filePath, 'utf8');

// The JS is trying to get element 'subsidy-addonList', but the HTML ID is 'addonList'.
// This is because my earlier regex replaced 'addonList' with 'subsidy-addonList'.
content = content.replace(/'subsidy-addonList'/g, "'addonList'");

fs.writeFileSync(filePath, content);
console.log("Fixed addonList ID in JS");
