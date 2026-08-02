const fs = require('fs');
const path = require('path');

const files = ['index.html', 'solutions.html', 'catalog.html', 'workshops.html', 'about.html', 'blog.html'];

const newNav = `            <nav class="nav-menu" id="nav-links">
                <div class="dropdown">
                    <button class="nav-link-item dropdown-btn">Offerings ▾</button>
                    <div class="dropdown-content">
                        <a href="solutions.html">Solutions</a>
                        <a href="catalog.html">Store Catalog</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="nav-link-item dropdown-btn">Learn ▾</button>
                    <div class="dropdown-content">
                        <a href="workshops.html">Workshops & Training</a>
                        <a href="blog.html">Blog</a>
                        <a href="index.html#why-hydroponics">Why Hydroponics</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="nav-link-item dropdown-btn">Resources ▾</button>
                    <div class="dropdown-content">
                        <a href="Subsidy.html">Subsidy Calculator</a>
                        <a href="catalog.html#resources">Flyers & Downloads</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="nav-link-item dropdown-btn">Company ▾</button>
                    <div class="dropdown-content">
                        <a href="about.html">About Us</a>
                        <a href="workshops.html#testimonials">Testimonials</a>
                        <a href="about.html#contact">Contact Us</a>
                    </div>
                </div>
            </nav>`;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to match the entire old nav block
        const oldNavRegex = /<nav class="nav-menu" id="nav-links">[\s\S]*?<\/nav>/;
        
        if (oldNavRegex.test(content)) {
            content = content.replace(oldNavRegex, newNav);
            fs.writeFileSync(filePath, content);
            console.log(`Updated nav in ${file}`);
        }
    }
});

console.log("Done updating navigation.");
