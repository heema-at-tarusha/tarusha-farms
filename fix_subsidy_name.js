const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(file => file.endsWith('.html'));

// Rename Subsidy.html to subsidy.html if it exists
const oldFilePath = path.join(dir, 'Subsidy.html');
const newFilePath = path.join(dir, 'subsidy.html');

if (fs.existsSync(oldFilePath)) {
    fs.renameSync(oldFilePath, newFilePath);
    console.log('Renamed Subsidy.html to subsidy.html');
}

// Replace links in all HTML files
htmlFiles.forEach(file => {
    // If we just renamed it, the file name in our list is still 'Subsidy.html', 
    // but we want to read the new file or the existing files.
    let targetFile = file === 'Subsidy.html' ? 'subsidy.html' : file;
    const filePath = path.join(dir, targetFile);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('Subsidy.html')) {
            content = content.replace(/Subsidy\.html/g, 'subsidy.html');
            fs.writeFileSync(filePath, content);
            console.log(`Replaced links in ${targetFile}`);
        }
    }
});

console.log('Done.');
