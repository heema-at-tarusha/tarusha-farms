const fs = require('fs');
const path = require('path');

const files = ['index.html', 'solutions.html', 'catalog.html', 'workshops.html', 'about.html', 'blog.html', 'Subsidy.html'];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Find the logo link in the header. It currently looks like: <a href="#" class="logo" id="site-logo">
        // Or in the footer: <a href="#" class="logo">
        
        // Replace in header
        content = content.replace(/<a href="#" class="logo" id="site-logo">/g, '<a href="index.html" class="logo" id="site-logo">');
        
        // Replace in footer
        content = content.replace(/<a href="#" class="logo">/g, '<a href="index.html" class="logo">');
        
        fs.writeFileSync(filePath, content);
        console.log(`Updated logo links in ${file}`);
    }
});

console.log("Done fixing logo links.");
