const fs = require('fs');
const path = require('path');

const files = ['index.html', 'solutions.html', 'catalog.html', 'workshops.html', 'about.html', 'blog.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        content = content.replace(/G-YOUR_MEASUREMENT_ID/g, 'G-EESNQM5EVK');
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated GA ID in ${file}`);
    }
});

console.log("Done updating GA ID.");
