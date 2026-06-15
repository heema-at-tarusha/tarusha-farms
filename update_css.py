import re

# Update styles.css
with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Increase padding for more white space
css = re.sub(r'padding:\s*100px\s+0;', 'padding: 140px 0;', css)

# Clean up hero background
css = css.replace('background: linear-gradient(135deg, #eaf2eb 0%, #f6f8f6 100%);', 'background: var(--bg-light);')

# Clean up hero glow
css = css.replace('background: radial-gradient(circle, var(--accent) 0%, rgba(255,255,255,0) 65%);', 'background: radial-gradient(circle, var(--accent-glow) 0%, rgba(255,255,255,0) 70%);')

# Clean up typography
css = css.replace('letter-spacing: -1px;', 'letter-spacing: -2px;')
css = css.replace('font-weight: 800;', 'font-weight: 700;')

with open('styles.css', 'w', encoding='utf-8') as f:
    f.write(css)

# Update index.html logo fallback SVG colors
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = html.replace('<stop offset="0%" stop-color="#8cc342" />', '<stop offset="0%" stop-color="#a8c6a1" />')
html = html.replace('<stop offset="100%" stop-color="#55833d" />', '<stop offset="100%" stop-color="#2a4d30" />')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Visual refresh applied.')
