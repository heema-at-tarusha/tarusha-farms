const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');

const blogStyles = `
/* LinkedIn Blog Integration Styles */
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.blog-card {
    background-color: var(--white);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    border: 1px solid rgba(30, 63, 32, 0.05);
    display: flex;
    flex-direction: column;
    text-align: left;
}

.blog-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent);
}

.blog-img-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
    background-color: var(--bg-light);
}

.blog-img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.blog-card:hover .blog-img-container img {
    transform: scale(1.05);
}

.blog-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.blog-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-muted);
    margin-bottom: 12px;
    font-weight: 500;
}

.blog-title {
    font-size: 1.25rem;
    font-family: var(--font-headings);
    color: var(--primary);
    margin-bottom: 12px;
    line-height: 1.3;
}

.blog-snippet {
    font-size: 0.95rem;
    color: var(--text-dark);
    margin-bottom: 20px;
    flex-grow: 1;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.blog-read-more {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--brand-blue);
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: auto;
}

.blog-read-more svg {
    transition: transform 0.2s;
}

.blog-card:hover .blog-read-more svg {
    transform: translateX(4px);
}

/* Error/Loading State */
.blog-status-msg {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px 20px;
    background: var(--white);
    border-radius: var(--radius-lg);
    border: 1px dashed var(--accent);
    color: var(--text-muted);
}
`;

if (!styles.includes('LinkedIn Blog Integration Styles')) {
    styles += '\n' + blogStyles;
    fs.writeFileSync(stylesPath, styles);
    console.log('Added blog styles to styles.css');
}
