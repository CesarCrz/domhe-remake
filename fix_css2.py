import re

css_path = '/Users/macuniterra/Desktop/domhe-renewal/domhe-renewal-v2/assets/css/styles.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css = f.read()

css = css.replace('var(--primary-color), var(--secondary-purple));', 'var(--primary-color);')
css = css.replace('var(--primary-color), rgba(121, 58, 184, 0.9));', 'var(--primary-color);')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css)

print("Fixed Trailing Syntax!")
