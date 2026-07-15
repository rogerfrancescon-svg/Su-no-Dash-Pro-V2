const fs = require('fs');
let content = fs.readFileSync('vite.config.ts', 'utf-8');

const replacement = `export default defineConfig(() => {
  const repoName = process.env.GITHUB_REPOSITORY ? \`/\${process.env.GITHUB_REPOSITORY.split('/')[1]}/\` : './';
  return {
    base: process.env.GITHUB_ACTIONS ? repoName : './',`;

content = content.replace(`export default defineConfig(() => {
  return {
    base: './',`, replacement);

fs.writeFileSync('vite.config.ts', content);
