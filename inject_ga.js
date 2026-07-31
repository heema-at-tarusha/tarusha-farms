const fs = require('fs');
const path = require('path');

const files = ['index.html', 'solutions.html', 'catalog.html', 'workshops.html', 'about.html', 'blog.html'];

const gaSnippet = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-YOUR_MEASUREMENT_ID');
    </script>
</head>`;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        if (!content.includes('gtag.js')) {
            content = content.replace('</head>', gaSnippet);
            fs.writeFileSync(filePath, content);
            console.log(`Injected GA into ${file}`);
        } else {
            console.log(`GA already present in ${file}`);
        }
    }
});

console.log("Done injecting Google Analytics.");
