const fs = require('fs');
const path = require('path');

const dir = __dirname;
const jsonPath = path.join(dir, 'blog.json');
const jsDataPath = path.join(dir, 'blog_data.js');
const blogHtmlPath = path.join(dir, 'blog.html');

// 1. Convert blog.json to blog_data.js
if (fs.existsSync(jsonPath)) {
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const jsData = `const blogArticles = ${jsonData};`;
    fs.writeFileSync(jsDataPath, jsData);
    console.log('Created blog_data.js');
    
    // Optional: remove blog.json to avoid confusion
    // fs.unlinkSync(jsonPath);
} else {
    console.log('blog.json not found!');
}

// 2. Update blog.html
if (fs.existsSync(blogHtmlPath)) {
    let htmlContent = fs.readFileSync(blogHtmlPath, 'utf8');
    
    // Replace the fetch logic with the local variable logic
    const oldScriptRegex = /<script>[\s\S]*?fetch\('blog\.json'\)[\s\S]*?<\/script>/;
    
    if (oldScriptRegex.test(htmlContent)) {
        const newScript = `<script src="blog_data.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid) return;
        
        try {
            blogGrid.innerHTML = ''; // clear loading message
            
            if (typeof blogArticles === 'undefined' || !blogArticles || blogArticles.length === 0) {
                blogGrid.innerHTML = '<div class="blog-status-msg">No articles published yet. Check back soon!</div>';
                return;
            }
            
            blogArticles.forEach(article => {
                const card = document.createElement('div');
                card.className = 'blog-card';
                card.innerHTML = \`
                    <div class="blog-img-container">
                        <img src="\${article.imageUrl}" alt="\${article.title}" onerror="this.src='assets/kit-family.jpg'">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span>\${article.date}</span>
                            <span>\${article.readTime}</span>
                        </div>
                        <h3 class="blog-title">\${article.title}</h3>
                        <p class="blog-snippet">\${article.snippet}</p>
                        <a href="\${article.url}" target="_blank" rel="noopener noreferrer" class="blog-read-more">
                            Read on LinkedIn
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                \`;
                blogGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Error loading blog:', error);
            blogGrid.innerHTML = '<div class="blog-status-msg">Oops! We had trouble loading the articles. Please try again later.</div>';
        }
    });
    </script>`;
        
        htmlContent = htmlContent.replace(oldScriptRegex, newScript);
        fs.writeFileSync(blogHtmlPath, htmlContent);
        console.log('Updated blog.html to use blog_data.js');
    } else {
        console.log('Could not find the fetch script block in blog.html');
    }
}
