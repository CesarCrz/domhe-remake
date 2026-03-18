import re

with open('/Users/macuniterra/Desktop/domhe-renewal/domhe-renewal-v2/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Split sections by their opening tags
markers = [
    '<section id="inicio"',
    '<section id="nosotros"',
    '<section id="servicios"',
    '<section id="galeria"',
    '<section id="reclutamiento"',
    '<section id="testimonios"',
    '<section id="equipo"',
    '<section id="contacto"',
    '<footer class="footer">'
]

parts = {}
current_pos = 0

for i in range(len(markers)):
    marker = markers[i]
    start = html.find(marker, current_pos)
    
    if i < len(markers) - 1:
        next_marker = markers[i+1]
        end = html.find(next_marker, start)
    else:
        end = len(html) # last one goes to EOF
        
    parts[marker] = html[start:end]
    current_pos = end

header = html[:html.find(markers[0])]

new_html = (
    header +
    parts['<section id="inicio"'] +
    parts['<section id="contacto"'] +
    parts['<section id="equipo"'] +
    parts['<section id="nosotros"'] +
    parts['<section id="servicios"'] +
    parts['<section id="galeria"'] +
    parts['<section id="reclutamiento"'] +
    parts['<section id="testimonios"'] +
    parts['<footer class="footer">']
)

with open('/Users/macuniterra/Desktop/domhe-renewal/domhe-renewal-v2/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Reordered successfully!")
