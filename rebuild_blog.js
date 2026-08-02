const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
const blogHtmlPath = path.join(__dirname, 'blog.html');

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract header and footer from index.html
const headerEndIndex = indexContent.indexOf('</header>') + '</header>'.length;
let headerContent = indexContent.substring(0, headerEndIndex);

// Change title in header
headerContent = headerContent.replace(
    '<title>TarUsha | Hydroponics Gurgaon & Vertical Gardens</title>',
    '<title>TarUsha | Blog & Updates</title>'
);

const footerStartIndex = indexContent.indexOf('<!-- Contact & Footer Section -->');
const footerContent = indexContent.substring(footerStartIndex);

// The blog body structure
const blogBody = `
    <!-- Main Dynamic Container -->
    <div id="landing-page-view">
        <main>
            <section class="blog-section" id="blog" style="padding: 120px 0 80px; text-align: center; min-height: 60vh;">
                <div class="container">
                    <span class="badge">Insights & Updates</span>
                    <h2>TarUsha Blog</h2>
                    <p class="section-subtitle" style="max-width: 600px; margin: 0 auto 40px;">Read our latest articles on hydroponics, sustainability, and urban farming.</p>
                    
                    <div class="blog-grid" id="blog-grid">
                        <div class="blog-status-msg">Loading articles...</div>
                    </div>
                </div>
            </section>
        </main>
    </div>
`;

// Add JS
const finalJS = `
    <!-- Blog Rendering Script -->
    <script src="app.js"></script>
    <script src="blog_data.js"></script>
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
    </script>
`;

const finalHtml = headerContent + '\n' + blogBody + '\n' + finalJS + '\n' + footerContent;

fs.writeFileSync(blogHtmlPath, finalHtml);
console.log("Rebuilt blog.html successfully!");
