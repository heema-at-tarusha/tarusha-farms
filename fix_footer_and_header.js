const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix Footer Links
    content = content.replace(/<li><a href="#why-hydroponics">Why Hydroponics<\/a><\/li>/g, '<li><a href="index.html#why-hydroponics">Why Hydroponics</a></li>');
    content = content.replace(/<li><a href="#solutions">Solutions We Offer<\/a><\/li>/g, '<li><a href="solutions.html">Solutions We Offer</a></li>');
    content = content.replace(/<li><a href="#catalog">Catalog &amp; Pricing<\/a><\/li>/g, '<li><a href="catalog.html">Catalog &amp; Pricing</a></li>');
    content = content.replace(/<li><a href="#workshops">Workshops &amp; Training<\/a><\/li>/g, '<li><a href="workshops.html">Workshops &amp; Training</a></li>');
    content = content.replace(/<li><a href="#testimonials">Testimonials<\/a><\/li>/g, '<li><a href="workshops.html#testimonials">Testimonials</a></li>');
    
    content = content.replace(/<li><a href="#featured-product">Hydroponic Kits India<\/a><\/li>/g, '<li><a href="catalog.html">Hydroponic Kits India</a></li>');
    content = content.replace(/<li><a href="#solutions">Hydroponic Green Walls<\/a><\/li>/g, '<li><a href="solutions.html">Hydroponic Green Walls</a></li>');
    content = content.replace(/<li><a href="#solutions">School Hydroponics Program<\/a><\/li>/g, '<li><a href="solutions.html">School Hydroponics Program</a></li>');
    content = content.replace(/<li><a href="#workshops">Hydroponics Workshop<\/a><\/li>/g, '<li><a href="workshops.html">Hydroponics Workshop</a></li>');
    content = content.replace(/<li><a href="#why-hydroponics">Indoor Farming Gurgaon<\/a><\/li>/g, '<li><a href="index.html#why-hydroponics">Indoor Farming Gurgaon</a></li>');
    content = content.replace(/<li><a href="#why-hydroponics">Sustainable Farming Delhi NCR<\/a><\/li>/g, '<li><a href="index.html#why-hydroponics">Sustainable Farming Delhi NCR</a></li>');
    
    // Fix Header CTA
    const oldHeaderCTA = `<div class="header-cta">
                <a href="about.html#consultation" class="btn btn-sm btn-primary" id="btn-header-book">Free Consultation</a>
            </div>`;
    const newHeaderCTA = `<div class="header-cta" style="display: flex; gap: 10px;">
                <a href="subsidy.html" class="btn btn-sm btn-outline" id="btn-header-subsidy">Subsidy Calculator</a>
                <a href="about.html#consultation" class="btn btn-sm btn-primary" id="btn-header-book">Free Consultation</a>
            </div>`;
            
    content = content.replace(oldHeaderCTA, newHeaderCTA);
    
    // Fix mobile sticky CTA strip as well to include both if it's there
    const oldMobileCTA = `<div class="mobile-sticky-cta-strip">
        <a href="about.html#consultation" class="btn btn-primary btn-block">Book Free Consultation</a>
    </div>`;
    const newMobileCTA = `<div class="mobile-sticky-cta-strip" style="display: flex; gap: 10px; padding: 10px;">
        <a href="subsidy.html" class="btn btn-outline btn-block" style="flex: 1; text-align: center; justify-content: center; background: white;">Subsidy Calculator</a>
        <a href="about.html#consultation" class="btn btn-primary btn-block" style="flex: 1; text-align: center; justify-content: center;">Free Consultation</a>
    </div>`;
    
    content = content.replace(oldMobileCTA, newMobileCTA);
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated footer and header in ${file}`);
});
