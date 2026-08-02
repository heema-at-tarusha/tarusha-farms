const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Subsidy.html');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the syntax error in JavaScript caused by the hyphenated variable name
content = content.replace(/subsidy-addons/g, 'addons');

fs.writeFileSync(filePath, content);
console.log("Fixed JS syntax error in Subsidy.html");
