const fs = require('fs');
const path = require('path');

const files = ['index.html', 'solutions.html', 'catalog.html', 'workshops.html', 'about.html', 'blog.html'];

const gtmHeadSnippet = `
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-K6JV297H');</script>
    <!-- End Google Tag Manager -->`;

const gtmBodySnippet = `
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K6JV297H"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->`;

const gaRegex = /\s*<!-- Google tag \(gtag\.js\) -->[\s\S]*?gtag\('config', 'G-EESNQM5EVK'\);\s*<\/script>/;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove old GA4 tag
        content = content.replace(gaRegex, '');
        
        // Ensure we don't inject GTM twice
        if (!content.includes('GTM-K6JV297H')) {
            // Inject GTM head right after <head>
            content = content.replace(/<head>/i, '<head>\n' + gtmHeadSnippet);
            
            // Inject GTM body right after <body>
            content = content.replace(/<body>/i, '<body>\n' + gtmBodySnippet);
            
            fs.writeFileSync(filePath, content);
            console.log(`Injected GTM into ${file}`);
        } else {
            console.log(`GTM already present in ${file}`);
        }
    }
});

console.log("Done updating GTM.");
