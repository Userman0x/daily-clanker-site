import fs from 'fs';
import path from 'path';

const indexPath = path.resolve('dist/index.html');
const notFoundPath = path.resolve('dist/404.html');

fs.copyFileSync(indexPath, notFoundPath);
console.log('✅ 404.html created for GitHub Pages SPA routing');
