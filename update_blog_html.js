const fs = require('fs');
const path = require('path');

const blogPath = path.join(__dirname, 'blog.html');
let content = fs.readFileSync(blogPath, 'utf8');

const placeholderRegex = /<div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba\(0,0,0,0\.05\); max-width: 600px; margin: 0 auto;">[\s\S]*?<\/div>/;

const replacement = `
                    <div class="blog-grid" id="blog-grid">
                        <div class="blog-status-msg">Loading articles...</div>
                    </div>
`;

if (placeholderRegex.test(content)) {
    content = content.replace(placeholderRegex, replacement);
    
    // Add JS to the bottom before </body>
    const jsSnippet = `
    <!-- Blog Rendering Script -->
    <script>
    document.addEventListener('DOMContentLoaded', () => {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid) return;
        
        fetch('blog.json')
            .then(response => {
                if (!response.ok) throw new Error('Could not load blog data');
                return response.json();
            })
            .then(articles => {
                blogGrid.innerHTML = ''; // clear loading message
                
                if (!articles || articles.length === 0) {
                    blogGrid.innerHTML = '<div class="blog-status-msg">No articles published yet. Check back soon!</div>';
                    return;
                }
                
                articles.forEach(article => {
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
            })
            .catch(error => {
                console.error('Error loading blog:', error);
                blogGrid.innerHTML = '<div class="blog-status-msg">Oops! We had trouble loading the articles. Please try again later.</div>';
            });
    });
    </script>
`;
    content = content.replace('</body>', jsSnippet + '\n</body>');
    
    fs.writeFileSync(blogPath, content);
    console.log("Updated blog.html");
} else {
    console.log("Could not find placeholder to replace");
}
