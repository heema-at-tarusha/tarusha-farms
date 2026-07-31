const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const content = fs.readFileSync(indexHtmlPath, 'utf8');

// The layout is roughly:
// 1. <!DOCTYPE html> ... <header> ... <main>
// 2. The sections
// 3. </main> ... <footer> ... </body></html>

const mainStartStr = '<main>';
const mainEndStr = '</main>';

const mainStartIdx = content.indexOf(mainStartStr) + mainStartStr.length;
const mainEndIdx = content.lastIndexOf(mainEndStr);

let headerContent = content.substring(0, mainStartIdx);
let footerContent = content.substring(mainEndIdx);
let bodyContent = content.substring(mainStartIdx, mainEndIdx);

// Update navigation in header
headerContent = headerContent.replace(/href="#why-hydroponics"/g, 'href="index.html#why-hydroponics"');
headerContent = headerContent.replace(/href="#solutions"/g, 'href="solutions.html"');
headerContent = headerContent.replace(/href="#catalog"/g, 'href="catalog.html"');
headerContent = headerContent.replace(/href="#resources"/g, 'href="catalog.html#resources"');
headerContent = headerContent.replace(/href="#workshops"/g, 'href="workshops.html"');
headerContent = headerContent.replace(/href="#testimonials"/g, 'href="workshops.html#testimonials"');
headerContent = headerContent.replace(/href="#about"/g, 'href="about.html"');
headerContent = headerContent.replace(/href="#contact"/g, 'href="about.html#contact"');

// Add blog link right before contact
headerContent = headerContent.replace(/<a href="about.html#contact" class="nav-link-item">Contact<\/a>/g, '<a href="blog.html" class="nav-link-item">Blog</a>\n                <a href="about.html#contact" class="nav-link-item">Contact</a>');

// Now, split bodyContent into sections.
// We can find sections by looking for `<section `
const sectionRegex = /(?:<!--[\s\S]*?-->\s*)?<section[\s\S]*?<\/section>/g;
const sections = [];
let match;
while ((match = sectionRegex.exec(bodyContent)) !== null) {
    sections.push(match[0]);
}

// Function to find a section by a substring
function getSection(keyword) {
    return sections.find(s => s.includes(keyword)) || '';
}

// Define the pages
const pages = {
    'index.html': [
        getSection('id="hero"'),
        getSection('id="school-visits"'),
        getSection('id="gallery"'),
        getSection('id="why-hydroponics"'),
        getSection('id="impact"')
    ],
    'solutions.html': [
        getSection('id="solutions"'),
        getSection('id="industries"')
    ],
    'catalog.html': [
        getSection('id="catalog"'),
        getSection('id="resources"')
    ],
    'workshops.html': [
        getSection('id="workshops"'),
        getSection('id="community"'),
        getSection('id="testimonials"'),
        getSection('id="survey"')
    ],
    'about.html': [
        getSection('id="about"'),
        getSection('id="consultation"')
    ],
    'blog.html': [
        `
            <section class="blog-section" id="blog" style="padding: 120px 0 80px; text-align: center; min-height: 60vh;">
                <div class="container">
                    <span class="badge">Insights & Updates</span>
                    <h2>TarUsha Blog</h2>
                    <p class="section-subtitle" style="max-width: 600px; margin: 0 auto 40px;">Read our latest articles on hydroponics, sustainability, and urban farming. (LinkedIn integration coming soon)</p>
                    <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto;">
                        <svg viewBox="0 0 24 24" width="48" height="48" fill="var(--primary)" style="margin-bottom: 20px;"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                        <h3 style="margin-bottom: 15px;">Coming Soon!</h3>
                        <p style="color: var(--text-muted);">We are currently syncing our latest insights from LinkedIn. Check back shortly for our newest articles.</p>
                    </div>
                </div>
            </section>
        `
    ]
};

for (const [filename, pageSections] of Object.entries(pages)) {
    const pageHTML = headerContent + '\n' + pageSections.join('\n\n') + '\n' + footerContent;
    fs.writeFileSync(path.join(__dirname, filename), pageHTML);
    console.log(`Created ${filename}`);
}

console.log("Done splitting HTML files.");
