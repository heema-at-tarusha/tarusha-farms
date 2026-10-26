const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(file => file.endsWith('.html') && file !== 'admin.html' && file !== 'corporate-portal.html');

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add to Navigation
    const targetNav = `<div class="dropdown">
                    <button class="nav-link-item dropdown-btn">Company ▾</button>`;
                    
    const newNav = `<div class="dropdown">
                    <button class="nav-link-item dropdown-btn">Portals ▾</button>
                    <div class="dropdown-content">
                        <a href="corporate-portal.html">Corporate Login</a>
                        <a href="admin.html">Admin Login</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="nav-link-item dropdown-btn">Company ▾</button>`;
                    
    if (content.includes(targetNav) && !content.includes('Portals ▾')) {
        content = content.replace(targetNav, newNav);
    }
    
    // Add to Footer
    const footerTarget = `<li><a href="workshops.html#testimonials">Testimonials</a></li>`;
    const newFooter = `<li><a href="workshops.html#testimonials">Testimonials</a></li>
                    <li><a href="corporate-portal.html">Corporate Login</a></li>`;
                    
    if (content.includes(footerTarget) && !content.includes('Corporate Login</a></li>')) {
        content = content.replace(footerTarget, newFooter);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated navigation in ${file}`);
});
