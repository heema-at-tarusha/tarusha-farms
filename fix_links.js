const fs = require('fs');
const path = require('path');

const files = ['index.html', 'solutions.html', 'catalog.html', 'workshops.html', 'about.html', 'blog.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        content = content.replace(/href="#consultation"/g, 'href="about.html#consultation"');
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});

console.log("Done updating consultation links.");
