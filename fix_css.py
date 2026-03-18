import re

css_path = '/Users/macuniterra/Desktop/domhe-renewal/domhe-renewal-v2/assets/css/styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = re.sub(r'linear-gradient\([^)]+\)', 'var(--primary-color)', css)
css = css.replace('--primary-color: #fc2680;', '--primary-color: #FF98B8;')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("CSS Fixed!")
